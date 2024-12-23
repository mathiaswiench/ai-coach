"use client"
import { useEffect, useState } from "react";

const TrainingPlanGenerator: React.FC = () => {
    const [data, setData] = useState<string>("");
    const [loading, setIsLoading] = useState<boolean>(false)
    const [trainingPlan, setTrainingPlan] = useState([])
    const [error, setError] = useState<string | null>(null);

    const weekDays =  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleCreateTrainingPlan = async () => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/getTrainingPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      

      if (!response.ok) throw new Error('Failed to generate plan');
      
      const result = await response.json();
      console.log(result.trainingPlan.training)
      sessionStorage.setItem("trainingplan", JSON.stringify(result.trainingPlan.training))
      setTrainingPlan(result.trainingPlan.training)
      
    } catch (err) {
      console.log(trainingPlan.length)
      setError(err.message);
    } finally {
      
      setIsLoading(false)
    }
  }


  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("data");
      if (storedData) {
        setData(storedData);
      } else {
        setError("No data found. Please upload a CSV file first.");
      }
    } catch (err) {
      setError("Error loading data");
    }
  }, [])

  useEffect(() => {
    try {
      const storedTrainingPlan = sessionStorage.getItem("trainingplan");
      if (storedTrainingPlan) {
        setTrainingPlan(JSON.parse(storedTrainingPlan));
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
            onClick={() => handleCreateTrainingPlan()}
          >
            Generate Training Plan
          </button>
        </div>

        {loading ? (<p>Is Loading ...</p>) : (<div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Training Data</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                      <th
                        key="week"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Week
                      </th>
                    {
                      weekDays.map((day, index) => (
                        <th
                        key={day}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {day}
                      </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {trainingPlan.map((week) => (
                  <tr key={week.week}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {week.week}
                    </td>
                    {weekDays.map((day) => {
                      const trainingForDay = week.training.find(
                        (training) => training.day === day
                      );
                      return (
                        <td
                          key={`${week.week}-${day}`}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          {trainingForDay && (
                            <>
                              <p>{trainingForDay.day}</p>
                              <p>{trainingForDay.activity}</p>
                              <p>{trainingForDay.length} km</p>
                              <p>{trainingForDay.targetPace} min/s</p>
                            </>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>) }


      </div>
    </div>
  );
};

export default TrainingPlanGenerator;
