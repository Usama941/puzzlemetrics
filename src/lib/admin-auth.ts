import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// For server components / page protection
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/admin/login');
  }
  return session;
}

// For API routes — accepts optional request, returns NextResponse if unauthorized
export async function requireAdminApiAccess(
  _request?: NextRequest
): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function getSession() {
  return getServerSession(authOptions);
}