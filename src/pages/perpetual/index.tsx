/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Tabs, InputNumber, Slider, Checkbox, Table, Dropdown, Menu, Tag, Modal, Select, Input } from 'antd';
import { DownOutlined, AppstoreOutlined, ArrowUpOutlined, PlusCircleOutlined, InfoCircleOutlined, SwapOutlined, CheckOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ChartPage from './chart';
import { useTrading } from '../../contexts/TradingContext';
import './style.scss';

// --- CSS IN-LINE ---



// --- Data Generation ---

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
const HisColumns = [
    { title: 'Time', dataIndex: 'symbol', key: 'symbol' },
    { title: 'Symbol', dataIndex: 'size', key: 'size' },
    { title: 'Type', dataIndex: 'entryPrice', key: 'entryPrice' },
    { title: 'Amount', dataIndex: 'liqPrice', key: 'liqPrice' },
];
const assetsColumns = [
    { title: 'Asset', dataIndex: 'symbol', key: 'symbol' },
    { title: 'Total Balance', dataIndex: 'size', key: 'size' },
    { title: 'Available Balance', dataIndex: 'entryPrice', key: 'entryPrice' },
    { title: 'Locked Balance', dataIndex: 'liqPrice', key: 'liqPrice' },
    { title: 'BTC Value', dataIndex: 'liqPrice', key: 'liqPrice' },
];

// --- Components ---

const AppHeader = () => (
    <header className="app-header">
        <div className="logo">BABYSHIB</div>
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

const Ticker = () => {
    const { selectedPair, setSelectedPair, availablePairs } = useTrading();

    const handlePairChange = (pair: any) => {
        setSelectedPair(pair);
    };

    const pairMenu = (
        <Menu>
            {availablePairs.map((pair) => (
                <Menu.Item key={pair.symbol} onClick={() => handlePairChange(pair)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={pair.icon} alt={pair.name} width="20" />
                        <span>{pair.name}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{pair.symbol}</span>
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className="ticker-bar">
            <Dropdown overlay={pairMenu} trigger={['click']}>
                <a onClick={e => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={selectedPair.icon} alt={selectedPair.name} width="24" />
                    <span style={{ fontSize: 16, fontWeight: 'bold', color: 'var(--text-primary)' }}>{selectedPair.name}</span>
                    <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{selectedPair.symbol}</span>
                    <DownOutlined />
                </a>
            </Dropdown>
            <div className="ticker-item">
                <div className={`ticker-value ${selectedPair.change24h >= 0 ? 'green' : 'red'}`}>
                    {selectedPair.price.toLocaleString()}
                </div>
            </div>
            <div className="ticker-item">
                <div className="ticker-label">Mark</div>
                <div className="ticker-value">{selectedPair.markPrice.toLocaleString()}</div>
            </div>
            <div className="ticker-item">
                <div className="ticker-label">Funding/Countdown</div>
                <div className="ticker-value">{selectedPair.fundingRate} / {selectedPair.countdown}</div>
            </div>
            <div className="ticker-item">
                <div className="ticker-label">24h Volume</div>
                <div className="ticker-value">{selectedPair.volume24h}</div>
            </div>
            <div className="ticker-item">
                <div className="ticker-label">Open Interest</div>
                <div className="ticker-value">{selectedPair.openInterest}</div>
            </div>
        </div>
    );
};


const TradingChart = () => {
    // Để trống khu vực này để người dùng tự tích hợp biểu đồ
    return (
        <div className="chart-container">
            {/* <div className="chart-toolbar">
                {['15m', '1h', '4h', '1D', '1W'].map(t => <Button key={t} type="text" size="small" style={{ color: 'var(--text-secondary)' }}>{t}</Button>)}
            </div> */}
            <div id="chart-placeholder">
                <ChartPage />
            </div>
        </div>
    );
};

const RecentTrades = () => {
    const { selectedPair, recentTrades } = useTrading();

    // Get base asset from symbol (e.g., ETH from ETHUSDT)
    const baseAsset = selectedPair.symbol.replace('USDT', '');

    return (
        <div>
            <div className="trades-header">
                <span>Price(USDT)</span>
                <span style={{ textAlign: 'right' }}>Size({baseAsset})</span>
                <span style={{ textAlign: 'right' }}>Time</span>
            </div>
            <div>
                {recentTrades.map((trade: any) => (
                    <div key={trade.id} className="trade-row">
                        <div className={trade.type === 'buy' ? 'price-green' : 'price-red'}>{trade.price.toFixed(2)}</div>
                        <div className="size">{trade.size}</div>
                        <div className="time">{trade.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const OrderBook = () => {
    const { selectedPair, orderBookData } = useTrading();
    const [updatedRows, setUpdatedRows]: any = useState({});
    const [showBuys, setShowBuys] = useState(true);
    const [showSells, setShowSells] = useState(true);
    const [precision, setPrecision] = useState(0.1);


    const maxSellSum = orderBookData.sells.length > 0 ? orderBookData.sells.reduce((max: any, p: any) => p.sum > max ? p.sum : max, 0) : 0;
    const maxBuySum = orderBookData.buys.length > 0 ? orderBookData.buys.reduce((max: any, p: any) => p.sum > max ? p.sum : max, 0) : 0;
    const maxSum = Math.max(maxSellSum, maxBuySum);

    // Get base asset from symbol (e.g., ETH from ETHUSDT)
    const baseAsset = selectedPair.symbol.replace('USDT', '');

    return (
        <div className="order-book-trades" key={selectedPair.symbol}>
            <Tabs defaultActiveKey="1" centered>
                <Tabs.TabPane tab="Order book" key="1">
                    <div className="order-book-controls">
                        <div className="order-book-icons">
                            <div
                                className={`order-book-icon ${showBuys && showSells ? 'active' : ''}`}
                                onClick={() => {
                                    setShowBuys(true);
                                    setShowSells(true);
                                }}
                                title="Show both buy and sell orders"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <rect x="2" y="2" width="12" height="6" stroke={showBuys && showSells ? "#1890ff" : "#8c8c8c"} strokeWidth="1" fill="none" rx="1" />
                                    <rect x="2" y="10" width="12" height="6" stroke={showBuys && showSells ? "#ff4d4f" : "#8c8c8c"} strokeWidth="1" fill="none" rx="1" />
                                    <line x1="14" y1="4" x2="16" y2="4" stroke="#8c8c8c" strokeWidth="1" />
                                    <line x1="14" y1="6" x2="16" y2="6" stroke="#8c8c8c" strokeWidth="1" />
                                    <line x1="14" y1="8" x2="16" y2="8" stroke="#8c8c8c" strokeWidth="1" />
                                </svg>
                            </div>
                            <div
                                className={`order-book-icon ${showBuys && !showSells ? 'active' : ''}`}
                                onClick={() => {
                                    setShowBuys(true);
                                    setShowSells(false);
                                }}
                                title="Show only buy orders"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <rect x="2" y="4" width="12" height="8" stroke={showBuys && !showSells ? "#1890ff" : "#8c8c8c"} strokeWidth="1" fill="none" rx="1" />
                                    <line x1="14" y1="6" x2="16" y2="6" stroke="#8c8c8c" strokeWidth="1" />
                                    <line x1="14" y1="8" x2="16" y2="8" stroke="#8c8c8c" strokeWidth="1" />
                                    <line x1="14" y1="10" x2="16" y2="10" stroke="#8c8c8c" strokeWidth="1" />
                                </svg>
                            </div>
                            <div
                                className={`order-book-icon ${!showBuys && showSells ? 'active' : ''}`}
                                onClick={() => {
                                    setShowBuys(false);
                                    setShowSells(true);
                                }}
                                title="Show only sell orders"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <rect x="2" y="4" width="12" height="8" stroke={!showBuys && showSells ? "#ff4d4f" : "#8c8c8c"} strokeWidth="1" fill="none" rx="1" />
                                    <line x1="14" y1="6" x2="16" y2="6" stroke="#8c8c8c" strokeWidth="1" />
                                    <line x1="14" y1="8" x2="16" y2="8" stroke="#8c8c8c" strokeWidth="1" />
                                    <line x1="14" y1="10" x2="16" y2="10" stroke="#8c8c8c" strokeWidth="1" />
                                </svg>
                            </div>
                        </div>
                        <div className="precision-selector">
                            <span>{precision}</span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="#8c8c8c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="order-book-header">
                        <span>Price (USDT)</span>
                        <span style={{ textAlign: 'right' }}>Size ({baseAsset})</span>
                        <span style={{ textAlign: 'right' }}>Sum ({baseAsset})</span>
                    </div>
                    {showSells && (
                        <div>
                            {orderBookData.sells.slice().reverse().map((order: any) => (
                                <div key={`${selectedPair.symbol}-${order.id}`} className={`order-book-row ${updatedRows[order.id] ? 'flash' : ''}`}>
                                    <div className="price-red">{order.price.toFixed(1)}</div>
                                    <div className="size">{order.size.toFixed(3)}</div>
                                    <div className="sum">{order.sum.toFixed(3)}</div>
                                    <div className="order-book-bg red" style={{ width: `${(order.sum / maxSum) * 100}%` }}></div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={`order-book-current-price ${selectedPair.change24h >= 0 ? 'green' : 'red'}`}>
                        {selectedPair.price.toLocaleString()} <ArrowUpOutlined />
                    </div>
                    {showBuys && (
                        <div>
                            {orderBookData.buys.map((order: any) => (
                                <div key={`${selectedPair.symbol}-${order.id}`} className={`order-book-row ${updatedRows[order.id] ? 'flash' : ''}`}>
                                    <div className="price-green">{order.price.toFixed(1)}</div>
                                    <div className="size">{order.size.toFixed(3)}</div>
                                    <div className="sum">{order.sum.toFixed(3)}</div>
                                    <div className="order-book-bg green" style={{ width: `${(order.sum / maxSum) * 100}%` }}></div>
                                </div>
                            ))}
                        </div>
                    )}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Trades" key="2">
                    <RecentTrades />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

const MarginModeModal = ({ visible, onCancel }: any) => {
    const { selectedPair } = useTrading();
    const [selectedMode, setSelectedMode] = useState('cross');

    return (
        <Modal
            title={`${selectedPair.symbol} Margin mode`}
            open={visible}
            onCancel={onCancel}
            footer={null}
            className="margin-mode-modal"
            width={420}
        >
            <div className="modal-body">
                <div className="mode-options">
                    <div
                        className={`mode-option ${selectedMode === 'cross' ? 'selected' : ''}`}
                        onClick={() => setSelectedMode('cross')}
                    >
                        Cross {selectedMode === 'cross' && <CheckOutlined />}
                    </div>
                    <div
                        className={`mode-option ${selectedMode === 'isolated' ? 'selected' : ''}`}
                        onClick={() => setSelectedMode('isolated')}
                    >
                        Isolated {selectedMode === 'isolated' && <CheckOutlined />}
                    </div>
                </div>
                <p className="description">
                    All cross positions with the same margin asset share one balance. If liquidated, you may lose all margin and related positions.
                </p>
                <p className="note">
                    * Switching the margin mode will only apply to the current selected contract.
                </p>
                <Button type="primary" block className="connect-wallet-btn">
                    Connect wallet
                </Button>
            </div>
        </Modal>
    );
};

const AdjustLeverageModal = ({ visible, onCancel }: any) => {
    const { selectedPair } = useTrading();
    const [leverage, setLeverage] = useState(25);

    const marks = { 1: '1x', 20: '20x', 40: '40x', 60: '60x', 80: '80x', 100: '100x' };

    return (
        <Modal
            title={`${selectedPair.symbol} Adjust leverage`}
            open={visible}
            onCancel={onCancel}
            footer={null}
            className="adjust-leverage-modal"
            width={420}
        >
            <div className="modal-body">
                <div className="leverage-label">Leverage</div>
                <div className="leverage-input-wrapper">
                    <Button icon={<MinusOutlined />} onClick={() => setLeverage(Math.max(1, leverage - 1))} />
                    <InputNumber min={1} max={100} value={leverage}
                        // onChange={setLeverage} 
                        controls={false} />
                    <Button icon={<PlusOutlined />} onClick={() => setLeverage(Math.min(100, leverage + 1))} />
                </div>
                <Slider marks={marks} min={1} max={100} value={leverage} onChange={setLeverage} />
                <div className="info-text">
                    Maximum position at current leverage: <span className="value">625,000 USDT</span>
                </div>
                <p className="note">
                    * Please note that setting higher leverage increases the risk of liquidation.
                </p>
                <Button type="primary" block className="connect-wallet-btn">
                    Connect wallet
                </Button>
            </div>
        </Modal>
    );
}


const TradePanel = () => {
    const { selectedPair } = useTrading();
    const [isMarginModalVisible, setIsMarginModalVisible] = useState(false);
    const [isLeverageModalVisible, setIsLeverageModalVisible] = useState(false);

    const showMarginModal = () => setIsMarginModalVisible(true);
    const handleMarginCancel = () => setIsMarginModalVisible(false);

    const showLeverageModal = () => setIsLeverageModalVisible(true);
    const handleLeverageCancel = () => setIsLeverageModalVisible(false);

    // Get base asset from symbol (e.g., ETH from ETHUSDT)
    const baseAsset = selectedPair.symbol.replace('USDT', '');

    const stopLimitMenu = (
        <Menu>
            <Menu.Item key="1">Stop Limit</Menu.Item>
            <Menu.Item key="2">Stop Market</Menu.Item>
            <Menu.Item key="1">Trailing Stop</Menu.Item>
            <Menu.Item key="2">Post Only</Menu.Item>
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
        <>
            <div className="trade-panel">
                <Tabs defaultActiveKey="2"
                    items={[
                        { label: 'Market', key: '1', children: '' },
                        { label: 'Limit', key: '2' },
                        {
                            label: (
                                <Dropdown overlay={stopLimitMenu} trigger={['click']}>
                                    <div onClick={e => e.preventDefault()}>Stop Limit <DownOutlined /></div>
                                </Dropdown>
                            ),
                            key: '3',
                            children: ''
                        },
                    ]}
                />
                <div className="trade-panel-header">
                    <span className="avbl">Avbl: <span className="value">0.00 USDT</span> <PlusCircleOutlined style={{ color: 'var(--color-primary)', cursor: 'pointer' }} /></span>
                    <div className="leverage-actions">
                        <div onClick={showMarginModal}>Cross</div>
                        <div onClick={showLeverageModal}>25x</div>
                    </div>
                </div>

                <div className="trade-panel-input-group">
                    <span className="input-label">Price</span>
                    <Input placeholder={selectedPair.price.toLocaleString()} />
                    <span className="input-suffix">
                        <span style={{ color: 'var(--color-primary)', marginRight: '4px' }}>Last</span>
                        <span>USDT</span>
                    </span>
                </div>

                <div className="trade-panel-input-group">
                    <span className="input-label">Size</span>
                    <Input />
                    <span className="input-suffix">
                        <span style={{ marginRight: '4px' }}>0%</span>
                        <Dropdown overlay={<Menu><Menu.Item>{baseAsset}</Menu.Item><Menu.Item>USDT</Menu.Item></Menu>} trigger={['click']}>
                            <a onClick={e => e.preventDefault()}>{baseAsset} <DownOutlined /></a>
                        </Dropdown>
                    </span>
                </div>

                <Slider defaultValue={0} tooltip={{ open: false }} />

                <div className="trade-options">
                    <Checkbox>TP/SL</Checkbox>
                    <div className="hidden-order-row">
                        <Checkbox>Hidden Order
                            {/* <Tag color="pink">NEW</Tag> */}
                        </Checkbox>
                        <Dropdown overlay={tifMenu} trigger={['click']}>
                            <a onClick={e => e.preventDefault()}>TIF: GTC <DownOutlined /></a>
                        </Dropdown>
                    </div>
                    <Checkbox>Reduce-Only</Checkbox>
                </div>

                <Button type="primary" block style={{ backgroundColor: '#25c2b9', fontWeight: "500", color: "#000", height: '40px' }}>
                    Connect wallet
                </Button>

                <div className="trade-info">
                    <div className="trade-info-row"><span>Margin</span><span className="value">0.00 / 0.00 USDT</span></div>
                    <div className="trade-info-row"><span>Est. liq. price</span><span className="value">-- / -- USDT</span></div>
                    <div className="trade-info-row"><span>Max</span><span className="value">0.0 / 0.0 {baseAsset}</span></div>
                    <div className="trade-info-row"><span>Fee</span><span className="value">Taker 0.0000% / Maker 0.0000%</span></div>
                </div>
            </div>
            <MarginModeModal visible={isMarginModalVisible} onCancel={handleMarginCancel} />
            <AdjustLeverageModal visible={isLeverageModalVisible} onCancel={handleLeverageCancel} />
        </>
    );
};

const DepositModal = ({ visible, onCancel }: any) => {
    const { Option } = Select;

    return (
        <Modal
            title="Account"
            open={visible}
            onCancel={onCancel}
            footer={null}
            className="deposit-modal"
            width={420}
        >
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Deposit" key="1">
                    <div className="deposit-form">
                        <Select placeholder="Perpetual account" >
                            <Option value="perpetual">Perpetual account</Option>
                            <Option value="spot">Spot account</Option>
                        </Select>
                        <Select placeholder="Select Chain">
                            <Option value="bnb">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" alt="BNB" width="20" style={{ marginRight: '8px' }} />
                                    BNB Chain
                                </div>
                            </Option>
                        </Select>
                        <div className="amount-input-group">
                            <span className="amount-placeholder">Amount</span>
                            <InputNumber controls={false} bordered={false} style={{ flex: 1 }} />
                            <Select defaultValue="usdf" bordered={false}>
                                <Option value="usdf">USDF</Option>
                                <Option value="usdt">USDT</Option>
                            </Select>
                        </div>
                        <div className="balance-info">
                            <span>Balance</span>
                            <span>--</span>
                        </div>
                        <Button
                            onClick={onCancel}
                            type="primary" block className="connect-wallet-btn">
                            Deposit
                        </Button>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Withdraw" key="2">
                    <div className="deposit-form">
                        <Select placeholder="Perpetual account" >
                            <Option value="perpetual">Perpetual account</Option>
                            <Option value="spot">Spot account</Option>
                        </Select>
                        <Select placeholder="Select Chain">
                            <Option value="bnb">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" alt="BNB" width="20" style={{ marginRight: '8px' }} />
                                    BNB Chain
                                </div>
                            </Option>
                        </Select>
                        <div className="amount-input-group">
                            <span className="amount-placeholder">Amount</span>
                            <InputNumber controls={false} bordered={false} style={{ flex: 1 }} />
                            <Select defaultValue="usdf" bordered={false}>
                                <Option value="usdf">USDF</Option>
                                <Option value="usdt">USDT</Option>
                            </Select>
                        </div>
                        <div className="balance-info">
                            <span>Balance</span>
                            <span>--</span>
                        </div>
                        <Button
                            onClick={onCancel}
                            type="primary" block className="connect-wallet-btn">
                            Withdraw
                        </Button>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    );
};

const TransferModal = ({ visible, onCancel }: any) => {
    const { Option } = Select;
    const [fromAccount, setFromAccount] = useState('Perpetual');
    const [toAccount, setToAccount] = useState('Spot');

    const handleSwap = () => {
        setFromAccount(toAccount);
        setToAccount(fromAccount);
    };

    return (
        <Modal
            title="Transfer"
            open={visible}
            onCancel={onCancel}
            footer={null}
            className="transfer-modal"
            width={420}
        >
            <div className="transfer-form">
                <div className="transfer-direction">
                    <div className="transfer-box">
                        <div className="label">From</div>
                        <div className="value">{fromAccount}</div>
                    </div>
                    <SwapOutlined className="transfer-swap-icon" onClick={handleSwap} />
                    <div className="transfer-box">
                        <div className="label">To</div>
                        <div className="value">{toAccount}</div>
                    </div>
                </div>

                <div className="amount-input-group">
                    <span className="amount-placeholder">Amount</span>
                    <InputNumber controls={false} bordered={false} style={{ flex: 1 }} />
                    <Select defaultValue="usdf" bordered={false}>
                        <Option value="usdf">USDF</Option>
                        <Option value="usdt">USDT</Option>
                    </Select>
                </div>

                <div className="info-line">
                    <span>Transferable amount</span>
                    <span>--</span>
                </div>

                <Button
                    onClick={onCancel}
                    type="primary" block className="transfer-btn">
                    Transfer
                </Button>
            </div>
        </Modal>
    );
};

const AssetModeModal = ({ visible, onCancel }: any) => {
    const [selectedMode, setSelectedMode] = useState('single');

    return (
        <Modal
            title="Asset Mode"
            open={visible}
            onCancel={onCancel}
            className="asset-mode-modal"
            width={440}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    onClick={onCancel}
                    key="confirm" type="primary" disabled={!selectedMode} style={{ backgroundColor: selectedMode ? '#000' : '', borderColor: selectedMode ? 'var(--color-primary)' : '' }}>
                    Confirm
                </Button>,
            ]}
        >
            <div className="modal-body">
                <div
                    className={`asset-option ${selectedMode === 'single' ? 'selected' : ''}`}
                    onClick={() => setSelectedMode('single')}
                >
                    <div className="option-header">
                        <Checkbox checked={selectedMode === 'single'} />
                        <span className="option-title">Single-Asset Mode</span>
                    </div>
                    <div className="option-description">
                        Only supports USDT as margin for trading contracts<br />
                        The profits and losses of positions with the same margin assets can offset one another<br />
                        Supports cross margin and isolated margin
                    </div>
                </div>

                <div
                    className={`asset-option ${selectedMode === 'multi' ? 'selected' : ''}`}
                    onClick={() => setSelectedMode('multi')}
                >
                    <div className="option-header">
                        <Checkbox checked={selectedMode === 'multi'} />
                        <span className="option-title">Multi-Asset Mode</span>
                    </div>
                    <div className="option-description">
                        Contracts can be traded across margin assets<br />
                        The profits and losses of positions with different margin assets can offset one another<br />
                        Supports cross margin
                    </div>
                </div>

                <div className="read-more">
                    Read about <a href="#">Multi-Assets Mode</a> to better manage risk.
                </div>
            </div>
        </Modal>
    );
};


const AccountPanel = () => {
    const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);
    const [isTransferModalVisible, setIsTransferModalVisible] = useState(false);
    const [isAssetModeModalVisible, setIsAssetModeModalVisible] = useState(false);


    const showDepositModal = () => setIsDepositModalVisible(true);
    const handleDepositCancel = () => setIsDepositModalVisible(false);

    const showTransferModal = () => setIsTransferModalVisible(true);
    const handleTransferCancel = () => setIsTransferModalVisible(false);

    const showAssetModeModal = () => setIsAssetModeModalVisible(true);
    const handleAssetModeCancel = () => setIsAssetModeModalVisible(false);


    return (
        <>
            <div className="account-panel">
                <h3 className="panel-title">Account</h3>
                <div className="account-actions">
                    <Button onClick={showDepositModal}>Deposit</Button>
                    <Button onClick={showDepositModal}>Withdraw</Button>
                    <Button onClick={showTransferModal}>Transfer</Button>
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
                <Button block className="multi-asset-btn" onClick={showAssetModeModal}>
                    Multi-Asset Mode
                </Button>
            </div>
            <DepositModal visible={isDepositModalVisible} onCancel={handleDepositCancel} />
            <TransferModal visible={isTransferModalVisible} onCancel={handleTransferCancel} />
            <AssetModeModal visible={isAssetModeModalVisible} onCancel={handleAssetModeCancel} />
        </>
    );
};


const PositionsPanel = () => (
    <div className="bottom-panel">
        <Tabs defaultActiveKey="1" style={{ padding: '0 16px' }}>
            <Tabs.TabPane tab="Positions" key="1">
                <Table columns={positionsColumns} dataSource={['hhhh']} size="small" pagination={false} rowClassName={() => 'table-row-dark'} />
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>No positions found</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Open Orders" key="2">
                <Table columns={positionsColumns} dataSource={['hhhh']} size="small" pagination={false} rowClassName={() => 'table-row-dark'} />
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>No positions found</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Trade History" key="3">
                <Table columns={HisColumns} dataSource={['hhhh']} size="small" pagination={false} rowClassName={() => 'table-row-dark'} />
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>No positions found</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Assets" key="4">
                <Table columns={assetsColumns} dataSource={['hhhh']} size="small" pagination={false} rowClassName={() => 'table-row-dark'} />
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>No positions found</div>
            </Tabs.TabPane>
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


function Perpetual() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <>
            <div className="trading-app">
                <Ticker />
                {isMobile ? (
                    <>
                        <main className="main-content main-content-mobile">
                            <TradingChart />
                            <OrderBook />
                            <TradePanel />
                            <AccountPanel />
                            <PositionsPanel />
                        </main>
                    </>
                ) : (
                    <>
                        <main className="main-content">
                            <TradingChart />
                            <OrderBook />
                            <div className="right-panel">
                                <TradePanel />
                                <AccountPanel />
                            </div>
                            <PositionsPanel />
                        </main>
                    </>
                )}

                <AppFooter />
            </div>
        </>
    );
}

export default Perpetual;

