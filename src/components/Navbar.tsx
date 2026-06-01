export default function Navbar() {
  return (
    <div className="sk-topbar">
      {/* Logo mark */}
      <div className="sk-topbar-logo">
        <svg
          width="48"
          height="36"
          viewBox="0 0 48 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Satriya Kurniawan"
        >
          <rect width="48" height="36" fill="var(--accent)" />
          <text
            x="24"
            y="19"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="var(--bg)"
            fontFamily="var(--font-jetbrains-mono, monospace)"
            fontWeight="800"
            fontSize="13"
            letterSpacing="2"
          >
            SK
          </text>
        </svg>
      </div>

      <nav className="nav">
        {[
          ["#work",       "Work"],
          ["#about",      "About"],
          ["#experience", "Experience"],
          ["#services",   "Services"],
          ["#blog",       "Blog"],
          ["#contact",    "Contact"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            data-cursor="hover"
            data-cursor-label="↘ go"
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
