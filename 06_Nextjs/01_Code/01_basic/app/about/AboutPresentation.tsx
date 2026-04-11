'use client';

import { use } from 'react';

interface AboutPresentationProps {
  data: Promise<{
    message: string;
    timestamp: string;
  }>;
}

export default function AboutPresentation({ data }: AboutPresentationProps) {
  const resolvedData = use(data);

  return (
    <div>
      <h1>About Page</h1>
      <pre>{JSON.stringify(resolvedData, null, 2)}</pre>
    </div>
  );
}
