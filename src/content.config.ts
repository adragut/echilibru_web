import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ── TypeScript Interfaces ──────────────────────────────────────────────────────
// These mirror the Zod schemas and provide IDE autocomplete / type safety
// in components. Zod already infers types, but these explicit interfaces
// make the data model self-documenting and enable autocomplete on nested
// objects.

export interface SEOData {
  title: string;
  description: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface NavigationData {
  logo: string;
  links: NavLink[];
  cta: string;
}

export interface HeroData {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageAlt: string;
}

export interface Value {
  title: string;
  description: string;
  icon: 'users' | 'sun' | 'heart';
}

export interface PhilosophieData {
  sectionTitle: string;
  description: string;
  values: Value[];
}

export interface ServiceCard {
  title: string;
  description: string;
  imageAlt: string;
}

export interface ServiciiData {
  sectionTitle: string;
  description: string;
  cards: ServiceCard[];
}

export interface TeamMember {
  name: string;
  role: string;
  specialTrait: string;
  description: string;
  imageAlt: string;
}

export interface EchipaData {
  sectionTitle: string;
  description: string;
  members: TeamMember[];
}

export interface ContactFormData {
  nameLabel: string;
  emailLabel: string;
  serviceLabel: string;
  messageLabel: string;
  submit: string;
  serviceOptions: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: 'facebook' | 'instagram';
}

export interface ContactInfo {
  title: string;
  address: { label: string; lines: string[] };
  phone: { label: string; value: string };
  email: { label: string; value: string };
}

export interface ContactData {
  sectionTitle: string;
  description: string;
  form: ContactFormData;
  socialMedia: { title: string; links: SocialLink[] };
  info: ContactInfo;
  mapUrl: string;
}

export interface FooterData {
  logo: string;
  tagline: string;
  links: NavLink[];
  copyright: string;
  tagline2: string;
}

export interface AboutData {
  sectionTitle: string;
  description: string;
  imageAlt: string;
  passionTitle: string;
  passionText1: string;
  passionText2: string;
  badges: string[];
}

export interface AssetsData {
  hero: string;
  heroSecondary: string;
  about: string;
  logo: string;
  serviceDezvoltare: string;
  serviceHipoterapie: string;
  serviceTeambuilding: string;
  teamAnabelle: string;
  teamPony: string;
  teamAris: string;
  teamCappuchino: string;
  teamCioco: string;
  teamArgo: string;
  teamYuki: string;
  teamScoty: string;
  teamRia: string;
  teamOnyx: string;
}

// ── Schemas ────────────────────────────────────────────────────────────────────

const seo = defineCollection({
  loader: glob({ pattern: 'seo/seo.json', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const navigation = defineCollection({
  loader: glob({ pattern: 'navigation/navigation.json', base: './src/content' }),
  schema: z.object({
    logo: z.string(),
    links: z.array(z.object({
      href: z.string(),
      label: z.string(),
    })),
    cta: z.string(),
  }),
});

const hero = defineCollection({
  loader: glob({ pattern: 'hero/hero.json', base: './src/content' }),
  schema: z.object({
    headline: z.string(),
    subheadline: z.string(),
    ctaPrimary: z.string(),
    ctaSecondary: z.string(),
    imageAlt: z.string(),
  }),
});

const philosophie = defineCollection({
  loader: glob({ pattern: 'philosophie/philosophie.json', base: './src/content' }),
  schema: z.object({
    sectionTitle: z.string(),
    description: z.string(),
    values: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.enum(['users', 'sun', 'heart']),
    })),
  }),
});

const servicii = defineCollection({
  loader: glob({ pattern: 'servicii/servicii.json', base: './src/content' }),
  schema: z.object({
    sectionTitle: z.string(),
    description: z.string(),
    cards: z.array(z.object({
      title: z.string(),
      description: z.string(),
      imageAlt: z.string(),
    })),
  }),
});

const echipa = defineCollection({
  loader: glob({ pattern: 'echipa/echipa.json', base: './src/content' }),
  schema: z.object({
    sectionTitle: z.string(),
    description: z.string(),
    members: z.array(z.object({
      name: z.string(),
      role: z.string(),
      specialTrait: z.string(),
      description: z.string(),
      imageAlt: z.string(),
    })),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: 'contact/contact.json', base: './src/content' }),
  schema: z.object({
    sectionTitle: z.string(),
    description: z.string(),
    form: z.object({
      nameLabel: z.string(),
      emailLabel: z.string(),
      serviceLabel: z.string(),
      messageLabel: z.string(),
      submit: z.string(),
      serviceOptions: z.array(z.string()),
    }),
    socialMedia: z.object({
      title: z.string(),
      links: z.array(z.object({
        platform: z.string(),
        url: z.string().url(),
        icon: z.enum(['facebook', 'instagram']),
      })),
    }),
    info: z.object({
      title: z.string(),
      address: z.object({
        label: z.string(),
        lines: z.array(z.string()),
      }),
      phone: z.object({
        label: z.string(),
        value: z.string(),
      }),
      email: z.object({
        label: z.string(),
        value: z.string().email(),
      }),
    }),
    mapUrl: z.string().url(),
  }),
});

const footer = defineCollection({
  loader: glob({ pattern: 'footer/footer.json', base: './src/content' }),
  schema: z.object({
    logo: z.string(),
    tagline: z.string(),
    links: z.array(z.object({
      href: z.string(),
      label: z.string(),
    })),
    copyright: z.string(),
    tagline2: z.string(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: 'about/about.json', base: './src/content' }),
  schema: z.object({
    sectionTitle: z.string(),
    description: z.string(),
    imageAlt: z.string(),
    passionTitle: z.string(),
    passionText1: z.string(),
    passionText2: z.string(),
    badges: z.array(z.string()),
  }),
});

const assets = defineCollection({
  loader: glob({ pattern: 'assets/assets.json', base: './src/content' }),
  schema: z.object({
    hero: z.string(),
    heroSecondary: z.string(),
    about: z.string(),
    logo: z.string(),
    serviceDezvoltare: z.string(),
    serviceHipoterapie: z.string(),
    serviceTeambuilding: z.string(),
    teamAnabelle: z.string(),
    teamPony: z.string(),
    teamAris: z.string(),
    teamCappuchino: z.string(),
    teamCioco: z.string(),
    teamArgo: z.string(),
    teamYuki: z.string(),
    teamScoty: z.string(),
    teamRia: z.string(),
    teamOnyx: z.string(),
  }),
});

export const collections = {
  seo,
  navigation,
  hero,
  philosophie,
  servicii,
  echipa,
  contact,
  footer,
  about,
  assets,
};