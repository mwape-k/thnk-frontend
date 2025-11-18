import { API_CONFIG } from "../config/api";

export interface PromptSearchRequest {
  prompt: string;
}

export interface UrlSearchRequest {
  url: string;
}

export interface SearchResponse {
  data: EnhancedSearchResponse | UrlSearchResponse | null;
  success: boolean;
  message?: string;
}

// Interface for PROMPT responses (matches your /prompt endpoint)
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

// Interface for URL responses (matches your /deeper-scrape endpoint)
export interface UrlSearchResponse {
  quickAssessment: any;
  main: {
    url: string;
    title: string;
    text: string;
    contentLength: number;
    scrapedAt: string;
  };
  aiSummary: string; // Note: different field name!
  neutralityScore: number;
  persuasionScore: number;
  relatedSources: Array<{
    // Note: different field name!
    url: string;
    title: string;
    text: string;
    tags: string[];
    neutralityScore: number;
    sentimentScore: number;
    aiGenerated: boolean;
  }>;
  biasAnalysis?: any; // Could be string or object based on your logs
  researchQuality?: any;
  sourceMetrics?: any;
  analyzedAt: string;
}

const baseUrl: string = "https://thnk-backend-production.up.railway.app/api";

// Enhanced function for prompt search
export const searchByPrompt = async (
  prompt: string
): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${baseUrl}/prompt`, {
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
    const response = await fetch(`${baseUrl}/deeper-scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UrlSearchResponse = await response.json();

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

// Type guards to check response types
export const isPromptResponse = (data: any): data is EnhancedSearchResponse => {
  return (
    data && typeof data.summary === "string" && Array.isArray(data.sources)
  );
};

export const isUrlResponse = (data: any): data is UrlSearchResponse => {
  return (
    data &&
    data.main &&
    typeof data.aiSummary === "string" &&
    Array.isArray(data.relatedSources)
  );
};

// Helper function to normalize data for UI
export const normalizeSearchData = (
  data: EnhancedSearchResponse | UrlSearchResponse | null
) => {
  if (!data) return null;

  console.log("Raw data for normalization:", data);

  if (isPromptResponse(data)) {
    return {
      summary: data.summary,
      neutralityScore: data.neutralityScore,
      persuasionScore: data.persuasionScore,
      sources: data.sources || [],
      biasAnalysis: data.biasAnalysis,
      sourceMetrics: data.sourceMetrics,
      researchQuality: data.researchQuality,
      quickAssessment: data.quickAssessment,
    };
  }

  if (isUrlResponse(data)) {
    return {
      summary: data.aiSummary, // Map aiSummary to summary
      neutralityScore: data.neutralityScore,
      persuasionScore: data.persuasionScore,
      sources: data.relatedSources || [], // Map relatedSources to sources
      biasAnalysis: data.biasAnalysis,
      sourceMetrics: data.sourceMetrics,
      researchQuality: data.researchQuality,
      quickAssessment: data.quickAssessment,
      mainContent: data.main,
    };
  }

  return null;
};
