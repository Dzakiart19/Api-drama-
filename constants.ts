
import { Endpoint, EndpointType } from './types';

export const ENDPOINTS: Endpoint[] = [
  {
    id: EndpointType.SEARCH,
    method: 'GET',
    path: '/api/search',
    description: 'Real-time search across DramaBox database.',
    params: [{ name: 'query', placeholder: 'Enter drama title...', required: true }]
  },
  {
    id: EndpointType.DOWNLOAD_ALL,
    method: 'GET',
    path: '/api/drama/:id/download',
    description: 'Bulk extract all metadata and streaming links for a drama.',
    params: [{ name: 'id', placeholder: 'Drama ID (e.g., 12345)', required: true }]
  },
  {
    id: EndpointType.VIP_CHANNEL,
    method: 'GET',
    path: '/api/dramabox/vip',
    description: 'Fetch real-time VIP channel contents (Banners, History, Weekly).',
    params: []
  },
  {
    id: EndpointType.LATEST,
    method: 'GET',
    path: '/api/latest',
    description: 'Get current trending and newly aired dramas.',
    params: []
  },
  {
    id: EndpointType.DUBBED,
    method: 'GET',
    path: '/api/dubbed',
    description: 'Filter dramas with specific language dubbing.',
    params: [{ name: 'lang', placeholder: 'Language (e.g., English, Indonesian)', required: false }]
  },
  {
    id: EndpointType.DETAIL_V2,
    method: 'GET',
    path: '/api/drama/v2/:id',
    description: 'Deep extraction of drama metadata (Actors, Ratings, Tags).',
    params: [{ name: 'id', placeholder: 'Drama ID', required: true }]
  },
  {
    id: EndpointType.EPISODES,
    method: 'GET',
    path: '/api/drama/:id/episodes',
    description: 'Full list of chapters/episodes from first to last.',
    params: [{ name: 'id', placeholder: 'Drama ID', required: true }]
  },
  {
    id: EndpointType.STREAM,
    method: 'GET',
    path: '/api/stream',
    description: 'Get real-time direct .m3u8 or .mp4 links for an episode.',
    params: [
      { name: 'bookId', placeholder: 'Drama ID', required: true },
      { name: 'episode', placeholder: 'Episode index (e.g., 1)', required: true }
    ]
  },
  {
    id: EndpointType.CATEGORIES,
    method: 'GET',
    path: '/api/categories',
    description: 'List all official genres and categories.',
    params: []
  },
  {
    id: EndpointType.CATEGORY_ITEMS,
    method: 'GET',
    path: '/api/category/:id',
    description: 'List all dramas within a specific category ID.',
    params: [{ name: 'id', placeholder: 'Category ID', required: true }]
  },
  {
    id: EndpointType.RECOMMENDATIONS,
    method: 'GET',
    path: '/api/recommendations',
    description: 'Real-time trending suggestions from the server.',
    params: []
  }
];
