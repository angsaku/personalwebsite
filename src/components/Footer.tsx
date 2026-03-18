export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-700">
          © {year} Satriya Kurniawan. All rights reserved.
        </p>
        <p className="text-xs text-gray-800 tracking-wide">
          Designed & Built with care.
        </p>
      </div>
    </footer>
  );
}
