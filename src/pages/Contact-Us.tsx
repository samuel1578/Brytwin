import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Building2, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';
import Layout from '../components/Layout';
import mrBright from '../mr-bright.png';
import msWin from '../ms-win.jpeg';
import logo from '../logo.jpeg';

type ContactFormState = {
	fullName: string;
	email: string;
	phone: string;
	projectType: string;
	message: string;
};

const INITIAL_FORM_STATE: ContactFormState = {
	fullName: '',
	email: '',
	phone: '',
	projectType: 'consultation',
	message: ''
};

const projectOptions = [
	{ value: 'consultation', label: 'Book a consultation' },
	{ value: 'property', label: 'Property viewing' },
	{ value: 'construction', label: 'Construction project' },
	{ value: 'partnership', label: 'Partnership inquiry' },
	{ value: 'other', label: 'Other' }
];

const contactInfo = [
	{
		icon: <Phone className="h-5 w-5" />,
		label: 'Call us (Ghana)',
		value: '(+233) 55 805 6649',
		href: 'tel:+233558056649'
	},
	{
		icon: <Phone className="h-5 w-5" />,
		label: 'Call us (USA)',
		value: '(+1) 904-767-3657',
		href: 'tel:+19047673657'
	},
	{
		icon: <Mail className="h-5 w-5" />,
		label: 'Email',
		value: 'info@brytwinhomes.com',
		href: 'mailto:info@brytwinhomes.com'
	},
	{
		icon: <MapPin className="h-5 w-5" />,
		label: 'Address',
		value: 'Accra, Ghana'
	}
];

const ContactUs: React.FC = () => {
	const [formState, setFormState] = useState<ContactFormState>(INITIAL_FORM_STATE);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		setFormState(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isSubmitting) {
			return;
		}

		setIsSubmitting(true);
		setToast(null);

		try {
			const response = await fetch('https://formspree.io/f/mdkpeyvj', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					fullName: formState.fullName,
					email: formState.email,
					phone: formState.phone,
					projectType: formState.projectType,
					message: formState.message
				})
			});

			if (!response.ok) {
				throw new Error('Failed to submit form');
			}

			setToast({ message: "Thank you! We'll respond within one working day.", type: 'success' });
			setFormState(INITIAL_FORM_STATE);
		} catch (error) {
			setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (!toast) {
			return;
		}

		const timer = window.setTimeout(() => setToast(null), 4000);
		return () => window.clearTimeout(timer);
	}, [toast]);

	return (
		<Layout>
			{toast && (
				<div
					className={`fixed right-4 top-28 z-50 max-w-sm rounded-xl px-4 py-3 text-sm font-medium shadow-xl transition ${
						toast.type === 'success'
							? 'bg-emerald-600 text-white'
							: 'bg-red-600 text-white'
					}`}
					role="status"
					aria-live="polite"
				>
					{toast.message}
				</div>
			)}
			<section className="relative overflow-hidden bg-gray-900 pt-20 sm:pt-24 lg:pt-28 text-white">
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12)_0,_rgba(0,0,0,0.85)_55%)]" />
					<div className="absolute top-[20%] left-[10%] h-32 w-32 rounded-full bg-emerald-500/30 blur-3xl" />
					<div className="absolute bottom-[5%] right-[15%] h-40 w-40 rounded-full bg-red-500/30 blur-3xl" />
				</div>

				<div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-8 sm:gap-12 sm:px-6 sm:pb-24 sm:pt-12 lg:px-8">
					<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
						<div className="max-w-3xl space-y-5">
							<span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-200">
								<Send className="h-4 w-4" />
								Contact Brytwin Homes
							</span>
							<h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
								Let’s discuss your next property, construction, or investment opportunity.
							</h1>
							<p className="text-base text-gray-200 sm:text-lg">
								We combine local expertise with global partnerships to deliver projects that stand the test of time. Share your vision and our team will respond within one business day.
							</p>
						</div>

						<div className="flex shrink-0 flex-col gap-4">
							<div className="flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 text-left backdrop-blur sm:w-72 sm:flex-col sm:text-center">
								<img src={mrBright} alt="Mr Bright" className="h-16 w-16 rounded-full object-cover shadow-lg" />
								<div className="space-y-1 text-sm">
									<p className="font-semibold">Mr. Bright</p>
									<p className="text-gray-300">CEO & Founder</p>
									<a
										href="tel:+233558056649"
										className="text-emerald-200 underline decoration-emerald-400/60 decoration-2 underline-offset-2 hover:text-emerald-100"
									>
										(+233) 55 805 6649
									</a>
								</div>
							</div>
							<div className="flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 text-left backdrop-blur sm:w-72 sm:flex-col sm:text-center">
								<img src={msWin} alt="Dr Winifred" className="h-16 w-16 rounded-full object-cover shadow-lg" />
								<div className="space-y-1 text-sm">
									<p className="font-semibold">Dr. Winifred Danso Agyemang</p>
									<p className="text-gray-300">Co-Founder & COO</p>
									<a
										href="tel:+19047673657"
										className="text-red-200 underline decoration-red-300/70 decoration-2 underline-offset-2 hover:text-red-100"
									>
										(+1) 904-767-3657
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{contactInfo.map(info => (
							<a
								key={info.label}
								href={info.href}
								className="group flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/50 hover:bg-white/10"
							>
								<span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200">
									{info.icon}
								</span>
								<p className="text-sm text-gray-300">{info.label}</p>
								<p className="text-lg font-semibold text-white">{info.value}</p>
							</a>
						))}
					</div>
				</div>
			</section>

			<section className="bg-white py-16 dark:bg-gray-900">
				<div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-8">
					<div>
						<div className="mb-8 flex items-center gap-3">
							<span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300">
								<Building2 className="h-6 w-6" />
							</span>
							<div>
								<h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
									Send us a message
								</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Complete the form and our client success team will coordinate next steps.
								</p>
							</div>
						</div>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid gap-6 sm:grid-cols-2">
								<label className="flex flex-col gap-2">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Full name</span>
									<input
										name="fullName"
										type="text"
										required
										value={formState.fullName}
										onChange={handleChange}
										className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-red-400"
										placeholder="Enter your full name"
									/>
								</label>

								<label className="flex flex-col gap-2">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</span>
									<input
										name="email"
										type="email"
										required
										value={formState.email}
										onChange={handleChange}
										className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-red-400"
										placeholder="name@example.com"
									/>
								</label>

								<label className="flex flex-col gap-2">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</span>
									<input
										name="phone"
										type="tel"
										value={formState.phone}
										onChange={handleChange}
										className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-red-400"
										placeholder="Include country code e.g. +233"
									/>
								</label>

								<label className="flex flex-col gap-2">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Project type</span>
									<select
										name="projectType"
										value={formState.projectType}
										onChange={handleChange}
										className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-red-400"
									>
										{projectOptions.map(option => (
											<option value={option.value} key={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</label>
							</div>

							<label className="flex flex-col gap-2">
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Project details</span>
								<textarea
									name="message"
									rows={6}
									required
									value={formState.message}
									onChange={handleChange}
									className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-red-400"
									placeholder="Tell us about your project, budget, or timeline..."
								/>
							</label>

							<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<p className="text-xs text-gray-500 dark:text-gray-400">
									We respect your privacy. Your information will only be used for the purpose of responding to your inquiry.
								</p>
								<button
									type="submit"
									disabled={isSubmitting}
									className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
								>
									{isSubmitting ? 'Sending...' : 'Send message'}
								</button>
							</div>
						</form>
					</div>

					<aside className="space-y-8">
						<div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">Visit Us</h3>
							<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
								Schedule a private consultation at our Accra office or request a virtual meeting with the Brytwin executive team.
							</p>

							<div className="mt-6 space-y-5 text-sm text-gray-700 dark:text-gray-300">
								<div className="flex gap-3">
									<MapPin className="mt-1 h-5 w-5 text-red-500" />
									<div>
										<p className="font-semibold text-gray-900 dark:text-white">Accra Office</p>
										<p>Airport Residential Area</p>
										<p>Accra, Ghana</p>
									</div>
								</div>

								<div className="flex gap-3">
									<Clock className="mt-1 h-5 w-5 text-red-500" />
									<div>
										<p className="font-semibold text-gray-900 dark:text-white">Office Hours</p>
										<p>Monday – Friday: 8:00am – 6:00pm</p>
										<p>Saturday: 9:00am – 2:00pm</p>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
							<div className="flex items-center gap-3">
								<img src={logo} alt="Brytwin Homes" className="h-12 w-12 rounded-xl object-cover" />
								<div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white">Connect with Brytwin</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400">Follow our latest projects and insights.</p>
								</div>
							</div>

							<div className="mt-6 flex flex-wrap gap-3">
								<a
									href="https://www.linkedin.com"
									className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-400 hover:text-red-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-red-400 dark:hover:text-red-300"
								>
									<Linkedin className="h-4 w-4" />
									LinkedIn
								</a>
								<a
									href="https://www.facebook.com"
									className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-400 hover:text-red-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-red-400 dark:hover:text-red-300"
								>
									<Facebook className="h-4 w-4" />
									Facebook
								</a>
								<a
									href="https://www.instagram.com"
									className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-400 hover:text-red-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-red-400 dark:hover:text-red-300"
								>
									<Instagram className="h-4 w-4" />
									Instagram
								</a>
								<a
									href="https://www.twitter.com"
									className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-400 hover:text-red-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-red-400 dark:hover:text-red-300"
								>
									<Twitter className="h-4 w-4" />
									Twitter
								</a>
							</div>
						</div>
					</aside>
				</div>
			</section>

			<section className="bg-gray-50 py-16 dark:bg-gray-950">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					<div className="rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-emerald-500 p-[1px]">
						<div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-12 text-center dark:bg-gray-900">
							<h3 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
								Prefer a direct call?
							</h3>
							<p className="mt-3 text-base text-gray-600 dark:text-gray-300">
								Our senior advisors are ready to coordinate your site visits, negotiations, or investment briefs.
							</p>
							<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
								<a
									href="tel:+233558056649"
									className="w-full rounded-full bg-red-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-red-700 sm:w-auto"
								>
									Call Ghana Office
								</a>
								<a
									href="tel:+19047673657"
									className="w-full rounded-full border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-800 transition hover:border-red-500 hover:text-red-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-red-400 dark:hover:text-red-300 sm:w-auto"
								>
									Call US Office
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default ContactUs;
