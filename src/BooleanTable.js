import React from "react";
import "./JsonTable.css"; // Import the CSS for styling

const formatKey = (key) => {
  // Replace underscores (_) with spaces
  return key.replace(/_/g, " ");
};
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const BooleanTable = ({ booleanFields }) => {
  return (
    <div className="table-container">
      
      <div className="card-container">
        {booleanFields.map((field, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              {capitalizeFirstLetter(formatKey(field.name))}
            </div>
            <div className="card-body">
              {field.value === "true" ? (
                <span className="green-tick">✔</span>
              ) : (
                <span className="red-cross">❌</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooleanTable;
