import React, { useEffect, useMemo, useState } from 'react';
import { Camera, MapPin, Sparkles, Phone, MessageCircle, X } from 'lucide-react';
import Layout from '../components/Layout';
import hero2 from '../hero2.jpg';
import estate from '../estate.jpg';
import construction from '../construction.jpg';
import investment from '../investment.jpg';
import community from '../community.jpg';
import delivery from '../delivery.jpg';
import goods from '../goods.jpg';
import handshake from '../handshake.jpg';

type GalleryItem = {
	id: string;
	title: string;
	category: string;
	description: string;
	location: string;
	image: string;
	span?: 'wide' | 'tall';
};

const GALLERY_ITEMS: GalleryItem[] = [
	{
		id: 'gal-exterior-01',
		title: 'Signature Facade',
		category: 'Exteriors',
		description: 'Clean geometric lines and natural textures deliver a timeless curb appeal.',
		location: 'Airport Residential, Accra',
		image: construction,
		span: 'wide'
	},
	{
		id: 'gal-interior-01',
		title: 'Sunlit Atrium',
		category: 'Interiors',
		description: 'Open concept living space layered with warm woods and bespoke lighting.',
		location: 'East Legon, Accra',
		image: hero2
	},
	{
		id: 'gal-community-01',
		title: 'Community Lifestyle',
		category: 'Community',
		description: 'Thoughtfully planned public spaces that encourage connection and wellness.',
		location: 'Tema Community 25',
		image: community
	},
	{
		id: 'gal-investment-01',
		title: 'Prime Investment Plot',
		category: 'Developments',
		description: 'Strategic mixed-use developments designed for long-term growth.',
		location: 'Cape Coast',
		image: investment
	},
	{
		id: 'gal-logistics-01',
		title: 'Integrated Logistics Hub',
		category: 'Infrastructure',
		description: 'Efficient distribution nodes supporting regional supply chains.',
		location: 'Tema Port Corridor',
		image: delivery,
		span: 'wide'
	},
	{
		id: 'gal-goods-01',
		title: 'Retail Experience Center',
		category: 'Commercial',
		description: 'Highly adaptable retail shell with premium finishing standards.',
		location: 'Achimota, Accra',
		image: goods
	},
	{
		id: 'gal-handshake-01',
		title: 'Global Partnerships',
		category: 'Corporate',
		description: 'Delivering cross-border projects through trusted international alliances.',
		location: 'London & Accra',
		image: handshake
	},
	{
		id: 'gal-estate-01',
		title: 'Master Planned Estate',
		category: 'Developments',
		description: 'Eco-conscious estates with integrated smart home readiness.',
		location: 'Aburi Hills',
		image: estate,
		span: 'wide'
	}
];

const HIGHLIGHT_METRICS = [
	{ value: '120+', label: 'Handed-over Residences' },
	{ value: '18', label: 'Active Construction Sites' },
	{ value: '15+', label: 'Years Crafting Spaces' }
];

const Gallery: React.FC = () => {
	const [activeCategory, setActiveCategory] = useState<string>('All');
	const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const categories = useMemo(
		() => ['All', ...Array.from(new Set(GALLERY_ITEMS.map(item => item.category)))],
		[]
	);

	const filteredItems = useMemo(
		() =>
			activeCategory === 'All'
				? GALLERY_ITEMS
				: GALLERY_ITEMS.filter(item => item.category === activeCategory),
		[activeCategory]
	);

	const consultants = [
		{
			name: 'Mr. Bright',
			title: 'CEO & Founder',
			phoneLabel: 'Call (+233) 55 805 6649',
			phoneHref: 'tel:+233558056649',
			whatsAppHref: 'https://wa.me/233558056649'
		},
		{
			name: 'Dr. Winifred Danso Agyemang',
			title: 'Co-Founder & COO',
			phoneLabel: 'Call (+1) 904-767-3657',
			phoneHref: 'tel:+19047673657',
			whatsAppHref: 'https://wa.me/19047673657'
		}
	];

	const openConsultationModal = () => setIsConsultationModalOpen(true);
	const closeConsultationModal = () => setIsConsultationModalOpen(false);

	return (
		<Layout>
			{isConsultationModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur-sm">
					<div className="absolute inset-0 z-0" onClick={closeConsultationModal} />
					<div className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl dark:bg-gray-900">
						<button
							type="button"
							onClick={closeConsultationModal}
							className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
							aria-label="Close consultation options"
						>
							<X className="h-4 w-4" />
						</button>
						<div className="text-center">
							<span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-600 dark:bg-red-900/30 dark:text-red-300">
								<Sparkles className="h-4 w-4" />
								Speak with a Consultant
							</span>
							<h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">Choose how you want to connect</h2>
							<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
								Reach out to our leadership directly for project consultations, investment guidance, or partnership discussions.
							</p>
						</div>
						<div className="mt-6 grid gap-4 sm:grid-cols-2">
							{consultants.map(consultant => (
								<div key={consultant.name} className="rounded-2xl border border-gray-200 p-5 text-left shadow-sm transition hover:border-red-400 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
									<p className="text-lg font-semibold text-gray-900 dark:text-white">{consultant.name}</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">{consultant.title}</p>
									<div className="mt-4 space-y-2 text-sm font-medium">
										<a
											className="flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
											href={consultant.phoneHref}
											onClick={closeConsultationModal}
										>
											<Phone className="h-4 w-4" />
											{consultant.phoneLabel}
										</a>
										<a
											className="flex items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-gray-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-gray-600 dark:text-gray-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
											href={consultant.whatsAppHref}
											target="_blank"
											rel="noreferrer"
											onClick={closeConsultationModal}
										>
											<MessageCircle className="h-4 w-4" />
											Chat on WhatsApp
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
			<section className="relative overflow-hidden bg-gray-900 text-white">
				<div className="absolute inset-0">
					<img
						src={hero2}
						alt="Brytwin showcase residence"
						className="h-full w-full object-cover opacity-60"
					/>
					<div className="absolute inset-0 bg-gray-900/70" />
				</div>

				<div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 py-32 sm:px-6 lg:px-8">
					<span className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-200">
						<Sparkles className="h-4 w-4" />
						Portfolio Gallery
					</span>
					<div className="max-w-3xl">
						<h1 className="animate-slide-up text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
							Spaces Curated for Modern Living and Investment Confidence
						</h1>
						<p className="animate-slide-up text-base text-gray-200 sm:text-lg" style={{ animationDelay: '0.15s' }}>
							Explore a curated selection of Brytwin Homes projects spanning luxury residences, commercial hubs, and signature community developments across Ghana and beyond.
						</p>
					</div>

					<div className="grid gap-6 sm:grid-cols-3">
						{HIGHLIGHT_METRICS.map(metric => (
							<div
								key={metric.label}
								className="animate-fade-in-up rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur"
							>
								<p className="text-3xl font-bold text-white sm:text-4xl">{metric.value}</p>
								<p className="mt-2 text-sm font-medium text-gray-200">{metric.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="gallery" className="bg-white py-16 dark:bg-gray-900 sm:py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
						<div className="max-w-2xl">
							<h2 className="animate-fade-in-up text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
								Curated Highlights
							</h2>
							<p className="mt-3 text-base text-gray-600 dark:text-gray-300">
								Filter projects by focus area to see how Brytwin Homes brings premium craftsmanship, sustainability, and operational efficiency together for every brief.
							</p>
						</div>
						<div className="flex flex-wrap gap-3">
							{categories.map(category => {
								const isActive = activeCategory === category;
								return (
									<button
										key={category}
										type="button"
										onClick={() => setActiveCategory(category)}
										className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
											isActive
												? 'border-red-600 bg-red-600 text-white shadow-lg'
												: 'border-gray-200 text-gray-700 hover:border-red-500 hover:text-red-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-red-400 dark:hover:text-red-300'
										}`}
									>
										{category}
									</button>
								);
							})}
						</div>
					</header>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredItems.map((item, index) => {
							const spanClass = item.span === 'wide' ? 'md:col-span-2' : '';

							return (
								<article
									key={item.id}
									className={`group relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-800 ${spanClass}`}
									style={{ animationDelay: `${index * 0.08}s` }}
								>
									<div className="relative h-80 w-full overflow-hidden">
										<img
											src={item.image}
											alt={item.title}
											className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition group-hover:opacity-90" />
										<div className="absolute inset-x-0 bottom-0 p-6 text-white">
											<div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
												<Camera className="h-4 w-4" />
												{item.category}
											</div>
											<h3 className="text-2xl font-semibold">{item.title}</h3>
											<p className="mt-2 text-sm text-gray-200">{item.description}</p>
										</div>
									</div>

									<div className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/70 px-6 py-4 text-sm text-gray-700 transition-colors dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-300">
										<span className="flex items-center gap-2">
											<MapPin className="h-4 w-4 text-red-600 dark:text-red-400" />
											{item.location}
										</span>
										<span className="text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
											View Details
										</span>
									</div>
								</article>
							);
						})}
					</div>

					<div className="mt-16 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-emerald-500 p-[1px]">
						<div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-12 text-center dark:bg-gray-900">
							<span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-600 dark:bg-red-900/30 dark:text-red-200">
								Experience Brytwin
							</span>
							<h3 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
								Ready to Visualize Your Next Development?
							</h3>
							<p className="mt-3 text-base text-gray-600 dark:text-gray-300">
								Book a consultation with our design team to explore bespoke concepts, virtual walkthroughs, and investment-ready proposals tailored to your vision.
							</p>
							<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
								<button
									type="button"
									onClick={openConsultationModal}
									className="w-full rounded-full bg-red-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 sm:w-auto"
								>
									Speak with a Consultant
								</button>
								<a
									href="/properties"
									className="w-full rounded-full border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-800 transition hover:border-red-500 hover:text-red-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-red-400 dark:hover:text-red-300 sm:w-auto"
								>
									Explore Active Listings
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Gallery;
