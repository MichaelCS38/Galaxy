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
        {
            label: (
                <div className='logout'
                    onClick={showRulesModal}
                >
                    <SettingOutlined style={{ color: '#ffb300' }} /> Setting
                </div>
            ),
            key: '1',
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
                            Perpetual
                        </Link>
                        <Link
                            to="/spot"
                            className={`header__link${pathname === '/spot' ? ' active' : ''}`}
                        >
                            Spot
                        </Link>
                        <Link
                            to="/portfolio"
                            className={`header__link${pathname === '/portfolio' ? ' active' : ''}`}
                        >
                            Portfolio
                        </Link>
                        <Link
                            to="/referral"
                            className={`header__link${pathname === '/referral' ? ' active' : ''}`}
                        >
                            Referral
                        </Link>

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