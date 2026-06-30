import { X } from "lucide-react";
import { useEffect } from "react";

export default function Popup({
  open,
  onClose,
  title,
  subtitle,
  icon: Icon,
  children,
  className = "",
  footer,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-lg max-h-[94vh] overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col animate-in fade-in zoom-in-95 duration-300 ${className}`}>

        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-[#1a2e7a] to-[#3b52ab] px-10 py-8 text-white">

          {Icon && (
            <div className="absolute right-0 top-0 p-4 opacity-[0.03]">
              <Icon className="h-40 w-40 -rotate-12" />
            </div>
          )}

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                {title}
              </h2>

              {subtitle && (
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-blue-100/70">
                  {subtitle}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/10 p-2.5 transition hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-4 border-t border-slate-100 p-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
