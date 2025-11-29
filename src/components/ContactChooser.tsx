import React from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    label?: string;
    telHref?: string;
    waHref?: string;
    onClose: () => void;
}

const ContactChooser: React.FC<Props> = ({ isOpen, label = '', telHref = '#', waHref = '#', onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4 py-6">
            <div className="relative z-10 max-w-sm w-full rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 rounded-full bg-gray-100 p-2 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{label}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{telHref.replace('tel:', '')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Choose a contact method:</p>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                    <a
                        href={telHref}
                        onClick={() => onClose()}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3 text-white font-semibold transition hover:bg-red-700"
                    >
                        <Phone className="w-4 h-4" /> Call
                    </a>
                    <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => onClose()}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-3 text-gray-700 font-semibold transition hover:border-emerald-500 hover:text-emerald-600 dark:border-gray-700 dark:text-gray-200"
                    >
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                </div>
                <div className="mt-4 text-center">
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactChooser;
