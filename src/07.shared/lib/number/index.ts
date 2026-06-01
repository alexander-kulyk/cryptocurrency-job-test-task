export const formatDecimal = (
  value: string | number | undefined,
  maximumFractionDigits = 3,
): string => {
  if (value === undefined || value === "") {
    return "";
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return String(value);
  }

  return parsed.toLocaleString("en-US", {
    maximumFractionDigits,
    useGrouping: false,
  });
};
