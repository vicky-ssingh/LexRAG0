export interface ChatResponse {
  answer: string;
  citations: string[];
}

export interface NavItem {
  label: string;
  path: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}