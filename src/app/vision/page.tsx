import React from 'react';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/linkToken';
import VisionWorkshopClient from './VisionWorkshopClient';

interface SearchParams {
  t?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const _params = await searchParams;
  
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://thebtcp.com' 
    : 'http://localhost:3000';
  
  return {
    title: 'Our Vision for Creators - Born to Create Project',
    description: 'A workshop clarifying why your work matters and giving you a framework to move your calling forward.',
    robots: 'noindex,nofollow',
    canonical: `${baseUrl}/vision`,
  };
}

export default async function VisionPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.t;

  // Token validation - return 404 if missing or invalid
  if (!token) {
    redirect('/404');
  }

  const { valid } = await verifyToken(token);
  if (!valid) {
    redirect('/404');
  }

  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <VisionWorkshopClient />
    </>
  );
}