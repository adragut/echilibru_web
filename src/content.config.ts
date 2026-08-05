import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
      icon: z.string(),
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
        icon: z.string(),
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