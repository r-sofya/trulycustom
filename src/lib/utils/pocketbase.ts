import PocketBase from 'pocketbase';

// Default PocketBase URL - works for both client and server
const POCKETBASE_URL =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_POCKETBASE_URL
        ? import.meta.env.VITE_POCKETBASE_URL
        : 'http://localhost:8090';

// Singleton instance for client-side usage
const pb = new PocketBase(POCKETBASE_URL);

// Factory function for server-side usage (creates fresh instance)
export function createPocketBase(url?: string): PocketBase {
    return new PocketBase(url || POCKETBASE_URL);
}

export default pb;

export const portfolioCollection = 'portfolio';
export const faqCollection = 'faq';
export const contactsCollection = 'contacts';

// TypeScript types based on pb_schema.json
export interface PortfolioRecord {
    id: string;
    title: string;
    image?: string;
    websiteUrl: string;
    tags?: string[];
    description?: string;
    order?: number;
    created: string;
    updated: string;
}

export interface FaqRecord {
    id: string;
    question: string;
    answer: string;
    order?: number;
    created: string;
    updated: string;
}

export interface ContactRecord {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message: string;
    budget?: string;
    created: string;
    updated: string;
}
