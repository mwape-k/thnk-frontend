// src/services/historyServices.ts
import axios from "axios";
import type { SearchHistory } from "../interface/history";
import type { FullSearchResult } from "../interface/history";
import { API_CONFIG } from "../config/api";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: `/api/${API_BASE_URL}`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const historyService = {
  getUserHistory: async (limit: number = 10): Promise<SearchHistory[]> => {
    try {
      const response = await api.get<SearchHistory[]>("/history", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user history:", error);
      throw error;
    }
  },

  getFullSearchResult: async (historyId: string): Promise<FullSearchResult> => {
    try {
      const response = await api.get<FullSearchResult>(
        `/history/${historyId}/full`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching full search result:", error);
      throw error;
    }
  },

  deleteHistoryEntry: async (historyId: string): Promise<void> => {
    try {
      await api.delete(`/history/${historyId}`);
    } catch (error) {
      console.error("Error deleting history entry:", error);
      throw error;
    }
  },

  clearAllHistory: async (): Promise<{ deletedCount: number }> => {
    try {
      const response = await api.delete<{ deletedCount: number }>("/history");
      return response.data;
    } catch (error) {
      console.error("Error clearing all history:", error);
      throw error;
    }
  },
};

export default historyService;
