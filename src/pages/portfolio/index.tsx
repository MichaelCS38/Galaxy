import React, { useState } from 'react';
import { Button, Card, Tabs } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRightOutlined } from '@ant-design/icons';
import './style.scss'

// --- CSS for this page ---

// --- Dữ liệu mẫu ---
const pnlChartData = [
    { name: '09-11', pnl: 0 },
    { name: '09-12', pnl: 150 },
    { name: '09-13', pnl: 120 },
    { name: '09-14', pnl: 280 },
    { name: '09-15', pnl: 250 },
    { name: '09-16', pnl: 400 },
    { name: '09-17', pnl: 380 },
];

const PerpTabContent = () => {
    const [timeFilter, setTimeFilter] = useState('7D');
    return (
        <div className="perp-tab-content">
            <div className="vip-bar">
                <div className="vip-level">
                    <h3>VIP 1</h3>
                    <a href="#">View more <ArrowRightOutlined /></a>
                </div>
                <div className="fee-tier">
                    <div>
                        <h4>Crypto</h4>
                        <span>Taker fee / Maker fee <strong>0.0350% / 0.0100%</strong></span>
                    </div>
                    <div>
                        <h4>Stocks</h4>
                        <span>Taker fee / Maker fee <strong>0.2000% / 0.1000%</strong></span>
                    </div>
                </div>
            </div>
            <div className="perp-summary-controls">
                <Tabs defaultActiveKey="summary">
                    <Tabs.TabPane tab="Summary" key="summary" />
                    <Tabs.TabPane tab="Grid" key="grid" />
                </Tabs>
            </div>
            <div className="perp-summary-card">
                <div className="summary-card-header">
                    <span className="title">Summary 2025-09-12 07:00:00 - 2025-09-18 19:59:59</span>
                    <Button.Group>
                        <Button className={timeFilter === '24H' ? 'active' : ''} onClick={() => setTimeFilter('24H')}>24H</Button>
                        <Button className={timeFilter === '7D' ? 'active' : ''} onClick={() => setTimeFilter('7D')}>7D</Button>
                        <Button className={timeFilter === '14D' ? 'active' : ''} onClick={() => setTimeFilter('14D')}>14D</Button>
                        <Button className={timeFilter === '30D' ? 'active' : ''} onClick={() => setTimeFilter('30D')}>30D</Button>
                        <Button className={timeFilter === 'All' ? 'active' : ''} onClick={() => setTimeFilter('All')}>All time</Button>
                    </Button.Group>
                </div>
                <div className="summary-grid">
                    <div className="summary-item">
                        <div className="label">Total no. of trades</div>
                        <div className="value">0</div>
                        <div className="sub-item">
                            <span>Long</span>
                            <span className="long">0</span>
                        </div>
                        <div className="sub-item">
                            <span>Short</span>
                            <span className="short">0</span>
                        </div>
                    </div>
                    <div className="summary-item">
                        <div className="label">Total vol. of trades</div>
                        <div className="value">$0</div>
                        <div className="sub-item">
                            <span>Long</span>
                            <span className="long">$0</span>
                        </div>
                        <div className="sub-item">
                            <span>Short</span>
                            <span className="short">$0</span>
                        </div>
                    </div>
                    <div className="summary-item">
                        <div className="label">Total funding fee</div>
                        <div className="value">$0</div>
                        <div className="sub-item">
                            <span>Latest funding fee</span>
                            <span>$0</span>
                        </div>
                    </div>
                    <div className="summary-item">
                        <div className="label">Total commission</div>
                        <div className="value">$0</div>
                        <div className="sub-item">
                            <span>Latest commission</span>
                            <span>$0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OverviewTabContent = () => (
    <div className="portfolio-grid">
        <div className="portfolio-card account-balance-card">
            <div className="label">Account Balance</div>
            <div className="amount">$0.00</div>
            <div className="pnl-info">
                <div className="info-row">
                    <span className="label">PnL (7D)</span>
                    <span className="value positive">$0.00 (0.00%)</span>
                </div>
                <div className="info-row">
                    <span className="label">Volume (7D)</span>
                    <span className="value">$0.00</span>
                </div>
            </div>
        </div>

        <div className="portfolio-card products-card">
            <div className="card-title">Products</div>
            <div className="info-row">
                <span>Perp balance</span>
                <span>$0.00</span>
            </div>
            <div className="info-row">
                <span>Spot balance</span>
                <span>$0.00</span>
            </div>
            <div className="info-row">
                <span>Earn balance</span>
                <span>$0.00</span>
            </div>
        </div>

        <div className="portfolio-card pnl-chart-card">
            <Tabs defaultActiveKey="pnl">
                <Tabs.TabPane tab="Account" key="account" />
                <Tabs.TabPane tab="PnL" key="pnl" />
            </Tabs>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pnlChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip />
                    <Line type="monotone" dataKey="pnl" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>

        <div className="product-details-container">
            <div id="perp-card" className="portfolio-card product-detail-card">
                <div className="card-header">
                    <span className="title">Perp</span>
                    <span className="action-link">Deposit <ArrowRightOutlined /></span>
                </div>
                <div className="card-body">
                    <div className="info-row">
                        <span>Balance</span>
                        <span>$0.00</span>
                    </div>
                    <div className="info-row">
                        <span>Margin used</span>
                        <span>$0.00</span>
                    </div>
                    <div className="info-row">
                        <span>Unrealized PnL</span>
                        <span>$0.00</span>
                    </div>
                </div>
                <div className="card-footer">
                    <span className="action-link">Trade history <ArrowRightOutlined /></span>
                </div>
            </div>

            <div id="spot-card" className="portfolio-card product-detail-card">
                <div className="card-header">
                    <span className="title">Spot</span>
                    <span className="action-link">Trade now <ArrowRightOutlined /></span>
                </div>
                <div className="card-body">
                    <div className="info-row">
                        <span>Balance</span>
                        <span>$0.00</span>
                    </div>
                    <div className="info-row">
                        <span>Available</span>
                        <span>$0.00</span>
                    </div>
                    <div className="info-row">
                        <span>In order</span>
                        <span>$0.00</span>
                    </div>
                </div>
            </div>

            <div id="earn-card" className="portfolio-card product-detail-card">
                <div className="card-header">
                    <span className="title">Earn</span>
                    <span className="action-link">Mint now <ArrowRightOutlined /></span>
                </div>
                <div className="card-body">
                    <div className="info-row">
                        <span>Balance</span>
                        <span>$0.00</span>
                    </div>
                    <div className="info-row">
                        <span>Principal</span>
                        <span>$0.00</span>
                    </div>
                    <div className="info-row">
                        <span>Holding PnL</span>
                        <span>$0.00</span>
                    </div>
                </div>
                <div className="card-footer">
                    <span className="action-link">Earn history <ArrowRightOutlined /></span>
                </div>
            </div>
        </div>
    </div>
);

// --- Component ---
const PortfolioPage = () => {
    return (
        <>
            <div className="portfolio-page">
                <div className="portfolio-header">
                    <h1>Portfolio</h1>
                    <Tabs defaultActiveKey="overview">
                        <Tabs.TabPane tab="Overview" key="overview">
                            <br />
                            <OverviewTabContent />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Perp" key="perp">
                            <br />
                            <PerpTabContent />
                        </Tabs.TabPane>
                        {/* <Tabs.TabPane tab="Earn" key="earn" /> */}
                    </Tabs>
                </div>

                {/* <div className="portfolio-grid">
                    <div className="portfolio-card account-balance-card">
                        <div className="label">Account Balance</div>
                        <div className="amount">$0.00</div>
                        <div className="pnl-info">
                            <div className="info-row">
                                <span className="label">PnL (7D)</span>
                                <span className="value positive">$0.00 (0.00%)</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Volume (7D)</span>
                                <span className="value">$0.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="portfolio-card products-card">
                        <div className="card-title">Products</div>
                        <div className="info-row">
                            <span>Perp balance</span>
                            <span>$0.00</span>
                        </div>
                        <div className="info-row">
                            <span>Spot balance</span>
                            <span>$0.00</span>
                        </div>
                        <div className="info-row">
                            <span>Earn balance</span>
                            <span>$0.00</span>
                        </div>
                    </div>

                    <div className="portfolio-card pnl-chart-card">
                        <Tabs defaultActiveKey="pnl">
                            <Tabs.TabPane tab="Account" key="account" />
                            <Tabs.TabPane tab="PnL" key="pnl" />
                        </Tabs>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={pnlChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                                <YAxis stroke="var(--text-secondary)" />
                                <Tooltip />
                                <Line type="monotone" dataKey="pnl" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="product-details-container">
                        <div id="perp-card" className="portfolio-card product-detail-card">
                            <div className="card-header">
                                <span className="title">Perp</span>
                                <span className="action-link">Deposit <ArrowRightOutlined /></span>
                            </div>
                            <div className="card-body">
                                <div className="info-row">
                                    <span>Balance</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="info-row">
                                    <span>Margin used</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="info-row">
                                    <span>Unrealized PnL</span>
                                    <span>$0.00</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <span className="action-link">Trade history <ArrowRightOutlined /></span>
                            </div>
                        </div>

                        <div id="spot-card" className="portfolio-card product-detail-card">
                            <div className="card-header">
                                <span className="title">Spot</span>
                                <span className="action-link">Trade now <ArrowRightOutlined /></span>
                            </div>
                            <div className="card-body">
                                <div className="info-row">
                                    <span>Balance</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="info-row">
                                    <span>Available</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="info-row">
                                    <span>In order</span>
                                    <span>$0.00</span>
                                </div>
                            </div>
                        </div>

                        <div id="earn-card" className="portfolio-card product-detail-card">
                            <div className="card-header">
                                <span className="title">Earn</span>
                                <span className="action-link">Mint now <ArrowRightOutlined /></span>
                            </div>
                            <div className="card-body">
                                <div className="info-row">
                                    <span>Balance</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="info-row">
                                    <span>Principal</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="info-row">
                                    <span>Holding PnL</span>
                                    <span>$0.00</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <span className="action-link">Earn history <ArrowRightOutlined /></span>
                            </div>
                        </div>
                    </div>

                </div> */}
            </div>
        </>
    );
};

export default PortfolioPage;

