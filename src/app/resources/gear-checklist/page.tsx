import React from 'react';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/linkToken';
import GearChecklistClient from '@/components/GearChecklistClient';

interface SearchParams {
  t?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function GearChecklistPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.t;

  // Redirect to 404 if no token provided
  if (!token) {
    redirect('/404');
  }

  // Verify the token
  const { valid, payload } = await verifyToken(token);
  if (!valid) {
    redirect('/404');
  }

  // Extract user information from payload
  let userEmail: string | undefined;
  if (payload) {
    const parts = payload.split(':');
    if (parts.length >= 2) {
      const identifier = parts[1];
      // Simple email detection - in production you might want to fetch from database
      if (identifier.includes('@')) {
        userEmail = identifier;
      }
    }
  }

  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <GearChecklistClient userEmail={userEmail} />
    </>
  );
}