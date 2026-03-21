"use client";

export default function CompanyIcon({
  iconKey,
  pathData,
}: {
  iconKey: string;
  pathData: string;
}) {
  /* The Cocoon icon is too complex for a single path, so we render it differently */
  if (iconKey === "cocoon") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className="w-8 h-8 fill-fg"
      >
        {/* Simplified outer ring representation */}
        <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="12" r="3" />
        <circle cx="32" cy="52" r="3" />
        <circle cx="12" cy="32" r="3" />
        <circle cx="52" cy="32" r="3" />
        <circle cx="18" cy="18" r="2.5" />
        <circle cx="46" cy="18" r="2.5" />
        <circle cx="18" cy="46" r="2.5" />
        <circle cx="46" cy="46" r="2.5" />
        <circle cx="14" cy="25" r="2" />
        <circle cx="50" cy="25" r="2" />
        <circle cx="14" cy="39" r="2" />
        <circle cx="50" cy="39" r="2" />
        <circle cx="25" cy="14" r="2" />
        <circle cx="39" cy="14" r="2" />
        <circle cx="25" cy="50" r="2" />
        <circle cx="39" cy="50" r="2" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      className="w-8 h-8 fill-fg"
    >
      <path d={pathData} />
    </svg>
  );
}
