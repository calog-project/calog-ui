export function highlightText(text: string, keyword: string): React.ReactNode {
  if (!keyword.trim()) return text;

  const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^(${safeKeyword})`, 'i');
  const match = text.match(regex);

  if (!match) return text;

  const matchedPart = match[0];
  const remaining = text.slice(matchedPart.length);

  return (
    <>
      <span className="bg-blue-76  text-black rounded px-1">{matchedPart}</span>
      <span>{remaining}</span>
    </>
  );
}
