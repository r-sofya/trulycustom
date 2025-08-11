import client from '$lib/utils/appwrite.js';
import { Databases, Query } from 'appwrite';
import { databaseId, collectionId } from '$lib/utils/appwrite.js';

if (!databaseId) {
    throw new Error('APPWRITE_DATABASE_ID environment variable is not set');
}

if (!collectionId) {
    throw new Error('APPWRITE_PORTFOLIO_COLLECTION_ID environment variable is not set');
}

const databases = new Databases(client);

export const PortfolioService = {
    async getAll() {
        try {
            const response = await databases.listDocuments(
                databaseId,
                collectionId,
                [
                    Query.orderDesc('$createdAt')
                ]
            );
            // Map Appwrite documents to expected project structure
            return response.documents.map((doc: any) => ({
                id: doc.$id,
                title: doc.title,
                imageUrl: doc.imageUrl,
                websiteUrl: doc.websiteUrl,
                tags: Array.isArray(doc.tags)
                    ? doc.tags.map((tag: any) => typeof tag === 'object' && tag !== null ? tag.name : tag)
                    : '',
                description: doc.description,
            }));
        } catch (error) {
            console.error('Error fetching portfolio projects:', error);
            throw error;
        }
    }
};
