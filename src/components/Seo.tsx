import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../config/site';

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
};

const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const Seo: React.FC<SeoProps> = ({ title, description, image, path }) => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.title;
    const pageDescription = description || SITE_CONFIG.description;
    const pageImage = image
      ? `${SITE_CONFIG.url}${image}`
      : `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`;
    const pageUrl = `${SITE_CONFIG.url}${path || location.pathname}`;

    document.title = pageTitle;

    upsertMeta('name', 'description', pageDescription);

    // Open Graph
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_CONFIG.name);
    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', pageDescription);
    upsertMeta('property', 'og:url', pageUrl);
    upsertMeta('property', 'og:image', pageImage);
    upsertMeta('property', 'og:image:width', String(SITE_CONFIG.ogImageWidth));
    upsertMeta('property', 'og:image:height', String(SITE_CONFIG.ogImageHeight));
    upsertMeta('property', 'og:image:alt', SITE_CONFIG.name);

    // Twitter / X
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', pageDescription);
    upsertMeta('name', 'twitter:image', pageImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);
  }, [title, description, image, path, location.pathname]);

  return null;
};

export default Seo;
