import { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  bgColor?: string;
};

const DashboardCard = ({
  title,
  value,
  subtitle,
  icon,
  bgColor = "bg-slate-50",
}: DashboardCardProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-200 p-5 shadow-sm transition hover:shadow-md ${bgColor}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>

        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-slate-700 shadow-sm">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
