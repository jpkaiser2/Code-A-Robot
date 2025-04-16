import Link from 'next/link';

export default async function Home() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center text-center gap-12 px-6">
      <h1 className="text-5xl font-bold">Welcome to EasyFTC</h1>
      <p className="text-xl text-foreground/80 max-w-2xl">
        Learn everything you need to know about FIRST Tech Challenge robotics programming, from basic concepts to advanced techniques.
      </p>
      <div className="flex gap-4">
        <Link
          href="/sign-up"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium"
        >
          Get Started
        </Link>
        <Link
          href="/sign-in"
          className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 font-medium"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
