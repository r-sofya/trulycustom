import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { env } from '$env/dynamic/private';
import { createPocketBase, portfolioCollection, type PortfolioRecord } from '$lib/utils/pocketbase';

// ============================================================================
// Types
// ============================================================================

interface ProjectFormData {
    title: string;
    websiteUrl: string;
    description: string;
    tags: string;
}

interface ValidationResult {
    success: true;
    data: ProjectFormData;
}

interface ValidationError {
    success: false;
    errors: Record<string, string>;
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Parse comma-separated tags string into array
 */
function parseTags(tagsString: string): string[] {
    if (!tagsString) return [];
    return tagsString
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
}

/**
 * Validate project form data
 */
function validateProjectData(formData: FormData): ValidationResult | ValidationError {
    const title = (formData.get('title') as string)?.trim() ?? '';
    const websiteUrl = (formData.get('websiteUrl') as string)?.trim() ?? '';
    const description = (formData.get('description') as string)?.trim() ?? '';
    const tags = (formData.get('tags') as string) ?? '';

    const errors: Record<string, string> = {};

    if (!title) {
        errors.title = 'Title is required';
    }

    if (!websiteUrl) {
        errors.websiteUrl = 'Website URL is required';
    } else {
        try {
            new URL(websiteUrl);
        } catch {
            errors.websiteUrl = 'Invalid URL format';
        }
    }

    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    }

    return {
        success: true,
        data: { title, websiteUrl, description, tags }
    };
}

/**
 * Build FormData for PocketBase create/update
 */
function buildProjectFormData(data: ProjectFormData, image?: File | null): FormData {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('websiteUrl', data.websiteUrl);
    formData.append('description', data.description);
    formData.append('tags', JSON.stringify(parseTags(data.tags)));

    if (image && image.size > 0) {
        formData.append('image', image);
    }

    return formData;
}

/**
 * Extract error message from PocketBase error
 */
function getPocketBaseErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message);
    }
    return 'An unexpected error occurred';
}

// ============================================================================
// Load Function
// ============================================================================

export const load: PageServerLoad = async ({ locals }) => {
    const pb = locals.pb;

    try {
        const projects = await pb.collection(portfolioCollection).getFullList<PortfolioRecord>({
            sort: 'order,-created'
        });

        return {
            projects: projects.map((project) => ({
                ...project,
                imageUrl: project.image ? pb.files.getURL(project, project.image) : null
            }))
        };
    } catch (error) {
        console.error('Error loading projects:', error);
        return { projects: [] };
    }
};

// ============================================================================
// Form Actions
// ============================================================================

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const pb = locals.pb;
        const formData = await request.formData();

        // Validate input
        const validation = validateProjectData(formData);
        if (!validation.success) {
            return fail(400, {
                action: 'create' as const,
                errors: validation.errors
            });
        }

        const image = formData.get('image') as File | null;

        try {
            await pb.collection(portfolioCollection).create(buildProjectFormData(validation.data, image));
            return { success: true, action: 'create' as const };
        } catch (error) {
            console.error('Error creating project:', error);
            return fail(500, {
                action: 'create' as const,
                error: getPocketBaseErrorMessage(error)
            });
        }
    },

    update: async ({ request, locals }) => {
        const pb = locals.pb;
        const formData = await request.formData();
        const id = formData.get('id') as string;

        // Validate ID
        if (!id?.trim()) {
            return fail(400, {
                action: 'update' as const,
                error: 'Project ID is required'
            });
        }

        // Validate input
        const validation = validateProjectData(formData);
        if (!validation.success) {
            return fail(400, {
                action: 'update' as const,
                errors: validation.errors
            });
        }

        const image = formData.get('image') as File | null;

        try {
            await pb
                .collection(portfolioCollection)
                .update(id, buildProjectFormData(validation.data, image));
            return { success: true, action: 'update' as const };
        } catch (error) {
            console.error('Error updating project:', error);
            return fail(500, {
                action: 'update' as const,
                error: getPocketBaseErrorMessage(error)
            });
        }
    },

    delete: async ({ request, locals }) => {
        const pb = locals.pb;
        const formData = await request.formData();
        const id = formData.get('id') as string;

        // Validate ID
        if (!id?.trim()) {
            return fail(400, {
                action: 'delete' as const,
                error: 'Project ID is required'
            });
        }

        try {
            await pb.collection(portfolioCollection).delete(id);
            return { success: true, action: 'delete' as const };
        } catch (error) {
            console.error('Error deleting project:', error);
            return fail(500, {
                action: 'delete' as const,
                error: getPocketBaseErrorMessage(error)
            });
        }
    },

    reorder: async ({ request, locals }) => {
        const pb = locals.pb;
        const formData = await request.formData();
        const orderData = formData.get('order') as string;

        if (!orderData) {
            return fail(400, {
                action: 'reorder' as const,
                error: 'Order data is required'
            });
        }

        try {
            const items: { id: string; order: number }[] = JSON.parse(orderData);

            // Update each item's order
            await Promise.all(
                items.map((item) =>
                    pb.collection(portfolioCollection).update(item.id, { order: item.order })
                )
            );

            return { success: true, action: 'reorder' as const };
        } catch (error) {
            console.error('Error reordering projects:', error);
            return fail(500, {
                action: 'reorder' as const,
                error: getPocketBaseErrorMessage(error)
            });
        }
    }
};
