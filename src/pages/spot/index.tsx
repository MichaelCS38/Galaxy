/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Tabs, InputNumber, Slider, Checkbox, Table, Dropdown, Menu, Tag, Modal, Select, Input } from 'antd';
import { DownOutlined, AppstoreOutlined, ArrowUpOutlined, PlusCircleOutlined, InfoCircleOutlined, SwapOutlined, CheckOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ChartPage from './chart';
import './style.scss';

// --- CSS IN-LINE ---



// --- Data Generation ---
const generateInitialOrderBook = (centerPrice: any, count: any, spread: any) => {
    let sells = [];
    let buys = [];
    let sellSum = 0;
    let buySum = 0;

    for (let i = 0; i < count; i++) {
        const sellPrice = centerPrice + (i + 1) * spread + (Math.random() - 0.5) * spread;
        const sellSize = parseFloat((Math.random() * 2).toFixed(3));
        sellSum += sellSize;
        sells.push({ price: sellPrice, size: sellSize, sum: sellSum, id: `sell-${i}` });

        const buyPrice = centerPrice - (i + 1) * spread - (Math.random() - 0.5) * spread;
        const buySize = parseFloat((Math.random() * 2).toFixed(3));
        buySum += buySize;
        buys.push({ price: buyPrice, size: buySize, sum: buySum, id: `buy-${i}` });
    }
    return { sells: sells.sort((a, b) => a.price - b.price), buys: buys.sort((a, b) => b.price - a.price) };
};

const initialOrderBookData = generateInitialOrderBook(4595.0, 6, 0.1);

const positionsColumns = [
    { title: 'Time', dataIndex: 'symbol', key: 'symbol' },
    { title: 'Symbol', dataIndex: 'size', key: 'size' },
    { title: 'Type', dataIndex: 'entryPrice', key: 'entryPrice' },
    { title: 'Price', dataIndex: 'markPrice', key: 'markPrice' },
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

const DepositColumns = [
    { title: 'Time', dataIndex: 'symbol', key: 'symbol' },
    { title: 'Symbol', dataIndex: 'size', key: 'size' },
    { title: 'Type', dataIndex: 'entryPrice', key: 'entryPrice' },
    { title: 'Price', dataIndex: 'markPrice', key: 'markPrice' },
    { title: 'Filled/Amount', dataIndex: 'liqPrice', key: 'liqPrice' },
    { title: 'Total', dataIndex: 'margin', key: 'margin' },
    { title: 'Trigger Conditions', dataIndex: 'margin', key: 'margin' },
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

const Ticker = () => (
    <div className="ticker-bar">
        <Dropdown overlay={<Menu>
            <Menu.Item key="1">BTC/USDT</Menu.Item>
            <Menu.Item key="2">ETH/USDT</Menu.Item>
        </Menu>}>
            <a onClick={e => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" alt="ETH" width="24" />
                <span style={{ fontSize: 16, fontWeight: 'bold', color: 'var(--text-primary)' }}>Ethereum</span>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>ETHUSDT</span>
                <DownOutlined />
            </a>
        </Dropdown>
        <div className="ticker-item">
            <div className="ticker-value green">4,594.0</div>
        </div>
        <div className="ticker-item">
            <div className="ticker-label">Mark</div>
            <div className="ticker-value">4,594.9</div>
        </div>
        <div className="ticker-item">
            <div className="ticker-label">Funding/Countdown</div>
            <div className="ticker-value">0.004% / 06:44:54</div>
        </div>
        <div className="ticker-item">
            <div className="ticker-label">24h Volume</div>
            <div className="ticker-value">227.99M</div>
        </div>
        <div className="ticker-item">
            <div className="ticker-label">Open Interest</div>
            <div className="ticker-value">44.4M</div>
        </div>
    </div>
);


const TradingChart = () => {
    return (
        <div className="chart-container">
            <div id="chart-placeholder">
                <ChartPage />
            </div>
        </div>
    );
};

const RecentTrades = () => {
    const [trades, setTrades]: any = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newTrade = {
                price: (4595.0 + (Math.random() - 0.5) * 2).toFixed(1),
                size: (Math.random() * 1.5).toFixed(2),
                time: new Date().toLocaleTimeString('en-GB'),
                type: Math.random() > 0.5 ? 'buy' : 'sell',
                id: Date.now() + Math.random()
            };
            setTrades((prevTrades: any) => [newTrade, ...prevTrades.slice(0, 19)]);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="trades-header">
                <span>Price(USDT)</span>
                <span style={{ textAlign: 'right' }}>Size(ETH)</span>
                <span style={{ textAlign: 'right' }}>Time</span>
            </div>
            <div>
                {trades.map((trade: any) => (
                    <div key={trade.id} className="trade-row">
                        <div className={trade.type === 'buy' ? 'price-green' : 'price-red'}>{trade.price}</div>
                        <div className="size">{trade.size}</div>
                        <div className="time">{trade.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const OrderBook = () => {
    const [bookData, setBookData]: any = useState(initialOrderBookData);
    const [updatedRows, setUpdatedRows]: any = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            setBookData((prevData: any) => {
                const newSells = [...prevData.sells];
                const newBuys = [...prevData.buys];
                const newUpdated: any = {};

                // Update a few random rows
                for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
                    const sellIndex = Math.floor(Math.random() * newSells.length);
                    newSells[sellIndex] = { ...newSells[sellIndex], size: parseFloat((Math.random() * 2).toFixed(3)) };
                    newUpdated[newSells[sellIndex].id] = true;

                    const buyIndex = Math.floor(Math.random() * newBuys.length);
                    newBuys[buyIndex] = { ...newBuys[buyIndex], size: parseFloat((Math.random() * 2).toFixed(3)) };
                    newUpdated[newBuys[buyIndex].id] = true;
                }

                // Recalculate sums
                let sellSum = 0;
                newSells.slice().reverse().forEach(order => {
                    sellSum += order.size;
                    order.sum = sellSum;
                });

                let buySum = 0;
                newBuys.forEach(order => {
                    buySum += order.size;
                    order.sum = buySum;
                });

                setUpdatedRows(newUpdated);
                setTimeout(() => setUpdatedRows({}), 500);


                return { sells: newSells, buys: newBuys };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const maxSellSum = bookData.sells.length > 0 ? bookData.sells.reduce((max: any, p: any) => p.sum > max ? p.sum : max, 0) : 0;
    const maxBuySum = bookData.buys.length > 0 ? bookData.buys.reduce((max: any, p: any) => p.sum > max ? p.sum : max, 0) : 0;
    const maxSum = Math.max(maxSellSum, maxBuySum);


    return (
        <div className="order-book-trades">
            <Tabs defaultActiveKey="1" centered>
                <Tabs.TabPane tab="Order book" key="1">
                    <div className="order-book-header">
                        <span>Price (USDT)</span>
                        <span style={{ textAlign: 'right' }}>Size (ETH)</span>
                        <span style={{ textAlign: 'right' }}>Sum (ETH)</span>
                    </div>
                    <div>
                        {bookData.sells.slice().reverse().map((order: any) => (
                            <div key={order.id} className={`order-book-row ${updatedRows[order.id] ? 'flash' : ''}`}>
                                <div className="price-red">{order.price.toFixed(1)}</div>
                                <div className="size">{order.size.toFixed(3)}</div>
                                <div className="sum">{order.sum.toFixed(3)}</div>
                                <div className="order-book-bg red" style={{ width: `${(order.sum / maxSum) * 100}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="order-book-current-price green">
                        4,594.0 <ArrowUpOutlined />
                    </div>
                    <div>
                        {bookData.buys.map((order: any) => (
                            <div key={order.id} className={`order-book-row ${updatedRows[order.id] ? 'flash' : ''}`}>
                                <div className="price-green">{order.price.toFixed(1)}</div>
                                <div className="size">{order.size.toFixed(3)}</div>
                                <div className="sum">{order.sum.toFixed(3)}</div>
                                <div className="order-book-bg green" style={{ width: `${(order.sum / maxSum) * 100}%` }}></div>
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
};

const MarginModeModal = ({ visible, onCancel }: any) => {
    const [selectedMode, setSelectedMode] = useState('cross');

    return (
        <Modal
            title="BNBUSDT Margin mode"
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
    const [leverage, setLeverage] = useState(25);

    const marks = { 1: '1x', 20: '20x', 40: '40x', 60: '60x', 80: '80x', 100: '100x' };

    return (
        <Modal
            title="BNBUSDT Adjust leverage"
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

const { Option } = Select;
const TradePanel = () => {
    const [activeTab, setActiveTab] = React.useState('buy');
    const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);

    const showDepositModal = () => setIsDepositModalVisible(true);
    const handleDepositCancel = () => setIsDepositModalVisible(false);


    return (
        <>
            <div className="spot-trade-panel">
                <div className="spot-trade-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'buy' ? 'active buy' : ''}`}
                        onClick={() => setActiveTab('buy')}
                    >
                        Buy
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'sell' ? 'active sell' : ''}`}
                        onClick={() => setActiveTab('sell')}
                    >
                        Sell
                    </button>
                </div>
                <div className="panel-content">
                    <Tabs defaultActiveKey="market">
                        <Tabs.TabPane tab="Market" key="market">
                            <div className="avbl-row">
                                <span>Avbl</span>
                                <span>
                                    0.00 BNB <PlusCircleOutlined
                                        onClick={showDepositModal}
                                        style={{ color: 'var(--color-primary)', cursor: 'pointer' }} />
                                </span>
                            </div>
                            <div className="input-group">
                                <span className="input-label">Size</span>
                                <Input placeholder='Size' />
                                <Select defaultValue="ASTER" className="asset-selector">
                                    <Option value="ASTER">BNB</Option>
                                    <Option value="USDT">USDT</Option>
                                </Select>
                            </div>
                            <Slider defaultValue={0} tooltip={{ open: false }} />
                            <div className="slider-labels">
                                <span>0%=0.0</span>
                                <span>Max 0.00000</span>
                            </div>
                            <Button type="primary" className="deposit-btn">
                                Deposit
                            </Button>
                            <div className="info-row-bottom">
                                {activeTab === 'buy' ?
                                    <span> Spend <InfoCircleOutlined /></span> :
                                    <span> Receive  <InfoCircleOutlined /></span>}
                                <span>≈ 0.00 USDT</span>
                            </div>
                            <div className="info-row-bottom">
                                <span>Fee</span>
                                <span>0.1000% / 0.0400%</span>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Limit" key="limit">
                            <div className="avbl-row">
                                <span>Avbl</span>
                                <span>
                                    0.00 BNB <PlusCircleOutlined
                                        onClick={showDepositModal}
                                        style={{ color: 'var(--color-primary)', cursor: 'pointer' }} />
                                </span>
                            </div>
                            <div className="input-group">
                                <Input placeholder='Price' />
                                <Select defaultValue="BNB" className="asset-selector">
                                    <Option value="BNB">BNB</Option>
                                    <Option value="USDT">USDT</Option>
                                </Select>
                            </div>
                            <div className="input-group">
                                <Input placeholder='Size' />
                                <Select defaultValue="USDT" className="asset-selector">
                                    <Option value="ASTER">BNB</Option>
                                    <Option value="USDT">USDT</Option>
                                </Select>
                            </div>
                            <Slider defaultValue={0} tooltip={{ open: false }} />
                            <div className="slider-labels">
                                <span>0%=0.0</span>
                                <span>Max 0.00000</span>
                            </div>
                            <Button type="primary" className="deposit-btn">
                                Deposit
                            </Button>
                            <div className="info-row-bottom">
                                {activeTab === 'buy' ?
                                    <span> Spend <InfoCircleOutlined /></span> :
                                    <span> Receive  <InfoCircleOutlined /></span>}
                                <span>≈ 0.00 USDT</span>
                            </div>
                            <div className="info-row-bottom">
                                <span>Fee</span>
                                <span>0.1000% / 0.0400%</span>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Stop Limit" key="stop-limit">
                            <div className="avbl-row">
                                <span>Avbl</span>
                                <span>
                                    0.00 BNB <PlusCircleOutlined
                                        onClick={showDepositModal}
                                        style={{ color: 'var(--color-primary)', cursor: 'pointer' }} />
                                </span>
                            </div>
                            <div className="input-group">
                                <Input placeholder='Stop Price' />
                                <Select defaultValue="USDT" className="asset-selector">
                                    <Option value="USDT">USDT</Option>
                                </Select>
                            </div>
                            <div className="input-group">
                                <Input placeholder='Price' />
                                <Select defaultValue="BNB" className="asset-selector">
                                    <Option value="BNB">BNB</Option>
                                    <Option value="USDT">USDT</Option>
                                </Select>
                            </div>
                            <div className="input-group">
                                <Input placeholder='Size' />
                                <Select defaultValue="USDT" className="asset-selector">
                                    <Option value="ASTER">BNB</Option>
                                    <Option value="USDT">USDT</Option>
                                </Select>
                            </div>
                            <Slider defaultValue={0} tooltip={{ open: false }} />
                            <div className="slider-labels">
                                <span>0%=0.0</span>
                                <span>Max 0.00000</span>
                            </div>
                            <Button type="primary" className="deposit-btn">
                                Deposit
                            </Button>
                            <div className="info-row-bottom">
                                {activeTab === 'buy' ?
                                    <span> Spend <InfoCircleOutlined /></span> :
                                    <span> Receive  <InfoCircleOutlined /></span>}
                                <span>≈ 0.00 USDT</span>
                            </div>
                            <div className="info-row-bottom">
                                <span>Fee</span>
                                <span>0.1000% / 0.0400%</span>
                            </div>
                        </Tabs.TabPane>
                    </Tabs>

                </div>
            </div>

            <DepositModal visible={isDepositModalVisible} onCancel={handleDepositCancel} />
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
                    key="confirm" type="primary" disabled={!selectedMode} style={{ backgroundColor: selectedMode ? 'var(--color-primary)' : '', borderColor: selectedMode ? 'var(--color-primary)' : '' }}>
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
            <Tabs.TabPane tab="Open Orders (0)" key="1">
                <Table columns={DepositColumns} dataSource={[]} size="small" pagination={false} rowClassName={() => 'table-row-dark'} />
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>Please connect a wallet first</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Order History" key="2">
                <Table columns={HisColumns} dataSource={[]} size="small" pagination={false} rowClassName={() => 'table-row-dark'} />
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>Please connect a wallet first</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Trade History" key="3">
                <Table columns={HisColumns} dataSource={[]} size="small" pagination={false} rowClassName={() => 'table-row-dark'} />
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>Please connect a wallet first</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Assets" key="4">
                <Table columns={assetsColumns} dataSource={[]} size="small" pagination={false} rowClassName={() => 'table-row-dark'} />
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>Please connect a wallet first</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Transaction History" key="5">
                <Table columns={HisColumns} dataSource={[]} size="small" pagination={false} rowClassName={() => 'table-row-dark'} />
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>Please connect a wallet first</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Deposit and Withdraw" key="6">
                <Table columns={DepositColumns} dataSource={[]} size="small" pagination={false} rowClassName={() => 'table-row-dark'} />
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>Please connect a wallet first</div>
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


function Spot() {
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

export default Spot;

