
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import './style.scss'

const Home = () => {
    const line1 = "Decentralized perpetual contracts.";
    const [typedText, setTypedText] = useState('');
    const [showSecondLine, setShowSecondLine] = useState(false);

    useEffect(() => {
        setTypedText('');
        setShowSecondLine(false);
        const interval = setInterval(() => {
            setTypedText((prev: any) => {
                if (prev.length < line1.length) {
                    return line1.substring(0, prev.length + 1);
                } else {
                    clearInterval(interval);
                    setShowSecondLine(true);
                    return prev;
                }
            });
        }, 70);

        return () => clearInterval(interval);
    }, []);
    return <>
        <div className="homepage">
            <section className="hero-section">
                <h1>
                    {typedText}
                    <span className="typing-cursor"></span>
                    <br />
                    {showSecondLine && (
                        <span>Trade <span className="highlight">crypto</span></span>
                    )}
                </h1>
                <p>Non-custodial trading built for all — whether you're new to crypto or a seasoned pro.</p>
                <div className="hero-actions">
                    <Button type="primary"
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            borderColor: 'var(--color-primary)'
                        }}
                    // onClick={() => onNavigate('trading')}
                    >
                        Launch app
                    </Button>
                    <Button>Download app</Button>
                </div>
            </section>

            <section className="stats-section">
                <div className="stat-item">
                    <h2>$129B+</h2>
                    <p>Total Trading Volume</p>
                </div>
                <div className="stat-item">
                    <h2>1M+</h2>
                    <p>Users</p>
                </div>
                <div className="stat-item">
                    <h2>$101M+</h2>
                    <p>TVL</p>
                </div>
            </section>

            <section className="features-section homepage-section">
                <h2 className="section-title">Why <span className="highlight">Baby Shiba</span></h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Cross-chain trading</h3>
                        <p>No bridging or no switching, just pick a chain and place a trade.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Unmatched liquidity</h3>
                        <p>Access deep liquidity pooled across markets to support large, confident trades.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Confidence in every trade</h3>
                        <p>Whether you’re new or a pro, enjoy a streamlined experience built for clarity and control.</p>
                    </div>
                </div>
            </section>

            <section className="partners-section">
                <h3 className="section-title">OUR PARTNERS</h3>
                <div className="partners-logos">
                    <img src="https://static.asterdex.com/cloud-futures/static/images/aster/partners/YZi_labs.svg" alt="YZi Labs" />
                    <img src="https://static.asterdex.com/cloud-futures/static/images/aster/partners/Pendle.svg" alt="Pendle" />
                    <img src="https://static.asterdex.com/cloud-futures/static/images/aster/partners/ListaDAO.svg" alt="ListaDAO" />
                    <img src="https://static.asterdex.com/cloud-futures/static/images/aster/partners/Kernel.svg" alt="Kernel" />
                    <img src="https://static.asterdex.com/cloud-futures/static/images/aster/partners/Venus.svg" alt="Venus" />
                    <img src="https://static.asterdex.com/cloud-futures/static/images/aster/partners/PancakeSwap.svg" alt="PancakeSwap" />
                </div>
            </section>

            <section className="cta-section homepage-section">
                <h1>Trade smarter. Earn more.</h1>
                <p>Try <span className="highlight">Baby Shiba</span></p>
                <div className="hero-actions">
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            borderColor: 'var(--color-primary)'
                        }}
                    // onClick={() => onNavigate('trading')}
                    >
                        Launch app
                    </Button>
                    <Button>Download app</Button>
                </div>
            </section>

        </div>
    </>;
};

export default Home;