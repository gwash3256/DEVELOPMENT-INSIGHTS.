import Container from "@/components/shared/Container";

export default function Home() {
  return (
    <Container className="py-12 md:py-24">
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Development Insights</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
          Your source for technical knowledge, best practices, and development insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/articles"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            Read Articles
          </a>
          <a
            href="/about"
            className="inline-block px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 font-medium transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </Container>
  );
}