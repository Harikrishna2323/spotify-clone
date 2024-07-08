import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarItemProps {
  label: string;
  active?: boolean;
  icon: JSX.Element;
  href: string;
}

export const SidebarItem = ({
  label,
  active,
  href,
  icon,
}: SidebarItemProps) => {
  return (
    <Link
      key={label}
      href={href}
      className={cn(
        `
    flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer  transition  py-1`,
        active && "text-primary"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};
