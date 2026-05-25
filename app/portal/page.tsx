import type { Metadata } from 'next';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@clerk/nextjs';
import { Wordmark } from '../components/Wordmark';

export const metadata: Metadata = {
  title: 'Client portal',
  description: 'Your Won Vision bookings and galleries.',
  robots: { index: false, follow: false },
};

export default async function PortalPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const user = await currentUser();
  const firstName =
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split('@')[0] ||
    'there';

  return (
    <main
      style={{
        background: '#FFFFFF',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          padding: '28px 32px',
          borderBottom: '1px solid #E5E5E5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <a href="/" aria-label="Won Vision — home" style={{ color: '#000' }}>
          <Wordmark />
        </a>
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          <a href="/" style={{ color: '#000', textDecoration: 'none' }}>
            Home
          </a>
          <SignOutButton redirectUrl="/">
            <button
              type="button"
              style={{
                background: '#FFFFFF',
                border: '1px solid #000',
                color: '#000',
                padding: '10px 16px',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: 0,
                fontFamily: 'inherit',
              }}
            >
              Sign out
            </button>
          </SignOutButton>
        </nav>
      </header>

      <section
        style={{
          flex: 1,
          padding: '64px 32px 120px',
          maxWidth: 1100,
          width: '100%',
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#737373',
            marginBottom: 12,
          }}
        >
          Client portal
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-sora), system-ui, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            color: '#000',
            margin: '0 0 16px',
          }}
        >
          Welcome, {firstName}.
        </h1>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: '#404040',
            maxWidth: 560,
            margin: '0 0 48px',
          }}
        >
          Your bookings will appear here.
        </p>

        <div
          style={{
            border: '1px solid #E5E5E5',
            padding: '40px 32px',
            background: '#FFFFFF',
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#737373',
              marginBottom: 12,
            }}
          >
            Bookings
          </p>
          <p style={{ fontSize: 14, color: '#404040', lineHeight: 1.6, margin: 0 }}>
            No bookings yet. Once we&apos;ve photographed a property for you,
            galleries and delivery files will appear in this space.
          </p>
        </div>
      </section>
    </main>
  );
}
