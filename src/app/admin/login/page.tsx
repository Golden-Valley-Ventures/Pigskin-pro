'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

export default function LoginPage() {
  const params = useSearchParams();
  const errorParam = params.get('error');
  const next = params.get('next') ?? '/admin';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg(null);

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo, shouldCreateUser: false },
    });

    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
    } else {
      setStatus('sent');
    }
  }

  return (
    <main className="login-shell">
      <div className="login-card">
        <p className="eyebrow">Pigskin.pro</p>
        <h1>Admin sign-in</h1>
        <p className="muted">
          We&rsquo;ll email you a one-time link. Only allowlisted accounts can
          access the editor.
        </p>

        {errorParam === 'not_authorized' && (
          <div className="banner banner--error">
            That account isn&rsquo;t on the admin allowlist.
          </div>
        )}

        {status === 'sent' ? (
          <div className="banner banner--ok">
            Check <strong>{email}</strong> for your sign-in link.
          </div>
        ) : (
          <form onSubmit={sendMagicLink} className="form">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@pigskin.pro"
              disabled={status === 'sending'}
            />
            <button type="submit" disabled={status === 'sending' || !email}>
              {status === 'sending' ? 'Sending…' : 'Send magic link'}
            </button>
            {errorMsg && <p className="error-text">{errorMsg}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
