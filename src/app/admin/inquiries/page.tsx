export const revalidate = 0;

import { getInquiries } from "@/lib/inquiries";

export default async function InquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Project Inquiries</h1>
        <p className="text-sm text-gray-500 mt-1">{inquiries.length} submission{inquiries.length !== 1 ? "s" : ""}</p>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-12 text-center">
          <p className="text-gray-600 text-sm tracking-[0.14em] uppercase">No inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-white font-semibold">{inq.name}</p>
                  <a href={`mailto:${inq.email}`} className="text-sm text-[#E5212E] hover:underline">{inq.email}</a>
                </div>
                <p className="text-xs text-gray-600 whitespace-nowrap">
                  {new Date(inq.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>

              <div className="flex gap-3 flex-wrap">
                {inq.project_type && (
                  <span className="text-xs bg-white/[0.06] text-gray-400 px-3 py-1 rounded-full">{inq.project_type}</span>
                )}
                {inq.budget && (
                  <span className="text-xs bg-[#E5212E]/10 text-[#E5212E] px-3 py-1 rounded-full">{inq.budget}</span>
                )}
              </div>

              <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">{inq.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
