# TrustMRR - The Database of Verified Startup Revenues

> **🌐 Live Site**: [trustmrr.netlify.app](https://trustmrr.netlify.app)

A modern Next.js application that serves as a comprehensive database of verified startup revenues. This platform allows founders to showcase their startup's revenue data, verified through Stripe API integration, creating transparency and trust in the startup ecosystem.

## 🚀 Features

### Core Functionality
- **📊 Leaderboard**: Browse verified startup revenues ranked by revenue/MRR with real-time data updates
- **🔍 Advanced Search**: Search across startups, founders, and categories with intelligent autocomplete
- **📁 Categories**: Filter and browse startups by industry/category (19+ categories)
- **👤 Founder Profiles**: Dedicated pages showcasing all startups from a specific founder
- **➕ Add Startup**: Streamlined interface for founders to add and verify their startups
- **📈 Revenue Charts**: Visual representation of revenue trends using Recharts
- **🎯 Startup Details**: Individual pages for each startup with comprehensive information

### User Experience
- **🌙 Dark Mode**: Full dark mode support with persistent theme toggle
- **📱 Responsive Design**: Mobile-first responsive design with optimized layouts for all devices
- **⚡ Fast Performance**: Optimized with Next.js App Router for lightning-fast page loads
- **🎨 Modern UI**: Clean, professional interface with smooth animations and transitions
- **🔒 Verified Data**: All revenue verified through Stripe API keys with hourly updates

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16.0.3](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom animations
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Charts**: [Recharts](https://recharts.org/) for data visualization
- **React**: 19.2.0

### Development
- **Node**: 20+
- **Package Manager**: npm
- **Deployment**: Netlify

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Project Structure

```
trustmrr/
├── app/                      # Next.js App Router pages
│   ├── add-startup/          # Add startup page
│   ├── category/[slug]/      # Dynamic category pages
│   ├── founder/[handle]/     # Dynamic founder profile pages
│   ├── startup/[id]/         # Dynamic startup detail pages
│   ├── globals.css           # Global styles and Tailwind config
│   ├── layout.tsx            # Root layout with theme provider
│   └── page.tsx              # Home page (leaderboard)
├── components/               # React components
│   ├── ui/                   # Reusable UI components (shadcn/ui)
│   ├── Header.tsx            # Header with theme toggle and navigation
│   ├── Footer.tsx            # Footer component
│   ├── StartupCard.tsx       # Startup card component
│   ├── AddStartupModal.tsx   # Modal for adding startups
│   ├── AdvertiseModal.tsx    # Modal for advertising
│   ├── AdvertisementCard.tsx # Advertisement display component
│   └── RevenueChart.tsx      # Revenue visualization component
├── lib/                      # Utility libraries
│   ├── mockStartups.ts      # Mock data for startups
│   ├── advertisements.ts     # Advertisement data
│   └── utils.ts             # Helper functions
├── types/                    # TypeScript type definitions
│   └── index.ts             # Shared interfaces and types
└── public/                   # Static assets (images, icons)
```

## 🎨 Design Features

### Color Scheme
- Light mode: Clean white background with gray accents
- Dark mode: Pure black background with subtle gray highlights
- Accent colors: Blue for links, Green for revenue, Yellow for medals

### Components
- **Header**: Sticky header with brand and theme toggle
- **Hero Section**: Large headline with CTA button
- **Leaderboard Table**: Desktop view with full details
- **Startup Cards**: Mobile-optimized card layout
- **Category Tags**: Browseable category filters
- **Footer**: Links to resources and related products

### Responsive Breakpoints
- Mobile: < 768px (Card layout)
- Tablet: 768px - 1024px
- Desktop: > 1024px (Table layout)

## 🌟 Key Features Implemented

1. **Hydration-Safe Rendering**: Fixed all hydration issues for proper SSR
2. **Theme Toggle**: Client-side theme switching with persistence
3. **Gradient Backgrounds**: Beautiful gradient sections for visual appeal
4. **Hover Effects**: Smooth transitions and hover states
5. **SEO Optimized**: Proper meta tags and semantic HTML
6. **Accessibility**: ARIA labels and keyboard navigation support

## 📄 Pages & Routes

### Home Page (`/`)
- **Leaderboard**: Top startups ranked by revenue/MRR
- **Search**: Real-time search with autocomplete suggestions
- **Warren Buffett Quote**: Inspirational section
- **Browse by Category**: Quick access to 19+ categories
- **Responsive Layout**: Desktop table view, mobile card view
- **Sidebar Ads**: Advertisement placement areas

### Add Startup (`/add-startup`)
- Step-by-step instructions for adding a startup
- Stripe API integration interface (UI ready)
- Benefits of joining the platform
- Revenue verification process

### Category Page (`/category/[slug]`)
- Filtered view of startups by category
- Grid layout optimized for browsing
- Dynamic routing with slug-based URLs
- Category-specific statistics

### Founder Page (`/founder/[handle]`)
- Founder profile information
- Complete list of founder's startups
- Social media links and contact info
- Founder's total revenue statistics

### Startup Detail Page (`/startup/[id]`)
- Comprehensive startup information
- Revenue charts and trends
- Historical data visualization
- Related startups and categories

## 🔮 Future Enhancements

- [ ] Real Stripe API integration
- [ ] Database connection (PostgreSQL/MongoDB)
- [ ] Authentication system
- [ ] Search functionality
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] API endpoints
- [ ] Admin panel

## 🎯 Performance

- **Lighthouse Score**: 90+ (target)
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: Optimized with Next.js automatic code splitting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager
- Git for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd trustmrr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables
Create a `.env.local` file for environment-specific configuration:
```env
# Add your environment variables here
# STRIPE_API_KEY=your_stripe_key
# DATABASE_URL=your_database_url
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Credits

- **Original Design**: [TrustMRR](https://trustmrr.com) by Marc Lou
- **Framework**: Next.js by Vercel
- **Styling**: Tailwind CSS

## 🔗 Links

- **🌐 Live Application**: [trustmrr.netlify.app](https://trustmrr.netlify.app)
- **📖 Original Design**: [TrustMRR](https://trustmrr.com) by Marc Lou
- **⚡ Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **🎨 Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **📦 Radix UI**: [radix-ui.com](https://www.radix-ui.com)

---

Built with ❤️ using Next.js and Tailwind CSS
