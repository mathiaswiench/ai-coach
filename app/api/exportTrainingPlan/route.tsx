import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import PDFTrainingPlan from '@/components/PDFTrainingPlan';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Create PDF stream
        const stream = await renderToStream(
            <PDFTrainingPlan data={data.trainingPlan} />
        );

        // Convert stream to buffer
        const chunks: Uint8Array[] = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        const pdfBuffer = Buffer.concat(chunks);

        return new Response(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="training-plan.pdf"',
            },
        });
    } catch (error) {
        console.error('PDF generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
}