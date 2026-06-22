"use client";

type Props = {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
};

export function ToggleSwitch({ label, checked, onChange, disabled, "aria-label": ariaLabel }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel ?? (label || "Toggle")}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-left"
    >
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#6055D9]" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </span>
      <span className="text-sm text-white/80">{label}</span>
    </button>
  );
}
