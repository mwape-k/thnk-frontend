export interface ResultSummary {
  summary: string;
  neutralityScore: number;
  persuasionScore: number;
  sourcesCount: number;
  mainUrl: string;
}

export interface SearchHistory {
  _id: string;
  userId: string;
  query: string;
  timestamp: string;
  resultSummary: ResultSummary;
  fullResultId?: string;
}

export interface FullSearchResult {
  summary: string;
  neutralityScore: number;
  persuasionScore: number;
  sources: Array<{
    url: string;
    title: string;
    text: string;
    tags: string[];
    neutralityScore: number;
    sentimentScore: number;
  }>;
}