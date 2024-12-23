import React from "react";
import { useLocation } from 'react-router';


const TrainingPlanGenerator = () => {
  const location = useLocation();
  const { parsedData } = location.state || {}; // Access the data passed via navigate

  // const handleCreateTrainingPlan = async (): TrainingPlan => {
  //   const response = await b.TrainingPlanGenerator(parsedData);
  //   console.log(response)
  // }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Upload CSV</h2>
      <button type="submit" className="btn btn-primary w-100" onClick={handleCreateTrainingPlan}>
          Create Training Plan
        </button>
      <div className="mt-4">
      <h4>Training Plan</h4>
      {parsedData ? (
        <table>
          <thead>
            <tr>
              {Object.keys(parsedData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parsedData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
    </div>
  );
};

export default TrainingPlanGenerator;
