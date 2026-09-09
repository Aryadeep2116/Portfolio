import { useEffect, useState } from "react";
import { CloudOff } from "lucide-react";

/** Quiet, non-blocking notice when the visitor goes offline. */
export function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4"
    >
      <p className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-tiny font-medium text-fg-2 shadow-lift">
        <CloudOff size={14} className="text-warning" aria-hidden />
        You're offline — the site still works, messages will send when you're back.
      </p>
    </div>
  );
}
