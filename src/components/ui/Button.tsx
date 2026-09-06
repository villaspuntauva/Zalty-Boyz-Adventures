import type { AnchorHTMLAttributes } from "react";
import { Link } from "@/i18n/navigation";
import type { StaticPathnames } from "@/i18n/routing";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 focus-visible:bg-brand-700",
  secondary:
    "bg-white text-brand-700 border border-brand-300 hover:bg-brand-50",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1fb958]",
  ghost: "bg-transparent text-inherit hover:bg-black/5",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors min-h-11 min-w-11";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type InternalProps = CommonProps & {
  href: StaticPathnames;
  external?: false;
  onClick?: () => void;
};

type ExternalProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external: true;
  };

export function CTAButton(props: InternalProps | ExternalProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (props.external) {
    const { href, target, rel } = props as ExternalProps;
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        className={classes}
      >
        {children}
      </a>
    );
  }

  const { href, onClick } = props as InternalProps;
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
