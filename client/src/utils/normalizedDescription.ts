export default function normalizeDescription(description: string): string {
  const newDescription = description.slice(4, 120);
  return newDescription;
}
