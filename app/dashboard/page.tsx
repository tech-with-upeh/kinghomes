"use client";
import React from "react";
import {
  Heart,
  FileText,
  CalendarCheck,
  HouseLine,
  MapPin,
  Bed,
  Bathtub,
  CaretRight,
  Tag
} from "@phosphor-icons/react";

export default function Dashboard() {
  const stats = [
    {
      title: "Saved Homes",
      value: "12",
      subtext: "2 price drops",
      icon: Heart,
      color: "bg-pink-500",
    },
    {
      title: "Applications",
      value: "3",
      subtext: "1 approved",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Scheduled Tours",
      value: "2",
      subtext: "Next: Tomorrow, 2 PM",
      icon: CalendarCheck,
      color: "bg-emerald-500",
    },
    {
      title: "Properties Owned/Rented",
      value: "1",
      subtext: "Active lease",
      icon: HouseLine,
      color: "bg-purple-500",
    },
  ];

  const recommendedProperties = [
    {
      title: "Sunny Loft in Arts District",
      location: "Los Angeles, CA",
      price: "$3,200/mo",
      beds: 1,
      baths: 1,
      image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9",
      tag: "New Match"
    },
    {
      title: "Modern Family Home",
      location: "Austin, TX",
      price: "$850,000",
      beds: 3,
      baths: 2,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      tag: "Price Drop"
    },
    {
      title: "Waterfront Condo",
      location: "Miami, FL",
      price: "$4,500/mo",
      beds: 2,
      baths: 2,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      tag: "Trending"
    }
  ];

  const myProperties = [
    {
      title: "Modern Apartment in City Center",
      location: "New York, NY",
      type: "Lease",
      status: "Active",
      date: "Ends Oct 2024",
      image: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Hello, John! 👋</h1>
          <p className="text-white/60">Ready to find your next dream home?</p>
        </div>
        <button className="px-6 py-2.5 bg-[#497693] hover:bg-[#3a6078] text-white rounded-xl font-medium transition-colors shadow-lg shadow-[#497693]/20">
          Browse Listings
        </button>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-20 text-white`}>
                <stat.icon size={24} weight="fill" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-white font-medium">{stat.title}</p>
              <p className="text-white/40 text-sm mt-1">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recommended For You */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Recommended For You</h2>
            <button className="text-[#497693] hover:text-white transition-colors text-sm font-medium">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedProperties.map((property, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 relative">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-[#497693] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {property.tag}
                  </div>
                  <button className="absolute bottom-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                    <Heart size={18} weight="fill" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold text-lg line-clamp-1">{property.title}</h3>
                    <p className="text-[#497693] font-bold whitespace-nowrap">{property.price}</p>
                  </div>
                  <div className="flex items-center text-white/50 text-sm mb-4">
                    <MapPin size={16} className="mr-1" />
                    {property.location}
                  </div>
                  <div className="flex items-center gap-4 text-white/60 text-sm border-t border-white/10 pt-4">
                    <span className="flex items-center gap-1"><Bed size={18} /> {property.beds} Beds</span>
                    <span className="flex items-center gap-1"><Bathtub size={18} /> {property.baths} Baths</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Current Home / Status */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">My Home</h2>
          
          {myProperties.map((property, index) => (
            <div key={index} className="bg-gradient-to-br from-[#497693]/20 to-black/40 backdrop-blur-md border border-[#497693]/30 p-6 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#497693]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               
               <div className="relative z-10">
                 <div className="flex justify-between items-start mb-4">
                   <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-md border border-green-500/20">
                     {property.status} {property.type}
                   </span>
                   <HouseLine size={24} className="text-white/40" />
                 </div>
                 
                 <h3 className="text-xl font-bold text-white mb-1">{property.title}</h3>
                 <p className="text-white/60 text-sm mb-6">{property.location}</p>
                 
                 <div className="space-y-3">
                   <div className="flex justify-between text-sm">
                     <span className="text-white/40">Lease Ends</span>
                     <span className="text-white font-medium">{property.date}</span>
                   </div>
                   <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-[#497693] h-full w-[75%]" />
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-3 mt-6">
                   <button className="py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors">
                     Pay Rent
                   </button>
                   <button className="py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors">
                     Request Fix
                   </button>
                 </div>
               </div>
            </div>
          ))}

          {/* Upcoming Tours Mini-List */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <CalendarCheck size={20} className="text-[#497693]" /> Upcoming Tours
            </h3>
            <div className="space-y-4">
               <div className="flex gap-3 items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                 <div className="bg-white/10 p-2 rounded-lg text-center min-w-[50px]">
                   <span className="block text-xs text-white/40 uppercase">Nov</span>
                   <span className="block text-lg font-bold text-white">25</span>
                 </div>
                 <div>
                   <p className="text-white font-medium text-sm">Luxury Villa Tour</p>
                   <p className="text-white/40 text-xs">2:00 PM • In-person</p>
                 </div>
               </div>
            </div>
             <button className="w-full mt-4 text-xs text-white/40 hover:text-white transition-colors flex items-center justify-center gap-1">
               View Calendar <CaretRight />
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
