# Lurvenea

A fast, SEO-first recipe site built with Astro + Tailwind. Recipe pages are
Pinterest destinations designed to drive email signups and Amazon purchases.
Every recipe is a single Markdown/MDX file — adding a new one is "copy a
file, fill in front-matter, deploy."

## Quick start

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static site to ./dist
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  config/site.ts          site name, Amazon link, analytics IDs, email form
  content.config.ts        recipe front-matter schema (validated with Zod)
  content/recipes/*.mdx    one file = one recipe page
  components/              AmazonButton, EmailOptIn, RecipeSchema (JSON-LD), etc.
  layouts/BaseLayout.astro shared shell: SEO tags, analytics, header/footer
  pages/
    index.astro             home page (latest recipes grid)
    recipes/[slug].astro    recipe page template (reads content collection)
    shop.astro               product grid, empty until you add products
    about.astro, privacy.astro
public/
  robots.txt
```

`sitemap.xml` is generated automatically at build time by `@astrojs/sitemap`
— no manual maintenance needed.

## Adding a new recipe

1. Copy `src/content/recipes/healthy-chocolate-chip-cookies.mdx` to a new
   file, e.g. `src/content/recipes/lemon-bars.mdx`.
2. Add a hero image. Put it next to the recipe (or in
   `src/content/recipes/images/`) and point `heroImage` at it with a
   relative path, e.g. `"./images/lemon-bars.jpg"`. Astro will optimize and
   resize it automatically.
3. Fill in the front-matter fields:

   | Field | Notes |
   |---|---|
   | `title`, `slug` | `slug` controls the URL: `/recipes/<slug>` |
   | `targetKeyword` | the SEO keyword you're targeting (for your own reference) |
   | `metaDescription` | keep under 160 characters |
   | `heroImage`, `heroImageAlt` | local image path + alt text |
   | `videoEmbedUrl` | optional — embeddable video URL |
   | `intro` | one or two sentence hook shown under the title |
   | `ingredients`, `steps` | arrays of strings |
   | `whyItWorks`, `substitutions`, `tips` | optional arrays of strings |
   | `nutrition` | optional object (`calories`, `protein`, `fat`, `carbs`, `fiber`, `sugar`) |
   | `amazonCta` | Amazon button text — the link itself is site-wide (see below) |
   | `datePublished`, `category`, `prepTime`, `cookTime`, `servings` | |

4. Write the long-form story/intro content as the body of the MDX file
   (below the `---` front-matter). This is what search engines and readers
   see as the main article copy, above the printable recipe card.
5. `npm run dev` to preview, then deploy.

The page automatically gets: responsive images, JSON-LD `Recipe` schema
(for Pinterest Rich Pins + Google rich results), Open Graph/Twitter tags, a
"Jump to Recipe" + Print button, related-recipes strip, the Amazon CTA, and
the email opt-in block.

## Setting your Amazon link

Open `src/config/site.ts` and set `AMAZON_URL` once:

```ts
export const AMAZON_URL =
  'https://www.amazon.com/dp/YOUR_ASIN?tag=your-real-tag-20';
```

Every recipe's `AmazonButton` links to this exact URL as-is — it's a
single site-wide value, not built per recipe. If you're using an Amazon
Attribution link (from Amazon's Attribution dashboard), paste the full
click-through URL here unchanged; it already includes its own tracking
params. Each recipe only customizes the button's visible text via the
`amazonCta` front-matter field.

## Embedding your email form (Kit / beehiiv / MailerLite)

Open `src/config/site.ts` and set `EMAIL.formAction` to your form's POST
action URL:

```ts
export const EMAIL = {
  formAction: 'https://app.kit.com/forms/1234567/subscriptions',
  emailFieldName: 'email_address', // Kit uses 'email_address'
  leadMagnetNote: 'Free printable recipe cards, delivered straight to your inbox.',
};
```

- **Kit (ConvertKit)**: form action looks like
  `https://app.kit.com/forms/<id>/subscriptions`, field name `email_address`.
- **beehiiv**: use your publication's embed form action URL, field name `email`.
- **MailerLite**: use the form action URL from your embedded form's HTML,
  field name `fields[email]` or `email` depending on the form type.

Until `formAction` is set, `EmailOptIn` shows a placeholder message instead
of a broken form, so nothing looks broken in the meantime.

## Adding a Gumroad / Lemon Squeezy product to `/shop`

Open `src/pages/shop.astro` and add an entry to the `products` array:

```ts
const products = [
  {
    title: 'The Weeknight Baking Guide',
    description: '20 tested recipes for busy weeknights.',
    price: '$9',
    image: '/images/shop/weeknight-baking-guide.jpg',
    url: 'https://yourname.gumroad.com/l/weeknight-baking', // or Lemon Squeezy checkout link
  },
];
```

Each product renders through the reusable `ProductCard` component.

## Analytics

Open `src/config/site.ts` and set one of:

```ts
export const ANALYTICS = {
  plausibleDomain: 'lurvenea.com', // Plausible
  ga4MeasurementId: '',            // or GA4, e.g. 'G-XXXXXXXXXX'
};
```

Leave both empty to disable analytics entirely.

## Deploying to Netlify

This repo is set up to deploy on Netlify via `netlify.toml` (build command
`npm run build`, publish directory `dist`, Node 22). The GitHub repo is
connected in the Netlify dashboard, and every push to `main` auto-deploys.

Live URL: **https://lurvenea.netlify.app**

If you later attach a custom domain in Netlify, update it in all three
places below, then commit and push — Netlify will redeploy automatically:

- `site` in `astro.config.mjs` (used to generate the sitemap and
  canonical/OG URLs)
- `SITE.url` in `src/config/site.ts` (must match the line above)
- the `Sitemap:` line in `public/robots.txt`

Also replace the placeholder SVG hero image on the sample recipe, and
`public/images/og-default.svg`, with real photos before launch.
