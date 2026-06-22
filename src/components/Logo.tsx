import Image from "next/image";

interface LogoProps {
  size?: number;
  priority?: boolean;
}

export default function Logo({ size = 32, priority = false }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="PuzzleMetrics logo"
      width={size}
      height={size}
      priority={priority}
      style={{ display: "block" }}
    />
  );
}
