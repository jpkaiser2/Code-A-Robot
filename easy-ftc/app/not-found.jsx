import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Well, how did I get here?</h2>
        <p className="text-lg mb-8">This is not my beautiful webpage!</p>
        <p className="text-lg mb-8">This is not my beautiful link!</p>
        <Link 
          href="/"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
        >
          Back to the real world
        </Link>
      </div>
    </div>
  );
} 