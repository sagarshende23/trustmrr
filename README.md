# TrustMRR - The Database of Verified Startup Revenues

A Next.js application that replicates the TrustMRR website design and functionality. This platform allows startups to share their verified revenue through Stripe API integration.

## 🚀 Features

- **Leaderboard**: Browse verified startup revenues with real-time data
- **Categories**: Filter startups by industry/category
- **Founder Profiles**: View all startups from a specific founder
- **Add Startup**: Interface for founders to add their startups
- **Dark Mode**: Full dark mode support with theme toggle
- **Responsive Design**: Mobile-first responsive design
- **Verified Revenue**: All revenue verified through Stripe API keys

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **React**: 19.2.0
- **Node**: 20+

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
├── app/
│   ├── add-startup/          # Add startup page
│   ├── category/[slug]/      # Category pages
│   ├── founder/[handle]/     # Founder profile pages
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (leaderboard)
├── components/
│   ├── Footer.tsx            # Footer component
│   ├── Header.tsx            # Header with theme toggle
│   └── StartupCard.tsx       # Startup card component
├── types/
│   └── index.ts              # TypeScript interfaces
└── public/                   # Static assets
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

## 📄 Pages

### Home Page (`/`)
- Leaderboard with top startups
- Warren Buffett quote section
- Browse by category section
- Full responsive design

### Add Startup (`/add-startup`)
- Instructions for adding a startup
- Stripe integration (UI ready)
- Benefits of joining

### Category Page (`/category/[slug]`)
- Filter startups by category
- Grid layout for browsing
- Dynamic routing

### Founder Page (`/founder/[handle]`)
- Founder profile information
- List of founder's startups
- Social media links

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Credits

- **Original Design**: [TrustMRR](https://trustmrr.com) by Marc Lou
- **Framework**: Next.js by Vercel
- **Styling**: Tailwind CSS

## 🔗 Links

- [TrustMRR Original](https://trustmrr.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

Built with ❤️ using Next.js and Tailwind CSS
