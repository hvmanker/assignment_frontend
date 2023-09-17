import React from "react";
import "./OtherTable.css"; // Import the CSS for styling

const formatKey = (key) => {
  // Replace underscores (_) with spaces
  return key.replace(/_/g, ' ');
};

const OtherTable = ({ otherFields }) => {
  return (
    <div className="table-containerother">
      
      <div className="card-containerother">
        {otherFields.map((field, index) => (
          <div className="cardother" key={index}>
            <div className="card-headerother">{formatKey(field.name)}</div>
            <div className="card-bodyother">{field.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherTable;
