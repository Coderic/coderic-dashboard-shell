export type BrandMarkProps = {
  title: string;
  subtitle?: string;
};

export function BrandMark({ title, subtitle }: BrandMarkProps) {
  const label = subtitle?.trim();
  return (
    <span className="dsh-brand" role="img" aria-label={label ? `${title} ${label}` : title}>
      <span className="dsh-brand__title">{title}</span>
      {label ? <span className="dsh-brand__subtitle">{label}</span> : null}
    </span>
  );
}
