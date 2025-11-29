import React, { useEffect } from 'react';

type SeoProps = {
    title?: string;
    description?: string;
    image?: string;
}

const upsertMeta = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

const upsertPropertyMeta = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

const Seo: React.FC<SeoProps> = ({ title, description, image }) => {
    useEffect(() => {
        if (title) document.title = `${title} | Brytwin Homes`;
        if (description) upsertMeta('description', description);
        if (title) upsertPropertyMeta('og:title', title);
        if (description) upsertPropertyMeta('og:description', description);
        if (image) upsertPropertyMeta('og:image', image);
        upsertPropertyMeta('og:type', 'website');
        upsertMeta('twitter:card', 'summary_large_image');
    }, [title, description, image]);

    return null;
}

export default Seo;
