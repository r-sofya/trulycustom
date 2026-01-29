import pb, { faqCollection } from '$lib/utils/pocketbase.js';

export const FaqService = {
    async getAll() {
        const records = await pb.collection(faqCollection).getFullList({
            sort: 'order,created'
        });
        return records.map((doc) => ({
            id: doc.id,
            question: doc.question,
            answer: doc.answer,
            order: doc.order ?? 0
        }));
    }
};