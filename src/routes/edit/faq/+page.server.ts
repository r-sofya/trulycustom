import type { PageServerLoad, Actions } from './$types';
import pb, { faqCollection } from '$lib/utils/pocketbase.js';

export const load: PageServerLoad = async ({ locals }) => {
    try {
        const faqs = await locals.pb.collection(faqCollection).getFullList({
            sort: 'order,created'
        });
        return { faqs };
    } catch (error) {
        console.error('Error loading FAQs:', error);
        return { faqs: [] };
    }
};

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const formData = await request.formData();
        const question = formData.get('question') as string;
        const answer = formData.get('answer') as string;

        try {
            // Get current max order to place new FAQ at the end
            const existing = await locals.pb.collection(faqCollection).getFullList({
                sort: '-order',
                fields: 'order'
            });
            const maxOrder = existing.length > 0 ? (existing[0].order ?? 0) : 0;

            await locals.pb.collection(faqCollection).create({
                question,
                answer,
                order: maxOrder + 1
            });
            return { success: true, action: 'create' };
        } catch (error) {
            console.error('Error creating FAQ:', error);
            return { success: false, error: 'Failed to create FAQ' };
        }
    },

    update: async ({ request, locals }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;
        const question = formData.get('question') as string;
        const answer = formData.get('answer') as string;

        try {
            await locals.pb.collection(faqCollection).update(id, { question, answer });
            return { success: true, action: 'update' };
        } catch (error) {
            console.error('Error updating FAQ:', error);
            return { success: false, error: 'Failed to update FAQ' };
        }
    },

    delete: async ({ request, locals }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;

        try {
            await locals.pb.collection(faqCollection).delete(id);
            return { success: true, action: 'delete' };
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            return { success: false, error: 'Failed to delete FAQ' };
        }
    },

    reorder: async ({ request, locals }) => {
        const formData = await request.formData();
        const orderData = formData.get('order') as string;

        if (!orderData) {
            return { success: false, error: 'Order data is required' };
        }

        try {
            const items: { id: string; order: number }[] = JSON.parse(orderData);

            // Update each FAQ with its new order
            await Promise.all(
                items.map((item) =>
                    locals.pb.collection(faqCollection).update(item.id, { order: item.order })
                )
            );

            return { success: true, action: 'reorder' };
        } catch (error) {
            console.error('Error reordering FAQs:', error);
            return { success: false, error: 'Failed to reorder FAQs' };
        }
    }
};
