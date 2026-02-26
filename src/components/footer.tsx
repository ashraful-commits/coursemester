import Link from "next/link"
import { BookOpen, Twitter, Github, Linkedin, Youtube, Mail, Shield, Zap, Globe } from "lucide-react"

const footerLinks = {
    Platform: [
        { label: "Browse Courses", href: "/courses" },
        { label: "Categories", href: "/categories" },
        { label: "Instructors", href: "/instructors" },
        { label: "Enterprise", href: "/enterprise" },
    ],
    Learning: [
        { label: "My Learning", href: "/dashboard" },
        { label: "Wishlist", href: "/wishlist" },
        { label: "Cart", href: "/cart" },
        { label: "Certificates", href: "/dashboard" },
    ],
    Support: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ],
    Company: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Teach on CodeMaster", href: "/sign-up" },
    ],
}

const socials = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

const stats = [
    { value: "15K+", label: "Learners" },
    { value: "380+", label: "Courses" },
    { value: "120+", label: "Instructors" },
    { value: "98%", label: "Success Rate" },
]

export function Footer() {
    return (
        <footer className="relative border-t border-white/5 bg-background/80 backdrop-blur-xl overflow-hidden print:hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[60%] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 pt-20 pb-10 relative z-10">
                {/* Top — brand + stats */}
                <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16 pb-16 border-b border-white/5">
                    {/* Brand */}
                    <div className="max-w-sm">
                        <Link href="/" className="flex items-center gap-3 font-black text-2xl group mb-6">
                            <div className="flex items-center justify-center w-11 h-11 rounded-[14px] bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)] group-hover:rotate-12 transition-transform">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <span className="text-gradient tracking-tighter">CodeMaster</span>
                        </Link>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed opacity-60 mb-8">
                            The elite platform where developers go from zero to production-ready. Taught by industry veterans. Trusted by thousands.
                        </p>
                        <div className="flex items-center gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-10 h-10 glass rounded-xl border border-white/8 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                                >
                                    <s.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-5">
                        {stats.map((s, i) => (
                            <div key={i} className="glass-card rounded-2xl border-white/5 p-6 text-center min-w-[110px]">
                                <div className="text-2xl font-black tracking-tighter text-primary mb-1">{s.value}</div>
                                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground opacity-40 mb-5">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 opacity-70 hover:opacity-100"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter Banner */}
                <div className="glass-card rounded-[2.5rem] border-primary/15 p-10 mb-14 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-violet-500/5 pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black tracking-tight">Stay Ahead of the Curve</h4>
                                <p className="text-sm text-muted-foreground font-medium opacity-60">New courses, discounts, and learning tips — weekly.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto sm:flex-col">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="h-12 px-5 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/40 text-sm font-semibold outline-none transition-all flex-1 md:w-72"
                            />
                            <button className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all shrink-0">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
                    <p className="text-[11px] font-medium text-muted-foreground opacity-40 text-center md:text-left">
                        © {new Date().getFullYear()} CodeMaster Learning Platform. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {[
                            { icon: Shield, label: "Secure Payments" },
                            { icon: Globe, label: "Available Worldwide" },
                            { icon: Zap, label: "Instant Access" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-30">
                                <item.icon className="w-3 h-3" />
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
