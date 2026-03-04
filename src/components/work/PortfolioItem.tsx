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

  return (
    <ScrollReveal>
      <article aria-label={`Portfolio: ${item.clientName}`}>
        {/* Glow border around slider */}
        <div className="aspect-video overflow-hidden rounded-xl glow-accent">
          <ReactCompareSlider
            aria-label={`Drag to compare before and after website for ${item.clientName}`}
            keyboardIncrement="5%"
            style={{ width: "100%", height: "100%" }}
            itemOne={
              <ReactCompareSliderImage
                src={item.beforeImage.src}
                alt={item.beforeImage.alt}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={item.afterImage.src}
                alt={item.afterImage.alt}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            }
          />
        </div>

        {/* Glass metadata card */}
        <div className="glass mt-4 rounded-xl p-4">
          <h2 className="text-xl font-semibold">{item.clientName}</h2>
          <p className="text-text-muted text-sm">{item.role}</p>
          <p className="text-text-muted mt-2">{item.description}</p>
          <p className="mt-2 inline-block rounded-full gradient-btn px-3 py-1 text-sm font-semibold text-white">
            {item.result}
          </p>
        </div>
      </article>
    </ScrollReveal>
  );
}
