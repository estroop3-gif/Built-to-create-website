import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { verifyToken } from '@/lib/linkToken';
import GearChecklistPdf from '@/components/GearChecklistPdf';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Verify the token from the original page request
    const referer = request.headers.get('referer');
    if (!referer) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const refererUrl = new URL(referer);
    const token = refererUrl.searchParams.get('t');
    
    if (!token) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const { valid, payload } = await verifyToken(token);
    if (!valid) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // Get selected items from query params
    const selectedParam = request.nextUrl.searchParams.get('selected');
    const selectedItems = selectedParam ? selectedParam.split(',').filter(Boolean) : [];
    
    // Extract user email from token payload (format: "lead:email@example.com" or "lead:id")
    let userEmail: string | undefined;
    if (payload) {
      const parts = payload.split(':');
      if (parts.length >= 2) {
        const identifier = parts[1];
        // Simple email detection - in production you might want to fetch from database
        if (identifier.includes('@')) {
          userEmail = identifier;
        }
      }
    }

    // Generate PDF
    const pdfComponent = GearChecklistPdf({
      selectedItems,
      userEmail
    });

    const stream = await renderToStream(pdfComponent);

    return new NextResponse(stream as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="filmmaker-gear-checklist${selectedItems.length > 0 ? '-personalized' : ''}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}