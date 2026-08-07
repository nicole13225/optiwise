type ResultCardProps = {
  label: string;
  value: string;
};

export default function ResultCard({
  label,
  value,
}: ResultCardProps) {
  return (
    <div className="rounded-2xl bg-gray-100 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}