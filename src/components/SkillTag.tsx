// Pure CSS hover — no useState, no re-renders, GPU-accelerated transforms only

export default function SkillTag({ label, className = "px-4 py-2 text-sm" }: { label: string; className?: string }) {
  return (
    <span
      className={`group relative inline-flex items-center rounded-full border border-white/[0.08] hover:border-[#E5212E]/60 cursor-default overflow-hidden transition-colors duration-300 select-none text-gray-300 hover:text-white ${className}`}
    >
      {/* Fill sweep — transform only, GPU-accelerated */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E5212E]/[0.18] to-[#E5212E]/[0.06] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out will-change-transform" />
      {/* Shimmer line — opacity only, GPU-accelerated */}
      <span className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#E5212E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">
        {label}
      </span>
    </span>
  );
}
