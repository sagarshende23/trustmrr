import Link from "next/link";

const footerLinks = {
  navigation: [
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Olympics", href: "/olympics" },
    { name: "$1 vs $1,000,000 Startup", href: "/startup" },
  ],
  browseStartups: [
    { name: "Software", href: "/category/software" },
    { name: "Apps", href: "/category/apps" },
    { name: "Subscriptions", href: "/category/subscriptions" },
    { name: "Consulting", href: "/category/consulting" },
    { name: "Education", href: "/category/education" },
    { name: "Media", href: "/category/media" },
    { name: "Gaming", href: "/category/gaming" },
    { name: "IT Services", href: "/category/it-services" },
    { name: "Advertising", href: "/category/advertising" },
    { name: "Digital", href: "/category/digital" },
  ],
  products: [
    { name: "Newsletter for entrepreneurs", href: "#" },
    { name: "CodeFast", href: "#" },
    { name: "ShipFast", href: "#" },
    { name: "DataFast", href: "#" },
    { name: "ByeDispute", href: "#" },
    { name: "IndiePage", href: "#" },
    { name: "ZenVoice", href: "#" },
    { name: "GamifyList", href: "#" },
    { name: "WorkbookPDF", href: "#" },
    { name: "HabitsGarden", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12 bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4 text-sm text-white">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Browse Startups */}
          <div>
            <h3 className="font-semibold mb-4 text-sm text-white">Browse startups</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.browseStartups.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* From the maker */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 text-sm text-white">From the maker of TrustMRR</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {footerLinks.products.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400 mb-3">
            Built clone by{" "}
            <span className="font-medium text-white">Sagar Shende</span>
          </p>
          <button className="text-xs text-gray-500 hover:text-white transition-colors">
            Theme
          </button>
        </div>
      </div>
    </footer>
  );
}
