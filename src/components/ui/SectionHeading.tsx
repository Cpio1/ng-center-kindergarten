import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  icon: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  icon,
  title,
  lead,
  align = "left",
  id,
  className = "",
}: Props) {
  const center = align === "center";
  return (
    <div
      className={`reveal ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <p className="eyebrow">
        <span
          aria-hidden
          className="grid size-6 place-items-center rounded-full"
        >
          {icon}
        </span>
        {eyebrow}
      </p>
      <h2 id={id} className="h2 mt-3 text-ink text-balance">
        {title}
      </h2>
      {lead ? <p className="lead mt-3 text-pretty">{lead}</p> : null}
    </div>
  );
}
