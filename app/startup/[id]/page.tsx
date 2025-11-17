import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdvertisementCard from "@/components/AdvertisementCard";
import RevenueChart from "@/components/RevenueChart";
import { getStartupById, mockStartups } from "@/lib/mockStartups";
import { leftAds, rightAds } from "@/lib/advertisements";

export default async function StartupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const startup = getStartupById(id);

  if (!startup) {
    notFound();
  }

  const relatedStartups = mockStartups
    .filter((company) => company.id !== startup.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 min-h-0 overflow-hidden">
        <div className="flex gap-6 max-w-[1800px] mx-auto px-4 py-6 h-full min-h-0">
          {/* Left Sidebar */}
          <aside className="hidden xl:block w-56 flex-shrink-0 space-y-3 sticky top-24 self-start">
            {leftAds.map((ad, index) => (
              <AdvertisementCard key={index} {...ad} compact />
            ))}
          </aside>

          {/* Main Content */}
          <section className="flex-1 min-w-0 min-h-0 h-full overflow-y-auto custom-scrollbar pr-2">
            {/* Back Button */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to leaderboard
            </Link>

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div className="flex items-start gap-5">
                {/* Logo */}
                <div className="w-24 h-24 rounded-2xl border-2 border-[#2a2a2a] flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 flex-shrink-0 shadow-lg overflow-hidden">
                  {startup.logo ? (
                    <Image
                      src={startup.logo}
                      alt={startup.name}
                      width={72}
                      height={72}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-5xl font-bold text-white">
                      {startup.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <h1 className="text-4xl font-bold tracking-tight">{startup.name}</h1>
                    {startup.rank <= 10 && (
                      <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-xs font-medium text-emerald-400">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                    <span className="px-2.5 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-xs font-medium text-gray-300">
                      {startup.category}
                    </span>
                    <span className="px-2.5 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-xs font-medium text-yellow-400">
                      #{startup.rank}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4 text-base">{startup.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                    <Link 
                      href={`/founder/${startup.founderHandle}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                    >
                      @{startup.founderHandle}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#222222] border border-[#2a2a2a] rounded-lg text-sm font-medium transition-all hover:border-[#3a3a3a] flex items-center gap-2">
                  <span>Share</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button className="px-5 py-2.5 bg-white hover:bg-gray-100 text-black rounded-lg text-sm font-medium transition-all flex items-center gap-2 shadow-sm">
                  <span>Visit</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* GMV */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#3a3a3a] transition-all">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-medium text-gray-400">GMV</h3>
              <button className="text-gray-500 hover:text-gray-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <div className="text-3xl font-bold mb-2 tracking-tight">{startup.stats.gmv.value}</div>
            <div className="text-xs text-gray-500 font-medium">{startup.stats.gmv.label}</div>
          </div>

          {/* Last 30 days */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#3a3a3a] transition-all">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Last 30 days</h3>
            <div className="text-3xl font-bold mb-2 tracking-tight">{startup.stats.last30Days.value}</div>
          </div>

          {/* MRR */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#3a3a3a] transition-all">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-medium text-gray-400">MRR (estimated)</h3>
              <button className="text-gray-500 hover:text-gray-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <div className="text-3xl font-bold mb-2 tracking-tight">{startup.stats.mrr.value}</div>
            <div className="text-xs text-gray-500 font-medium">{startup.stats.mrr.note}</div>
          </div>

          {/* Founded */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#3a3a3a] transition-all">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Founded</h3>
            <div className="text-3xl font-bold mb-2 tracking-tight">{startup.stats.founded.date}</div>
            <div className="text-xs text-gray-500 font-medium">{startup.stats.founded.note}</div>
          </div>
        </div>

        {/* Revenue Chart */}
        <RevenueChart chartData={startup.chartData} />

        {/* Warning Banner */}
        <div className="mt-10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 px-5 py-4 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86l-7.4 12.84A1 1 0 003.7 18h16.6a1 1 0 00.86-1.5L13.76 3.86a1 1 0 00-1.72 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">Stripe API key expired.</p>
                <p className="text-xs text-yellow-100/80 mt-1">
                  Data last updated Nov 10, 2025. Update your API key below to sync latest revenue.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary actions */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { label: "Embed", icon: "<>" },
            { label: "Edit / Delete", icon: "✎" },
            { label: "Report", icon: "!" },
          ].map((action) => (
            <button
              key={action.label}
              className="px-4 py-2.5 bg-[#0b0b0b] border border-[#232323] rounded-lg text-sm font-medium text-white/90 hover:border-[#3a3a3a] flex items-center gap-2 transition-all"
            >
              <span className="text-xs font-semibold tracking-wide">{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        {/* Discover more */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-5">Discover more startups</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedStartups.map((company) => (
              <Link
                key={company.id}
                href={`/startup/${company.id}`}
                className="block rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] p-5 hover:border-[#2d2d2d] transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2b2b2b] to-[#1a1a1a] border border-[#2d2d2d] flex items-center justify-center text-xl font-semibold text-white">
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    ) : (
                      company.name.charAt(0)
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{company.name}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{company.description}</p>
                  </div>
                </div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Total revenue</p>
                <p className="text-lg font-semibold text-white">{company.stats.gmv.value}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border border-[#1d1d1d] rounded-3xl py-10 px-4 bg-gradient-to-b from-[#090909] to-[#050505]">
          <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white">The database of verified startup revenues</h3>
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
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
                  className="w-full bg-[#111111] border border-[#1f1f1f] rounded-lg pl-10 pr-3 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
                />
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 px-5 py-3 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                <span className="text-lg">+</span>
                <span>Add startup</span>
              </Link>
            </div>
          </div>
        </section>
      </section>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-56 flex-shrink-0 space-y-3 sticky top-24 self-start">
            {rightAds.map((ad, index) => (
              <AdvertisementCard key={index} {...ad} compact />
            ))}
            <div className="text-center text-xs text-gray-500 mt-6">Advertise</div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

