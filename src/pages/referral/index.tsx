/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Button, Modal, Table, Input, DatePicker } from 'antd';
import { ArrowRightOutlined, CopyOutlined, ShareAltOutlined, SearchOutlined, DownloadOutlined, TwitterOutlined, SendOutlined, WechatOutlined, DownloadOutlined as DownloadIcon } from '@ant-design/icons';
import './style.scss';
// --- CSS for this page ---

const historyColumns = [
    { title: 'Friend\'s address', dataIndex: 'address', key: 'address' },
    { title: 'Date joined', dataIndex: 'date', key: 'date', sorter: (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime() },
    { title: 'Total volume (USDT)', dataIndex: 'volume', key: 'volume', sorter: (a: any, b: any) => a.volume - b.volume },
    { title: 'Fees paid (USDT)', dataIndex: 'fees', key: 'fees', sorter: (a: any, b: any) => a.fees - b.fees },
    { title: 'Your rewards (USDT)', dataIndex: 'rewards', key: 'rewards', sorter: (a: any, b: any) => a.rewards - b.rewards },
];

const InviteFriendsModal = ({ visible, onCancel }: any) => (
    <Modal
        title="Invite friends"
        open={visible}
        onCancel={onCancel}
        footer={null}
        className="invite-friends-modal"
        width={500}
    >
        <div className="invite-banner">
            <div className="invite-banner-content">
                <div className="logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#FFFFFF" /><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                    <span>Baby Shiba</span>
                </div>
                <h2>Let's trade at Baby Shiba together</h2>
                <p>Scan the QR code and join us {'>>'}</p>
            </div>
            <div className="qr-code">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www..com" alt="QR Code" />
            </div>
        </div>
        <div className="info-row">
            <span className="label">Referral code</span>
            <span className="value">xKwwF2 <CopyOutlined /></span>
        </div>
        <div className="info-row">
            <span className="label">Referral link</span>
            <span className="value">https://BabyShiba...xKwwF2 <CopyOutlined /></span>
        </div>
        <div className="social-icons">
            <TwitterOutlined />
            <SendOutlined />
            <WechatOutlined />
            <DownloadIcon />
        </div>
    </Modal>
);

const ReferralPage = () => {
    const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);

    const showInviteModal = () => setIsInviteModalVisible(true);
    const handleInviteCancel = () => setIsInviteModalVisible(false);
    return (
        <>
            <div className="referral-page">
                <div className="referral-main-header">
                    <div className="title-section">
                        <h1>Earn up to a <span style={{ color: 'var(--color-primary)' }}>10% Rebate</span> when <br /> you invite friends!</h1>
                        <a href="#" className="rules-link">View referral rules <ArrowRightOutlined /></a>
                    </div>
                    <div className="referral-illustration">
                        <svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="50" r="30" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="5,5" />
                            <circle cx="100" cy="50" r="25" fill="var(--background-surface)" stroke="var(--text-tertiary)" strokeWidth="1" />
                            <text x="100" y="55" textAnchor="middle" fontSize="16" fill="var(--color-primary)">$</text>
                            <circle cx="50" cy="30" r="15" fill="var(--background-surface)" stroke="var(--text-tertiary)" strokeWidth="1" />
                            <text x="50" y="35" textAnchor="middle" fontSize="10" fill="var(--color-primary)">$</text>
                            <path d="M 65 35 Q 80 20 95 30" stroke="var(--text-tertiary)" strokeWidth="1" fill="none" strokeDasharray="3,3" />
                            <path d="M 65 35 Q 80 60 95 65" stroke="var(--text-tertiary)" strokeWidth="1" fill="none" strokeDasharray="3,3" />
                        </svg>
                    </div>
                </div>

                <div className="referral-grid">
                    <div className="referral-card invite-card">
                        <h3>Invite now</h3>
                        <div className="info-row" style={{ backgroundColor: 'var(--background-light)', padding: '8px', borderRadius: '4px' }}>
                            <span className="label">You receive <strong style={{ color: 'var(--color-primary)' }}>10%</strong> Your invitee receive 0%</span>
                            <ShareAltOutlined />
                        </div>
                        <div className="info-row">
                            <span className="label">Referral code</span>
                            <span className="value">xKwwF2 <CopyOutlined /></span>
                        </div>
                        <div className="info-row">
                            <span className="label">Referral link</span>
                            <span className="value">https://aste...xKwwF2 <CopyOutlined /></span>
                        </div>
                        <Button
                            onClick={showInviteModal}
                            type="primary" block className="invite-button">Invite friends</Button>
                    </div>
                    <div className="referral-card summary-card">
                        <h3>
                            Summary of invitations
                            <DatePicker picker="date" className="date-picker" bordered={false} />
                        </h3>
                        <div className="info-row">
                            <span className="label">Total Volume</span>
                            <span className="value">0.00 USDT</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Referral rewards</span>
                            <span className="value">0.00 USDT</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Referred friends</span>
                            <span className="value">0</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Friends who traded</span>
                            <span className="value">0</span>
                        </div>
                    </div>
                </div>

                <div className="referral-history">
                    <div className="history-header">
                        <div>
                            <h3>Referral history</h3>
                            <p className="note">* The statistics on the referral history will have a 1-2 hours delay.</p>
                        </div>
                        <div className="history-controls">
                            <Input placeholder="Search by address" prefix={<SearchOutlined />} />
                            <DatePicker picker="date" />
                            <Button icon={<DownloadOutlined />}>Download</Button>
                        </div>
                    </div>
                    <Table
                        className='history-table'
                        columns={historyColumns}
                        dataSource={[]}
                        pagination={false}
                    />
                </div>
            </div>
            <InviteFriendsModal visible={isInviteModalVisible} onCancel={handleInviteCancel} />
        </>
    );
};

export default ReferralPage;
