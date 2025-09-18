/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Button, Tabs, InputNumber, Slider, Checkbox, Radio, Tag, Table, Dropdown, Menu } from 'antd';
import { DownOutlined, AppstoreOutlined, ArrowUpOutlined, PlusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ChartPage from './chart';


const orderBookData = {
    sells: [
        { price: 117060.8, size: 0.003, sum: 10.866 },
        { price: 117056.8, size: 0.001, sum: 10.513 },
        { price: 117054.0, size: 3.800, sum: 7.530 },
        { price: 117035.0, size: 3.482, sum: 4.730 },
    ],
    buys: [
        { price: 116952.0, size: 3.312, sum: 14.220 },
        { price: 116951.4, size: 0.001, sum: 14.221 },
        { price: 116949.6, size: 0.001, sum: 14.323 },
        { price: 116941.6, size: 0.005, sum: 15.000 },
    ]
};

const recentTradesData = [
    { price: '1,001.3', size: '0.80', time: '15:44:26', type: 'sell' },
    { price: '1,001.2', size: '0.43', time: '15:44:23', type: 'buy' },
    { price: '1,001.2', size: '0.43', time: '15:44:21', type: 'buy' },
    { price: '1,001.3', size: '0.60', time: '15:44:19', type: 'sell' },
    { price: '1,001.4', size: '0.88', time: '15:44:17', type: 'sell' },
    { price: '1,001.5', size: '0.42', time: '15:44:15', type: 'sell' },
    { price: '1,001.5', size: '0.40', time: '15:44:14', type: 'sell' },
    { price: '1,001.2', size: '0.60', time: '15:44:12', type: 'buy' },
    { price: '1,001.1', size: '0.65', time: '15:44:10', type: 'buy' },
    { price: '1,001.2', size: '0.80', time: '15:44:08', type: 'buy' },
    { price: '1,001.2', size: '0.76', time: '15:44:06', type: 'buy' },
    { price: '1,001.2', size: '0.32', time: '15:44:04', type: 'buy' },
    { price: '1,001.2', size: '0.72', time: '15:44:03', type: 'buy' },
    { price: '1,001.3', size: '0.66', time: '15:44:00', type: 'sell' },
];


const positionsColumns = [
    { title: 'Symbol', dataIndex: 'symbol', key: 'symbol' },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    { title: 'Entry Price', dataIndex: 'entryPrice', key: 'entryPrice' },
    { title: 'Mark Price', dataIndex: 'markPrice', key: 'markPrice' },
    { title: 'Liq. Price', dataIndex: 'liqPrice', key: 'liqPrice' },
    { title: 'Margin', dataIndex: 'margin', key: 'margin' },
    {
        title: 'PNL (ROE %)', dataIndex: 'pnl', key: 'pnl', render: (text: any, record: any) => (
            <span style={{ color: record.pnlValue >= 0 ? 'var(--color-green)' : 'var(--color-red)' }}>
                {text}
            </span>
        )
    },
];

// --- Components ---

const AppHeader = () => (
    <header className="app-header">
        <div className="logo">ASTER</div>
        <Menu mode="horizontal" defaultSelectedKeys={['market']}>
            <Menu.Item key="market">Market</Menu.Item>
            <Menu.Item key="spot">Spot</Menu.Item>
            <Menu.Item key="portfolio">Portfolio</Menu.Item>
            <Menu.Item key="referral">Referral</Menu.Item>
            <Menu.SubMenu key="more" title="More">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.SubMenu>
        </Menu>
        <div className="header-actions">
            <Button type="primary" ghost style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                <AppstoreOutlined /> Airdrop
            </Button>
            <Button type="primary" style={{ backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: 'var(--text-primary-on-pink)' }}>Connect wallet</Button>
        </div>
    </header>
);

const Ticker = () => (
    <div className="ticker-bar">
        <Dropdown overlay={<Menu><Menu.Item key="1">BTC/USDT</Menu.Item><Menu.Item key="2">ETH/USDT</Menu.Item></Menu>}>
            <a onClick={e => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="BTC" width="24" />
                <span style={{ fontSize: 16, fontWeight: 'bold', color: 'var(--text-primary)' }}>Bitcoin</span>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>BTCUSDT</span>
                <DownOutlined />
            </a>
        </Dropdown>
        <div className="ticker-item">
            <div className="ticker-value green">117,009.8</div>
        </div>
        <div className="ticker-item">
            <div className="ticker-label">Mark</div>
            <div className="ticker-value">117,018.0</div>
        </div>
        <div className="ticker-item">
            <div className="ticker-label">Funding/Countdown</div>
            <div className="ticker-value">0.0100% / 07:52:25</div>
        </div>
        <div className="ticker-item">
            <div className="ticker-label">24h Volume</div>
            <div className="ticker-value">676.66M</div>
        </div>
        <div className="ticker-item">
            <div className="ticker-label">Open Interest</div>
            <div className="ticker-value">186.07M</div>
        </div>
    </div>
);


const TradingChart = () => {
    // Để trống khu vực này để người dùng tự tích hợp biểu đồ
    return (
        <div className="chart-container">
            <div className="chart-toolbar">
                {['15m', '1h', '4h', '1D', '1W'].map(t => <Button key={t} type="text" size="small" style={{ color: 'var(--text-secondary)' }}>{t}</Button>)}
            </div>
            <div id="chart-placeholder">
                <ChartPage />
            </div>
        </div>
    );
};

const RecentTrades = () => (
    <div>
        <div className="trades-header">
            <span>Price(USDT)</span>
            <span style={{ textAlign: 'right' }}>Size(BNB)</span>
            <span style={{ textAlign: 'right' }}>Time</span>
        </div>
        <div>
            {recentTradesData.map((trade, i) => (
                <div key={i} className="trade-row">
                    <div className={trade.type === 'buy' ? 'price-green' : 'price-red'}>{trade.price}</div>
                    <div className="size">{trade.size}</div>
                    <div className="time">{trade.time}</div>
                </div>
            ))}
        </div>
    </div>
);


const OrderBook = () => (
    <div className="order-book-trades">
        <Tabs defaultActiveKey="1" centered>
            <Tabs.TabPane tab="Order book" key="1">
                <div className="order-book-header">
                    <span>Price (USDT)</span>
                    <span style={{ textAlign: 'right' }}>Size (BTC)</span>
                    <span style={{ textAlign: 'right' }}>Sum (BTC)</span>
                </div>
                <div>
                    {orderBookData.sells.map((order, i) => (
                        <div key={i} className="order-book-row">
                            <div className="price-red">{order.price.toLocaleString()}</div>
                            <div className="size">{order.size}</div>
                            <div className="sum">{order.sum}</div>
                            <div className="order-book-bg red" style={{ width: `${(order.sum / 15) * 100}%` }}></div>
                        </div>
                    ))}
                </div>
                <div className="order-book-current-price green">
                    117,009.8 <ArrowUpOutlined />
                </div>
                <div>
                    {orderBookData.buys.map((order, i) => (
                        <div key={i} className="order-book-row">
                            <div className="price-green">{order.price.toLocaleString()}</div>
                            <div className="size">{order.size}</div>
                            <div className="sum">{order.sum}</div>
                            <div className="order-book-bg green" style={{ width: `${(order.sum / 15) * 100}%` }}></div>
                        </div>
                    ))}
                </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Trades" key="2">
                <RecentTrades />
            </Tabs.TabPane>
        </Tabs>
    </div>
);

const TradePanel = () => {
    const stopLimitMenu = (
        <Menu>
            <Menu.Item key="1">Stop Limit</Menu.Item>
            <Menu.Item key="2">Stop Market</Menu.Item>
        </Menu>
    );

    const tifMenu = (
        <Menu>
            <Menu.Item key="gtc">GTC</Menu.Item>
            <Menu.Item key="ioc">IOC</Menu.Item>
            <Menu.Item key="fok">FOK</Menu.Item>
        </Menu>
    );

    return (
        <div className="trade-panel">
            <Tabs defaultActiveKey="2"
                items={[
                    { label: 'Market', key: '1', children: 'Market Content' },
                    { label: 'Limit', key: '2' },
                    {
                        label: (
                            <Dropdown overlay={stopLimitMenu} trigger={['click']}>
                                <a onClick={e => e.preventDefault()}>Stop Limit <DownOutlined /></a>
                            </Dropdown>
                        ),
                        key: '3',
                        children: 'Stop Limit Content'
                    },
                ]}
            />
            <div className="trade-panel-header">
                <span className="avbl">Avbl: <span className="value">0.00 USDT</span> <PlusCircleOutlined style={{ color: 'var(--color-primary)', cursor: 'pointer' }} /></span>
                <div className="leverage-actions">
                    <Button>Cross</Button>
                    <Button>25x</Button>
                </div>
            </div>

            <div className="trade-panel-input-group">
                <span className="input-label">Price</span>
                <InputNumber />
                <span className="input-suffix">
                    <span style={{ color: 'var(--color-primary)', marginRight: '4px' }}>Last</span>
                    <span>USDT</span>
                </span>
            </div>

            <div className="trade-panel-input-group">
                <span className="input-label">Size</span>
                <InputNumber />
                <span className="input-suffix">
                    <span style={{ marginRight: '4px' }}>0%</span>
                    <Dropdown overlay={<Menu><Menu.Item>ETH</Menu.Item><Menu.Item>BTC</Menu.Item></Menu>} trigger={['click']}>
                        <a onClick={e => e.preventDefault()}>ETH <DownOutlined /></a>
                    </Dropdown>
                </span>
            </div>

            <Slider defaultValue={0} tooltip={{ open: false }} />

            <div className="trade-options">
                <Checkbox>TP/SL</Checkbox>
                <div className="hidden-order-row">
                    <Checkbox>Hidden Order <Tag color="pink">NEW</Tag></Checkbox>
                    <Dropdown overlay={tifMenu} trigger={['click']}>
                        <a onClick={e => e.preventDefault()}>TIF: GTC <DownOutlined /></a>
                    </Dropdown>
                </div>
                <Checkbox>Reduce-Only</Checkbox>
            </div>

            <Button type="primary" block style={{ backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)', height: '40px' }}>
                Connect wallet
            </Button>

            <div className="trade-info">
                <div className="trade-info-row"><span>Margin</span><span className="value">0.00 / 0.00 USDT</span></div>
                <div className="trade-info-row"><span>Est. liq. price</span><span className="value">-- / -- USDT</span></div>
                <div className="trade-info-row"><span>Max</span><span className="value">0.0 / 0.0 ETH</span></div>
                <div className="trade-info-row"><span>Fee</span><span className="value">Taker 0.0000% / Maker 0.0000%</span></div>
            </div>
        </div>
    );
};

const PositionsPanel = () => (
    <div className="bottom-panel">
        <Tabs defaultActiveKey="1" style={{ padding: '0 16px' }}>
            <Tabs.TabPane tab="Positions" key="1">
                <Table columns={positionsColumns} dataSource={[]} size="small" pagination={false} rowClassName={() => 'table-row-dark'} />
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>Please connect a wallet first</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Open Orders" key="2" />
            <Tabs.TabPane tab="Trade History" key="3" />
            <Tabs.TabPane tab="Assets" key="4" />
        </Tabs>
    </div>
);

const AppFooter = () => {
    const tickers = [
        { name: 'XRPUSDT', price: '0.9628', change: '+2.43%' },
        { name: 'ADAUSDT', price: '0.624', change: '+3.94%' },
        { name: 'DOGEUSDT', price: '0.27960', change: '+4.82%' },
        { name: 'DOTUSDT', price: '6.926', change: '-5.93%' },
        { name: 'AVAXUSDT', price: '107.71', change: '-8.91%' },
        { name: 'LTCUSDT', price: '118.86', change: '-0.27%' },
        { name: 'TRXUSDT', price: '0.6422', change: '+0.56%' },
    ];
    const duplicatedTickers = [...tickers, ...tickers];

    return (
        <footer className="app-footer">
            <div className="footer-ticker">
                {duplicatedTickers.map((t, i) => (
                    <span key={i} className="footer-ticker-item">
                        <span>{t.name}</span>
                        <span style={{ margin: '0 8px', color: t.change.startsWith('+') ? 'var(--color-green)' : 'var(--color-red)' }}>{t.price}</span>
                        <span style={{ color: t.change.startsWith('+') ? 'var(--color-green)' : 'var(--color-red)' }}>{t.change}</span>
                    </span>
                ))}
            </div>
        </footer>
    );
};

const AccountPanel = () => (
    <div className="account-panel">
        <h3 className="panel-title">Account</h3>
        <div className="account-actions">
            <Button>Deposit</Button>
            <Button>Withdraw</Button>
            <Button>Transfer</Button>
        </div>
        <div className="account-info">
            <div className="info-row">
                <span>Account Margin Ratio</span>
                <span className="value green">0.00%</span>
            </div>
            <div className="info-row">
                <span>Account Maintenance Margin</span>
                <span className="value">--</span>
            </div>
            <div className="info-row">
                <span>Account Equity</span>
                <span className="value">--</span>
            </div>
            <div className="info-row">
                <span>Unrealized PNL</span>
                <span className="value">--</span>
            </div>
        </div>
        <Button block className="multi-asset-btn">Multi-Asset Mode</Button>
    </div>
);


function HomePage() {
    return (
        <>
            {/* <style>{AppCSS}</style> */}
            <div className="trading-app">
                <AppHeader />
                <Ticker />
                <main className="main-content">
                    <TradingChart />
                    <OrderBook />
                    <div className="right-panel">
                        <TradePanel />
                        <AccountPanel />
                    </div>
                    <PositionsPanel />
                </main>
                <AppFooter />
            </div>
        </>
    );
}

export default HomePage;