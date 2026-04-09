import { Check } from "lucide-react";

import { PRICING_COMPARE } from "@/lib/constants";

function renderCell(value: string | boolean) {
  if (typeof value === "boolean") {
    return value ? <Check className="mx-auto h-4 w-4 text-success" /> : <span className="text-[#2A2A2A]">—</span>;
  }

  return <span>{value}</span>;
}

export function FeatureTable() {
  return (
    <div className="overflow-x-auto rounded-[16px] border border-border bg-[#0A0A0A]">
      <table className="min-w-[920px] w-full text-left text-sm">
        <thead className="border-b border-border bg-[#111111]">
          <tr>
            <th className="px-6 py-4 font-semibold text-white">Feature</th>
            <th className="px-6 py-4 text-center font-semibold text-white">Starter</th>
            <th className="px-6 py-4 text-center font-semibold text-white">Professional</th>
            <th className="px-6 py-4 text-center font-semibold text-white">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {PRICING_COMPARE.map(([feature, starter, pro, enterprise], index) => (
            <tr key={feature} className={index % 2 === 0 ? "bg-[#0A0A0A]" : "bg-[#080808]"}>
              <td className="px-6 py-4 text-secondary">{feature}</td>
              <td className="px-6 py-4 text-center text-secondary">{renderCell(starter)}</td>
              <td className="px-6 py-4 text-center text-secondary">{renderCell(pro)}</td>
              <td className="px-6 py-4 text-center text-secondary">{renderCell(enterprise)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
