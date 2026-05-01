import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Card({ className, children, glass = false, ...props }) {
  return (
    <div 
      className={cn(
        "rounded-2xl p-6",
        glass ? "glass" : "bg-white shadow-xl border border-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
