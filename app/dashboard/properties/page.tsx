"use client";
import React, { useState } from "react";
import {
  MagnifyingGlass,
  Funnel,
  MapPin,
  Bed,
  Bathtub,
  Heart,
  CaretDown
} from "@phosphor-icons/react";

export default function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const properties = [
    {
      id: 1,
      title: "Modern Apartment in City Center",
      location: "New York, NY",
      price: "$2,500/mo",
      type: "Rent",
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
      isNew: true,
    },
    {
      id: 2,
      title: "Cozy Cottage by the Lake",
      location: "Lake Tahoe, CA",
      price: "$850,000",
      type: "Buy",
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      isNew: false,
    },
    {
      id: 3,
      title: "Luxury Villa with Ocean View",
      location: "Miami, FL",
      price: "$5,000/mo",
      type: "Rent",
      beds: 4,
      baths: 3,
      sqft: 3200,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      isNew: true,
    },
    {
      id: 4,
      title: "Spacious Suburban Home",
      location: "Austin, TX",
      price: "$3,200/mo",
      type: "Rent",
      beds: 3,
      baths: 2.5,
      sqft: 2400,
      image: "https://images.unsplash.com/photo-1572120360610-d971b9b78825",
      isNew: false,
    },
    {
      id: 5,
      title: "Downtown Loft with Skyline Views",
      location: "Chicago, IL",
      price: "$2,800/mo",
      type: "Rent",
      beds: 1,
      baths: 1,
      sqft: 900,
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118",
      isNew: false,
    },
    {
      id: 6,
      title: "Charming Bungalow",
      location: "Savannah, GA",
      price: "$2,200/mo",
      type: "Rent",
      beds: 2,
      baths: 1,
      sqft: 1100,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      isNew: true,
    },
  ];

  const filters = ["All", "Rent", "Buy", "New", "Price"];

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Find Your Home</h1>
          <p className="text-white/60">Explore the best properties available for you.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search properties..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-[#497693] transition-colors"
            />
          </div>
          <button className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors flex items-center gap-2">
            <Funnel size={20} />
            <span className="hidden md:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeFilter === filter
                ? "bg-[#497693] text-white shadow-lg shadow-[#497693]/20"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div 
            key={property.id}
            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                  {property.type}
                </span>
                {property.isNew && (
                  <span className="bg-[#497693] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    New
                  </span>
                )}
              </div>

              <button className="absolute top-3 right-3 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                <Heart size={18} weight="fill" />
              </button>

              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-2xl font-bold text-white mb-1">{property.price}</p>
                <p className="text-white/80 text-sm flex items-center gap-1">
                  <MapPin size={14} /> {property.location}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-white mb-4 line-clamp-1 group-hover:text-[#497693] transition-colors">
                {property.title}
              </h3>
              
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/10">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-white/60 mb-1">
                    <Bed size={18} />
                  </div>
                  <p className="text-sm font-medium text-white">{property.beds} Beds</p>
                </div>
                <div className="text-center border-l border-white/10">
                  <div className="flex items-center justify-center gap-1 text-white/60 mb-1">
                    <Bathtub size={18} />
                  </div>
                  <p className="text-sm font-medium text-white">{property.baths} Baths</p>
                </div>
                <div className="text-center border-l border-white/10">
                  <div className="flex items-center justify-center gap-1 text-white/60 mb-1">
                    <CaretDown size={18} />
                  </div>
                  <p className="text-sm font-medium text-white">{property.sqft} sqft</p>
                </div>
              </div>

              <button className="w-full mt-2 py-3 rounded-xl bg-white text-black font-bold hover:bg-[#497693] hover:text-white transition-all duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
