import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Định nghĩa interface cho trading pair
export interface TradingPair {
  symbol: string;
  name: string;
  icon: string;
  price: number;
  change24h: number;
  volume24h: string;
  markPrice: number;
  fundingRate: string;
  countdown: string;
  openInterest: string;
}

// Định nghĩa interface cho order book data
export interface OrderBookData {
  sells: Array<{
    price: number;
    size: number;
    sum: number;
    id: string;
  }>;
  buys: Array<{
    price: number;
    size: number;
    sum: number;
    id: string;
  }>;
}

// Định nghĩa interface cho trade data
export interface TradeData {
  price: number;
  size: number;
  time: string;
  type: 'buy' | 'sell';
  id: string | number;
}

// Định nghĩa interface cho context
interface TradingContextType {
  selectedPair: TradingPair;
  setSelectedPair: (pair: TradingPair) => void;
  orderBookData: OrderBookData;
  setOrderBookData: (data: OrderBookData) => void;
  recentTrades: TradeData[];
  setRecentTrades: (trades: TradeData[]) => void;
  availablePairs: TradingPair[];
}

// Hàm lấy dữ liệu giá thực từ Binance API
const fetchTickerData = async (symbol: string): Promise<Partial<TradingPair>> => {
  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
    const data = await response.json();
    
    if (data.priceChangePercent && data.lastPrice) {
      return {
        price: parseFloat(data.lastPrice),
        change24h: parseFloat(data.priceChangePercent),
        volume24h: `${(parseFloat(data.volume) / 1000000).toFixed(2)}M`,
        markPrice: parseFloat(data.lastPrice) * (1 + Math.random() * 0.001), // Mock mark price
        fundingRate: `${(Math.random() * 0.01).toFixed(3)}%`, // Mock funding rate
        countdown: `${Math.floor(Math.random() * 6)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        openInterest: `${(Math.random() * 100).toFixed(1)}M`
      };
    }
  } catch (error) {
    console.error('Error fetching ticker data:', error);
  }
  
  return {};
};

// Dữ liệu mẫu cho các trading pairs phổ biến
const initialPairs: TradingPair[] = [
  {
    symbol: 'ETHUSDT',
    name: 'Ethereum',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    price: 4594.0,
    change24h: -0.81,
    volume24h: '227.99M',
    markPrice: 4594.9,
    fundingRate: '0.004%',
    countdown: '06:44:54',
    openInterest: '44.4M'
  },
  {
    symbol: 'BTCUSDT',
    name: 'Bitcoin',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    price: 67890.5,
    change24h: 2.15,
    volume24h: '1.2B',
    markPrice: 67895.2,
    fundingRate: '0.001%',
    countdown: '02:15:30',
    openInterest: '2.1B'
  },
  {
    symbol: 'SOLUSDT',
    name: 'Solana',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    price: 185.45,
    change24h: 5.23,
    volume24h: '156.7M',
    markPrice: 185.67,
    fundingRate: '0.002%',
    countdown: '04:22:15',
    openInterest: '89.3M'
  },
  {
    symbol: 'AVAXUSDT',
    name: 'Avalanche',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
    price: 107.71,
    change24h: -8.91,
    volume24h: '98.4M',
    markPrice: 107.85,
    fundingRate: '0.003%',
    countdown: '01:45:20',
    openInterest: '67.2M'
  },
  {
    symbol: 'BNBUSDT',
    name: 'BNB',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    price: 625.8,
    change24h: 1.45,
    volume24h: '234.5M',
    markPrice: 626.1,
    fundingRate: '0.001%',
    countdown: '03:12:45',
    openInterest: '156.8M'
  },
  {
    symbol: 'ADAUSDT',
    name: 'Cardano',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
    price: 0.624,
    change24h: 3.94,
    volume24h: '45.2M',
    markPrice: 0.625,
    fundingRate: '0.002%',
    countdown: '05:30:10',
    openInterest: '23.1M'
  },
  {
    symbol: 'DOTUSDT',
    name: 'Polkadot',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
    price: 6.926,
    change24h: -5.93,
    volume24h: '67.8M',
    markPrice: 6.928,
    fundingRate: '0.003%',
    countdown: '02:55:30',
    openInterest: '34.5M'
  },
  {
    symbol: 'MATICUSDT',
    name: 'Polygon',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
    price: 0.892,
    change24h: 2.67,
    volume24h: '78.9M',
    markPrice: 0.894,
    fundingRate: '0.002%',
    countdown: '04:18:25',
    openInterest: '45.6M'
  }
];

// Tạo context
const TradingContext = createContext<TradingContextType | undefined>(undefined);

// Provider component
export const TradingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPair, setSelectedPair] = useState<TradingPair>(initialPairs[0]);
  const [orderBookData, setOrderBookData] = useState<OrderBookData>({
    sells: [],
    buys: []
  });
  const [recentTrades, setRecentTrades] = useState<TradeData[]>([]);

  // Hàm lấy dữ liệu order book thực từ Binance API
  const fetchOrderBookData = async (symbol: string, fallbackPair?: TradingPair): Promise<OrderBookData> => {
    try {
      const response = await fetch(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=10`);
      const data = await response.json();
      
      if (data.bids && data.asks) {
        let sellSum = 0;
        let buySum = 0;
        
        const sells = data.asks.map((ask: [string, string], index: number) => {
          const price = parseFloat(ask[0]);
          const size = parseFloat(ask[1]);
          sellSum += size;
          return { price, size, sum: sellSum, id: `sell-${index}` };
        });
        
        const buys = data.bids.map((bid: [string, string], index: number) => {
          const price = parseFloat(bid[0]);
          const size = parseFloat(bid[1]);
          buySum += size;
          return { price, size, sum: buySum, id: `buy-${index}` };
        });
        
        return {
          sells: sells.sort((a: any, b: any) => a.price - b.price),
          buys: buys.sort((a: any, b: any) => b.price - a.price)
        };
      }
    } catch (error) {
      console.error('Error fetching order book data:', error);
    }
    
    // Fallback to mock data if API fails
    return generateMockOrderBookData(fallbackPair || selectedPair);
  };

  // Hàm tạo dữ liệu order book giả lập (fallback)
  const generateMockOrderBookData = (pair: TradingPair): OrderBookData => {
    const centerPrice = pair.price;
    const count = 6;
    const spread = centerPrice * 0.0001; // 0.01% spread

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

    return {
      sells: sells.sort((a: any, b: any) => a.price - b.price),
      buys: buys.sort((a: any, b: any) => b.price - a.price)
    };
  };

  // Hàm tạo dữ liệu trades dựa trên pair được chọn
  const generateRecentTrades = (pair: TradingPair): TradeData[] => {
    const trades: TradeData[] = [];
    for (let i = 0; i < 20; i++) {
      trades.push({
        price: parseFloat((pair.price + (Math.random() - 0.5) * pair.price * 0.01).toFixed(2)),
        size: parseFloat((Math.random() * 1.5).toFixed(2)),
        time: new Date(Date.now() - i * 60000).toLocaleTimeString('en-GB'),
        type: Math.random() > 0.5 ? 'buy' : 'sell',
        id: Date.now() + i
      });
    }
    return trades.sort((a, b) => b.time.localeCompare(a.time));
  };

  // Cập nhật dữ liệu khi pair thay đổi
  useEffect(() => {
    const loadData = async () => {
      // Fetch real price data from Binance
      const realTickerData = await fetchTickerData(selectedPair.symbol);
      if (Object.keys(realTickerData).length > 0) {
        setSelectedPair(prev => ({ ...prev, ...realTickerData }));
      }
      
      // Fetch real order book data from Binance
      const newOrderBookData = await fetchOrderBookData(selectedPair.symbol, selectedPair);
      const newRecentTrades = generateRecentTrades(selectedPair);
      setOrderBookData(newOrderBookData);
      setRecentTrades(newRecentTrades);
    };
    
    loadData();
  }, [selectedPair.symbol]); // Only depend on symbol, not the whole pair

  // Cập nhật order book và giá theo thời gian thực
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Fetch fresh price data
        const realTickerData = await fetchTickerData(selectedPair.symbol);
        if (Object.keys(realTickerData).length > 0) {
          setSelectedPair(prev => ({ ...prev, ...realTickerData }));
        }
        
        // Fetch fresh order book data
        const freshOrderBookData = await fetchOrderBookData(selectedPair.symbol, selectedPair);
        setOrderBookData(freshOrderBookData);
      } catch (error) {
        console.error('Error updating data:', error);
        // Keep existing data if API fails
      }
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [selectedPair.symbol]);

  // Cập nhật recent trades theo thời gian thực
  useEffect(() => {
    const interval = setInterval(() => {
      const newTrade: TradeData = {
        price: parseFloat((selectedPair.price + (Math.random() - 0.5) * selectedPair.price * 0.01).toFixed(2)),
        size: parseFloat((Math.random() * 1.5).toFixed(2)),
        time: new Date().toLocaleTimeString('en-GB'),
        type: Math.random() > 0.5 ? 'buy' : 'sell',
        id: Date.now() + Math.random()
      };
      
      setRecentTrades(prevTrades => [newTrade, ...prevTrades.slice(0, 19)]);
    }, 1500);

    return () => clearInterval(interval);
  }, [selectedPair]);

  const value: TradingContextType = {
    selectedPair,
    setSelectedPair,
    orderBookData,
    setOrderBookData,
    recentTrades,
    setRecentTrades,
    availablePairs: initialPairs
  };

  return (
    <TradingContext.Provider value={value}>
      {children}
    </TradingContext.Provider>
  );
};

// Hook để sử dụng context
export const useTrading = (): TradingContextType => {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};
