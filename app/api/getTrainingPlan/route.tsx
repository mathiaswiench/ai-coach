import { b } from '../../../baml_client';

export async function POST(req: Request) {
  try {
    const { data, goal, targetTime,  timeDifference} = await req.json();
    console.log(timeDifference)
    console.log(goal)
    console.log(targetTime)
    console.log(data)
    const trainingPlan = await b.TrainingPlanGenerator(goal, data, targetTime, timeDifference);
    return Response.json({ trainingPlan });
  } catch (error) {
    return Response.json({ error: 'Failed to generate training plan' }, { status: 500 });
  }
}