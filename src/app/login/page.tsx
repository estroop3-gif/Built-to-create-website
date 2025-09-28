import { Metadata } from 'next';
import AuthForm from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Login — Born to Create Project',
  description: 'Sign in to access your courses and retreat content.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center bg-sage-50">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900/10 to-sage-600/20 nature-texture opacity-20"></div>

        <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-soft p-8">
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl font-bold text-ink-900 mb-2">
                Welcome Back
              </h1>
              <p className="font-body text-ink-600">
                Sign in to access your courses and retreat content
              </p>
            </div>

            <AuthForm mode="login" />
          </div>
        </div>
      </section>
    </main>
  );
}