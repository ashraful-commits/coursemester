"use client"

import { useState } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Heart, ShoppingCart, Trash2, Star, Clock, BookOpen,
    ArrowRight, Search, Zap, Filter
} from "lucide-react"

const mockWishlist = [
    {
        id: "3",
        title: "Flutter Mobile App Development",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
        price: 59.99,
        originalPrice: 149.99,
        instructor: { name: "Carlos Rossi" },
        rating: 4.8,
        reviews: 1876,
        totalHours: 38,
        level: "Intermediate",
        category: "Mobile",
    },
    {
        id: "5",
        title: "Node.js Backend Architecture Mastery",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
        price: 59.99,
        originalPrice: 149.99,
        instructor: { name: "Marcus Wells" },
        rating: 5.0,
        reviews: 876,
        totalHours: 28,
        level: "Intermediate",
        category: "Web Systems",
    },
    {
        id: "6",
        title: "AWS Solutions Architect Masterclass",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
        price: 89.99,
        originalPrice: 219.99,
        instructor: { name: "Sara Chen" },
        rating: 4.7,
        reviews: 1432,
        totalHours: 45,
        level: "Advanced",
        category: "Infrastructure",
    },
]

export default function WishlistPage() {
    const [items, setItems] = useState(mockWishlist)

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id))
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-24">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-pink-500/5 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-primary/6 rounded-full blur-[100px] animate-float" />
            </div>

            {/* Header */}
            <div className="relative z-10 pt-32 pb-12 border-b border-white/5 bg-white/[0.01] backdrop-blur-xl">
                <div className="container mx-auto px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 mb-5">
                        <Heart className="w-3 h-3 text-pink-400" />
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-pink-400">Target Inventory</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-3">
                        My <span className="text-gradient">Wishlist</span>
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        {items.length} prioritized modules saved for your next mission
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-14 relative z-10">
                {items.length === 0 ? (
                    <div className="glass-card rounded-[4rem] border-white/5 p-24 text-center max-w-2xl mx-auto animate-fadeInUp">
                        <div className="w-24 h-24 bg-pink-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                            <Heart className="w-12 h-12 text-pink-500/40" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter mb-4">Your Wishlist is Empty</h2>
                        <p className="text-muted-foreground font-medium mb-10">
                            Save courses you're interested in for later.
                        </p>
                        <Link href="/courses">
                            <Button className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                                <Search className="w-4 h-4 mr-2" />
                                Find New Courses
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex gap-4">
                                <Button variant="outline" size="sm" className="glass border-white/10 h-10 px-5 rounded-xl font-black uppercase tracking-widest text-[10px]">
                                    <Filter className="w-3.5 h-3.5 mr-2" />
                                    Filter
                                </Button>
                                <div className="h-10 w-px bg-white/10" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground self-center opacity-40">
                                    Sorted by Recently Added
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item, i) => (
                                <div
                                    key={item.id}
                                    className="glass-card group rounded-[2.5rem] border-white/5 hover:border-primary/20 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-fadeInUp"
                                    style={{ animationDelay: `${i * 80}ms` }}
                                >
                                    {/* Image */}
                                    <Link href={`/courses/${item.id}`} className="relative h-52 block overflow-hidden">
                                        <NextImage
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                                        <div className="absolute top-5 left-5">
                                            <Badge className="glass border-white/10 text-[8px] font-black uppercase tracking-widest">
                                                {item.category}
                                            </Badge>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                removeItem(item.id)
                                            }}
                                            className="absolute top-5 right-5 w-10 h-10 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-400/10 border border-white/10 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </Link>

                                    {/* Content */}
                                    <div className="p-8">
                                        <div className="flex items-center gap-1.5 mb-3 text-amber-400">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <span className="text-[10px] font-black">{item.rating}</span>
                                            <span className="text-[10px] text-muted-foreground font-black opacity-40">({item.reviews.toLocaleString()})</span>
                                        </div>

                                        <Link href={`/courses/${item.id}`}>
                                            <h3 className="text-xl font-black tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                {item.title}
                                            </h3>
                                        </Link>

                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-5">
                                            by {item.instructor.name}
                                        </p>

                                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-wider text-muted-foreground opacity-40 mb-8 pb-5 border-b border-white/5">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" /> {item.totalHours}h
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <BookOpen className="w-3.5 h-3.5" /> {item.level}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-2xl font-black tracking-tighter">${item.price}</div>
                                                <div className="text-[10px] line-through text-muted-foreground opacity-40">${item.originalPrice}</div>
                                            </div>
                                            <Button className="h-12 px-6 rounded-xl font-black uppercase tracking-widest text-[9px] bg-primary hover:bg-primary/90 shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all">
                                                <ShoppingCart className="w-3.5 h-3.5 mr-2" />
                                                Move to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 glass-card rounded-[3rem] border-primary/20 p-12 relative overflow-hidden text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tighter mb-4">Ready to level up?</h2>
                                <p className="text-muted-foreground font-medium opacity-60 mb-8 max-w-xl mx-auto">
                                    Grab these modules now and start your journey towards mastery. Limited time offer on elite courses.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <Button className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                                        Add All to Cart
                                    </Button>
                                    <Link href="/courses">
                                        <Button variant="outline" className="h-14 px-8 rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-[10px]">
                                            Explore More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
