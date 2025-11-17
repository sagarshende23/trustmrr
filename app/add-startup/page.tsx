import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AddStartupPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            Add Your Startup
          </h1>
          <p className="text-gray-400">
            Share your verified revenue with the world
          </p>
        </div>

        <div className="border border-gray-800 rounded-lg p-6 md:p-8 mb-6 bg-black">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">How it works</h2>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3 text-gray-400">
                  <span className="flex-shrink-0 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-semibold">
                    1
                  </span>
                  <span>Connect your Stripe account to verify your revenue</span>
                </li>
                <li className="flex gap-3 text-gray-400">
                  <span className="flex-shrink-0 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-semibold">
                    2
                  </span>
                  <span>Add your startup information and description</span>
                </li>
                <li className="flex gap-3 text-gray-400">
                  <span className="flex-shrink-0 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-semibold">
                    3
                  </span>
                  <span>Your startup appears on the leaderboard automatically</span>
                </li>
              </ol>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <h3 className="font-bold mb-3 text-sm text-white">Why add your startup?</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✅ Build trust with verified revenue</li>
                <li>✅ Get discovered by potential customers</li>
                <li>✅ Join a community of transparent founders</li>
                <li>✅ Track your growth over time</li>
              </ul>
            </div>

            <div className="pt-4">
              <button className="w-full px-6 py-2.5 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                Connect with Stripe
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                Your Stripe credentials are secure and encrypted
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to leaderboard
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
