"use client"
import formatSeconds from "@/utils/formatSeconds";
import { differenceInCalendarWeeks } from "date-fns";
import { useEffect, useState } from "react";
import "./styles.css"
import ProtectedRoute from "@/components/ProtectedRoute";
const TrainingPlanGenerator: React.FC = () => {
  const [data, setData] = useState<string>();
  const [loading, setIsLoading] = useState<boolean>(false)
  const [trainingPlan, setTrainingPlan] = useState([])
  const [goal, setGoal] = useState<string>()
  const [targetTime, setTargetTime] = useState<string>()
  const [competitionDate, setCompetitionDate] = useState<string>()
  const [showToast, setShowToast] = useState<boolean>(false);

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


  const calculateTimeToCompetition = (date: string) => {
    const result = differenceInCalendarWeeks(new Date(date), new Date());
    return result;
  }

  const handleCreateTrainingPlan = async () => {
    if (!data || !goal || !targetTime || !competitionDate) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
      return;
    }
    try {
      setIsLoading(true)
      let timeDifference = 0;
      if (competitionDate) {
        timeDifference = calculateTimeToCompetition(competitionDate)
      }
      const response = await fetch('/api/getTrainingPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, goal, targetTime, timeDifference }),
      });


      if (!response.ok) throw new Error('Failed to generate plan');

      const result = await response.json();
      console.log(result.trainingPlan.training)
      console.log(result.trainingPlan.currentTime)
      console.log(formatSeconds(result.trainingPlan.currentPace))
      sessionStorage.setItem("trainingplan", JSON.stringify(result.trainingPlan.training))
      setTrainingPlan(result.trainingPlan.training)

    } catch (err) {
      console.error('Failed to generate plan:', err);

    } finally {
      setIsLoading(false)
    }
  }

  const exportTrainingPlan = async () => {
    try {
      const response = await fetch('/api/exportTrainingPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trainingPlan }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'training-plan.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };


  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("data");
      if (storedData) {
        setData(storedData);
      } else {
        console.log("No data found. Please upload a CSV file first.");
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedTrainingPlan = sessionStorage.getItem("trainingplan");
        if (storedTrainingPlan) {
          setTrainingPlan(JSON.parse(storedTrainingPlan));
        }
      } catch (err) {
        console.error("Error loading training plan:", err);
      }
    }
  }, []);


  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          {trainingPlan.length > 0 && <div className="flex justify-end">
            <button
              type="button"
              className="group relative flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => exportTrainingPlan()}
            >
              Download Training Plan
            </button>

          </div>}

          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Training Plan Generator
            </h2>
          </div>

          <div className="d-flex flex-column">
            <label>Choose your goal:
              <select className="input-fields" id="goals" name="goals" onChange={(event) => setGoal(event.target.value)}>
                <option value="">None</option>
                <option value="Marathon">Marathon</option>
                <option value="Half-Marathon">Half-Marathon</option>
              </select>
            </label>
            <label>What is your target time? <input className="input-fields" type="string" onChange={(event) => setTargetTime(event.target.value)} placeholder="HH:MM:SS" />
            </label>
            <label>
              Date of the competition:<input className="input-fields" type="date" onChange={(event) => setCompetitionDate(event.target.value)} />
            </label>

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
                      weekDays.map((day) => (
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
                              trainingForDay.activity != "REST" ?
                                <>
                                  <p>{trainingForDay.day}</p>
                                  <p>{trainingForDay.activity}</p>
                                  <p>{trainingForDay.length} km</p>
                                  <p>{formatSeconds(trainingForDay.targetAvgPace)} min/s</p>
                                  {trainingForDay.activity === "INTERVAL_RUN" ? <p>{trainingForDay.interval.reptitions} x {trainingForDay.interval.length} km @ {formatSeconds(trainingForDay.interval.targetPace)} with {formatSeconds(trainingForDay.interval.restBetweenRounds)} rest.</p> : null}

                                </>
                                : trainingForDay.activity
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>)}
          {showToast && (
            <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-lg">
              Please fill in all required fields:
              <ul>
                {!data && <li>- Upload a CSV file</li>}
                {!goal && <li>- Choose a goal</li>}
                {!targetTime && <li>- Enter your target time</li>}
                {!competitionDate && <li>- Enter the competition date</li>}
              </ul>
            </div>
          )}

        </div>
      </div >
    </ProtectedRoute>
  );
};

export default TrainingPlanGenerator;
