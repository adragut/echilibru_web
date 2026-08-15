/**
 * Decap CMS Preview Templates
 *
 * These templates render a live preview of each content collection
 * inside the CMS editor pane. They use React (bundled with Decap CMS)
 * so no additional build step is required.
 */

function createPreviewWrapper(title, children) {
  return CMS.React.createElement(
    'div',
    { style: { padding: '32px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, sans-serif' } },
    [
      CMS.React.createElement('h1', { key: 'title', style: { fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: '8px' } }, title),
      children,
    ]
  );
}

function renderText(content, style) {
  if (!content) return null;
  return CMS.React.createElement('p', { key: content.slice(0, 20), style: style || { marginBottom: '16px', lineHeight: '1.7' } }, content);
}

// Hero Section Preview
function HeroPreview({ entry }) {
  const data = entry.get('data');
  const headline = data.get('headline');
  const subheadline = data.get('subheadline');
  const ctaPrimary = data.get('ctaPrimary');
  const ctaSecondary = data.get('ctaSecondary');

  return createPreviewWrapper('Hero (previzionare)', [
    CMS.React.createElement('h2', { key: 'headline', style: { fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', marginBottom: '12px' } }, headline),
    CMS.React.createElement('p', { key: 'sub', style: { fontSize: '1.125rem', marginBottom: '20px', maxWidth: '600px' } }, subheadline),
    CMS.React.createElement('div', { key: 'ctas', style: { display: 'flex', gap: '12px' } }, [
      CMS.React.createElement('a', { key: 'primary', href: '#servicii', style: { background: '#14342B', color: 'white', padding: '12px 24px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' } }, ctaPrimary),
      CMS.React.createElement('a', { key: 'secondary', href: '#contact', style: { border: '2px solid #14342B', color: '#14342B', padding: '12px 24px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' } }, ctaSecondary),
    ]),
  ]);
}

// About Section Preview
function AboutPreview({ entry }) {
  const data = entry.get('data');
  return createPreviewWrapper('Despre (previzionare)', [
    CMS.React.createElement('h2', { key: 'title', style: { fontSize: '2rem', fontFamily: 'Playfair Display, serif', marginBottom: '12px' } }, data.get('sectionTitle')),
    renderText(data.get('description'), { maxWidth: '600px' }),
    CMS.React.createElement('h3', { key: 'passion', style: { fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', marginTop: '32px', marginBottom: '12px' } }, data.get('passionTitle')),
    renderText(data.get('passionText1')),
    renderText(data.get('passionText2')),
    CMS.React.createElement('div', { key: 'badges', style: { display: 'flex', gap: '8px', marginTop: '16px' } },
      data.get('badges') ? data.get('badges').map(function (badge, i) {
        return CMS.React.createElement('span', { key: i, style: { background: '#F0F7F5', border: '1px solid #D1E8E2', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' } }, badge);
      }) : null
    ),
  ]);
}

// Philosophy Section Preview
function PhilosophyPreview({ entry }) {
  const data = entry.get('data');
  const values = data.get('values') || [];
  return createPreviewWrapper('Filosofia Noastra (previzionare)', [
    CMS.React.createElement('h2', { key: 'title', style: { fontSize: '2rem', fontFamily: 'Playfair Display, serif', marginBottom: '12px' } }, data.get('sectionTitle')),
    renderText(data.get('description'), { maxWidth: '600px' }),
    CMS.React.createElement('div', { key: 'values', style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '32px' } },
      values.map(function (value, i) {
        return CMS.React.createElement('div', { key: i, style: { background: 'white', padding: '24px', borderRadius: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' } }, [
          CMS.React.createElement('h3', { key: 'vTitle', style: { fontSize: '1.125rem', fontFamily: 'Playfair Display, serif', marginBottom: '8px' } }, value.get('title')),
          renderText(value.get('description')),
        ]);
      })
    ),
  ]);
}

// Services Section Preview
function ServicesPreview({ entry }) {
  const data = entry.get('data');
  const cards = data.get('cards') || [];
  return createPreviewWrapper('Serviciile Noastre (previzionare)', [
    CMS.React.createElement('h2', { key: 'title', style: { fontSize: '2rem', fontFamily: 'Playfair Display, serif', marginBottom: '12px' } }, data.get('sectionTitle')),
    renderText(data.get('description'), { maxWidth: '600px' }),
    CMS.React.createElement('div', { key: 'cards', style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '32px' } },
      cards.map(function (card, i) {
        return CMS.React.createElement('div', { key: i, style: { background: '#FEFDF9', borderRadius: '1.5rem', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' } }, [
          CMS.React.createElement('h3', { key: 'cTitle', style: { fontSize: '1.25rem', fontFamily: 'Playfair Display, serif', marginBottom: '8px' } }, card.get('title')),
          renderText(card.get('description')),
        ]);
      })
    ),
  ]);
}

// Team Section Preview
function TeamPreview({ entry }) {
  const data = entry.get('data');
  const members = data.get('members') || [];
  return createPreviewWrapper('Echipa - Caii Nostri (previzionare)', [
    CMS.React.createElement('h2', { key: 'title', style: { fontSize: '2rem', fontFamily: 'Playfair Display, serif', marginBottom: '12px' } }, data.get('sectionTitle')),
    renderText(data.get('description'), { maxWidth: '600px' }),
    CMS.React.createElement('div', { key: 'members', style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '32px' } },
      members.map(function (member, i) {
        return CMS.React.createElement('div', { key: i, style: { background: 'white', borderRadius: '1.5rem', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' } }, [
          CMS.React.createElement('h3', { key: 'mName', style: { fontSize: '1.25rem', fontFamily: 'Playfair Display, serif', marginBottom: '4px' } }, member.get('name')),
          CMS.React.createElement('p', { key: 'mRole', style: { fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A88A73', marginBottom: '8px' } }, member.get('role')),
          CMS.React.createElement('p', { key: 'mTrait', style: { fontSize: '0.75rem', background: 'rgba(52, 20, 43, 0.05)', padding: '4px 10px', borderRadius: '9999px', display: 'inline-block', marginBottom: '8px' } }, member.get('specialTrait')),
          renderText(member.get('description')),
        ]);
      })
    ),
  ]);
}

// Contact Section Preview
function ContactPreview({ entry }) {
  const data = entry.get('data');
  const info = data.get('info') || {};
  return createPreviewWrapper('Contact (previzionare)', [
    CMS.React.createElement('h2', { key: 'title', style: { fontSize: '2rem', fontFamily: 'Playfair Display, serif', marginBottom: '12px' } }, data.get('sectionTitle')),
    renderText(data.get('description'), { maxWidth: '600px' }),
    CMS.React.createElement('p', { key: 'email', style: { marginTop: '24px' } },
      'Email: ' + (info.get('email') ? info.get('email').get('value') : '')
    ),
  ]);
}

// Footer Preview
function FooterPreview({ entry }) {
  const data = entry.get('data');
  return createPreviewWrapper('Footer (previzionare)', [
    CMS.React.createElement('p', { key: 'logo', style: { fontFamily: 'Playfair Display, serif', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '4px' } }, data.get('logo')),
    CMS.React.createElement('p', { key: 'tagline', style: { fontSize: '0.875rem', color: '#A88A73', marginBottom: '8px' } }, data.get('tagline')),
    CMS.React.createElement('p', { key: 'copyright', style: { fontSize: '0.75rem', color: '#555' } }, data.get('copyright')),
  ]);
}

// Assets Preview
function AssetsPreview({ entry }) {
  const data = entry.get('data');
  const imageFields = ['hero', 'heroSecondary', 'about', 'logo', 'serviceDezvoltare', 'serviceHipoterapie', 'serviceTeambuilding', 'teamAnabelle', 'teamPony', 'teamAris', 'teamCappuchino', 'teamCioco', 'teamArgo', 'teamYuki', 'teamScoty', 'teamRia', 'teamOnyx'];

  return createPreviewWrapper('Assets - Image Paths (previzionare)', [
    CMS.React.createElement('p', { key: 'hint', style: { fontSize: '0.875rem', color: '#666', marginBottom: '16px' } },
      'This collection manages image paths used across the site. Use the media library to upload/replace images.'
    ),
    CMS.React.createElement('div', { key: 'items', style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' } },
      imageFields.map(function (field) {
        const val = data.get(field);
        return CMS.React.createElement('div', { key: field, style: { padding: '8px', background: '#F8F5F2', borderRadius: '8px' } }, [
          CMS.React.createElement('span', { key: 'label', style: { fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#555' } }, field + ': '),
          CMS.React.createElement('span', { key: 'val', style: { fontSize: '0.75rem', color: '#333', marginLeft: '4px' } }, val || '(none)'),
        ]);
      })
    ),
  ]);
}

// Navigation Preview
function NavigationPreview({ entry }) {
  const data = entry.get('data');
  return createPreviewWrapper('Navigation (previzionare)', [
    CMS.React.createElement('p', { key: 'logo' }, 'Logo: ' + data.get('logo')),
    CMS.React.createElement('p', { key: 'cta' }, 'CTA: ' + data.get('cta')),
  ]);
}

// SEO Preview
function SEOPreview({ entry }) {
  const data = entry.get('data');
  return createPreviewWrapper('SEO (previzionare)', [
    CMS.React.createElement('p', { key: 'title' }, 'Title: ' + data.get('title')),
    CMS.React.createElement('p', { key: 'desc' }, 'Description: ' + data.get('description')),
  ]);
}

// Register all preview templates
window.registerPreviewTemplates = function () {
  window.CMS.registerPreviewTemplate('hero', HeroPreview);
  window.CMS.registerPreviewTemplate('about', AboutPreview);
  window.CMS.registerPreviewTemplate('philosophie', PhilosophyPreview);
  window.CMS.registerPreviewTemplate('servicii', ServicesPreview);
  window.CMS.registerPreviewTemplate('echipa', TeamPreview);
  window.CMS.registerPreviewTemplate('contact', ContactPreview);
  window.CMS.registerPreviewTemplate('footer', FooterPreview);
  window.CMS.registerPreviewTemplate('assets', AssetsPreview);
  window.CMS.registerPreviewTemplate('navigation', NavigationPreview);
  window.CMS.registerPreviewTemplate('seo', SEOPreview);
};