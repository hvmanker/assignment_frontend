import React, { useEffect, useState } from "react";
import BooleanTable from "./BooleanTable"; // Import the BooleanTable component
import OtherTable from "./OtherTable"; // Import the OtherTable component
// Import the ProgressBar component
import CircularProgressBar from "./ProgressBar";

// Inside your JsonTable component



const JsonTable = ({ data }) => {
  const [booleanFields, setBooleanFields] = useState([]);
  const [otherFields, setOtherFields] = useState([]);
  const [on_page_score,setOnPageseo]=useState(null);
  

  useEffect(() => {
    // Extract and flatten fields from the provided data object
    const flattenObject = (obj, parentKey = "") => {
      const flattenedFields = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = parentKey ? `${parentKey}.${key}` : key;
          if (typeof obj[key] === "object" && obj[key] !== null) {
            flattenedFields.push(...flattenObject(obj[key], newKey));
          } else {
            const value = obj[key] === true ? "true" : obj[key] === false ? "false" : obj[key];
            if (value !== null) {
              flattenedFields.push({ name: key, value: value });
            }
          }
        }
      }
      return flattenedFields;
    };

    const fields = flattenObject(data.result[0].result[0].items[0]);

    // Separate the fields into two arrays based on the value type
    const on_page_seo = fields.find((field)=> field.name === "onpage_score")
    if(on_page_seo)
    {
      console.log(on_page_seo.value);
      setOnPageseo(on_page_seo.value);
    }
    const booleanFieldsArray = fields.filter((field) => typeof field.value === "string" && (field.value === "true" || field.value === "false"));
    const otherFieldsArray = fields.filter((field) => typeof field.value !== "string" || (field.value !== "true" && field.value !== "false"));
    setBooleanFields(booleanFieldsArray);
    setOtherFields(otherFieldsArray);
  }, [data]);

  return (
    <div>
      
      <h2>ON PAGE SCORE</h2>
      <CircularProgressBar score={on_page_score} />
      <h2>Result Data </h2>
      <OtherTable otherFields={otherFields} />
      <BooleanTable booleanFields={booleanFields} />
      
      
    </div>
  );
};

export default JsonTable;
