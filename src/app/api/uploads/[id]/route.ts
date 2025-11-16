import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { deleteUpload } from '@/lib/services/uploadService';
import { withErrorHandling } from '@/lib/errors/errorHandler';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandling(async () => {
    const user = await getAuthUser();
    const { id } = await params;
    await deleteUpload(id, user.id);
    return NextResponse.json({ success: true }, { status: 200 });
  })(request);
}

