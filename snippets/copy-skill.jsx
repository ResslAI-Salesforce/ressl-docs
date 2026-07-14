export const CopySkill = () => {
  const [status, setStatus] = useState("idle");

  const copySkill = async () => {
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/skill.md");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const label =
    status === "loading"
      ? "Copying…"
      : status === "copied"
        ? "Copied!"
        : status === "error"
          ? "Copy failed"
          : "Copy skill";

  return (
    <div className="not-prose my-4 flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
      <button
        type="button"
        onClick={copySkill}
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        aria-live="polite"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {status === "copied" ? (
            <path d="M20 6 9 17l-5-5" />
          ) : (
            <>
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </>
          )}
        </svg>
        {label}
      </button>
      <p className="m-0 text-sm text-zinc-600 dark:text-zinc-400">
        Copy the agent skill to your clipboard, or load it from{" "}
        <a href="/skill.md" className="underline underline-offset-2">
          /skill.md
        </a>
        .
      </p>
    </div>
  );
};
