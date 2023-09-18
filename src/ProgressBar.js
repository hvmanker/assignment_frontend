import React from "react";
import "react-circular-progressbar/dist/styles.css";
import "./ProgressBar.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const CircularProgressBar = ({ score }) => {
  // Determine the color based on the score
  let pathColor = "#4caf50"; // Default color

  if (score < 40) {
    pathColor = "red"; // Change to red if the score is below 30
  } else if (score < 70) {
    pathColor = "yellow"; // Change to yellow if the score is below 70
  }

  return (
    <div className="circular-progress-container">
      <div className="circular-progress-bar">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          strokeWidth={9} // Adjust the strokeWidth as needed

          styles={buildStyles({
            textColor: pathColor, // Use the determined color for the text
            pathColor: pathColor, // Use the determined color for the progress path
            trailColor: "#e5e5e5", // Color for the trail (background)
            textSize: "14px", // Size of the text
          })}
        />
      </div>
    </div>
  );
};

export default CircularProgressBar;
