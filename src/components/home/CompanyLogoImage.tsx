"use client";

import type { CompanyLogo } from "@prisma/client";
import { useState } from "react";
import { resolveCompanyLogoSrc } from "@/lib/company-logo-url";

type Props = {
  item: CompanyLogo;
  variant: "trusted" | "partner";
};

export const CompanyLogoImage = ({ item, variant }: Props) => {
  const [imgFailed, setImgFailed] = useState(false);
  const src = resolveCompanyLogoSrc(item.logo);
  const hasLogo = Boolean(item.logo?.trim());
  const showImage = hasLogo && !imgFailed;

  if (!showImage) {
    if (variant === "partner") {
      return <span className="partner-logo-fallback">{item.name}</span>;
    }
    return <span className="trusted-logo-fallback">{item.name}</span>;
  }

  const imgClass = variant === "trusted" ? "trusted-logo-img" : "partner-logo-img";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={item.name}
      title={item.logo || "no url"}
      className={imgClass}
      onError={(e) => {
        e.currentTarget.style.display = "none";
        setImgFailed(true);
      }}
    />
  );
};
