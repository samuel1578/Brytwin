import { useEffect, useMemo, useState } from 'react';

type CurrencyCode = 'USD' | 'GHS' | 'GBP' | 'EUR';

interface CurrencyConverterProps {
	amountUSD: number;
	className?: string;
	label?: string;
	onCurrencyChange?: (currency: CurrencyCode) => void;
}

const SUPPORTED_CURRENCIES: Record<CurrencyCode, { label: string; symbol: string; locale: string }> = {
	USD: { label: 'US Dollar', symbol: '$', locale: 'en-US' },
	GHS: { label: 'Ghana Cedi', symbol: '₵', locale: 'en-GH' },
	GBP: { label: 'British Pound', symbol: '£', locale: 'en-GB' },
	EUR: { label: 'Euro', symbol: '€', locale: 'de-DE' }
};

type RatesState = Record<CurrencyCode, number>;

const initialRates: RatesState = {
	USD: 1,
	GHS: 0,
	GBP: 0,
	EUR: 0
};

const FALLBACK_RATES: RatesState = {
	USD: 1,
	GHS: 0,
	GBP: 0,
	EUR: 0
};

const CURRENCY_API_URL = 'https://open.er-api.com/v6/latest/USD';
const SUPPORTED_CODES: CurrencyCode[] = ['USD', 'GHS', 'GBP', 'EUR'];

const CurrencyConverter = ({
	amountUSD,
	className,
	label = 'Price',
	onCurrencyChange
}: CurrencyConverterProps) => {
	const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
	const [rates, setRates] = useState<RatesState>(initialRates);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch latest rates a single time and cache them for instant conversions.
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

				const data: { result?: string; rates?: Partial<RatesState> } = await response.json();

				if (data.result !== 'success' || !data.rates) {
					throw new Error('Exchange rate data is unavailable.');
				}

				if (isMounted) {
					setRates(prev => {
						const next: RatesState = { ...FALLBACK_RATES };
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
					setError(null);
				}
			} catch (err) {
				console.error('CurrencyConverter: Unable to fetch rates', err);
				if (isMounted) {
					setError('Unable to fetch latest exchange rates. Prices shown in USD.');
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

	const formattedAmount = useMemo(() => {
		const rate = rates[selectedCurrency] || 0;
		if (!rate) {
			return `${SUPPORTED_CURRENCIES[selectedCurrency].symbol}${amountUSD.toFixed(2)}`;
		}

		const convertedAmount = amountUSD * rate;
		const { locale } = SUPPORTED_CURRENCIES[selectedCurrency];

		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: selectedCurrency
		}).format(convertedAmount);
	}, [amountUSD, rates, selectedCurrency]);

	const handleCurrencyChange = (currency: CurrencyCode) => {
		setSelectedCurrency(currency);
		onCurrencyChange?.(currency);
	};

	return (
		<div className={`flex flex-col gap-2 ${className ?? ''}`}>
			<div className="flex items-center justify-between gap-4">
				<p className="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
					{label}
				</p>
				<div className="relative">
					<select
						value={selectedCurrency}
						onChange={event => handleCurrencyChange(event.target.value as CurrencyCode)}
						disabled={isLoading}
						className="appearance-none rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition disabled:cursor-not-allowed disabled:opacity-60"
						aria-label="Select currency"
					>
						{Object.entries(SUPPORTED_CURRENCIES).map(([code, metadata]) => (
							<option key={code} value={code}>
								{metadata.symbol} {code} · {metadata.label}
							</option>
						))}
					</select>
					<span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 text-xs">
						▼
					</span>
				</div>
			</div>

			<div className="rounded-md bg-gray-100 dark:bg-gray-800 px-4 py-3">
				{isLoading ? (
					<p className="text-sm text-gray-500 dark:text-gray-400">Loading current rates…</p>
				) : (
					<p className="text-2xl font-semibold text-red-600 dark:text-red-400">{formattedAmount}</p>
				)}
				{error && (
					<p className="mt-1 text-xs text-amber-600 dark:text-amber-400">{error}</p>
				)}
			</div>
		</div>
	);
};

export { CurrencyConverter };
export default CurrencyConverter;
