import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StartupCard from "@/components/StartupCard";
import { mockStartups } from "@/lib/mockStartups";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Filter startups by category
  const startups = mockStartups.filter(
    (startup) => startup.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-6">
          <Link 
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to all categories
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            {categoryName} Startups
          </h1>
          <p className="text-sm text-gray-400">
            Verified revenue from startups in {categoryName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {startups.map((startup) => (
            <StartupCard key={startup.rank} {...startup} />
          ))}
        </div>

        {startups.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-4">
              No startups in this category yet
            </p>
            <Link 
              href="/add-startup"
              className="inline-block px-6 py-2.5 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Be the first to add yours
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
