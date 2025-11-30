"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import bg from "@/public/bg.jpg";
import logo from "@/public/kglogo.png";
import Link from "next/link";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CaretDownIcon,
  MapPinLineIcon,
  BuildingsIcon,
  HouseLineIcon,
  XIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  BedIcon,
  BathtubIcon,
  StarIcon,
  QuotesIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  MapPinIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
  ListIcon,
} from "@phosphor-icons/react";
import { Dancing_Script } from "@next/font/google";
import { useRef, useState, useEffect } from "react";
import { Property } from "@/backend/data/properties";

const ital = Dancing_Script({
  subsets: ["latin"],
});

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    text: "KingHomes made finding our dream house incredibly easy. The virtual tours were a game-changer!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Property Investor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    text: "The most professional real estate platform I've used. Their market insights helped me make the right choice.",
    rating: 5,
  },
  {
    name: "Emily & David",
    role: "First-time Buyers",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    text: "We were nervous about buying our first home, but the support from KingHomes was phenomenal.",
    rating: 5,
  },
];

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchPropertyType, setSearchPropertyType] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("All");
  
  // Search modal state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch featured properties on component mount
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/featured?limit=6");
        const data = await response.json();
        
        if (data.success) {
          setFeaturedProperties(data.data);
        }
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  // Handle search - opens modal with results
  const handleSearch = async () => {
    if (!searchLocation && searchPropertyType === "All") {
      return; // Don't search if no filters selected
    }

    
    try {
      setIsSearching(true);
      setIsSearchModalOpen(true);
      
      const params = new URLSearchParams();
      
      if (searchLocation) {
        params.append("city", searchLocation);
      }
      
      if (searchPropertyType && searchPropertyType !== "all") {
        params.append("propertyType", searchPropertyType);
      }
      
      params.append("limit", "20");
      
      const response = await fetch(`/api/properties?${params}`);
      console.log(`/api/properties?${params}`)
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setSearchResults(data.data);
      }
    } catch (error) {
      console.error("Error searching properties:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle filter change - updates main grid (not modal)
  const handleFilterChange = async (filterType: string) => {
    console.log("filterType", filterType);
    setSelectedFilter(filterType);
    
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      
      if (filterType !== "all") {
        params.append("propertyType", filterType);
      }
      
      params.append("limit", "6");
      
      const response = await fetch(`/api/properties?${params}`);
      const data = await response.json();
      if (data.success) {
        setFeaturedProperties(data.data);
      }
    } catch (error) {
      console.error("Error filtering properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = 50;

    console.log(scrollRef.current.scrollWidth);
    console.log(scrollRef.current.getBoundingClientRect().right);
    if (direction == "left") {
      if (scrollRef.current.scrollLeft > 0) {
        scrollRef.current.scrollTo({
          left: -amount,
          behavior: "smooth",
        });
      }
    }

    if (direction == "right") {
      if (scrollRef.current.scrollLeft < scrollRef.current.scrollWidth) {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollLeft + amount,
          behavior: "smooth",
        });
      }
    }
  };
  return (
    <>
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bg}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for text readability */}
        </div>

        <div className="h-screen w-full relative z-10 flex flex-col">
          {/* Navbar */}
          <div className="w-full flex items-center justify-between h-20 px-6 md:px-12">
            <div className="flex items-center gap-2">
              <Image src={logo} height={40} width={40} alt="KingHomes Logo" />
              <h1 className="text-2xl text-white tracking-tight">
                <span className="font-bold">King</span>Homes
              </h1>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#" className="hover:text-white transition-colors">Buy</a>
              <a href="#" className="hover:text-white transition-colors">Sell</a>
              <a href="#" className="hover:text-white transition-colors">About Us</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
               <Link href="/auths/login" className="px-5 py-2 rounded-full text-white font-medium hover:bg-white/10 transition-all">
                Login
              </Link>
              <Link href="/auths/register" className="px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-all shadow-lg">
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
            </button>
          </div>


        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 right-0 w-[80%] backdrop-blur-sm rounded-4xl border-b border-white/10 p-6 flex flex-col gap-4 z-40">
            {["Home", "Properties", "Agents", "Contact"].map((item) => (
              <a key={item} href="#" className="text-white/80 hover:text-white text-lg font-medium">
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Link href="/auths/login" className="text-white font-medium text-center py-2 border border-white/20 rounded-full">
                Log In
              </Link>
              <Link href="/auths/register" className="bg-white text-black font-bold text-center py-2 rounded-full">
                Sign Up
              </Link>
            </div>
          </div>
        )}

          {/* Hero Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 text-center pb-20">
            
            {/* Stats Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-10 shadow-2xl"
            >
              <div className="flex flex-col items-start">
                <span className="text-white font-bold text-lg leading-none">2.5K+</span>
                <span className="text-white/70 text-[10px] uppercase tracking-wider">Properties Sold</span>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="flex flex-col items-start">
                <span className="text-white font-bold text-lg leading-none">5M+</span>
                <span className="text-white/70 text-[10px] uppercase tracking-wider">Happy Users</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-6xl md:text-8xl text-white font-light mb-6 drop-shadow-lg ${ital.className}`}
            >
              Buy. Sell. Rent.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-2xl text-white/90 font-light tracking-wide mb-10 max-w-2xl drop-shadow-md"
            >
              Smart real estate for modern living. Discover your dream home with us today.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link href="/auths/register">
                <div className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                </div>
              </Link>
            </motion.div>

            {/* Search Bar / Filter */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute bottom-10 md:bottom-20 w-[90%] md:w-[70%] lg:w-[50%] bg-white/90 backdrop-blur-xl border border-white/40 rounded-full p-2 shadow-2xl flex items-center justify-between gap-2"
            >
              
              <div className="flex-1 flex items-center gap-3 px-4 border-r border-gray-300">
                <MapPinLineIcon size={24} className="text-gray-500 flex-shrink-0" />
                <div className="text-left flex-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Location</p>
                  <input
                    type="text"
                    placeholder="Enter city..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="text-sm font-semibold text-gray-800 bg-transparent outline-none w-full placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="hidden md:flex flex-1 items-center gap-3 px-4 border-r border-gray-300">
                <BuildingsIcon size={24} className="text-gray-500 flex-shrink-0" />
                <div className="text-left flex-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Type</p>
                  <select
                    value={searchPropertyType}
                    onChange={(e) => setSearchPropertyType(e.target.value)}
                    className="text-sm font-semibold text-gray-800 bg-transparent outline-none w-full cursor-pointer"
                  >
                    <option value="All">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="house">House</option>
                    <option value="studio">Studio</option>
                    <option value="bungalow">Bungalow</option>
                    <option value="duplex">Duplex</option>
                    <option value="flat">Flat</option>
                  </select>
                </div>
              </div>

               <button 
                 onClick={handleSearch}
                 className="p-3 bg-black rounded-full text-white cursor-pointer hover:bg-gray-800 transition-colors"
               >
                 <MagnifyingGlassIcon size={24} />
               </button>

            </motion.div>

          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center mb-16 space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Discover Handpicked Homes
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400">
            Properties that <span className={`text-[#497693] ${ital.className} text-3xl`}>define elegance</span>
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="w-full max-w-7xl mx-auto px-6 mb-12">
          <div className="flex items-center justify-center gap-4">
             <div
              onClick={() => scroll("left")}
              className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
            >
              <CaretLeftIcon size={20} />
            </div>

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-4 pt-1 px-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mask-linear-gradient"
            >
              {["All", "Apartment", "Villa", "Studio", "Bungalow", "Duplex", "House"].map((item) => (
                <button 
                  key={item}
                  onClick={() => handleFilterChange(item.toLowerCase())}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedFilter === item.toLowerCase()
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105" 
                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div
              onClick={() => scroll("right")}
              className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
            >
              <CaretRightIcon size={20} />
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto w-full">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 animate-pulse">
                <div className="h-72 bg-zinc-200 dark:bg-zinc-800" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
                </div>
              </div>
            ))
          ) : (
            featuredProperties.map((property, index) => (
              <motion.div 
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-10">
                    <p className="text-[#497693] font-bold text-sm md:text-base">
                      ${property.price.toLocaleString()}/{property.priceType === "rent" ? "mo" : "sale"}
                    </p>
                  </div>
                  
                  {/* Heart Icon */}
                  <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white transition-all text-white hover:text-red-500 z-10">
                    <HeartIcon size={20} weight="fill" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white line-clamp-1 flex-1 mr-2">{property.title}</h2>
                  </div>
                  
                  <div className="flex items-center text-zinc-500 dark:text-zinc-400 mb-6">
                    <MapPinLineIcon size={18} className="mr-1 text-[#497693]" />
                    <p className="text-sm font-medium">{property.location.city}, {property.location.state}</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                     <div className="flex gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1.5"><BedIcon size={18}/> {property.features.bedrooms} Beds</span>
                        <span className="flex items-center gap-1.5"><BathtubIcon size={18}/> {property.features.bathrooms} Baths</span>
                     </div>
                     <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-[#497693] transition-colors">View Details</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Find More Button */}
        <div className="mt-16 flex justify-center">
          <button className="px-8 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all flex items-center gap-2 group">
            Find More Properties
            <CaretRightIcon className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Satisfied Clients Section */}
      <div className="w-full py-24 bg-white dark:bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
                Satisfied Clients
              </h2>
              <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-md">
                Read what our trusted clients say about their experience with <span className="font-semibold text-[#497693]">KingHomes</span>.
              </p>
            </div>
            
            {/* Navigation Buttons (Placeholder) */}
          <div className="flex justify-center gap-4 mt-12">
            <button className="p-3 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-[#497693] hover:border-[#497693] hover:text-white transition-all">
              <CaretLeftIcon size={24} />
            </button>
            <button className="p-3 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-[#497693] hover:border-[#497693] hover:text-white transition-all">
              <CaretRightIcon size={24} />
            </button>
          </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((client, index) => (
              <div 
                key={index}
                className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl relative group hover:bg-[#497693] transition-colors duration-300"
              >
                <QuotesIcon size={48} weight="fill" className="text-zinc-200 dark:text-zinc-800 absolute top-6 right-6 group-hover:text-white/20 transition-colors" />
                
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(client.rating)].map((_, i) => (
                    <StarIcon key={i} size={16} weight="fill" />
                  ))}
                </div>

                <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed group-hover:text-white/90 transition-colors">
                  "{client.text}"
                </p>

                <div className="flex items-center gap-4">
                  <img 
                    src={client.image} 
                    alt={client.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-zinc-800"
                  />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white group-hover:text-white transition-colors">{client.name}</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-white/70 transition-colors">{client.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="w-full py-24 bg-zinc-50 dark:bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            
            {/* Contact Info (Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/5 p-12 dark:text-white flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-zinc-600 dark:text-white/80 mb-12 text-lg">
                  Have questions about a property or want to list your home? We're here to help you every step of the way.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-200 dark:bg-white/10 rounded-full backdrop-blur-sm">
                      <PhoneIcon size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider">Call Us</p>
                      <p className="font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-200 dark:bg-white/10 rounded-full backdrop-blur-sm">
                      <EnvelopeSimpleIcon size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider">Email Us</p>
                      <p className="font-medium">hello@kinghomes.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-200 dark:bg-white/10 rounded-full backdrop-blur-sm">
                      <MapPinIcon size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider">Visit Us</p>
                      <p className="font-medium">123 Real Estate Ave, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-12">
                <p className="text-sm text-white/60 mb-4">Follow us on social media</p>
                <div className="flex gap-4">
                  <a href="#" className="p-2 bg-zinc-200 dark:bg-white/10 rounded-full hover:bg-white hover:text-[#497693] transition-all">
                    <FacebookLogoIcon size={20} weight="fill" />
                  </a>
                  <a href="#" className="p-2 bg-zinc-200 dark:bg-white/10 rounded-full hover:bg-white hover:text-[#497693] transition-all">
                    <InstagramLogoIcon size={20} weight="fill" />
                  </a>
                  <a href="#" className="p-2 bg-zinc-200 dark:bg-white/10 rounded-full hover:bg-white hover:text-[#497693] transition-all">
                    <TwitterLogoIcon size={20} weight="fill" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form (Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-3/5 p-12 lg:p-16"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#497693] transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#497693] transition-all" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#497693] transition-all" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#497693] transition-all resize-none" placeholder="I'm interested in..." />
                </div>

                <button type="button" className="w-full py-4 rounded-xl bg-[#497693] text-white font-bold text-lg hover:bg-[#3a6078] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-[#497693]/20">
                  Send Message
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Image src={logo} height={32} width={32} alt="KingHomes Logo" />
                <h2 className="text-2xl font-bold">KingHomes</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Reimagining real estate with a focus on design, technology, and seamless experiences.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-zinc-400 hover:text-white transition-colors"><FacebookLogoIcon size={24} /></a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors"><InstagramLogoIcon size={24} /></a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors"><TwitterLogoIcon size={24} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Buy Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sell Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Agents</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-6">Legal</h3>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sitemap</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-6">Newsletter</h3>
              <p className="text-zinc-400 mb-4">Subscribe to get the latest property updates.</p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-zinc-600 transition-colors"
                />
                <button type="button" className="bg-white text-black p-2 rounded-lg hover:bg-zinc-200 transition-colors">
                  <CaretRightIcon size={20} />
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} KingHomes. All rights reserved.
            </p>
            <p className="text-zinc-500 text-sm flex items-center gap-1">
              Powered by <span className="text-white font-semibold">Utechit</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Search Results Modal */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsSearchModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                    Search Results
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {isSearching ? (
                      "Searching..."
                    ) : (
                      <>
                        Found {searchResults.length} {searchResults.length === 1 ? "property" : "properties"}
                        {searchLocation && ` in ${searchLocation}`}
                        {searchPropertyType !== "All" && ` • ${searchPropertyType}`}
                      </>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <XIcon size={24} className="text-zinc-600 dark:text-zinc-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {isSearching ? (
                  // Loading State
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden animate-pulse">
                        <div className="h-48 bg-zinc-200 dark:bg-zinc-700" />
                        <div className="p-4 space-y-3">
                          <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
                          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
                          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchResults.length === 0 ? (
                  // No Results
                  <div className="flex flex-col items-center justify-center h-full py-20">
                    <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6">
                      <HouseLineIcon size={40} className="text-zinc-400" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      No properties found
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-md">
                      Try adjusting your search criteria or browse our featured properties below.
                    </p>
                  </div>
                ) : (
                  // Results Grid
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map((property, index) => (
                      <motion.div
                        key={property.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          {/* Price Badge */}
                          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                            <p className="text-[#497693] font-bold text-sm">
                              ${property.price.toLocaleString()}/{property.priceType === "rent" ? "mo" : "sale"}
                            </p>
                          </div>

                          {/* Heart Icon */}
                          <button className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white transition-all text-white hover:text-red-500">
                            <HeartIcon size={18} weight="fill" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-1 mb-2">
                            {property.title}
                          </h3>
                          
                          <div className="flex items-center text-zinc-500 dark:text-zinc-400 mb-4">
                            <MapPinLineIcon size={16} className="mr-1 text-[#497693]" />
                            <p className="text-sm">{property.location.city}, {property.location.state}</p>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700 pt-3">
                            <span className="flex items-center gap-1">
                              <BedIcon size={16} /> {property.features.bedrooms}
                            </span>
                            <span className="flex items-center gap-1">
                              <BathtubIcon size={16} /> {property.features.bathrooms}
                            </span>
                            <span className="text-xs ml-auto text-[#497693] font-semibold uppercase tracking-wider group-hover:underline">
                              View
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
