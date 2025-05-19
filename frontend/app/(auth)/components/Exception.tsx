'use client';

import { useEffect, useState } from 'react';

export default function Exception({ error }: { error?: string }) {
  const [showError, setShowError] = useState(true);

  // set timeout to hide error

  return <div className="text-red-500">{error}</div>;
}
