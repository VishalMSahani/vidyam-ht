import { cx } from "@/utils/cx";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cx("flex max-w-2xl flex-col gap-4", className)}>
      <p className="text-caption-1-semibold uppercase tracking-widest text-accent-700">{eyebrow}</p>
      <h2 className="text-display-4-medium text-text-primary md:text-display-3-medium">{title}</h2>
      {description && <p className="text-body-regular text-text-secondary sm:text-body-2-regular">{description}</p>}
    </div>
  );
}
