"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StartupCard from "@/components/StartupCard";
import AddStartupModal from "@/components/AddStartupModal";
import AdvertiseModal from "@/components/AdvertiseModal";
import AdvertisementCard from "@/components/AdvertisementCard";
import { mockStartups } from "@/lib/mockStartups";
import { leftAds, rightAds } from "@/lib/advertisements";

const categories = [
  "Software", "Apps", "Subscriptions", "Consulting", "Education", 
  "Media", "Gaming", "IT Services", "Digital", "Internet", 
  "Professional", "Advertising", "Accounting", "Healthcare", 
  "Restaurants", "Retail", "Travel", "Finance", "Real Estate"
];

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdvertiseModalOpen, setIsAdvertiseModalOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const allStartups = mockStartups;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 50, allStartups.length));
  };

  // Search functionality
  const getSearchResults = (query: string) => {
    if (!query.trim()) return { startups: [], founders: [], categories: [] };

    const lowerQuery = query.toLowerCase();
    const startups = allStartups
      .filter(
        (startup) =>
          startup.name.toLowerCase().includes(lowerQuery) ||
          startup.description.toLowerCase().includes(lowerQuery) ||
          startup.founder.toLowerCase().includes(lowerQuery) ||
          startup.founderHandle.toLowerCase().includes(lowerQuery) ||
          startup.category.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5);

    const founderMap = new Map<string, { handle: string; name: string }>();
    allStartups
      .filter(
        (startup) =>
          startup.founder.toLowerCase().includes(lowerQuery) ||
          startup.founderHandle.toLowerCase().includes(lowerQuery)
      )
      .forEach((startup) => {
        if (!founderMap.has(startup.founderHandle)) {
          founderMap.set(startup.founderHandle, {
            handle: startup.founderHandle,
            name: startup.founder,
          });
        }
      });
    const founders = Array.from(founderMap.values()).slice(0, 3);

    const matchingCategories = categories.filter((cat) =>
      cat.toLowerCase().includes(lowerQuery)
    ).slice(0, 3);

    return { startups, founders, categories: matchingCategories };
  };

  const searchResults = getSearchResults(searchQuery);
  const hasResults =
    searchResults.startups.length > 0 ||
    searchResults.founders.length > 0 ||
    searchResults.categories.length > 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.trim().length > 0);
  };

  const handleSuggestionClick = (type: string, value: string | number) => {
    setSearchQuery("");
    setShowSuggestions(false);
    if (type === "startup") {
      router.push(`/startup/${value}`);
    } else if (type === "founder") {
      router.push(`/founder/${value}`);
    } else if (type === "category") {
      router.push(`/category/${value.toLowerCase().replace(" ", "-")}`);
    }
  };

  const filteredStartups = searchQuery.trim()
    ? allStartups.filter(
        (startup) =>
          startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          startup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          startup.founder.toLowerCase().includes(searchQuery.toLowerCase()) ||
          startup.founderHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          startup.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allStartups;

  const visibleStartups = (searchQuery.trim() ? filteredStartups : allStartups).slice(0, displayCount);
  const hasMore = displayCount < (searchQuery.trim() ? filteredStartups : allStartups).length;
  const remainingCount = (searchQuery.trim() ? filteredStartups : allStartups).length - displayCount;

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      <Header />

      {/* Main Layout with Fixed Sidebars */}
      <div className="flex gap-6 max-w-[1800px] mx-auto px-4 py-4 flex-1 overflow-hidden">
        {/* Left Sidebar - Fixed */}
        <aside className="hidden xl:block w-56 flex-shrink-0 overflow-y-auto custom-scrollbar">
          <div className="space-y-3">
            {leftAds.map((ad, index) => (
              <AdvertisementCard key={index} {...ad} compact />
            ))}
          </div>
        </aside>

        {/* Main Content - Scrollable Only */}
        <main className="flex-1 min-w-0 overflow-y-auto pb-10 custom-scrollbar">
          {/* Hero Section */}
          <div className="text-center mb-10 pt-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              The database of verified startup revenues
            </h2>

            {/* Search and Add Button */}
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
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(searchQuery.trim().length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Search startups, founders, categories..."
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
                />
                
                {/* Search Suggestions Dropdown */}
                {showSuggestions && hasResults && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-xl max-h-96 overflow-y-auto custom-scrollbar z-50">
                    {/* Startups */}
                    {searchResults.startups.length > 0 && (
                      <div className="p-2">
                        <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase">Startups</div>
                        {searchResults.startups.map((startup) => (
                          <button
                            key={startup.id}
                            onClick={() => handleSuggestionClick("startup", startup.id)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2a2a2a] transition-colors text-left"
                          >
                            {startup.logo ? (
                              <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-pink-500 to-purple-600">
                                <Image
                                  src={startup.logo}
                                  alt={startup.name}
                                  width={20}
                                  height={20}
                                  className="invert opacity-90"
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600">
                                <span className="text-sm font-semibold text-white">
                                  {startup.name.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-white truncate">{startup.name}</div>
                              <div className="text-xs text-gray-400 truncate">{startup.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Founders */}
                    {searchResults.founders.length > 0 && (
                      <div className="p-2 border-t border-gray-800">
                        <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase">Founders</div>
                        {searchResults.founders.map((founder, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick("founder", founder.handle)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2a2a2a] transition-colors text-left"
                          >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600">
                              <span className="text-sm font-semibold text-white">
                                {founder.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-white">@{founder.handle}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Categories */}
                    {searchResults.categories.length > 0 && (
                      <div className="p-2 border-t border-gray-800">
                        <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase">Categories</div>
                        {searchResults.categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => handleSuggestionClick("category", category)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2a2a2a] transition-colors text-left"
                          >
                            <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 bg-[#2a2a2a] border border-gray-800">
                              <span className="text-xs font-semibold text-gray-400">
                                {category.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-white">{category}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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

          {/* Leaderboard Section */}
          <section className="mb-10">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-[#0a0a0a] rounded-lg border border-gray-900">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-900">
                <h3 className="text-lg font-semibold text-white">Leaderboard</h3>
                
                <div className="flex gap-3">
                  <select className="bg-black border border-gray-800 rounded-md px-3 py-1.5 pr-8 text-sm text-white focus:outline-none focus:border-gray-700 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20width%3d%2210%22%20height%3d%226%22%20viewBox%3d%220%200%2010%206%22%20fill%3d%22none%22%20xmlns%3d%22http%3a//www.w3.org/2000/svg%22%3e%3cpath%20d%3d%22M1%201L5%205L9%201%22%20stroke%3d%22%23999%22%20stroke-width%3d%221.5%22%20stroke-linecap%3d%22round%22%20stroke-linejoin%3d%22round%22/%3e%3c/svg%3e')] bg-[length:10px] bg-[position:right_0.5rem_center] bg-no-repeat">
                    <option>Revenue</option>
                    <option>MRR</option>
                  </select>
                  <select className="bg-black border border-gray-800 rounded-md px-3 py-1.5 pr-8 text-sm text-white focus:outline-none focus:border-gray-700 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20width%3d%2210%22%20height%3d%226%22%20viewBox%3d%220%200%2010%206%22%20fill%3d%22none%22%20xmlns%3d%22http%3a//www.w3.org/2000/svg%22%3e%3cpath%20d%3d%22M1%201L5%205L9%201%22%20stroke%3d%22%23999%22%20stroke-width%3d%221.5%22%20stroke-linecap%3d%22round%22%20stroke-linejoin%3d%22round%22/%3e%3c/svg%3e')] bg-[length:10px] bg-[position:right_0.5rem_center] bg-no-repeat">
                    <option>All time</option>
                    <option>This month</option>
                    <option>This year</option>
                  </select>
                </div>
              </div>
              {visibleStartups.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
                  <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-900 bg-black">
                      <th className="text-left py-3 px-6 font-medium text-xs text-gray-500 uppercase tracking-wide">#</th>
                      <th className="text-left py-3 px-6 font-medium text-xs text-gray-500 uppercase tracking-wide">Startup</th>
                      <th className="text-left py-3 px-6 font-medium text-xs text-gray-500 uppercase tracking-wide">Founder</th>
                      <th className="text-left py-3 px-6 font-medium text-xs text-gray-500 uppercase tracking-wide">Revenue</th>
                      <th className="text-left py-3 px-6 font-medium text-xs text-gray-500 uppercase tracking-wide">MRR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleStartups.map((startup) => (
                    <tr 
                      key={startup.rank}
                      className="border-b border-gray-900 hover:bg-[#111111] transition-colors cursor-pointer"
                      onClick={() => router.push(`/startup/${startup.id}`)}
                    >
                      <td className="py-4 px-6 text-sm align-middle">
                        <span className="text-base">{startup.medal || `${startup.rank}`}</span>
                      </td>
                      <td className="py-4 px-6 align-middle">
                        <div className="flex items-center gap-3">
                          {startup.logo ? (
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-pink-500 to-purple-600">
                              <Image
                                src={startup.logo}
                                alt={startup.name}
                                width={24}
                                height={24}
                                className="invert opacity-90"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600">
                              <span className="text-base font-semibold text-white">
                                {startup.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-white mb-0.5">{startup.name}</div>
                            <div className="text-xs text-gray-400 line-clamp-1">
                              {startup.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm align-middle">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm">👤</span>
                          </div>
                          <Link 
                            href={`/founder/${startup.founderHandle}`}
                            className="text-gray-300 hover:text-white text-sm transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            @{startup.founder}
                          </Link>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm align-middle">
                        <div className="font-semibold text-white text-sm">
                          {startup.revenue}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm align-middle">
                        <div className={`font-semibold text-sm ${startup.mrr !== "-" ? "text-white" : "text-gray-600"}`}>
                          {startup.mrr}
                        </div>
                      </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {visibleStartups.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
                  <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
                </div>
              ) : (
                visibleStartups.map((startup) => (
                  <div key={startup.rank} onClick={() => router.push(`/startup/${startup.id}`)}>
                    <StartupCard {...startup} />
                  </div>
                ))
              )}
            </div>

            {/* Show More Button */}
            {hasMore && (
              <div className="mt-5 text-center">
                <button 
                  onClick={loadMore}
                  className="px-6 py-2.5 border border-gray-800 rounded-lg text-sm font-medium hover:bg-[#111111] hover:border-gray-700 transition-colors text-white"
                >
                  Show more ({remainingCount} more startups)
                </button>
              </div>
            )}

            <p className="text-center mt-4 text-xs text-gray-600 flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              All revenue is verified through Stripe API keys. Data is updated hourly.
            </p>
          </section>

          {/* Warren Buffett Quote Section */}
          <section className="mb-10">
            <div className="text-center py-12 bg-[#0a0a0a] rounded-lg border border-gray-900 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xl font-semibold mb-2 text-white">Warren Buffett</p>
                <p className="text-lg text-gray-400">
                  $1 or $1,000,000?
          </p>
        </div>
              {/* Warren Buffett Illustration Placeholder */}
              <div className="mt-6 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-6xl">
                  👴🏻
                </div>
              </div>
            </div>
          </section>

          {/* Repeat Hero CTA */}
          <section className="mb-10">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white">
                The database of verified startup revenues
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-block px-5 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Add startup
              </button>
            </div>
          </section>

          {/* Browse by Category Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-5 text-center text-white">Browse by category</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase().replace(" ", "-")}`}
                  className="px-3 py-1 border border-gray-800 rounded-md text-xs hover:bg-[#111111] hover:border-gray-700 transition-all text-white"
                >
                  {category}
                </Link>
              ))}
        </div>
          </section>
      </main>

        {/* Right Sidebar - Fixed */}
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

      <AddStartupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AdvertiseModal isOpen={isAdvertiseModalOpen} onClose={() => setIsAdvertiseModalOpen(false)} />
    </div>
  );
}
