export default function Navbar() {
  return (
    <div className="sk-topbar">
      {/* Logo mark */}
      <div className="sk-topbar-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-sk.svg"
          alt="Satriya Kurniawan"
          style={{ display: "block", height: "40px", width: "auto" }}
        />
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
