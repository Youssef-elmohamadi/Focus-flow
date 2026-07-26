// components/common/Loader.tsx
import React from 'react';

export const Loader: React.FC = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
  </div>
);
