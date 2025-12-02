'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      if (mode === 'register') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          setMessage('Check your email for a confirmation link to complete your registration.');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          router.push('/account');
          router.refresh();
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/account`,
        },
      });

      if (error) throw error;

      setMessage('Check your email for a magic login link!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {message && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-600 text-sm">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-ink-700 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400 transition-colors"
              placeholder="Enter your full name"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400 transition-colors"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-ink-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-forest-200 focus:border-forest-400 transition-colors"
            placeholder="Enter your password"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-forest-600 text-cream-50 py-3 px-4 rounded-lg font-medium hover:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : mode === 'register' ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-sage-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-ink-500">Or</span>
        </div>
      </div>

      <button
        onClick={handleMagicLink}
        disabled={isLoading || !email}
        className="w-full bg-sage-100 text-ink-700 py-3 px-4 rounded-lg font-medium hover:bg-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send Magic Link
      </button>

      <div className="text-center">
        <p className="text-sm text-ink-600">
          {mode === 'register' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link
            href={mode === 'register' ? '/auth/login' : '/auth/register'}
            className="text-forest-600 hover:text-forest-700 font-medium"
          >
            {mode === 'register' ? 'Sign in' : 'Create account'}
          </Link>
        </p>
      </div>
    </div>
  );
}