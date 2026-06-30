import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Anonymous booking-time reference photo upload. The client calls
// `upload(file.name, file, { handleUploadUrl: '/api/book/upload-ref' })`
// from VirtualEditingSection; this route mints the short-lived token.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => ({
        // image/* for editing references; application/pdf for strata plans.
        allowedContentTypes: ['image/jpeg', 'image/png', 'image/heic', 'image/webp', 'application/pdf'],
        addRandomSuffix: true,
        maximumSizeInBytes: 20 * 1024 * 1024, // 20MB
        tokenPayload: JSON.stringify({ scope: 'booking-ref', pathname }),
      }),
      onUploadCompleted: async () => {
        // No-op: booking payload carries the returned URL; no DB row pre-booking.
      },
    });
    return NextResponse.json(json);
  } catch (err) {
    console.error('[book/upload-ref] upload failed', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'upload failed' },
      { status: 400 },
    );
  }
}
