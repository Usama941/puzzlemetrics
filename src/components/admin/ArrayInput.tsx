"use client";

import { TagInput } from "@/components/admin/TagInput";

type Props = {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

/** @deprecated Prefer TagInput directly */
export function ArrayInput({ label, value, onChange, placeholder }: Props) {
  return <TagInput label={label} value={value} onChange={onChange} placeholder={placeholder} />;
}
