interface MarqueeBarProps {
  items: string[];
  thick?: boolean;
}

export default function MarqueeBar({ items, thick }: MarqueeBarProps) {
  const content = items.map((t, i) => <span key={i}>{t}</span>);
  return (
    <div className={`sk-marquee${thick ? " thick" : ""}`}>
      <div className="sk-marquee-track">
        {content}{content}{content}{content}
      </div>
    </div>
  );
}
