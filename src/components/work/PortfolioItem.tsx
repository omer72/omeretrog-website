import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import type { PortfolioItem as PortfolioItemType } from "../../content/portfolio";
import ScrollReveal from "../ui/ScrollReveal";

interface Props {
  item: PortfolioItemType;
}

export default function PortfolioItem({ item }: Props) {
  if (!item.permissionConfirmed) {
    return (
      <ScrollReveal>
        <article
          aria-label={`Portfolio: ${item.clientName} (coming soon)`}
          className="opacity-60"
        >
          <div className="aspect-video overflow-hidden rounded-lg flex items-center justify-center bg-surface-muted">
            <p className="text-text-muted text-sm">Portfolio item coming soon</p>
          </div>
          <h2 className="mt-4 text-xl font-semibold">{item.clientName}</h2>
          <p className="text-text-muted text-sm">{item.role}</p>
        </article>
      </ScrollReveal>
    );
  }

  const hasSlider = item.beforeImage && item.afterImage;

  return (
    <ScrollReveal>
      <article aria-label={`Portfolio: ${item.clientName}`}>
        {hasSlider ? (
          <div className="aspect-video overflow-hidden rounded-xl glow-accent">
            <ReactCompareSlider
              aria-label={`Drag to compare before and after website for ${item.clientName}`}
              keyboardIncrement="5%"
              style={{ width: "100%", height: "100%" }}
              itemOne={
                <ReactCompareSliderImage
                  src={item.beforeImage!.src}
                  alt={item.beforeImage!.alt}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={item.afterImage!.src}
                  alt={item.afterImage!.alt}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              }
            />
          </div>
        ) : item.image ? (
          <div className="aspect-video overflow-hidden rounded-xl glow-accent">
            <img
              src={item.image.src}
              alt={item.image.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        {/* Glass metadata card */}
        <div className="glass mt-4 rounded-xl p-4">
          <h2 className="text-xl font-semibold">{item.clientName}</h2>
          <p className="text-text-muted text-sm">{item.role}</p>
          <p className="text-text-muted mt-2">{item.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full gradient-btn px-3 py-1 text-sm font-semibold text-white">
              {item.result}
            </span>
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
              >
                View Live
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
