export type ContactEntry = {
    label: string;
    telHref: string;
    waHref: string;
    display: string;
};

export const CONTACTS: { GHANA: ContactEntry; US: ContactEntry } = {
    GHANA: {
        label: 'Ghana Office',
        telHref: 'tel:+233558056649',
        waHref: 'https://wa.me/233558056649',
        display: '(+233) 55 805 6649'
    },
    US: {
        label: 'US Office',
        telHref: 'tel:+19047673657',
        waHref: 'https://wa.me/19047673657',
        display: '(+1) 904 767 3657'
    }
};

export default CONTACTS;
