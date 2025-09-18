/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useSwitchChain, useChainId } from "wagmi";
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

const Header = () => {
    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const { openConnectModal } = useConnectModal();
    const { disconnect } = useDisconnect();

    const { address } = useAccount();
    const chainId = useChainId()
    const { switchChainAsync } = useSwitchChain()
    const location = useLocation();
    const pathname = location.pathname;

    // Lắng nghe thay đổi kích thước màn hình
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDisconnect = () => {
        disconnect();
    };


    const items: MenuProps['items'] = [
        {
            label: (
                <Link
                    to="/portfolio"
                >
                    <UserOutlined style={{ color: '#ffb300' }} /> Portfolio
                </Link>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <div className='logout' onClick={handleDisconnect}>
                    <LogoutOutlined style={{ color: '#ffb300' }} /> Disconnect
                </div>
            ),
            key: '3',
        },
    ];

    function handleCloseMenu() {
        setIsOpen(false);
    }

    function goToBoard() {
        navigate('board');
    }

    return (
        <header className="header">
            <div className="content-header">
                <div className="header__left">
                    <div className="header__logo" onClick={goToBoard}>
                        <img
                            src="/images/logo-text.png"
                            alt="Logo"
                            className="header__logo-img"
                        />
                    </div>
                    <nav className={`header__nav ${isOpen ? "active" : ""}`}>
                        <Link
                            to="/"
                            className={`header__link${pathname === '/' ? ' active' : ''}`}
                        >
                            Board
                        </Link>
                        <Link
                            to="/create-token"
                            className={`header__link${pathname === '/create-token' ? ' active' : ''}`}
                        >
                            Create token
                        </Link>
                        <Link
                            to="/ranking"
                            className={`header__link${pathname === '/ranking' ? ' active' : ''}`}
                        >
                            Ranking
                        </Link>
                        <Link
                            to="/advanced"
                            className={`header__link${pathname === '/advanced' ? ' active' : ''}`}
                        >
                            Advanced
                        </Link>
                        <Link
                            to="#"
                            className={`header__link${pathname === '#' ? ' active' : ''}`}
                        >
                            Campaign
                        </Link>

                        {/* Phần nội dung dưới cùng */}
                        {isMobile ? (
                            <div className="header__nav-bottom">
                                <a className="header__nav-desc" href="#">
                                    How it works?
                                </a>
                                <div className="header__nav-social">
                                    <a href="#" className="header__nav-icon">
                                        <img src="/images/telegram.png" alt="Telegram" />
                                    </a>
                                    <a href="#" className="header__nav-icon"><img src="/images/x.png" alt="X" /></a>
                                    <a href="#" className="header__nav-icon"><img src="/images/discord.png" alt="Discord" /></a>
                                </div>
                            </div>
                        ) : ('')}
                    </nav>
                </div>
                <div className="header__right">
                    {address ? (
                        <>
                            <Dropdown
                                overlayClassName="header__dropdown"
                                menu={{ items }}
                                trigger={['click']}>
                                <button
                                    className={`header__wallet-btn ${isOpen ? "show" : ""}`}
                                >
                                    <img className='icon-wallet' src="/images/icon-wallet.png" alt="" />
                                    &#160;
                                    {`${address.slice(0, 4)}...${address.slice(-4)}`}&ensp;
                                    <img className='icon-up' src="/images/arr-up.png" alt="" />
                                </button>
                            </Dropdown>
                        </>

                    ) : (
                        <button
                            onClick={openConnectModal}
                            className={`header__wallet-btn ${isOpen ? "show" : ""}`}
                        >
                            {isMobile ? "Login" : "Connect Wallet"}
                        </button>
                    )}

                    {/* Toggle button chỉ hiện mobile */}
                    <button
                        className="header__toggle"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? "✖" : "☰"}
                    </button>
                </div>
                {/* Overlay mờ */}
                {isOpen && <div className="header__overlay" onClick={handleCloseMenu} />}
            </div>
        </header>
    );
}
export default Header;