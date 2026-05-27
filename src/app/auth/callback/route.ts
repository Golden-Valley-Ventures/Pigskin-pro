import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase-server';

/**
 * Magic-link callback. Supabase redirects here with ?code=... which we
 * exchange for a session cookie, then forward to ?next= (or /admin).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/admin';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/admin/login?error=auth_callback_failed`,
  );
}
