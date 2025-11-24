# 🏠 KingHomes - Premium Real Estate Platform

A modern, full-stack real estate platform built with Next.js 14, TypeScript, and Tailwind CSS. Features a beautiful UI with smooth animations, comprehensive property search, and a professional backend API.

![KingHomes](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Premium UI/UX**
- Modern, responsive design with glassmorphism effects
- Smooth Framer Motion animations
- Dark mode support
- Mobile-first approach
- Interactive property cards with hover effects

### 🔍 **Advanced Search**
- Real-time property search with modal popup
- Filter by location, property type, price, beds, baths
- Interactive filter tabs
- Loading states and empty states
- Keyword-based search

### 🏠 **Property Management**
- 8 realistic property listings with high-quality images
- Detailed property information (location, features, amenities)
- Featured properties section
- Property statistics and analytics

### 👤 **User Dashboard**
- Modern dashboard layout with sidebar navigation
- Profile and notification dropdowns
- Settings page with preferences
- Analytics and insights

### 🔐 **Authentication**
- Beautiful login and registration pages
- Form validation
- Responsive auth layouts

### 🚀 **Backend API**
- RESTful API with Next.js App Router
- TypeScript-based property service
- Filtering, pagination, and search endpoints
- Mock data ready to swap with real API

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Phosphor Icons
- **Fonts:** Next Font (Dancing Script)
- **Images:** Unsplash API

## 📁 Project Structure

```
kinghomes/
├── app/
│   ├── api/
│   │   └── properties/          # API routes
│   ├── auths/
│   │   ├── login/              # Login page
│   │   └── register/           # Registration page
│   ├── dashboard/              # Dashboard pages
│   │   ├── layout.tsx          # Dashboard layout
│   │   ├── page.tsx            # Dashboard home
│   │   ├── properties/         # Properties management
│   │   └── settings/           # User settings
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── backend/
│   ├── data/
│   │   └── properties.ts       # Property data models
│   ├── services/
│   │   └── propertyService.ts  # Business logic
│   └── README.md               # API documentation
├── public/
│   ├── bg.jpg                  # Background image
│   └── kglogo.png              # Logo
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kinghomes.git
   cd kinghomes
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

## 📚 API Documentation

The backend API provides comprehensive property management endpoints. See [backend/README.md](./backend/README.md) for detailed documentation.

### Available Endpoints

- `GET /api/properties` - Get all properties with filters
- `GET /api/properties/featured` - Get featured properties
- `GET /api/properties/[id]` - Get single property
- `GET /api/properties/search` - Search properties
- `GET /api/properties/stats` - Get statistics

## 🎯 Key Features Breakdown

### Landing Page
- Hero section with animated search bar
- Featured properties grid
- Client testimonials
- Contact form
- Newsletter subscription

### Search Functionality
- Modal popup for search results
- Location and property type filters
- Real-time results with loading states
- Responsive grid layout

### Dashboard
- Overview with statistics
- Property management
- Analytics charts
- Settings and preferences
- Profile management

## 🎨 Design Philosophy

KingHomes follows modern web design principles:

- **Glassmorphism** - Frosted glass effects with backdrop blur
- **Micro-animations** - Smooth transitions and hover effects
- **Premium Color Palette** - Curated colors (#497693 brand color)
- **Typography** - Modern fonts with proper hierarchy
- **Responsive Design** - Mobile-first approach

## 🔄 Replacing Mock Data with Real API

The project uses mock data for development. To integrate a real API:

1. Update `backend/services/propertyService.ts`
2. Add API keys to `.env.local`
3. Replace fetch calls with real API endpoints

See [backend/README.md](./backend/README.md) for migration guide.

## 📱 Screenshots

### Landing Page
- Hero section with search
- Featured properties
- Testimonials

### Dashboard
- Overview statistics
- Property management
- Settings

### Search Modal
- Real-time search results
- Filter options
- Property cards

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Phosphor Icons](https://phosphoricons.com)
- Inspiration from modern real estate platforms

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Built with ❤️ using Next.js and TypeScript**
