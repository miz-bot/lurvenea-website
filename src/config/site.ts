// Central site configuration. Update these values for your brand/deployment.

export const SITE = {
  name: 'Lurvenea',
  tagline: 'Simple, reliable recipes that actually work',
  url: 'https://lurvenea.netlify.app', // must match `site` in astro.config.mjs
  description:
    'Lurvenea shares tested, easy-to-follow recipes with the exact tools and techniques that make them work every time.',
  defaultOgImage: '/images/og-default.svg',
  twitterHandle: '@lurvenea',
  locale: 'en_US',
};

// --- Amazon -------------------------------------------------------------
// A single Amazon Attribution click-through URL, used as-is by every
// recipe's AmazonButton. This is a full tagged link (not a base product
// URL) — do not append `?tag=` or otherwise modify it.
export const AMAZON_URL =
  'https://www.amazon.com/dp/B0GF88ZP6W?maas=maas_adg_5F65D34D830903BA8CDAFC0742BE4EE0_afap_abs&ref_=aa_maas&tag=maas';

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
