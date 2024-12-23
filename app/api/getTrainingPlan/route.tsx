import { b } from '../../../baml_client';

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    const trainingPlan = await b.TrainingPlanGenerator();
    return Response.json({ trainingPlan });
  } catch (error) {
    return Response.json({ error: 'Failed to generate training plan' }, { status: 500 });
  }
}