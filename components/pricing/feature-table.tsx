import { Check } from "lucide-react";

type CellValue = string | boolean;

const PRICING_COMPARE_GLOBAL: [string, CellValue, CellValue, CellValue, CellValue][] = [
  ["Concurrent calls", "1", "10", "Unlimited", "Custom pools"],
  ["Included minutes", "100 test minutes", "2,500 minutes", "10,000 minutes", "Committed enterprise volume"],
  ["Overage rate (INR)", "No production use", "INR 2.25 / min", "INR 1.75 / min", "Contract pricing"],
  ["Overage rate (USD)", "No production use", "$0.03 / min", "$0.02 / min", "Contract pricing"],
  ["Inbound automation", true, true, true, true],
  ["Outbound campaigns", false, true, true, true],
  ["Regional languages", false, true, true, true],
  ["Voice cloning", false, false, true, true],
  ["Webhook integrations", false, true, true, true],
  ["SSO + RBAC", false, false, true, true],
  ["SLA", false, false, true, true]
];

function renderCell(value: CellValue) {
  if (typeof value === "boolean") {
    return value ? <Check className="mx-auto h-4 w-4 text-success" /> : <span className="text-[#2A2A2A]">-</span>;
  }

  return <span>{value}</span>;
}

export function FeatureTable() {
  return (
    <div className="overflow-x-auto rounded-[16px] border border-border bg-[#0A0A0A]">
      <table className="w-full min-w-[1080px] text-left text-sm">
        <thead className="border-b border-border bg-[#111111]">
          <tr>
            <th className="px-6 py-4 font-semibold text-white">Feature</th>
            <th className="px-6 py-4 text-center font-semibold text-white">Starter</th>
            <th className="px-6 py-4 text-center font-semibold text-white">Professional</th>
            <th className="px-6 py-4 text-center font-semibold text-white">Enterprise</th>
            <th className="px-6 py-4 text-center font-semibold text-white">Custom</th>
          </tr>
        </thead>
        <tbody>
          {PRICING_COMPARE_GLOBAL.map(([feature, starter, pro, enterprise, custom], index) => (
            <tr key={feature} className={index % 2 === 0 ? "bg-[#0A0A0A]" : "bg-[#080808]"}>
              <td className="px-6 py-4 text-secondary">{feature}</td>
              <td className="px-6 py-4 text-center text-secondary">{renderCell(starter)}</td>
              <td className="px-6 py-4 text-center text-secondary">{renderCell(pro)}</td>
              <td className="px-6 py-4 text-center text-secondary">{renderCell(enterprise)}</td>
              <td className="px-6 py-4 text-center text-secondary">{renderCell(custom)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
