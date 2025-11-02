// Define types for the API requests and responses
export interface PromptSearchRequest {
  prompt: string;
}

export interface UrlSearchRequest {
  url: string;
}

export interface SearchResponse {
  data: any;
  success: boolean;
  message?: string;
}

const baseUrl: string = "http://localhost:3001/api";

// Separate function for prompt search
export const searchByPrompt = async (
  prompt: string
): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${baseUrl}/search/prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

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

// Separate function for URL search
export const searchByUrl = async (url: string): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${baseUrl}/search/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

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
