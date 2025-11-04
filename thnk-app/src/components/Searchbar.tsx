import { useState } from "react";
import "../components/component-styles/styles-searchbar.css";
import CustomBtn from "./CustomBtn";
import { searchByPrompt, searchByUrl } from "../services/searchService";

interface SearchbarProps {
  onSearchStart?: () => void;
  onSearchComplete?: (data: any, searchType: "prompt" | "url") => void;
  onSearchError?: (error: string) => void;
}

export default function Searchbar({
  onSearchStart,
  onSearchComplete,
  onSearchError,
}: SearchbarProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<"prompt" | "url">("prompt");

  const detectInputType = (value: string) => {
    try {
      new URL(value);
      setSearchType("url");
    } catch {
      setSearchType("prompt");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    detectInputType(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    setIsLoading(true);
    onSearchStart?.();

    try {
      let response;

      if (searchType === "prompt") {
        response = await searchByPrompt(input);
      } else {
        try {
          new URL(input);
          response = await searchByUrl(input);
        } catch {
          onSearchError?.("Please enter a valid URL");
          setIsLoading(false);
          return;
        }
      }

      if (response.success) {
        onSearchComplete?.(response.data, searchType);
      } else {
        onSearchError?.(response.message || "Search failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      onSearchError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-full space-y-4"
    >
      <label className="flex items-center w-full max-w-3xl search-input">
        <svg
          className="h-[1em] opacity-50 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          id="searchbar"
          name="searchbar"
          value={input}
          onChange={handleInputChange}
          required
          placeholder={
            searchType === "prompt" ? "Ask a question..." : "Enter URL..."
          }
          className="w-full p-5"
          disabled={isLoading}
        />
      </label>

      <div className="text-sm text-gray-400 badge  badge-lg badge-tertiary">
        Searching by:{" "}
        <span className="text-accent">
          {searchType === "prompt" ? "Question" : "URL"}
        </span>
      </div>

      <CustomBtn
        className="btn-searchbar"
        type="submit"
        size="full"
        text={isLoading ? "THINKING..." : "THINK"}
        Disabled={isLoading}
      />
    </form>
  );
}
