
export enum EndpointType {
  SEARCH = 'SEARCH',
  DOWNLOAD_ALL = 'DOWNLOAD_ALL',
  VIP_CHANNEL = 'VIP_CHANNEL',
  LATEST = 'LATEST',
  DUBBED = 'DUBBED',
  DETAIL_V2 = 'DETAIL_V2',
  EPISODES = 'EPISODES',
  STREAM = 'STREAM',
  CATEGORIES = 'CATEGORIES',
  CATEGORY_ITEMS = 'CATEGORY_ITEMS',
  RECOMMENDATIONS = 'RECOMMENDATIONS'
}

export interface Endpoint {
  id: EndpointType;
  method: 'GET';
  path: string;
  description: string;
  params: {
    name: string;
    placeholder: string;
    required: boolean;
  }[];
}

export interface ApiResponse {
  status: number;
  time: string;
  data: any;
  error?: string;
}
