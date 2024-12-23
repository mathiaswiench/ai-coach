"use client"

import { useEffect, useState } from "react";

const TrainingPlanGenerator: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
  
    const [error, setError] = useState<string | null>(null);

  // const handleCreateTrainingPlan = async (): TrainingPlan => {
  //   const response = await b.TrainingPlanGenerator(parsedData);
  //   console.log(response)
  // }

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("data");
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        setError("No data found. Please upload a CSV file first.");
      }
    } catch (err) {
      setError("Error loading data");
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Training Plan Generator
          </h2>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {/* Add generation logic */}}
          >
            Generate Training Plan
          </button>
        </div>

        {data.length > 0 && (
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Training Data</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingPlanGenerator;
