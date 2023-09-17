import React, { useState } from "react";
import JsonTable from "./JsonTable"; // Import the JsonTable component
import axios from "axios";
import "./Seowidget.css";

const Seowidget = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataForSEO = async () => {
    try {
      if (url.trim() === "") {
        alert("Please enter a URL");
        return;
      }

      setIsLoading(true);

      const response = await axios.post("https://assignmentapi-production.up.railway.app/send-request", {
        url,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching DataForSEO data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "Enter" key press
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      fetchDataForSEO();
    }
  };

  return (
    <div className={`Seowidget ${isLoading ? "loading" : ""}`}>
      <h1>DataForSEO Widget</h1>
      <input
        className="Seowidget-input"
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleEnterKey} 
      />
      <button className="Seowidget-button" onClick={fetchDataForSEO}>
        SEO AUDIT REPORT
      </button>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        result && <JsonTable className="result-table" data={result} />
      )}
    </div>
  );
};

export default Seowidget;
