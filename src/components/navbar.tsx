"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen, LogOut, Settings, User, ChevronDown, Menu,
  Zap, BookMarked, GraduationCap, Search, Heart, ShoppingCart, X
} from "lucide-react";
import { ThemeSelector } from "@/components/theme-selector";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { href: "/courses", label: "Modules", icon: BookMarked },
    { href: "/instructor", label: "Instruct", icon: GraduationCap, role: "INSTRUCTOR" },
    { href: "/dashboard", label: "My Progress", icon: Zap },
  ];

  return (
    <>
      {/* ─── GLOBAL SEARCH OVERLAY ───────────────────────────────── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-start justify-center pt-32 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl glass-card rounded-3xl border-primary/20 shadow-[0_30px_80px_rgba(0,0,0,0.7)] overflow-hidden animate-fadeInDown"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-4 p-5">
              <Search className="w-5 h-5 text-primary shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search courses, topics, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-lg font-semibold placeholder:text-muted-foreground/40 outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </form>
            <div className="px-5 pb-4 flex items-center gap-4 border-t border-white/5 pt-4">
              {["React", "Python", "DevOps", "AI", "TypeScript"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => { router.push(`/search?q=${tag}`); setSearchOpen(false); }}
                  className="text-[10px] font-black uppercase tracking-widest glass border border-white/10 hover:border-primary/30 text-muted-foreground hover:text-primary px-3 py-1.5 rounded-xl transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 print:hidden ${scrolled
          ? "glass border-b border-white/5 shadow-[0_4px_40px_rgba(0,0,0,0.3)] bg-background/80 backdrop-blur-2xl py-0"
          : "bg-transparent backdrop-blur-sm py-2"
          }`}
      >
        <div className="container mx-auto px-4 h-24 flex items-center justify-between gap-4">
          {/* ─── LOGO ──────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 font-black text-2xl group shrink-0">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-[14px] bg-primary text-primary-foreground group-hover:rotate-12 transition-all duration-500 shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
              <BookOpen className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
            </div>
            <span className="text-gradient tracking-tighter hidden sm:block">CodeMaster</span>
          </Link>

          {/* ─── NAV LINKS ─────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              (!link.role || session?.user?.role === link.role) ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-all duration-300 group px-5 py-2.5 rounded-2xl hover:bg-primary/5"
                >
                  <link.icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                  <span className="absolute bottom-1 left-5 right-5 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ) : null
            )}
          </nav>

          {/* ─── SEARCH BAR (desktop) ──────────────────────────────── */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-3 flex-1 max-w-xs h-10 px-4 glass rounded-2xl border border-white/8 text-muted-foreground hover:border-primary/30 hover:text-primary transition-all duration-300 text-sm font-medium group"
          >
            <Search className="w-4 h-4 opacity-40 group-hover:opacity-70 transition-opacity" />
            <span className="flex-1 text-left opacity-40 text-[12px]">Search courses...</span>
            <kbd className="hidden xl:flex items-center gap-0.5 text-[9px] font-black opacity-30 bg-white/5 px-1.5 py-0.5 rounded-md">
              ⌘K
            </kbd>
          </button>

          {/* ─── RIGHT SIDE ────────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            {/* Theme Selector */}
            <div className="hidden sm:block"><ThemeSelector /></div>

            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="md:hidden h-11 w-11 rounded-xl glass border border-white/8 hover:bg-white/5 hover:border-primary/20 transition-all"
            >
              <Search className="h-5 w-5" />
            </Button>

            {session ? (
              <>
                {/* Wishlist */}
                <Link href="/wishlist">
                  <Button variant="ghost" size="icon" className="hidden sm:flex h-11 w-11 rounded-xl glass border border-white/8 hover:bg-white/5 hover:text-pink-400 hover:border-pink-400/20 transition-all">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
                {/* Cart */}
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="hidden sm:flex h-11 w-11 rounded-xl glass border border-white/8 hover:bg-white/5 hover:text-primary hover:border-primary/20 transition-all relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[8px] font-black text-primary-foreground flex items-center justify-center">2</span>
                  </Button>
                </Link>
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-12 px-4 rounded-2xl glass border border-white/8 hover:bg-white/5 hover:border-primary/20 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8 rounded-xl border-2 border-primary/30">
                            <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                            <AvatarFallback className="bg-primary/15 text-primary text-[10px] font-black uppercase rounded-xl">
                              {session.user.name?.[0]?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-background" />
                        </div>
                        <div className="hidden xl:flex flex-col items-start">
                          <span className="text-[11px] font-black uppercase tracking-tight leading-none mb-1">
                            {session.user.name}
                          </span>
                          <span className="text-[9px] text-primary font-black uppercase tracking-widest leading-none opacity-60">
                            {session.user.role}
                          </span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-72 p-2 glass border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-3xl mt-3 animate-fadeInDown"
                  >
                    <div className="flex items-center gap-4 p-4 mb-2 bg-white/5 rounded-2xl border border-white/5">
                      <Avatar className="h-14 w-14 rounded-2xl border-2 border-primary/20 shadow-xl">
                        <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                        <AvatarFallback className="bg-primary/20 text-primary font-black text-xl rounded-2xl">
                          {session.user.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-1 min-w-0">
                        <p className="text-base font-black leading-tight truncate">{session.user.name}</p>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider opacity-50 mt-1 truncate">{session.user.email}</p>
                        <span className="inline-flex items-center gap-1.5 mt-2">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">Online</span>
                        </span>
                      </div>
                    </div>
                    <div className="space-y-0.5 mb-1">
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer text-[13px] font-bold p-3 rounded-xl hover:bg-primary/8 hover:text-primary transition-all flex items-center">
                          <Zap className="mr-3 h-4 w-4 opacity-60" /> My Learning
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/wishlist" className="cursor-pointer text-[13px] font-bold p-3 rounded-xl hover:bg-primary/8 hover:text-primary transition-all flex items-center">
                          <Heart className="mr-3 h-4 w-4 opacity-60" /> Wishlist
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/cart" className="cursor-pointer text-[13px] font-bold p-3 rounded-xl hover:bg-primary/8 hover:text-primary transition-all flex items-center">
                          <ShoppingCart className="mr-3 h-4 w-4 opacity-60" /> Cart
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings/theme" className="cursor-pointer text-[13px] font-bold p-3 rounded-xl hover:bg-primary/8 hover:text-primary transition-all flex items-center">
                          <Settings className="mr-3 h-4 w-4 opacity-60" /> Settings
                        </Link>
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator className="my-2 bg-white/5" />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="cursor-pointer text-red-400 font-bold text-[13px] p-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all"
                    >
                      <LogOut className="mr-3 h-4 w-4" /> Terminate Session
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/sign-in" className="hidden sm:block">
                  <Button variant="ghost" className="h-11 px-5 text-[12px] font-black uppercase tracking-widest hover:text-primary hover:bg-transparent transition-colors">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="h-11 px-7 rounded-2xl text-[12px] font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_35px_hsl(var(--primary)/0.5)] transition-all">
                    Get Access
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl glass border border-white/8 hover:bg-white/5 hover:border-primary/20 transition-all">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] glass border-l border-white/5 p-8 flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.4)]">
                <SheetHeader className="mb-12">
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-3 font-black text-2xl" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <span className="text-gradient tracking-tighter">CodeMaster</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                  {navLinks.map((link) =>
                    (!link.role || session?.user?.role === link.role) ? (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-4 text-[13px] font-black uppercase tracking-[0.15em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all p-5 rounded-[2rem] border border-transparent hover:border-primary/10"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                          <link.icon className="w-5 h-5 opacity-60" />
                        </div>
                        {link.label}
                      </Link>
                    ) : null
                  )}
                  {session && (
                    <>
                      <Link href="/wishlist" className="flex items-center gap-4 text-[13px] font-black uppercase tracking-[0.15em] text-muted-foreground hover:text-pink-400 hover:bg-pink-400/5 transition-all p-5 rounded-[2rem]" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                          <Heart className="w-5 h-5 opacity-60" />
                        </div>
                        Wishlist
                      </Link>
                      <Link href="/cart" className="flex items-center gap-4 text-[13px] font-black uppercase tracking-[0.15em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all p-5 rounded-[2rem]" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                          <ShoppingCart className="w-5 h-5 opacity-60" />
                        </div>
                        Cart
                      </Link>
                    </>
                  )}

                  {/* Appearance section in mobile menu */}
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-4 px-4">Customization</p>
                    <div className="px-4">
                      <ThemeSelector />
                    </div>
                  </div>
                </nav>
                {!session && (
                  <div className="flex flex-col gap-3 pt-10 border-t border-white/5 mt-auto">
                    <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full h-14 rounded-2xl glass border-white/10 font-black uppercase tracking-widest hover:border-primary/30 transition-all text-[11px]" size="lg">Sign In</Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl bg-primary hover:bg-primary/90 text-[11px]" size="lg">Get Started</Button>
                    </Link>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}