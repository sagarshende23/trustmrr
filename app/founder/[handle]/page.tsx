"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdvertisementCard from "@/components/AdvertisementCard";
import AddStartupModal from "@/components/AddStartupModal";
import AdvertiseModal from "@/components/AdvertiseModal";
import { mockStartups } from "@/lib/mockStartups";
import { leftAds, rightAds } from "@/lib/advertisements";

function parseCurrency(value: string): number {
  if (value === "-") return 0;
  // Handle formats like "$1,234,567" or "$1.23M" or "$123K"
  const cleaned = value.replace(/[$,]/g, "");
  if (cleaned.includes("M")) {
    return parseFloat(cleaned.replace("M", "")) * 1_000_000;
  }
  if (cleaned.includes("K")) {
    return parseFloat(cleaned.replace("K", "")) * 1_000;
  }
  return parseFloat(cleaned) || 0;
}

function formatCurrency(value: number): string {
  if (value === 0) return "-";
  // Format as $1,234,567 (with commas)
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export default function FounderPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdvertiseModalOpen, setIsAdvertiseModalOpen] = useState(false);
  
  // Get all startups by this founder
  const founderStartups = mockStartups.filter(
    (startup) => startup.founderHandle.toLowerCase() === handle.toLowerCase()
  );

  if (founderStartups.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-white">Founder not found</h1>
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

  // Calculate totals
  const totalRevenue = founderStartups.reduce(
    (sum, startup) => sum + parseCurrency(startup.revenue),
    0
  );
  
  const totalLast30Days = founderStartups.reduce(
    (sum, startup) => sum + parseCurrency(startup.stats.last30Days.value),
    0
  );
  
  const totalMRR = founderStartups.reduce(
    (sum, startup) => {
      const mrr = parseCurrency(startup.stats.mrr.value);
      return sum + (mrr > 0 ? mrr : 0);
    },
    0
  );

  const founderName = founderStartups[0].founder;
  const founderHandle = founderStartups[0].founderHandle;
  const twitterUrl = `https://twitter.com/${founderHandle}`;

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 min-h-0 overflow-hidden">
        <div className="flex gap-6 max-w-[1800px] mx-auto px-4 py-6 h-full min-h-0">
          {/* Left Sidebar */}
          <aside className="hidden xl:block w-56 flex-shrink-0 overflow-y-auto custom-scrollbar">
            <div className="space-y-3">
              {leftAds.map((ad, index) => (
                <AdvertisementCard key={index} {...ad} compact />
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <section className="flex-1 min-w-0 min-h-0 h-full overflow-y-auto custom-scrollbar">
            {/* Profile Header */}
            <div className="mb-10">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div className="flex items-start gap-6 flex-1">
                  {/* Profile Picture */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 border-2 border-gray-800/50">
                    <span className="text-4xl font-bold text-white">
                      {founderName.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 pt-1">
                    <h1 className="text-4xl font-bold mb-2 text-white">
                      @{founderHandle}
                    </h1>
                    <p className="text-base text-gray-400">
                      {founderStartups.length} startup{founderStartups.length !== 1 ? 's' : ''} with verified revenue
                    </p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-3 flex-shrink-0 pt-1">
                  <button className="px-5 py-2.5 bg-[#1a1a1a] border border-gray-800 rounded-lg text-sm font-medium text-white hover:bg-[#2a2a2a] hover:border-gray-700 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                  <a 
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#1a1a1a] border border-gray-800 rounded-lg text-sm font-medium text-white hover:bg-[#2a2a2a] hover:border-gray-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Visit X profile
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
                  <p className="text-xs text-gray-500 mb-2">Total revenue</p>
                  <p className="text-2xl font-bold text-white mb-1">
                    {formatCurrency(totalRevenue)}
                  </p>
                  <p className="text-xs text-gray-600">Across all startups</p>
                </div>
                
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
                  <p className="text-xs text-gray-500 mb-2">Last 30 days</p>
                  <p className="text-2xl font-bold text-white mb-1">
                    {formatCurrency(totalLast30Days)}
                  </p>
                  <p className="text-xs text-gray-600">Recent revenue</p>
                </div>
                
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <p className="text-xs text-gray-500">Total MRR (estimated)</p>
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">
                    {formatCurrency(totalMRR)}
                  </p>
                  <p className="text-xs text-gray-600">Across all startups</p>
                </div>
                
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
                  <p className="text-xs text-gray-500 mb-2">Startups</p>
                  <p className="text-2xl font-bold text-white mb-1">
                    {founderStartups.length}
                  </p>
                  <p className="text-xs text-gray-600">Active startups</p>
                </div>
              </div>
            </div>

            {/* Startups Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Startups by @{founderHandle}
              </h2>
              
              <div className="space-y-4">
                {founderStartups.map((startup) => (
                  <Link
                    key={startup.id}
                    href={`/startup/${startup.id}`}
                    className="block border border-gray-800 rounded-lg p-6 hover:bg-[#1a1a1a] hover:border-gray-700 transition-colors bg-black"
                  >
                    <div className="flex items-start gap-6">
                      {/* Logo - Square with gradient */}
                      {startup.logo ? (
                        <div className="w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-orange-400 via-yellow-400 to-green-400">
                          <Image
                            src={startup.logo}
                            alt={startup.name}
                            width={48}
                            height={48}
                            className="invert opacity-90"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                          <span className="text-4xl font-semibold text-white">
                            {startup.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0 pt-1">
                        <h3 className="font-bold text-2xl mb-2 text-white">
                          {startup.name}
                        </h3>
                        <p className="text-base text-gray-400 mb-5">
                          {startup.description}
                        </p>
                        <div>
                          <p className="text-xs text-gray-500 mb-1.5">Total revenue</p>
                          <p className="font-bold text-2xl text-white">
                            {startup.revenue}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Section - Database Search */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                The database of verified startup revenues
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-3xl mx-auto">
                <div className="relative flex-1 w-full">
                  <svg 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search startups, founders, categories..."
                    className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
                  />
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  <span className="text-lg">+</span>
                  <span>Add startup</span>
                </button>
              </div>
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-56 flex-shrink-0 overflow-y-auto custom-scrollbar">
            <div className="space-y-3">
              {rightAds.map((ad, index) => (
                <AdvertisementCard key={index} {...ad} compact />
              ))}
              
              <button 
                onClick={() => setIsAdvertiseModalOpen(true)}
                className="w-full py-2.5 border border-gray-800 rounded-lg text-gray-400 hover:text-white hover:border-gray-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <span className="text-base">📢</span>
                <span>Advertise</span>
              </button>
            </div>
          </aside>
        </div>
      </main>

      <AddStartupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AdvertiseModal isOpen={isAdvertiseModalOpen} onClose={() => setIsAdvertiseModalOpen(false)} />
    </div>
  );
}
