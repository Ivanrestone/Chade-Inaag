import type { Slide } from "./FeatureCarousel";

type Props = {
  slide: Slide;
  show: boolean;
  direction: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
  index: number;
  total: number;
};

export default function SlideContent({
  slide,
  show,
  direction,
  onPrev,
  onNext,
  onDot,
  index,
  total,
}: Props) {
  const imgHiddenStyle = {
    opacity: 0,
    transform: `translateX(${direction * 24}px)`,
    transition: "opacity 400ms ease, transform 400ms ease",
  } as const;
  const imgVisibleStyle = {
    opacity: 1,
    transform: "translateX(0px)",
    transition: "opacity 400ms ease, transform 400ms ease",
  } as const;
  const textHiddenStyle = {
    opacity: 0,
    transform: `translateX(${direction * 24}px)`,
    transition: "opacity 400ms ease, transform 400ms ease",
  } as const;
  const textVisibleStyle = {
    opacity: 1,
    transform: "translateX(0px)",
    transition: "opacity 400ms ease, transform 400ms ease",
  } as const;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      <div className="w-full lg:w-1/2 relative group" style={show ? imgVisibleStyle : imgHiddenStyle}>
        <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-primary-light rounded-[2.5rem] rotate-2 opacity-20 blur-xl group-hover:rotate-1 transition-transform duration-700"></div>
        <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-background-dark">
          <img src={slide.image} alt={slide.titleEmphasis} className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700" />
          {slide.imageBadge && (
            <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-background-dark/90 backdrop-blur text-primary px-4 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-base">{slide.imageBadge.icon}</span>
              {slide.imageBadge.text}
            </div>
          )}
        </div>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-4">
          <button onClick={onPrev} aria-label="Previous" className="size-12 md:size-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-black/50 backdrop-blur text-primary shadow-lg hover:scale-110 transition">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button onClick={onNext} aria-label="Next" className="size-12 md:size-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-black/50 backdrop-blur text-primary shadow-lg hover:scale-110 transition">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => onDot(i)} aria-label={`slide-${i}`} className={i === index ? "w-8 h-3 rounded-full bg-primary" : "w-3 h-3 rounded-full bg-slate-300 hover:bg-primary/50 transition-colors"} />
          ))}
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6 items-start text-left relative" style={show ? textVisibleStyle : textHiddenStyle}>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
        {slide.tag && (
          <div className={`flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm px-3 py-1 rounded-full w-fit ${slide.tag.style ?? "bg-primary/10"}`}>
            <span className="material-symbols-outlined text-base">{slide.tag.icon}</span>
            {slide.tag.text}
          </div>
        )}
        <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tight">
          {slide.titleLine1} <br />
          <span className="text-primary transparent-text bg-clip-text bg-gradient-to-r from-primary to-primary-light">{slide.titleEmphasis}</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">{slide.description}</p>
        <div className="flex flex-wrap items-center gap-6 mt-2">
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-secondary rounded-full -z-10"></div>
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 text-secondary -z-10 rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-17.9,89.3,-2.4C88.5,13,84.2,28.4,75.4,40.8C66.6,53.2,53.4,62.6,39.6,70.1C25.8,77.6,11.4,83.2,-2.1,86.9C-15.6,90.5,-30.1,92.2,-43.3,86.4C-56.5,80.6,-68.4,67.3,-76.3,52.6C-84.2,37.9,-88.1,21.8,-86.6,6.3C-85.1,-9.2,-78.2,-24.1,-68.2,-36.8C-58.2,-49.5,-45.1,-60.1,-31.4,-67.5C-17.7,-74.9,-3.4,-79.1,11.5,-78.8C26.4,-78.5,41.3,-73.7,44.7,-76.4Z" fill="currentColor" transform="translate(100 100)"></path>
            </svg>
            <div className="text-center rotate-[-6deg] z-10 relative">
              {slide.priceLabel && <span className="text-sm font-bold text-slate-900 block uppercase tracking-wide">{slide.priceLabel}</span>}
              <span className="text-4xl font-black text-slate-900 dark:text-slate-900 drop-shadow-sm block leading-none">{slide.price}</span>
            </div>
          </div>
          <a href={slide.ctaHref} className="flex items-center justify-center gap-2 h-14 px-8 bg-primary hover:bg-primary-light text-white text-base font-bold rounded-full transition-all shadow-xl shadow-primary/30">
            <span>{slide.ctaText}</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        {slide.features && (
          <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md border-t border-slate-200 dark:border-slate-800 pt-6">
            {slide.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${f.style ?? "bg-primary/10 text-primary"}`}>
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{f.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
