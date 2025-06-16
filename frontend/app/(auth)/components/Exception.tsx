'use client';

export default function Exception({ error }: { error?: string }) {
  return <div className="text-red-500">{error}</div>;
}
