import type { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';
import { Wordmark } from '../../components/Wordmark';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Won Vision client portal.',
  robots: { index: false, follow: false },
};

// Won Vision brand system — pure B/W, sharp edges, Sora type.
// `appearance` keeps Clerk's chrome inside the Won Vision look.
const wonVisionAppearance = {
  variables: {
    colorPrimary: '#000000',
    colorText: '#000000',
    colorTextSecondary: '#404040',
    colorBackground: '#FFFFFF',
    colorInputBackground: '#FFFFFF',
    colorInputText: '#000000',
    colorDanger: '#000000',
    colorSuccess: '#000000',
    borderRadius: '0',
    fontFamily: 'var(--font-sora), system-ui, sans-serif',
    fontSize: '14px',
  },
  elements: {
    rootBox: { width: '100%', maxWidth: 440, margin: '0 auto' },
    card: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #E5E5E5',
      borderRadius: 0,
      boxShadow: 'none',
      padding: '40px 36px',
      width: '100%',
      boxSizing: 'border-box',
      margin: 0,
    },
    headerTitle: {
      fontFamily: 'var(--font-sora), system-ui, sans-serif',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      fontSize: '22px',
      color: '#000',
    },
    headerSubtitle: {
      color: '#737373',
      fontSize: '13px',
    },
    socialButtonsBlockButton: {
      border: '1px solid #000',
      borderRadius: 0,
      backgroundColor: '#FFFFFF',
      color: '#000',
      '&:hover': { backgroundColor: '#000', color: '#FFF' },
    },
    socialButtonsBlockButtonText: { fontWeight: 500 },
    dividerLine: { backgroundColor: '#E5E5E5' },
    dividerText: {
      color: '#737373',
      fontSize: '11px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase' as const,
    },
    formFieldLabel: {
      fontSize: '11px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase' as const,
      fontWeight: 500,
      color: '#000',
    },
    formFieldInput: {
      border: '1px solid #000',
      borderRadius: 0,
      backgroundColor: '#FFFFFF',
      color: '#000',
      '&:focus': { borderWidth: '2px', borderColor: '#000', boxShadow: 'none' },
    },
    formButtonPrimary: {
      backgroundColor: '#000',
      color: '#FFF',
      borderRadius: 0,
      border: '1px solid #000',
      textTransform: 'none' as const,
      fontWeight: 500,
      letterSpacing: 0,
      '&:hover': { backgroundColor: '#FFF', color: '#000' },
    },
    footerActionLink: {
      color: '#000',
      textDecoration: 'underline',
      '&:hover': { color: '#404040' },
    },
    identityPreviewEditButton: { color: '#000' },
    formResendCodeLink: { color: '#000' },
  },
};

export default function SignInPage() {
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
        }}
      >
        <a href="/" aria-label="Won Vision — home" style={{ color: '#000' }}>
          <Wordmark />
        </a>
        <a
          href="/"
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#000',
            textDecoration: 'none',
          }}
        >
          ← Back
        </a>
      </header>

      <section
        style={{
          flex: 1,
          display: 'grid',
          placeItems: 'center',
          padding: '48px 24px 80px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 440,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
              fontSize: 32,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#000',
              margin: '0 0 28px',
            }}
          >
            Sign in.
          </h1>

          <SignIn
            appearance={wonVisionAppearance}
            signUpUrl="/sign-in"
            fallbackRedirectUrl="/portal"
          />

          <p
            style={{
              marginTop: 24,
              fontSize: 12,
              color: '#737373',
              lineHeight: 1.6,
            }}
          >
            Access is by invitation only. If you need a portal account, contact
            your photographer or email{' '}
            <a
              href="mailto:admin@wonvision.com.au"
              style={{ color: '#000', textDecoration: 'underline' }}
            >
              admin@wonvision.com.au
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
