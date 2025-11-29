import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (message?: string) => void;
}

const BookingModal = ({ isOpen, onClose, onSuccess }: BookingModalProps) => {
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  // Effect to handle body scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position and add styles to prevent scrolling
      const scrollY = window.scrollY;
      setSavedScrollPosition(scrollY);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position when modal is closed
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, savedScrollPosition);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen, savedScrollPosition]);

  useEffect(() => {
    if (isOpen) {
      // focus first form field for accessibility
      const firstInput = document.querySelector('.modal-content input[name="fullName"], .modal-content input, .modal-content select, .modal-content textarea') as HTMLElement | null;
      firstInput?.focus();
    }
  }, [isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  // ref intentionally omitted; using DOM focus on validation error

  const schema = z.object({
    fullName: z.string().min(1, 'Please enter your full name'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    serviceType: z.string().min(1, 'Please select a service type'),
    datetime: z.string().optional(),
    project: z.string().min(10, 'Tell us about the project (at least 10 chars)'),
    website: z.string().optional().max(0)
  });

  type BookingForm = {
    fullName: string;
    email: string;
    phone?: string;
    serviceType: string;
    datetime?: string;
    project: string;
    website?: string;
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '', email: '', phone: '', serviceType: '', datetime: '', project: '', website: ''
    }
  });
  const [localToast, setLocalToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!localToast) return;
    const timer = window.setTimeout(() => setLocalToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [localToast]);

  const onSubmit = async (data: BookingForm) => {
    // Honeypot
    if (data.website && data.website.trim().length > 0) return;
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/mvgjjvoz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ fullName: data.fullName, email: data.email, phone: data.phone, serviceType: data.serviceType, datetime: data.datetime, project: data.project })
      });
      if (!response.ok) throw new Error('Submission failed');
      setLocalToast({ message: "Thanks — we'll respond within one working day.", type: 'success' });
      reset();
      if (typeof onSuccess === 'function') onSuccess("Thanks — we'll respond within one working day.");
      setTimeout(() => onClose(), 800);
    } catch (err) {
      setLocalToast({ message: 'Submission failed — please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onErrors = (errors: any) => {
    const firstKey = Object.keys(errors)[0];
    const el = document.querySelector(`[name="${firstKey}"]`) as HTMLElement | null;
    if (el) el.focus();
  };

  const consultationModalStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

    .consultation-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
      transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      max-height: 100vh;
      overflow-y: auto;
    }

    .consultation-modal.open {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-content {
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      padding: 3rem;
      border-radius: 24px;
      width: 100%;
      max-width: 600px;
      position: relative;
      transform: translateX(-100%) scale(0.9);
      opacity: 0;
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow:
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin: 2rem auto;
      min-height: calc(100vh - 4rem);
    }

    .consultation-modal.open .modal-content {
      transform: translateX(0) scale(1);
      opacity: 1;
    }

    .dark .modal-content {
      background: linear-gradient(145deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.95) 100%);
      box-shadow:
        0 25px 50px -12px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #dc2626 0%, #059669 50%, #dc2626 100%);
      border-radius: 24px 24px 0 0;
    }

    .consultation-modal h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
      text-align: center;
      letter-spacing: -0.025em;
      line-height: 1.2;
    }

    .dark .consultation-modal h2 {
      color: #f9fafb;
    }

    .consultation-modal p {
      font-family: 'Inter', sans-serif;
      font-size: 1.125rem;
      font-weight: 400;
      color: #6b7280;
      margin-bottom: 2rem;
      text-align: center;
      line-height: 1.6;
      letter-spacing: 0.01em;
    }

    .dark .consultation-modal p {
      color: #9ca3af;
    }

    .consultation-modal input,
    .consultation-modal select,
    .consultation-modal textarea {
      font-family: 'Inter', sans-serif;
      width: 100%;
      padding: 1rem 1.25rem;
      margin-bottom: 1.5rem;
      border: 2px solid rgba(229, 231, 235, 0.8);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      color: #1f2937;
      font-size: 1rem;
      font-weight: 400;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .consultation-modal input:focus,
    .consultation-modal select:focus,
    .consultation-modal textarea:focus {
      border-color: #dc2626;
      box-shadow:
        0 0 0 3px rgba(220, 38, 38, 0.1),
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
      background: rgba(255, 255, 255, 1);
      transform: translateY(-1px);
    }

    .dark .consultation-modal input,
    .dark .consultation-modal select,
    .dark .consultation-modal textarea {
      background: rgba(31, 41, 55, 0.9);
      border-color: rgba(75, 85, 99, 0.8);
      color: #f9fafb;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    }

    .dark .consultation-modal input:focus,
    .dark .consultation-modal select:focus,
    .dark .consultation-modal textarea:focus {
      border-color: #dc2626;
      background: rgba(31, 41, 55, 1);
      box-shadow:
        0 0 0 3px rgba(220, 38, 38, 0.2),
        0 10px 15px -3px rgba(0, 0, 0, 0.3),
        0 4px 6px -2px rgba(0, 0, 0, 0.15);
    }

    .consultation-modal input::placeholder,
    .consultation-modal select::placeholder,
    .consultation-modal textarea::placeholder {
      color: #9ca3af;
      font-style: italic;
      font-weight: 300;
    }

    .dark .consultation-modal input::placeholder,
    .dark .consultation-modal select::placeholder,
    .dark .consultation-modal textarea::placeholder {
      color: #6b7280;
    }

    .consultation-modal .buttons {
      display: flex;
      gap: 1.5rem;
      margin-top: 2.5rem;
      justify-content: center;
    }

    .consultation-modal .btn-primary {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: white;
      padding: 1rem 2.5rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1.125rem;
      letter-spacing: 0.025em;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.3), 0 4px 6px -2px rgba(220, 38, 38, 0.2);
      border: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .consultation-modal .btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .consultation-modal .btn-primary:hover::before {
      left: 100%;
    }

    .consultation-modal .btn-primary:hover {
      background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(220, 38, 38, 0.4), 0 10px 10px -5px rgba(220, 38, 38, 0.3);
    }

    .consultation-modal .btn-secondary {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, rgba(229, 231, 235, 0.9) 0%, rgba(209, 213, 219, 0.8) 100%);
      color: #374151;
      padding: 1rem 2.5rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1.125rem;
      letter-spacing: 0.025em;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 2px solid rgba(156, 163, 175, 0.3);
      cursor: pointer;
      backdrop-filter: blur(10px);
    }

    .consultation-modal .btn-secondary:hover {
      background: linear-gradient(135deg, rgba(209, 213, 219, 1) 0%, rgba(156, 163, 175, 0.9) 100%);
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
    }

    .dark .consultation-modal .btn-secondary {
      background: linear-gradient(135deg, rgba(75, 85, 99, 0.9) 0%, rgba(55, 65, 81, 0.8) 100%);
      color: #f9fafb;
      border-color: rgba(107, 114, 128, 0.5);
    }

    .dark .consultation-modal .btn-secondary:hover {
      background: linear-gradient(135deg, rgba(55, 65, 81, 1) 0%, rgba(75, 85, 99, 0.9) 100%);
    }

    /* Elegant form labels */
    .consultation-modal .form-group {
      margin-bottom: 1.5rem;
    }

    .consultation-modal .form-label {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      display: block;
      letter-spacing: 0.025em;
    }

    .dark .consultation-modal .form-label {
      color: #e5e7eb;
    }

    /* Responsive design */
    @media (max-width: 640px) {
      .modal-content {
        padding: 2rem 1.5rem;
        margin: 1rem;
        max-width: none;
        min-height: calc(100vh - 2rem);
      }

      .consultation-modal h2 {
        font-size: 2rem;
      }

      .consultation-modal .buttons {
        flex-direction: column;
        gap: 1rem;
      }

      .consultation-modal .btn-primary,
      .consultation-modal .btn-secondary {
        width: 100%;
        padding: 1rem 2rem;
      }
    }

    /* Elegant loading animation */
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }

    .consultation-modal .btn-loading {
      background: linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px);
      background-size: 200px;
      animation: shimmer 1.5s infinite linear;
    }

    .dark .consultation-modal .btn-loading {
      background: linear-gradient(90deg, #374151 0px, #4b5563 40px, #374151 80px);
      background-size: 200px;
    }
  `;

  return (
    <>
      <style>{consultationModalStyle}</style>
      <div
        className={`consultation-modal ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="modal-content">
          <h2 id="consultation-title">Book Your Exclusive Consultation</h2>
          <p>Let's discuss your vision and how we can bring it to life with unparalleled craftsmanship and attention to detail.</p>

          <form onSubmit={handleSubmit(onSubmit, onErrors)} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                aria-invalid={errors.fullName ? 'true' : 'false'}
                aria-describedby={errors.fullName ? 'err-fullName' : undefined}
                {...register('fullName')}
                className="focus:border-red-500 focus:ring-red-500"
              />
              {errors.fullName && <div id="err-fullName" className="text-sm text-red-600 mt-1">{errors.fullName.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'err-email' : undefined}
                {...register('email')}
                className="focus:border-red-500 focus:ring-red-500"
              />
              {errors.email && <div id="err-email" className="text-sm text-red-600 mt-1">{errors.email.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+233 XX XXX XXXX"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'err-phone' : undefined}
                {...register('phone')}
                className="focus:border-red-500 focus:ring-red-500"
              />
              {errors.phone && <div id="err-phone" className="text-sm text-red-600 mt-1">{errors.phone.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="service">
                Service Type
              </label>
              <select
                id="service"
                required
                aria-invalid={errors.serviceType ? 'true' : 'false'}
                aria-describedby={errors.serviceType ? 'err-serviceType' : undefined}
                {...register('serviceType')}
                className="focus:border-red-500 focus:ring-red-500"
              >
                <option value="">Select Your Service</option>
                <option>🏗️ General Construction</option>
                <option>🏢 Estate Management & Sales</option>
                <option>🌍 International Project Management</option>
                <option>🔄 Renovation & Repairs</option>
                <option>💬 Consultation Only</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="datetime">
                Preferred Date & Time
              </label>
              <input
                id="datetime"
                type="datetime-local"
                placeholder="Select your preferred time"
                aria-invalid={errors.datetime ? 'true' : 'false'}
                aria-describedby={errors.datetime ? 'err-datetime' : undefined}
                {...register('datetime')}
                className="focus:border-red-500 focus:ring-red-500"
              />
              {errors.datetime && <div id="err-datetime" className="text-sm text-red-600 mt-1">{errors.datetime.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="project">
                Project Description
              </label>
              <textarea
                id="project"
                placeholder="Tell us about your dream project..."
                rows={4}
                required
                aria-invalid={errors.project ? 'true' : 'false'}
                aria-describedby={errors.project ? 'err-project' : undefined}
                {...register('project')}
                className="focus:border-red-500 focus:ring-red-500"
              ></textarea>
              {errors.project && <div id="err-project" className="text-sm text-red-600 mt-1">{errors.project.message}</div>}

              {/* Honeypot */}
              <input type="text" name="website" autoComplete="off" className="hidden" {...register('website')} />
            </div>

            <div className="buttons">
              <button type="submit" className={`btn-primary ${isSubmitting ? 'btn-loading' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </button>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
          {localToast && (
            <div className={`mt-4 rounded-lg px-4 py-2 text-sm font-medium ${localToast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
              {localToast.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingModal;
