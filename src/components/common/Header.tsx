/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from "wagmi";
import { LogoutOutlined, SettingOutlined, ArrowRightOutlined, SyncOutlined } from '@ant-design/icons';
import { Dropdown, Modal } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

const ReferralRulesModal = ({ visible, onCancel }: any) => (
    <Modal
        title="Settings"
        open={visible}
        onCancel={onCancel}
        footer={null}
        className="rules-modal"
        width={450}
    >
        <div className="modal-section">
            <div className="section-title">Trade</div>
            <div className="setting-row">
                <span className="label">Asset Mode</span>
                <span className="value">Multi-Asset Mode <ArrowRightOutlined /></span>
            </div>
            <div className="setting-row">
                <span className="label">Position mode</span>
                <span className="value">One-Way Mode <ArrowRightOutlined /></span>
            </div>
            <div className="setting-row">
                <span className="label">Order confirmation</span>
                <span className="value"><ArrowRightOutlined /></span>
            </div>
        </div>
        <div className="modal-section">
            <div className="section-title">Interface</div>
            <div className="setting-row">
                <span className="label">Trading Panel</span>
                <span className="value"><SyncOutlined /> Reset</span>
            </div>
        </div>
        <div className="modal-section">
            <div className="section-title">Standard</div>
            <div className="setting-row">
                <span className="label">Language</span>
                <span className="value">English <ArrowRightOutlined /></span>
            </div>
            <div className="setting-row">
                <span className="label">Notification</span>
            </div>
        </div>
    </Modal>
);

const iconsPer = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path fill="currentColor" fill-rule="evenodd" d="M4.5 3H4v15.5A2.5 2.5 0 0 0 6.5 21h12a2.5 2.5 0 0 0 2.5-2.5v-10h-4V3H4.5ZM20 15.5v-6h-3v6h3Zm-4 0V4H5v14.5A1.5 1.5 0 0 0 6.5 20H7a1.5 1.5 0 0 0 1.5-1.5v-3H16ZM9.51 9.878l-2.475 2.475-.707-.708 2.828-2.828.354-.354.354.354 1.626 1.626 2.475-2.475.707.708-2.829 2.828-.353.354-.354-.354L9.51 9.879ZM9.5 18.5c0 .563-.186 1.082-.5 1.5h9.5a1.5 1.5 0 0 0 1.5-1.5v-2H9.5v2Z" clip-rule="evenodd">
        </path>
    </svg>
)

const iconsSpot = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4424 4.35879C14.3483 2.66106 16.7598 2.60026 17.75 4.25039L17.8369 4.40664C18.2893 5.29359 18.1441 6.28419 17.6152 7.00039H21V12.0004H20V21.0004H4V12.0004H3V7.00039H6.38477C5.85596 6.28418 5.71089 5.29351 6.16309 4.40664L6.25 4.25039C7.24015 2.60025 9.65172 2.66108 10.5576 4.35879L11.9668 7.00039H12.0332L13.4424 4.35879ZM5 20.0004H9V12.0004H5V20.0004ZM10 20.0004H14V8.00039H10V20.0004ZM15 20.0004H19V12.0004H15V20.0004ZM4 11.0004H9V8.00039H4V11.0004ZM15 11.0004H20V8.00039H15V11.0004ZM9.67578 4.82949C9.16955 3.88061 7.87387 3.78937 7.22754 4.59219L7.10742 4.76504C6.51796 5.74862 7.22628 7.00001 8.37305 7.00039H10.833L9.67578 4.82949ZM16.7725 4.59219C16.1261 3.78939 14.8304 3.8806 14.3242 4.82949L13.167 7.00039H15.627C16.774 7.00025 17.4824 5.74876 16.8926 4.76504L16.7725 4.59219Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4424 4.35879C14.3483 2.66106 16.7598 2.60026 17.75 4.25039L17.8369 4.40664C18.2893 5.29359 18.1441 6.28419 17.6152 7.00039H21V12.0004H20V21.0004H4V12.0004H3V7.00039H6.38477C5.85596 6.28418 5.71089 5.29351 6.16309 4.40664L6.25 4.25039C7.24015 2.60025 9.65172 2.66108 10.5576 4.35879L11.9668 7.00039H12.0332L13.4424 4.35879ZM5 20.0004H9V12.0004H5V20.0004ZM10 20.0004H14V8.00039H10V20.0004ZM15 20.0004H19V12.0004H15V20.0004ZM4 11.0004H9V8.00039H4V11.0004ZM15 11.0004H20V8.00039H15V11.0004ZM9.67578 4.82949C9.16955 3.88061 7.87387 3.78937 7.22754 4.59219L7.10742 4.76504C6.51796 5.74862 7.22628 7.00001 8.37305 7.00039H10.833L9.67578 4.82949ZM16.7725 4.59219C16.1261 3.78939 14.8304 3.8806 14.3242 4.82949L13.167 7.00039H15.627C16.774 7.00025 17.4824 5.74876 16.8926 4.76504L16.7725 4.59219Z" fill="currentColor"></path></svg>
)

const iconsPort = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <path fill="currentColor" fill-rule="evenodd" d="M4.5 21H11v-1H5.5V4h13v6.5h1V3h-15v18ZM16 8.5H8v-1h8v1ZM8 12h4v-1H8v1Zm8 1.036A3.5 3.5 0 1 0 19.964 17H16v-3.964Zm-2-.278A4.5 4.5 0 0 1 16.5 12h.5v4h4v.5a4.5 4.5 0 1 1-7-3.742Zm4-.5v1.08A3.502 3.502 0 0 1 19.662 15h1.08A4.503 4.503 0 0 0 18 12.257Z" clip-rule="evenodd"></path>
    </svg>
)

const iconsRef = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <path fill="currentColor" d="M12 13a4 4 0 0 1 4 4v3.5H3V17a4 4 0 0 1 4-4h5Zm-5 1a3 3 0 0 0-3 3v2.5h11V17a3 3 0 0 0-3-3H7Z"></path><path fill="#999" d="M19.47 11h2.5v1h-2.5v2.5h-1V12h-2.5v-1h2.5V8.5h1V11Z"></path><path fill="currentColor" d="M9.5 3.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z">
        </path>
    </svg>
)

const iconsSetting = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path fill="currentColor" fill-rule="evenodd" d="M5.206 8.077 12 4.155l6.794 3.922v7.846L12 19.845l-6.794-3.922V8.077ZM12 3l7.794 4.5v9L12 21l-7.794-4.5v-9L12 3Zm3 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm1 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd">
        </path>
    </svg>
)

const Header = () => {
    const [isRulesModalVisible, setIsRulesModalVisible] = useState(false);
    const showRulesModal = () => setIsRulesModalVisible(true);
    const handleRulesCancel = () => setIsRulesModalVisible(false);

    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const { openConnectModal } = useConnectModal();
    const { disconnect } = useDisconnect();

    const { address } = useAccount();
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
        // {
        //     label: (
        //         <div className='logout'
        //             onClick={showRulesModal}
        //         >
        //             <SettingOutlined style={{ color: '#ffb300' }} /> Setting
        //         </div>
        //     ),
        //     key: '1',
        // },
        // {
        //     type: 'divider',
        // },
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
        navigate('/');
    }

    return (
        <header className="header">
            <div className="content-header">
                <div className="header__left">
                    <div
                        style={{ cursor: 'pointer' }}
                        className="header__logo" onClick={goToBoard}>
                        <img
                            src="/images/logo-bapy.jpeg"
                            alt="Logo"
                            className="header__logo-img"
                        />
                        <div className="header__logo-text">Baby Shiba</div>

                    </div>
                    <nav className={`header__nav ${isOpen ? "active" : ""}`}>
                        <Link
                            to="/perpetual"
                            className={`header__link${pathname === '/perpetual' ? ' active' : ''}`}
                        >
                            <div className='menu-item-icon'>
                                <div className='icon-menu-mobile'>
                                    {iconsPer}
                                </div>
                                Perpetual
                            </div>
                        </Link>
                        <Link
                            to="/spot"
                            className={`header__link${pathname === '/spot' ? ' active' : ''}`}
                        >
                            <div className='menu-item-icon'>
                                <div className='icon-menu-mobile'>
                                    {iconsSpot}
                                </div>
                                Spot
                            </div>
                        </Link>
                        <Link
                            to="/portfolio"
                            className={`header__link${pathname === '/portfolio' ? ' active' : ''}`}
                        >
                            <div className='menu-item-icon'>
                                <div className='icon-menu-mobile'>
                                    {iconsPort}
                                </div>
                                Portfolio
                            </div>
                        </Link>
                        <Link
                            to="/referral"
                            className={`header__link${pathname === '/referral' ? ' active' : ''}`}
                        >
                            <div className='menu-item-icon'>
                                <div className='icon-menu-mobile'>
                                    {iconsRef}
                                </div>
                                Referral
                            </div>
                        </Link>
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={showRulesModal}
                            className={`header__link${isRulesModalVisible === true ? ' ' : ''}`}
                        >
                            <div className='menu-item-icon'>
                                <div className='icon-menu-mobile'>
                                    {iconsSetting}
                                </div>
                                Setting
                            </div>
                        </div>

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
            <ReferralRulesModal visible={isRulesModalVisible} onCancel={handleRulesCancel} />
        </header>
    );
}
export default Header;