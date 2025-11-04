import axios from "axios";
import { API_CONFIG } from "../config/api";

export interface PromptSearchRequest {
  prompt: string;
}

export interface UrlSearchRequest {
  url: string;
}

export interface SearchResponse {
  data: EnhancedSearchResponse | null;
  success: boolean;
  message?: string;
}

// Enhanced interface for both prompt and URL responses
export interface EnhancedSearchResponse {
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
    aiGenerated: boolean;
  }>;
  // Enhanced bias analysis fields
  biasAnalysis?: {
    overallAssessment: string;
    keyFindings: string[];
    criticalThinkingQuestions: string[];
    researchSuggestions: string[];
    confidenceLevel: string;
    biasIndicators: {
      languagePatterns: string[];
      perspectiveGaps: string[];
      sourceDiversity: string;
    };
  };
  sourceMetrics?: {
    neutralityRange: { min: number; max: number; average: number };
    sentimentRange: { min: number; max: number; average: number };
    diversityScore: number;
    scoreVariance: number;
    balancedPerspectives: boolean;
  };
  researchQuality?: {
    qualityScore: number;
    factors: string[];
    rating: string;
  };
  quickAssessment?: {
    overallNeutrality: string;
    perspectiveBalance: string;
    researchQuality: string;
    keyConsideration: string;
  };
}

const API_BASE_URL = API_CONFIG;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Enhanced function for prompt search
export const searchByPrompt = async (
  prompt: string
): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${api}/prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: EnhancedSearchResponse = await response.json();

    return {
      data,
      success: true,
    };
  } catch (error) {
    console.error("Prompt search error:", error);
    return {
      data: null,
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

// Enhanced function for URL search
export const searchByUrl = async (url: string): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${api}/deeper-scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: EnhancedSearchResponse = await response.json();

    return {
      data,
      success: true,
    };
  } catch (error) {
    console.error("URL search error:", error);
    return {
      data: null,
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

// Optional: Type guard to check if response has enhanced data
export const hasEnhancedData = (data: EnhancedSearchResponse): boolean => {
  return !!(data.biasAnalysis && data.sourceMetrics && data.researchQuality);
};
