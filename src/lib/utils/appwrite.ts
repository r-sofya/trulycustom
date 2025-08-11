import { Client } from 'appwrite';

const endpoint = import.meta.env.APPWRITE_ENDPOINT || import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.APPWRITE_PROJECT_ID || import.meta.env.VITE_APPWRITE_PROJECT_ID;

if (!endpoint) {
    throw new Error('APPWRITE_ENDPOINT environment variable is not set');
}

if (!projectId) {
    throw new Error('APPWRITE_PROJECT_ID environment variable is not set');
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

export default client;

export const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID || import.meta.env.APPWRITE_DATABASE_ID;
export const collectionId = import.meta.env.VITE_APPWRITE_PORTFOLIO_COLLECTION_ID || import.meta.env.APPWRITE_PORTFOLIO_COLLECTION_ID;
export const faqCollectionId = import.meta.env.VITE_APPWRITE_FAQ_COLLECTION_ID || import.meta.env.APPWRITE_FAQ_COLLECTION_ID;