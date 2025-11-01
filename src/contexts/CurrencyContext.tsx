import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Currency types and interfaces
export type CurrencyCode = 'USD' | 'GHS' | 'GBP' | 'EUR';

export interface CurrencyRates extends Record<CurrencyCode, number> {}

// Extended interface for price conversion
export interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  rates: CurrencyRates;
  isLoading: boolean;
  error: string | null;
  // Exposed methods for currency operations
  convertPrice: (amountUSD: number, target?: CurrencyCode) => number;
  formatPrice: (amountUSD: number, target?: CurrencyCode) => string;
}

const DEFAULT_RATES: CurrencyRates = {
	USD: 1,
	GHS: 0,
	GBP: 0,
	EUR: 0
};

const FALLBACK_RATES: CurrencyRates = {
	USD: 1,
	GHS: 0,
	GBP: 0,
	EUR: 0
};

const CURRENCY_METADATA: Record<CurrencyCode, { locale: string }> = {
	USD: { locale: 'en-US' },
	GHS: { locale: 'en-GH' },
	GBP: { locale: 'en-GB' },
	EUR: { locale: 'de-DE' }
};

const CURRENCY_API_URL = 'https://open.er-api.com/v6/latest/USD';
const SUPPORTED_CODES: CurrencyCode[] = ['USD', 'GHS', 'GBP', 'EUR'];

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

interface ProviderProps {
	children: React.ReactNode;
}

export const CurrencyProvider = ({ children }: ProviderProps) => {
	const [currency, setCurrency] = useState<CurrencyCode>('USD');
	const [rates, setRates] = useState<CurrencyRates>(DEFAULT_RATES);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Retrieve rates once and keep them cached for all consumers.
	useEffect(() => {
		let isMounted = true;

		const fetchRates = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(CURRENCY_API_URL);

				if (!response.ok) {
					throw new Error('Failed to load exchange rates.');
				}

				const data: { result?: string; rates?: Partial<CurrencyRates> } = await response.json();

				if (data.result !== 'success' || !data.rates) {
					throw new Error('Exchange rate data unavailable.');
				}

				if (isMounted) {
					setRates(prev => {
						const next: CurrencyRates = { ...FALLBACK_RATES };
						SUPPORTED_CODES.forEach(code => {
							if (code === 'USD') {
								next[code] = 1;
								return;
							}
							const fetchedRate = data.rates?.[code];
							next[code] = typeof fetchedRate === 'number' && !Number.isNaN(fetchedRate)
								? fetchedRate
								: prev[code] ?? FALLBACK_RATES[code];
						});
						return next;
					});
				}
			} catch (err) {
				console.error('CurrencyProvider: Unable to fetch rates', err);
				if (isMounted) {
					setError('Unable to fetch latest exchange rates. Showing USD values.');
					setRates({ ...FALLBACK_RATES });
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchRates();

		return () => {
			isMounted = false;
		};
	}, []);

	const value = useMemo<CurrencyContextValue>(() => {
		// Convert USD amount to target currency with fallback
		const convertPrice = (amountUSD: number, target: CurrencyCode = currency) => {
			const rate = rates[target];
			if (!rate) {
				console.warn(`Exchange rate for ${target} unavailable, using 1:1 conversion`);
				return amountUSD;
			}
			return amountUSD * rate;
		};

		// Format price with proper currency symbol and locale
		const formatPrice = (amountUSD: number, target: CurrencyCode = currency) => {
			const converted = convertPrice(amountUSD, target);
			const formatter = new Intl.NumberFormat(CURRENCY_METADATA[target].locale, {
				style: 'currency',
				currency: target
			});
			return formatter.format(converted);
		};

		return {
			currency,
			setCurrency,
			rates,
			isLoading,
			error,
			convertPrice,
			formatPrice
		};
	}, [currency, rates, isLoading, error]);

	return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => {
	const context = useContext(CurrencyContext);
	if (!context) {
		throw new Error('useCurrency must be used within a CurrencyProvider.');
	}
	return context;
};

export default CurrencyContext;
