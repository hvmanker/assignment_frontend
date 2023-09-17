import React, { useState } from "react";
import JsonTable from "./JsonTable"; // Import the JsonTable component
import axios from "axios";
import "./Seowidget.css";

const Seowidget = () => 
{
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataForSEO = () => {
    if (url.trim() === "") {
      alert("Please enter a URL");
      return;
    }
  
    setIsLoading(true);
  
    axios
      .post("https://assignmentapi-production.up.railway.app/send-request", {
        url,
      })
      .then((response) => {
        console.log(response.data.error);
        if (response.data.success) {
          setResult(response.data);
        } else {
          // Check if the response indicates an invalid URL
          if (response.data.error === "Invalid URL") {
            setResult(null);
            alert("Invalid URL. Please enter a valid URL.");
          } else {
            setResult(null);
            console.error("Error fetching DataForSEO data:", response.data.error);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching DataForSEO data", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
