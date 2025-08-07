# Lystio Property Search Interface

A modern, responsive property search interface built with Next.js, TypeScript, and Tailwind CSS, featuring Mapbox integration and AI-powered search capabilities.

## 🚀 Features

### ✅ Implemented Requirements

- **Pixel-perfect design** with responsive layout for desktop, tablet, and mobile
- **Collapsible search bar** with hover effects and expanded state functionality
- **Action buttons** for Rent/Buy/Lystio AI toggles
- **Mapbox integration** for intelligent address autocomplete
- **Recent searches** and **boundaries/districts** selection
- **Dynamic property count** updates based on filters
- **Smooth animations** and transitions throughout the interface

### 🎯 Core Components

1. **Header Component** (`src/components/ui/Header.tsx`)
   - Responsive layout with separate mobile/desktop designs
   - Integrated search bar and user actions

2. **SearchBar Component** (`src/components/search/SearchBar.tsx`)
   - Collapsed and expanded states
   - Dynamic listings count updates
   - Responsive button layouts

3. **ActionButtons Component** (`src/components/search/ActionButtons.tsx`)
   - Rent/Buy toggle switches
   - Lystio AI activation button
   - Mobile-optimized spacing

4. **LocationSearch Component** (`src/components/search/LocationSearch.tsx`)
   - Mapbox address autocomplete
   - Recent searches integration
   - Popular locations and boundaries
   - Click-outside functionality

## 🛠 Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Mapbox Search API** for location services
- **Heroicons** for UI icons
- **clsx** for conditional styling

## 📱 Responsive Design

- **Desktop**: Full-width search bar with all features
- **Tablet**: Optimized spacing and touch targets
- **Mobile**: Stacked layout with mobile-first approach

## 🔧 API Integration

### Mapbox Configuration

- Token: `pk.eyJ1IjoibHlzdGlvIiwiYSI6ImNtMjA3cmFoejBnMngycXM4anNuNXFmaTQifQ.y-WiEerYZrFOm8Xd8a7GwQ`
- Language: German (`de`)
- Country: Austria (`at`)
- Types: address, district, place, locality, neighborhood, city, street, poi

### Lystio API Endpoints

- **Recent Searches**: `GET https://api.lystio.co/geo/search/recent`
- **Boundaries**: `GET https://api.lystio.co/geo/boundaries`
- **Property Count**: `POST https://api.lystio.co/tenement/search/count`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run development server**:

   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📦 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**:

   ```bash
   npx vercel
   ```

2. **Deploy**:
   ```bash
   npx vercel --prod
   ```

### Alternative Platforms

- **Netlify**: Connect GitHub repo and deploy
- **Railway**: `railway login && railway deploy`
- **Heroku**: Use Node.js buildpack

## 🎨 Design Features

- **Smooth transitions** on all interactive elements
- **Hover effects** for better user feedback
- **Loading states** with animated spinners
- **Touch-optimized** buttons for mobile devices
- **Truncated text** handling for long location names
- **Gradient backgrounds** and modern styling

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with header
│   ├── page.tsx            # Homepage with hero and features
│   └── globals.css         # Global styles
├── components/
│   ├── ui/
│   │   └── Header.tsx      # Main header component
│   └── search/
│       ├── SearchBar.tsx   # Main search interface
│       ├── ActionButtons.tsx # Rent/Buy/AI toggles
│       └── LocationSearch.tsx # Location input with dropdown
├── types/
│   └── index.ts            # TypeScript type definitions
└── lib/                    # Utility functions (if needed)
```

## 🔍 Key Features Breakdown

### Search Bar States

- **Collapsed**: Compact view with search button
- **Expanded**: Full interface with location search and filters

### Location Search

- **Mapbox Autocomplete**: Real-time address suggestions
- **Recent Searches**: Quick access to previous queries
- **Popular Locations**: Pre-defined Austrian cities
- **Boundaries**: Cities and districts from API

### Responsive Behavior

- **Mobile**: Stacked layout, full-width buttons
- **Tablet**: Optimized spacing and touch targets
- **Desktop**: Horizontal layout with hover effects

## 🎯 Performance Optimizations

- **Debounced search** (300ms) for Mapbox API calls
- **Conditional rendering** for dropdown sections
- **Optimized images** and lazy loading
- **Minimal bundle size** with tree shaking

## ✨ Animations & Transitions

- **Dropdown appearance**: Smooth fade-in with scale
- **Button interactions**: Color transitions and hover effects
- **Loading states**: Spinning indicators
- **State changes**: Smooth expand/collapse animations

---

**Built with ❤️ for Lystio Property Search**
