import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock PocketBase before importing the service
vi.mock('$lib/utils/pocketbase.js', () => {
    return {
        default: {
            collection: vi.fn(() => ({
                getFullList: vi.fn()
            }))
        },
        faqCollection: 'faq'
    };
});

import { FaqService } from './getFaq';
import pb from '$lib/utils/pocketbase.js';

describe('FaqService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAll', () => {
        it('should fetch and transform FAQ entries', async () => {
            const mockRecords = [
                {
                    id: '1',
                    question: 'What is TrulyCustom?',
                    answer: 'A custom web development agency.'
                },
                {
                    id: '2',
                    question: 'How do I contact you?',
                    answer: 'Visit our contact page.'
                }
            ];

            const mockCollection = pb.collection as ReturnType<typeof vi.fn>;
            mockCollection.mockReturnValue({
                getFullList: vi.fn().mockResolvedValue(mockRecords)
            });

            const result = await FaqService.getAll();

            expect(pb.collection).toHaveBeenCalledWith('faq');
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                id: '1',
                question: 'What is TrulyCustom?',
                answer: 'A custom web development agency.'
            });
        });

        it('should return empty array when no FAQs exist', async () => {
            const mockCollection = pb.collection as ReturnType<typeof vi.fn>;
            mockCollection.mockReturnValue({
                getFullList: vi.fn().mockResolvedValue([])
            });

            const result = await FaqService.getAll();

            expect(result).toEqual([]);
        });

        it('should throw error on fetch failure', async () => {
            const mockCollection = pb.collection as ReturnType<typeof vi.fn>;
            mockCollection.mockReturnValue({
                getFullList: vi.fn().mockRejectedValue(new Error('Database error'))
            });

            await expect(FaqService.getAll()).rejects.toThrow('Database error');
        });
    });
});
