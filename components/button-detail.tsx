'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const ButtonDetail: React.FC<{ path: string, id: string }> = ({ path, id }) => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="block ml-auto"
      size="sm"
      onClick={() => router.push(path + '/' +id)}
    >
      Details
    </Button>
  );
};

export default ButtonDetail