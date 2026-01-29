import type { Actions } from './$types';
import pb, { portfolioCollection, faqCollection } from '$lib/utils/pocketbase.js';

export const actions: Actions = {
    addPortfolio: async ({ request }) => {
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const imageUrl = formData.get('imageUrl') as string;
        const websiteUrl = formData.get('websiteUrl') as string;
        const tagsString = formData.get('tags') as string;
        const description = formData.get('description') as string;

        const tags = tagsString
            ? tagsString.split(',').map((tag) => tag.trim()).filter(Boolean)
            : [];

        try {
            await pb.collection(portfolioCollection).create({
                title,
                imageUrl,
                websiteUrl,
                tags,
                description
            });
            return { success: true };
        } catch (error) {
            console.error('Error adding portfolio project:', error);
            return { success: false, error: 'Failed to add portfolio project' };
        }
    },

    addFaq: async ({ request }) => {
        const formData = await request.formData();

        const question = formData.get('question') as string;
        const answer = formData.get('answer') as string;

        try {
            await pb.collection(faqCollection).create({
                question,
                answer
            });
            return { success: true };
        } catch (error) {
            console.error('Error adding FAQ entry:', error);
            return { success: false, error: 'Failed to add FAQ entry' };
        }
    }
};
