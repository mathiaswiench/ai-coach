import { b } from '../../../baml_client';

export const maxDuration = 300; // Set max duration to 5 minutes
export const dynamic = 'force-dynamic'; // Disable static optimization

export async function POST(req: Request) {
  try {
    // Add request validation
    if (!req.body) {
      return Response.json({ error: 'Missing request body' }, { status: 400 });
    }

    const start = Date.now();
    const { data, goal, targetTime, timeDifference } = await req.json();

    // Add timeout handling
    const trainingPlan = await Promise.race([
      b.TrainingPlanGenerator(goal, data, targetTime, timeDifference),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 29000)
      )
    ]);

    console.log(`Request processing time: ${Date.now() - start}ms`);
    return Response.json({ trainingPlan });

  } catch (error: unknown) {
    // Enhanced error logging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Training plan generation failed:', {
      error: errorMessage,
      timestamp: new Date().toISOString()
    });

    return Response.json(
      { error: 'Failed to generate training plan', details: errorMessage },
      { status: error instanceof Error && error.message === 'Request timeout' ? 504 : 500 }
    );
  }
}