// Central site configuration. Update these values for your brand/deployment.

export const SITE = {
  name: 'Lurvenea',
  tagline: 'Simple, reliable recipes that actually work',
  url: 'https://www.lurvenea.com', // must match `site` in astro.config.mjs
  description:
    'Lurvenea shares tested, easy-to-follow recipes with the exact tools and techniques that make them work every time.',
  defaultOgImage: '/images/og-default.svg',
  twitterHandle: '@lurvenea',
  locale: 'en_US',
};

// --- Amazon Associates -------------------------------------------------
// Set your Associates tracking ID here once. Every recipe only needs to
// supply a plain product URL (amazonUrl) in its front-matter; the
// AmazonButton component appends this tag automatically.
export const AMAZON = {
  tag: 'lurvenea-20', // <-- replace with your real Amazon Associates tag
};

/** Appends the Amazon Associates tag to a product URL. */
export function buildAmazonAffiliateUrl(amazonUrl: string): string {
  try {
    const url = new URL(amazonUrl);
    url.searchParams.set('tag', AMAZON.tag);
    return url.toString();
  } catch {
    return amazonUrl;
  }
}

// --- Email opt-in --------------------------------------------------------
// Paste your form's action URL from Kit (ConvertKit), beehiiv, or
// MailerLite here. Leave formAction empty to show a placeholder instead
// of a live form. See README.md "Email opt-in" section for exact steps
// per provider.
export const EMAIL = {
  formAction: '', // e.g. 'https://app.kit.com/forms/1234567/subscriptions'
  emailFieldName: 'email_address', // Kit uses 'email_address'; beehiiv/MailerLite use 'email'
  leadMagnetNote: 'Free printable recipe cards, delivered straight to your inbox.',
};

// --- Analytics -------------------------------------------------------------
// Choose one provider and fill in its id/domain. Leave both empty to
// disable analytics entirely.
export const ANALYTICS = {
  plausibleDomain: '', // e.g. 'lurvenea.com'
  ga4MeasurementId: '', // e.g. 'G-XXXXXXXXXX'
};
