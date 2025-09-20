/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import "./style.scss"


// --- Các component Icon có thể tái sử dụng ---
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);
const QRIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-qr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15V9a2 2 0 012-2h2m12 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-2 2H9a2 2 0 01-2-2v-2M9 3h6" />
    </svg>
);
const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.848.941 3.48 2.379 4.439-.877-.028-1.699-.269-2.416-.662v.054c0 2.58 1.838 4.732 4.27 5.22-.446.121-.918.186-1.407.186-.343 0-.677-.034-1.003-.095.679 2.115 2.649 3.654 4.983 3.696-1.825 1.43-4.122 2.28-6.625 2.28-.43 0-.855-.025-1.274-.075 2.361 1.514 5.164 2.396 8.177 2.396 9.813 0 15.178-8.128 15.178-15.178 0-.23 0-.459-.015-.685.99-.715 1.846-1.613 2.525-2.624z" />
    </svg>
);
const TelegramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15.91L18.23 18.5c-.27.77-1.02 1.08-1.72.68l-4.55-3.35-4.18 3.91c-.39.37-.92.58-1.44.58-.57 0-.87-.22-1-.65z" />
    </svg>
);
const DiscordIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.369a1.875 1.875 0 00-1.32.53l-1.885 1.884a12.822 12.822 0 00-3.3-.434s-.484-.048-1.127.048c-1.8.24-3.414.96-4.632 1.92-1.32.96-2.22 2.16-2.22 2.16s.6.96 1.8 1.8c.36.24.6.48.96.72a11.232 11.232 0 00-1.572 2.028c-1.08 1.56-1.44 2.88-1.44 2.88s.36.48 1.08.96c.72.36 1.44.72 2.16 1.08 1.2.6 2.4.96 3.6.96h.12c.6-.048 1.08-.24 1.56-.48.48-.24 1.08-.6 1.56-.96.96-.6 1.68-1.44 1.68-1.44s-.048-.12-.12-.36a10.02 10.02 0 00-.72-1.08c.12-.048.24-.12.36-.12.36-.12.72-.36 1.08-.6.96-.6 1.68-1.44 1.68-1.44s-.6-1.08-1.8-2.04a13.12 13.12 0 00-3-.84v-.048s.24-.12.48-.12c.36-.12.72-.24 1.08-.36.72-.36 1.44-.72 2.04-1.2.6-.48.96-.96.96-.96a1.875 1.875 0 00.342-1.458zM8.03 15.36c-.96 0-1.68-.72-1.68-1.68s.72-1.68 1.68-1.68c.96 0 1.68.72 1.68 1.68s-.72 1.68-1.68 1.68zm7.92 0c-.96 0-1.68-.72-1.68-1.68s.72-1.68 1.68-1.68c.96 0 1.68.72 1.68 1.68s-.72 1.68-1.68 1.68z" />
    </svg>
);

// --- Các Custom Hook ---
const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const endNum = parseInt(end);
        if (start === endNum) return;
        let totalFrames = Math.round(duration / (1000 / 60));
        let counter = setInterval(() => {
            start += Math.ceil(endNum / totalFrames);
            if (start >= endNum) {
                setCount(endNum);
                clearInterval(counter);
            } else {
                setCount(start);
            }
        }, 1000 / 60);
        return () => clearInterval(counter);
    }, [end, duration]);
    return count;
};

const useTypingEffect = (textToType, typeSpeed = 150, deleteSpeed = 100, delay = 2000) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => {
        const handleTyping = () => {
            if (isDeleting) {
                setText(currentText => currentText.substring(0, currentText.length - 1));
            } else {
                setText(currentText => textToType.substring(0, currentText.length + 1));
            }
        };
        const typingTimeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
        if (!isDeleting && text === textToType) {
            setTimeout(() => setIsDeleting(true), delay);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
        }
        return () => clearTimeout(typingTimeout);
    }, [text, isDeleting, textToType, typeSpeed, deleteSpeed, delay]);
    return text;
};

const useScrollAnimation = (options) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (options?.triggerOnce) {
                    observer.disconnect();
                }
            }
        }, options);
        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);
    return [ref, isVisible];
};

const useTextScramble = (phrases, activeIndex) => {
    const [displayText, setDisplayText] = useState(phrases[activeIndex]);
    const frameRequestRef = useRef();
    const frameRef = useRef(0);
    const queueRef = useRef([]);
    const prevTextRef = useRef(phrases[activeIndex]);
    const scrambleChars = '!<>-_\\/[]{}—=+*^?#';

    useEffect(() => {
        const fromText = prevTextRef.current;
        const toText = phrases[activeIndex];
        const queue = [];

        for (let i = 0; i < Math.max(fromText.length, toText.length); i++) {
            const from = fromText[i] || '';
            const to = toText[i] || '';
            const start = Math.floor(Math.random() * 20);
            const end = start + Math.floor(Math.random() * 20) + 10;
            queue.push({ from, to, start, end });
        }

        queueRef.current = queue;
        frameRef.current = 0;

        const animate = () => {
            let output = '';
            let complete = 0;
            for (let i = 0, n = queueRef.current.length; i < n; i++) {
                let { from, to, start, end, char } = queueRef.current[i];
                if (frameRef.current >= end) {
                    complete++;
                    output += to;
                } else if (frameRef.current >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                        queueRef.current[i].char = char;
                    }
                    output += char;
                } else {
                    output += from;
                }
            }
            setDisplayText(output);

            if (complete === queueRef.current.length) {
                prevTextRef.current = toText;
                cancelAnimationFrame(frameRequestRef.current);
            } else {
                frameRef.current++;
                frameRequestRef.current = requestAnimationFrame(animate);
            }
        };

        cancelAnimationFrame(frameRequestRef.current);
        frameRequestRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameRequestRef.current);
            prevTextRef.current = phrases[activeIndex];
            setDisplayText(phrases[activeIndex]);
        }
    }, [activeIndex, phrases]);

    return displayText;
};

// --- CÁC SECTION CỦA TRANG ---
const HeroSection = () => {
    const typedText = useTypingEffect("ecentralized Trading", 150, 100, 2000);
    return (
        <section className="hero-section">
            <div className="blurry-shape shape-1"></div>
            <div className="blurry-shape shape-2"></div>
            <div className="blurry-shape shape-3"></div>
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="hero-title-static">The Future Of</span>
                        <br />
                        <span className="hero-title-dynamic">
                            D{typedText}
                            {/* <span className="typing-cursor"></span> */}
                        </span>
                    </h1>
                    <p className="hero-subtitle">
                        Experience superior speed, security, and liquidity on a next-generation DEX platform. Trade smarter, not harder.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary">Launch App</button>
                        <button className="btn btn-secondary">Learn More</button>
                    </div>
                </div>
                <div className="hero-animation">
                    <div className="sphere-3d-container">
                        <div className="sphere-core">
                            <div className="sphere-glow"></div>
                            <img src="https://placehold.co/100x100/fff5f7/f61f77?text=BABY SHIBA" alt="Logo" className="sphere-logo" />
                        </div>
                        <div className="sphere-orbit orbit-1">
                            <div className="sphere-satellite"></div>
                        </div>
                        <div className="sphere-orbit orbit-2">
                            <div className="sphere-satellite"></div>
                        </div>
                        <div className="sphere-orbit orbit-3">
                            <div className="sphere-satellite"></div>
                        </div>
                        <div className="sphere-orbit orbit-4">
                            <div className="sphere-satellite"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TradingViewSection = () => {
    const sectionData = [
        {
            title: "Advanced Trading, Simplified.",
            subtitle: "A professional-grade trading experience, designed to be intuitive for everyone.",
            imgSrc: "/images/trade1.jpg"
        },
        {
            title: "Advanced Trading, Simplified.",
            subtitle: "A professional-grade trading experience, designed to be intuitive for everyone.",
            imgSrc: "/images/trade3.jpeg"
        },
        {
            title: "Advanced Trading, Simplified.",
            subtitle: "A professional-grade trading experience, designed to be intuitive for everyone.",
            imgSrc: "/images/trade2.jpeg"
        },
        {
            title: "Advanced Trading, Simplified.",
            subtitle: "A professional-grade trading experience, designed to be intuitive for everyone.",
            imgSrc: "/images/trade4.jpeg"
        }
    ];

    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveSlide(prevSlide => (prevSlide + 1) % sectionData.length);
        }, 2500);

        return () => clearInterval(intervalId);
    }, []);

    const titles = sectionData.map(d => d.title);
    const subtitles = sectionData.map(d => d.subtitle);

    const scrambledTitle = useTextScramble(titles, activeSlide);
    const scrambledSubtitle = useTextScramble(subtitles, activeSlide);

    return (
        <section className="trading-view-section">
            <div className="trading-view-content-wrapper">
                <h2 className="section-title">{scrambledTitle}</h2>
                <p className="section-subtitle">{scrambledSubtitle}</p>
            </div>

            <div className="trading-view-images-container">
                {sectionData.map((slide, index) => (
                    <div
                        key={index}
                        className="trading-image-wrapper"
                        style={{ opacity: activeSlide === index ? 1 : 0 }}
                    >
                        <img
                            src={slide.imgSrc}
                            alt={`Trading Platform UI - View ${index + 1}`}
                            className="trading-image"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

const StatsSection = () => {
    const totalValue = useCountUp(134567890);
    const dailyVolume = useCountUp(25890123);
    const activeUsers = useCountUp(15234);
    const stats = [
        { label: "Total Value Locked", value: `$${totalValue.toLocaleString()}` },
        { label: "24h Trading Volume", value: `$${dailyVolume.toLocaleString()}` },
        { label: "Active Users", value: activeUsers.toLocaleString() },
    ];
    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <p className="stat-value">{stat.value}</p>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
const FeaturesSection = () => {
    const features = [
        { icon: '⚡️', title: 'Lightning-Fast Trades', description: 'Execute trades in milliseconds with our optimized, high-performance matching engine.' },
        { icon: '🛡️', title: 'Fort-Knox Security', description: 'Your assets are protected by multi-layered security protocols and regular audits.' },
        { icon: '🌊', title: 'Deep Liquidity Pools', description: 'Access deep liquidity across a wide range of assets for minimal slippage.' },
        { icon: '🎁', title: 'Rewarding Ecosystem', description: 'Earn passive income through staking, yield farming, and liquidity providing.' },
    ];
    const [sectionRef, isVisible] = useScrollAnimation({
        threshold: 0.2,
        triggerOnce: true
    });
    return (
        <section ref={sectionRef} className="features-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Why Choose Our DEX?</h2>
                    <p className="section-subtitle">We provide a comprehensive suite of tools designed for both novice and professional traders.</p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`feature-card ${isVisible ? 'is-visible' : ''}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
const PartnersSection = () => {
    const partners = [
        { src: "https://static.asterdex.com/cloud-futures/static/images/aster/partners/Venus.svg", alt: "" },
        { src: "https://static.asterdex.com/cloud-futures/static/images/aster/partners/Kernel.svg", alt: "" },
        { src: "https://static.asterdex.com/cloud-futures/static/images/aster/partners/ListaDAO.svg", alt: "" },
        { src: "https://static.asterdex.com/cloud-futures/static/images/aster/partners/YZi_labs.svg", alt: "" },
        { src: "https://static.asterdex.com/cloud-futures/static/images/aster/partners/Pendle.svg", alt: "" },
        { src: "https://static.asterdex.com/cloud-futures/static/images/aster/partners/PancakeSwap.svg", alt: "" },
        { src: "https://static.asterdex.com/cloud-futures/static/images/aster/partners/Hyperbot.svg", alt: "" },
    ];
    const marqueeItems = [...partners, ...partners];
    return (
        <section className="partners-section">
            <div className="container">
                <h2 className="section-title">Backed By</h2>
                <div className="marquee-container">
                    <div className="marquee-content">
                        {marqueeItems.map((partner, index) => (
                            <div key={index} className="partner-item">
                                <img src={partner.src} alt={partner.alt} className="partner-logo" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
const CommunitySection = () => {
    return (
        <section className="community-section">
            <div className="container community-container">
                <h2 className="section-title">Trade smarter. Earn more.</h2>
                <div className="community-brand">
                    <span>Try</span>
                    <img src="/images/logo-bapy.jpeg" alt=" Logo" className="community-logo" />
                    <span>Baby Shiba</span>
                </div>
                <div className="community-buttons">
                    <button className="btn btn-primary btn-icon">
                        Launch app <ArrowRightIcon />
                    </button>
                    <button className="btn btn-dark btn-icon">
                        Download app <QRIcon />
                    </button>
                </div>
            </div>
        </section>
    );
};
const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-copyright">&copy; {new Date().getFullYear()} Baby Shiba DEX. All rights reserved.</div>
                <div className="footer-right">
                    <div className="footer-socials">
                        <a href="#" className="social-link"><TwitterIcon /></a>
                        <a href="#" className="social-link"><TelegramIcon /></a>
                        <a href="#" className="social-link"><DiscordIcon /></a>
                    </div>
                    <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    );
};

// --- Component Trang Chủ Chính ---
export default function HomePage() {
    return (
        <>
            <div className="page-wrapper">
                <main>
                    <HeroSection />
                    <TradingViewSection />
                    <StatsSection />
                    <FeaturesSection />
                    <PartnersSection />
                    <CommunitySection />
                </main>

                <Footer />
            </div>
        </>
    );
}

