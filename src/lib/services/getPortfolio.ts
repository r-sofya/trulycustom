import pb, { portfolioCollection } from '$lib/utils/pocketbase.js';

export const PortfolioService = {
    async getAll() {
        try {
            const records = await pb.collection(portfolioCollection).getFullList({
                sort: 'order,-created'
            });
            return records.map((doc) => ({
                id: doc.id,
                title: doc.title,
                imageUrl: doc.image ? pb.files.getURL(doc, doc.image) : null,
                websiteUrl: doc.websiteUrl,
                tags: Array.isArray(doc.tags)
                    ? doc.tags.map((tag: unknown) =>
                        typeof tag === 'object' && tag !== null ? (tag as { name: string }).name : tag
                    )
                    : '',
                description: doc.description
            }));
        } catch (error) {
            console.error('Error fetching portfolio projects:', error);
            throw error;
        }
    }
};
