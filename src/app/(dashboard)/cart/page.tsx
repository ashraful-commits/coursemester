"use client"

import { useState } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    ShoppingCart, Trash2, Tag, ArrowRight, BookOpen, Clock, Star,
    Shield, RefreshCw, Zap, X, CheckCircle, CreditCard, Lock
} from "lucide-react"

const mockCart = [
    {
        id: "1",
        title: "The Ultimate React Bootcamp 2024",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
        price: 49.99,
        originalPrice: 129.99,
        instructor: { name: "John Doe" },
        rating: 4.9,
        reviews: 3420,
        totalHours: 52,
        level: "Beginner",
        category: "Web Systems",
    },
    {
        id: "4",
        title: "Docker & Kubernetes: The Complete Guide",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
        price: 69.99,
        originalPrice: 179.99,
        instructor: { name: "Aisha Khan" },
        rating: 4.8,
        reviews: 1987,
        totalHours: 38,
        level: "Advanced",
        category: "Infrastructure",
    },
]

const COUPONS: Record<string, number> = {
    "ELITE50": 0.50,
    "STARTUP30": 0.30,
    "NEWUSER20": 0.20,
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState(mockCart)
    const [couponCode, setCouponCode] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
    const [couponError, setCouponError] = useState("")
    const [couponSuccess, setCouponSuccess] = useState("")

    const removeItem = (id: string) => {
        setCartItems((prev) => prev.filter((c) => c.id !== id))
    }

    const subtotal = cartItems.reduce((sum, c) => sum + c.price, 0)
    const discount = appliedCoupon ? subtotal * COUPONS[appliedCoupon] : 0
    const total = subtotal - discount

    const applyCoupon = () => {
        const code = couponCode.toUpperCase()
        if (COUPONS[code]) {
            setAppliedCoupon(code)
            setCouponSuccess(`🎉 Coupon applied! ${Math.round(COUPONS[code] * 100)}% off your order.`)
            setCouponError("")
        } else {
            setCouponError("Invalid coupon code. Try ELITE50, STARTUP30, or NEWUSER20.")
            setCouponSuccess("")
        }
    }

    const removeCoupon = () => {
        setAppliedCoupon(null)
        setCouponCode("")
        setCouponSuccess("")
        setCouponError("")
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-24">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/6 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-violet-500/5 rounded-full blur-[100px] animate-float" />
            </div>

            <div className="relative z-10 pt-28 pb-10 sm:pt-32 sm:pb-12 border-b border-white/5 bg-white/[0.01] backdrop-blur-xl">
                <div className="container mx-auto px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-5">
                        <ShoppingCart className="w-3 h-3 text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary">Order Queue</span>
                    </div>
                    <h1 className="text-4xl xs:text-5xl md:text-6xl font-black tracking-tighter leading-none mb-3">
                        Your <span className="text-gradient">Cart</span>
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground font-medium">
                        {cartItems.length} course{cartItems.length !== 1 ? "s" : ""} ready for checkout
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 sm:py-14 relative z-10">
                {cartItems.length === 0 ? (
                    <div className="glass-card rounded-[2.5rem] sm:rounded-[4rem] border-white/5 p-12 sm:p-24 text-center max-w-2xl mx-auto animate-fadeInUp">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-primary/10 rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 sm:mb-8">
                            <ShoppingCart className="w-8 h-8 sm:w-12 sm:h-12 text-primary/40" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-4">Your Cart is Empty</h2>
                        <p className="text-sm sm:text-base text-muted-foreground font-medium mb-8 sm:mb-10">
                            Add courses you want to start learning today.
                        </p>
                        <Link href="/courses">
                            <Button className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Browse Courses
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
                            {cartItems.map((item, i) => (
                                <div
                                    key={item.id}
                                    className="glass-card group rounded-3xl border-white/5 hover:border-primary/15 overflow-hidden transition-all duration-500 hover:-translate-y-0.5 animate-fadeInUp"
                                    style={{ animationDelay: `${i * 80}ms` }}
                                >
                                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
                                        <Link href={`/courses/${item.id}`} className="relative w-full sm:w-36 h-44 sm:h-24 rounded-2xl overflow-hidden shrink-0">
                                            <NextImage src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        </Link>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col xs:flex-row items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <Badge className="glass border-white/10 text-[8px] font-black uppercase tracking-widest mb-2">
                                                        {item.category}
                                                    </Badge>
                                                    <Link href={`/courses/${item.id}`}>
                                                        <h3 className="text-base sm:text-lg font-black tracking-tight group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                                            {item.title}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-3">
                                                        by {item.instructor.name}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground opacity-50">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                                            <span className="text-amber-400">{item.rating}</span>
                                                            <span>({item.reviews.toLocaleString()})</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {item.totalHours}h
                                                        </div>
                                                        <span>{item.level}</span>
                                                    </div>
                                                </div>
                                                <div className="flex xs:flex-col items-center xs:items-end justify-between w-full xs:w-auto shrink-0 border-t xs:border-none border-white/5 pt-4 xs:pt-0">
                                                    <div className="text-right">
                                                        <div className="text-xl sm:text-2xl font-black tracking-tighter">${item.price}</div>
                                                        <div className="text-[10px] sm:text-xs line-through text-muted-foreground opacity-40">${item.originalPrice}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="xs:mt-3 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-red-400 transition-colors bg-white/5 sm:bg-transparent px-3 py-1.5 rounded-lg xs:p-0"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Coupon Section */}
                            <div className="glass-card rounded-3xl border-white/5 p-6 sm:p-8 animate-fadeInUp delay-300">
                                <h3 className="text-base sm:text-lg font-black tracking-tight mb-4 sm:mb-5 flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-primary" /> Apply Coupon
                                </h3>
                                {appliedCoupon ? (
                                    <div className="flex items-center justify-between bg-emerald-400/10 border border-emerald-400/20 rounded-2xl p-4">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                                            <div>
                                                <p className="text-sm font-black text-emerald-400">{appliedCoupon}</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
                                                    {Math.round(COUPONS[appliedCoupon] * 100)}% discount applied
                                                </p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={removeCoupon} className="w-8 h-8 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-400/10">
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex flex-col xs:flex-row gap-3">
                                            <Input
                                                placeholder="Enter coupon code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                                                className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/40 font-mono font-bold uppercase tracking-widest text-sm"
                                            />
                                            <Button onClick={applyCoupon} className="h-12 px-6 rounded-xl font-black uppercase tracking-widest text-[10px] bg-primary hover:bg-primary/90 shrink-0">
                                                Apply
                                            </Button>
                                        </div>
                                        {couponError && (
                                            <p className="text-[11px] font-bold text-red-400 flex items-center gap-1.5">
                                                <X className="w-3 h-3" /> {couponError}
                                            </p>
                                        )}
                                        {couponSuccess && (
                                            <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                                                <CheckCircle className="w-3 h-3" /> {couponSuccess}
                                            </p>
                                        )}
                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
                                            Try: ELITE50 • STARTUP30 • NEWUSER20
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:sticky lg:top-28 space-y-5">
                            <div className="glass-card rounded-3xl border-white/5 p-8 animate-fadeInUp delay-200">
                                <h3 className="text-xl font-black tracking-tight mb-6">Order Summary</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm font-semibold text-muted-foreground">
                                        <span>Subtotal ({cartItems.length} courses)</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    {appliedCoupon && (
                                        <div className="flex justify-between text-sm font-bold text-emerald-400">
                                            <span>Discount ({appliedCoupon})</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="h-px bg-white/5" />
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-lg font-black">Total</span>
                                        <div className="text-right">
                                            <span className="text-3xl font-black tracking-tighter text-primary">${total.toFixed(2)}</span>
                                            {cartItems.reduce((sum, c) => sum + c.originalPrice, 0) > total && (
                                                <div className="text-[10px] font-black text-emerald-400 mt-1">
                                                    You save ${(cartItems.reduce((sum, c) => sum + c.originalPrice, 0) - total).toFixed(2)} today
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)] transition-all group mb-4">
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Checkout Now
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>

                                <div className="text-center">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40 flex items-center justify-center gap-1.5">
                                        <Lock className="w-3 h-3" /> Secure 256-bit SSL Encryption
                                    </p>
                                </div>
                            </div>

                            {/* Guarantees */}
                            <div className="glass-card rounded-3xl border-white/5 p-6 space-y-4">
                                {[
                                    { icon: Shield, title: "30-Day Money Back", desc: "Full refund, no questions asked" },
                                    { icon: RefreshCw, title: "Lifetime Access", desc: "Learn at your own pace, forever" },
                                    { icon: Zap, title: "Instant Access", desc: "Start learning the moment you pay" },
                                ].map((g, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-9 h-9 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0 mt-0.5">
                                            <g.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black uppercase tracking-widest">{g.title}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium opacity-50">{g.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
