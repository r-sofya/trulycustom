import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock PocketBase before importing the service
vi.mock('$lib/utils/pocketbase.js', () => {
    const mockGetFullList = vi.fn();
    return {
        default: {
            collection: vi.fn(() => ({
                getFullList: mockGetFullList
            }))
        },
        portfolioCollection: 'portfolio',
        __mockGetFullList: mockGetFullList
    };
});

import { PortfolioService } from './getPortfolio';
import pb from '$lib/utils/pocketbase.js';

describe('PortfolioService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAll', () => {
        it('should fetch and transform portfolio projects', async () => {
            const mockRecords = [
                {
                    id: '1',
                    title: 'Test Project',
                    imageUrl: 'https://example.com/image.jpg',
                    websiteUrl: 'https://example.com',
                    tags: ['web', 'design'],
                    description: 'A test project',
                    created: '2024-01-01'
                }
            ];

            const mockCollection = pb.collection as ReturnType<typeof vi.fn>;
            mockCollection.mockReturnValue({
                getFullList: vi.fn().mockResolvedValue(mockRecords)
            });

            const result = await PortfolioService.getAll();

            expect(pb.collection).toHaveBeenCalledWith('portfolio');
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                id: '1',
                title: 'Test Project',
                imageUrl: 'https://example.com/image.jpg',
                websiteUrl: 'https://example.com',
                tags: ['web', 'design'],
                description: 'A test project'
            });
        });

        it('should handle empty tags', async () => {
            const mockRecords = [
                {
                    id: '2',
                    title: 'No Tags Project',
                    imageUrl: 'https://example.com/image2.jpg',
                    websiteUrl: 'https://example.com/2',
                    tags: null,
                    description: 'Project without tags'
                }
            ];

            const mockCollection = pb.collection as ReturnType<typeof vi.fn>;
            mockCollection.mockReturnValue({
                getFullList: vi.fn().mockResolvedValue(mockRecords)
            });

            const result = await PortfolioService.getAll();

            expect(result[0].tags).toBe('');
        });

        it('should throw error on fetch failure', async () => {
            const mockCollection = pb.collection as ReturnType<typeof vi.fn>;
            mockCollection.mockReturnValue({
                getFullList: vi.fn().mockRejectedValue(new Error('Network error'))
            });

            await expect(PortfolioService.getAll()).rejects.toThrow('Network error');
        });
    });
});
