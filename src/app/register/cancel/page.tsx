import Link from 'next/link';

export default function RegistrationCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-yellow-500 text-6xl mb-6">⏸️</div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Registration Canceled
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your registration was canceled and no payment was processed. 
          If this was a mistake, you can try registering again.
        </p>
        
        <div className="space-y-3">
          <Link 
            href="/register"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Try Again
          </Link>
          
          <Link 
            href="/"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Return Home
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Questions? <Link href="/contact" className="text-green-600 hover:text-green-700 underline">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Registration Canceled - The Born to Create Project',
  description: 'Your registration was canceled. You can try again anytime.',
};