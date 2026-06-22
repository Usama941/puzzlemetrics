"use client";

import { useEffect, useState } from "react";
import { SocialPlatformIcon, socialPlatformLabel } from "@/components/shared/SocialPlatformIcon";

type SocialLinkItem = {
  id: string;
  platform: string;
  url: string;
  order: number;
};

export const FooterSocialLinks = () => {
  const [links, setLinks] = useState<SocialLinkItem[]>([]);

  useEffect(() => {
    fetch("/api/public/social-links")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: SocialLinkItem[]) => setLinks(Array.isArray(data) ? data : []))
      .catch(() => setLinks([]));
  }, []);

  if (links.length === 0) return null;

  return (
    <div className="mt-1 flex flex-wrap gap-2.5">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialPlatformLabel(link.platform)}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[var(--border-color)] bg-[rgba(0,0,0,0.04)] text-[var(--text-muted)] transition-all duration-200 ease-in-out hover:border-[#6055D9] hover:bg-[rgba(96,85,217,0.08)] hover:text-[#6055D9] dark:bg-[rgba(255,255,255,0.06)]"
        >
          <SocialPlatformIcon platform={link.platform} size={20} />
        </a>
      ))}
    </div>
  );
};
