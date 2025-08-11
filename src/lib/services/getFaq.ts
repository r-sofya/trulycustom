import { databaseId, faqCollectionId } from '$lib/utils/appwrite.js';
import { Databases, Query } from 'appwrite';
import client from '$lib/utils/appwrite.js';

const databases = new Databases(client);

// Get all faq items
export const FaqService = {
    async getAll() {
        const response = await databases.listDocuments(databaseId, faqCollectionId);
        return response.documents.map((doc: any) => ({
            id: doc.$id,
            question: doc.question,
            answer: doc.answer,
        }));
    }
}