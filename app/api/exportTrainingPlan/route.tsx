import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import PDFTrainingPlan from '@/components/PDFTrainingPlan';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const stream = await renderToStream(
            <PDFTrainingPlan data={data.trainingPlan} />
        );

        const chunks: Buffer[] = [];
        for await (const chunk of stream) {
            chunks.push(Buffer.from(chunk));
        }
        
        const pdfBuffer = Buffer.concat(chunks);
        const uint8Array = new Uint8Array(pdfBuffer);

        return new Response(uint8Array, {
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