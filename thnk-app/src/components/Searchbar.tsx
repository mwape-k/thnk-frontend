import "../components/component-styles/styles-searchbar.css";
import CustomBtn from "./CustomBtn";

export default function Searchbar() {
  return (
    <div className="flex flex-col justify-center items-center w-full space-y-4">
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
          required
          placeholder="Search"
          className="w-full p-5"
        />
      </label>
      <CustomBtn
        className="btn-searchbar"
        type="submit"
        size="full"
        text="THINK"
      />
    </div>
  );
}
