"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { createWork, updateWork } from "@/app/admin/actions";
import ImageUpload from "@/app/admin/_components/ImageUpload";

type ProcessStep = { step: string; description: string };
type Metric = { value: string; label: string };

type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  thumbnail_url: string | null;
  cover_url: string | null;
  case_study_url: string | null;
  intro: string;
  challenge: string;
  outcome: string;
  published: boolean;
  sort_order: number;
  tools: string[];
  process: ProcessStep[];
  metrics: Metric[];
};

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function WorkForm({ project }: { project?: Project }) {
  const isEdit = !!project;
  const [published, setPublished] = useState(project?.published ?? false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(project?.thumbnail_url ?? null);
  const [coverUrl, setCoverUrl] = useState<string | null>(project?.cover_url ?? null);
  const [process, setProcess] = useState<ProcessStep[]>(project?.process ?? [{ step: "", description: "" }]);
  const [metrics, setMetrics] = useState<Metric[]>(project?.metrics ?? [{ value: "", label: "" }]);
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("published", String(published));
    formData.set("thumbnail_url", thumbnailUrl ?? "");
    formData.set("cover_url", coverUrl ?? "");
    formData.set("process", JSON.stringify(process.filter((p) => p.step)));
    formData.set("metrics", JSON.stringify(metrics.filter((m) => m.value)));

    const result = isEdit
      ? await updateWork(project.id, formData)
      : await createWork(formData);

    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
  }

  const inputCls = "w-full bg-[#020618] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50 transition-colors";
  const labelCls = "block text-xs text-gray-500 mb-1.5 tracking-wide";

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/work" className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{isEdit ? "Edit Project" : "New Project"}</h1>
          {isEdit && <p className="text-xs text-gray-600 mt-0.5">/{project.slug}</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white mb-2">Project Info</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Title *</label>
              <input
                name="title"
                defaultValue={project?.title}
                required
                className={inputCls}
                placeholder="Project title"
                onChange={(e) => {
                  if (!slugTouched) setSlug(toSlug(e.target.value));
                }}
              />
            </div>
            <div>
              <label className={labelCls}>Slug *</label>
              <input
                name="slug"
                value={slug}
                required
                className={inputCls}
                placeholder="project-slug"
                onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Number</label>
              <input name="number" defaultValue={project?.number} className={inputCls} placeholder="01" />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <input name="category" defaultValue={project?.category} className={inputCls} placeholder="Mobile App · UX" />
            </div>
            <div>
              <label className={labelCls}>Year</label>
              <input name="year" defaultValue={project?.year} className={inputCls} placeholder="2024" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Short Description</label>
            <textarea name="description" defaultValue={project?.description} rows={2} className={inputCls} placeholder="Shown in project cards…" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tags (comma-separated)</label>
              <input name="tags" defaultValue={project?.tags?.join(", ")} className={inputCls} placeholder="UX Design, Research" />
            </div>
            <div>
              <label className={labelCls}>Tools (comma-separated)</label>
              <input name="tools" defaultValue={project?.tools?.join(", ")} className={inputCls} placeholder="Figma, Notion" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ImageUpload
              value={thumbnailUrl}
              onChange={setThumbnailUrl}
              folder="work-thumbnails"
              label="Thumbnail Image"
            />
            <ImageUpload
              value={coverUrl}
              onChange={setCoverUrl}
              folder="work-covers"
              label="Cover Image"
            />
          </div>

          <div>
            <label className={labelCls}>Case Study URL</label>
            <input name="case_study_url" defaultValue={project?.case_study_url ?? ""} className={inputCls} placeholder="https://…" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Sort Order</label>
              <input name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} className={inputCls} />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-sm text-white font-medium">Published</p>
              <p className="text-xs text-gray-500">Visible on the live site</p>
            </div>
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${published ? "bg-[#E5212E]" : "bg-white/10"}`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${published ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        </section>

        {/* Content */}
        <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white mb-2">Case Study Content</h2>
          <div>
            <label className={labelCls}>Introduction</label>
            <textarea name="intro" defaultValue={project?.intro} rows={3} className={inputCls} placeholder="Opening paragraph…" />
          </div>
          <div>
            <label className={labelCls}>The Challenge</label>
            <textarea name="challenge" defaultValue={project?.challenge} rows={3} className={inputCls} placeholder="Describe the problem…" />
          </div>
          <div>
            <label className={labelCls}>Outcome & Learnings</label>
            <textarea name="outcome" defaultValue={project?.outcome} rows={3} className={inputCls} placeholder="Results and takeaways…" />
          </div>
        </section>

        {/* Process */}
        <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Process Steps</h2>
            <button type="button" onClick={() => setProcess([...process, { step: "", description: "" }])} className="flex items-center gap-1.5 text-xs text-[#E5212E]">
              <Plus size={13} /> Add Step
            </button>
          </div>
          <div className="space-y-3">
            {process.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <input value={step.step} onChange={(e) => { const u = [...process]; u[i].step = e.target.value; setProcess(u); }} className={inputCls} placeholder={`Step ${i + 1}`} />
                  <input value={step.description} onChange={(e) => { const u = [...process]; u[i].description = e.target.value; setProcess(u); }} className={`${inputCls} col-span-2`} placeholder="Description…" />
                </div>
                {process.length > 1 && (
                  <button type="button" onClick={() => setProcess(process.filter((_, j) => j !== i))} className="p-2.5 text-gray-600 hover:text-[#E5212E] transition-colors">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Key Metrics</h2>
            <button type="button" onClick={() => setMetrics([...metrics, { value: "", label: "" }])} className="flex items-center gap-1.5 text-xs text-[#E5212E]">
              <Plus size={13} /> Add Metric
            </button>
          </div>
          <div className="space-y-3">
            {metrics.map((metric, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input value={metric.value} onChange={(e) => { const u = [...metrics]; u[i].value = e.target.value; setMetrics(u); }} className={inputCls} placeholder="+40%" />
                <input value={metric.label} onChange={(e) => { const u = [...metrics]; u[i].label = e.target.value; setMetrics(u); }} className={inputCls} placeholder="Activation Rate" />
                {metrics.length > 1 && (
                  <button type="button" onClick={() => setMetrics(metrics.filter((_, j) => j !== i))} className="p-2.5 text-gray-600 hover:text-[#E5212E]">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {error && <p className="text-xs text-[#E5212E] bg-[#E5212E]/10 border border-[#E5212E]/20 rounded-xl px-4 py-3">{error}</p>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="bg-[#E5212E] text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors disabled:opacity-50">
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Project"}
          </button>
          <Link href="/admin/work" className="text-sm text-gray-500 hover:text-white transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
