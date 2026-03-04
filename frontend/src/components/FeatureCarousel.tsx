import { useEffect, useRef, useState } from "react";
import SlideContent from "./SlideContent";

type Badge = { icon: string; text: string; style?: string };
type Feature = { icon: string; text: string; style?: string };
export type Slide = {
  key: string;
  image: string;
  imageBadge?: Badge;
  tag?: Badge;
  titleLine1: string;
  titleEmphasis: string;
  description: string;
  priceLabel?: string;
  price: string;
  ctaText: string;
  ctaHref: string;
  features?: Feature[];
};

const slides: Slide[] = [
  {
    key: "halo-halo",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBG5aL36E1DNiy5h7tdzEXtIkq7nNX97yCal9UjoUZb6v9W_B_J2zomd_D3LlZYjCtN6CCgZRGZtvi7HsvTnFreiWqHnpjC6TIjjBfsDzjBjyhJyVerqfRUbAktNDREapQnwdZgjN0LW30b3vEYVrUVOqqw6mw8Ka5BZ9mLv8y5PtrufE1HJ429xLnlfHNIJYonljbjC4EUntvATO2ERDXwvYxjJ06wW0KLfDvmPxsGdCffiPRlYv_MGHUQf8aDi5RnJAC8ymFn1gQ",
    imageBadge: { icon: "verified", text: "Bestseller" },
    tag: { icon: "icecream", text: "Seasonal Special" },
    titleLine1: "Halo-Halo",
    titleEmphasis: "Special",
    description:
      "Beat the heat with our signature creamy shaved ice dessert. Layered with sweetened beans, coconut jelly, luscious leche flan, and topped with homemade ube ice cream.",
    price: "₱35",
    ctaText: "Order Now",
    ctaHref: "#order",
  },
  {
    key: "tuna",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBG5aL36E1DNiy5h7tdzEXtIkq7nNX97yCal9UjoUZb6v9W_B_J2zomd_D3LlZYjCtN6CCgZRGZtvi7HsvTnFreiWqHnpjC6TIjjBfsDzjBjyhJyVerqfRUbAktNDREapQnwdZgjN0LW30b3vEYVrUVOqqw6mw8Ka5BZ9mLv8y5PtrufE1HJ429xLnlfHNIJYonljbjC4EUntvATO2ERDXwvYxjJ06wW0KLfDvmPxsGdCffiPRlYv_MGHUQf8aDi5RnJAC8ymFn1gQ",
    imageBadge: { icon: "rice_bowl", text: "UNLI RICE" },
    tag: { icon: "recommend", text: "Chef's Recommendation", style: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200" },
    titleLine1: "Tuna",
    titleEmphasis: "Panga",
    description:
      "Succulent grilled tuna jaw marinated in our secret sauce. Perfectly charred on the outside, tender and juicy on the inside. Served with our signature sawsawan.",
    priceLabel: "Only",
    price: "₱160",
    ctaText: "Order Now",
    ctaHref: "#order",
    features: [
      { icon: "local_fire_department", text: "Char-Grilled", style: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30" },
      { icon: "water_drop", text: "Fresh Catch", style: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30" },
      { icon: "schedule", text: "15-20 Mins Prep", style: "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30" },
      { icon: "groups", text: "Good for Sharing", style: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30" },
    ],
  },
  {
    key: "backribs",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChniK0iPmFqUryVN7FVyFfsDNdlsemFTLWsOaIk-RWzv4RpAYzBG5Won_3tQeFQ4epXRPyQWQx0KvltbNa4Wig5XLa_L7JESHYr9UwyLQ5XFBdSD7iSlaYyoGzD1gZPcjzpwFTVHv6_eymhbZbmdQmP3tBqVzn_fNlYNHfoU85XHzKogzq3yEafE3d1swy-imhIRBcUgDIi1iBj-xfxPok3Tmen_GkIZlt-3RCquYbYqyF2IeAsdZhvWH84_NS9ypgPgKaxlmg1Ag",
    imageBadge: { icon: "verified", text: "Bestseller" },
    tag: { icon: "new_releases", text: "New Offer" },
    titleLine1: "Baby",
    titleEmphasis: "Backribs",
    description:
      "Tender, fall-off-the-bone pork ribs glazed in our special sweet and savory barbecue sauce. Perfectly grilled to achieve that smoky aroma, served with native calamansi for that extra zing.",
    price: "Php 159.00",
    ctaText: "Order Now",
    ctaHref: "#order",
    features: [
      { icon: "outdoor_grill", text: "Charcoal Grilled" },
      { icon: "timer", text: "Freshly Cooked" },
      { icon: "local_fire_department", text: "Smoky Flavor" },
      { icon: "star", text: "Chef's Choice" },
    ],
  },
];

export default function FeatureCarousel() {
  const [index, setIndex] = useState(1);
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef<number | null>(null);
  const slide = slides[index];

  const changeTo = (i: number, dir: number) => {
    setDirection(dir);
    setShow(false);
    window.setTimeout(() => {
      setIndex(i);
      setShow(true);
    }, 180);
  };

  const next = () => changeTo((index + 1) % slides.length, 1);
  const prev = () => changeTo((index - 1 + slides.length) % slides.length, -1);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      next();
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, index]);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    startXRef.current = e.clientX;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || startXRef.current == null) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 40) {
      setDragging(false);
      startXRef.current = null;
      if (dx < 0) next();
      else prev();
    }
  };
  const onPointerUp = () => {
    setDragging(false);
    startXRef.current = null;
  };

  return (
    <section
      id="features"
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 leaf-pattern pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
      <div
        className="relative select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <SlideContent
          slide={slide}
          show={show}
          direction={direction}
          onPrev={prev}
          onNext={next}
          onDot={(i) => changeTo(i, i > index ? 1 : -1)}
          index={index}
          total={slides.length}
        />
      </div>
    </section>
  );
}
