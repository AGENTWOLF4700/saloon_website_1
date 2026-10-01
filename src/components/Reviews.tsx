import { useState } from 'react';
import { SalonConfig } from '../types/salon';
import { Star, Quote, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';

interface ReviewsProps {
  config: SalonConfig;
}

export function Reviews({ config }: ReviewsProps) {
  const [selectedStars, setSelectedStars] = useState<number>(5);
  const [hoveredStars, setHoveredStars] = useState<number | null>(null);

  const googleReviewsUrl = config.googleReviewsUrl || `https://search.google.com/local/writereview?query=${encodeURIComponent(config.name + ' ' + config.city)}`;

  return (
    <section id="reviews" className="py-20 md:py-28 relative overflow-hidden bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Google Verified Testimonials</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
            Loved by Our Guests
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-sans text-balance">
            Real reviews from customers who trust us with their hair, skin, and beauty transformations.
          </p>

          {/* Social Proof Aggregate Score with direct Google link */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-neutral-200/90 shadow-2xs hover:shadow-xs rounded-full transition-all group"
            >
              {/* Google 'G' icon */}
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <span className="text-xs font-semibold text-neutral-800 group-hover:text-amber-900 transition-colors">
                4.9 · 280+ Reviews on Google
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-900 transition-colors" />
            </a>

            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs"
            >
              <span>Write a Google Review</span>
              <ExternalLink className="w-3 h-3 text-amber-300" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {config.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Top: Star Rating & Quote Glyph */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400" aria-label={`${review.rating} out of 5 stars`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-neutral-200 group-hover:text-amber-200 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-sans italic">
                  "{review.text}"
                </p>
              </div>

              {/* Bottom: Author Info */}
              <div className="pt-5 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-900 font-serif font-bold text-sm">
                    {review.avatar || review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-neutral-900">
                        {review.author}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-label="Verified Customer" />
                    </div>
                    {review.serviceTaken && (
                      <p className="text-xs text-neutral-500 font-sans">
                        {review.serviceTaken}
                      </p>
                    )}
                  </div>
                </div>

                <span className="text-xs text-neutral-400 font-sans">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated "Leave a Google Review" Card */}
        <div className="mt-14 max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm text-center space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 mx-auto flex items-center justify-center">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-serif text-2xl font-bold text-neutral-900">
              Visited {config.name} Recently?
            </h3>
            <p className="text-sm text-neutral-600 font-sans max-w-md mx-auto">
              Your feedback helps our stylists improve and guides new guests in finding their perfect look. Rate us directly on Google!
            </p>
          </div>

          {/* Star selector */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedStars(star)}
                onMouseEnter={() => setHoveredStars(star)}
                onMouseLeave={() => setHoveredStars(null)}
                className="p-1 hover:scale-120 transition-transform cursor-pointer"
                aria-label={`Select ${star} stars`}
              >
                <Star
                  className={`w-7 h-7 sm:w-8 sm:h-8 ${
                    (hoveredStars !== null ? star <= hoveredStars : star <= selectedStars)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Action button redirecting to Google Reviews */}
          <div className="pt-2">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 active:scale-98 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <span>Post Review on Google</span>
              <ExternalLink className="w-4 h-4 text-amber-300" />
            </a>
            <p className="text-[11px] text-neutral-400 mt-2 font-sans">
              Redirects to Google Maps / Google Reviews page
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
