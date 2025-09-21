import React, { useRef, useEffect, useState } from "react";
import { useTrading } from "../../contexts/TradingContext";
import "./style.scss";

const ChartPage = () => {
    const container = useRef<HTMLDivElement>(null);
    const { selectedPair } = useTrading();
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const widgetRef = useRef<any>(null);
    const currentSymbolRef = useRef<string>("");

    // Load TradingView script
    useEffect(() => {
        if (container.current && !container.current.querySelector("script")) {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/tv.js";
            script.async = true;
            script.onload = () => {
                setIsScriptLoaded(true);
            };
            container.current.appendChild(script);
        }
    }, []);

    // Create widget only once when script is loaded
    useEffect(() => {
        if (isScriptLoaded && selectedPair && container.current && !widgetRef.current) {
            widgetRef.current = new (window as any).TradingView.widget({
                autosize: true,
                symbol: `BINANCE:${selectedPair.symbol}`,
                interval: "60",
                timezone: "Etc/UTC",
                theme: "dark",
                style: "1",
                locale: "en",
                container_id: "tradingview_chart"
            });
            currentSymbolRef.current = selectedPair.symbol;
        }
    }, [isScriptLoaded, selectedPair?.symbol]);

    // Update symbol when it changes (without recreating widget)
    useEffect(() => {
        if (widgetRef.current && selectedPair && selectedPair.symbol !== currentSymbolRef.current) {
            try {
                widgetRef.current.setSymbol(`BINANCE:${selectedPair.symbol}`, () => {
                    currentSymbolRef.current = selectedPair.symbol;
                });
            } catch (error) {
                // If setSymbol fails, recreate widget
                console.log("setSymbol failed, recreating widget");
                if (widgetRef.current) {
                    widgetRef.current.remove();
                    widgetRef.current = null;
                }

                // Clear container
                const chartContainer = container.current?.querySelector('#tradingview_chart');
                if (chartContainer) {
                    chartContainer.innerHTML = '';
                }

                // Create new widget
                widgetRef.current = new (window as any).TradingView.widget({
                    autosize: true,
                    symbol: `BINANCE:${selectedPair.symbol}`,
                    interval: "60",
                    timezone: "Etc/UTC",
                    theme: "dark",
                    style: "1",
                    locale: "en",
                    container_id: "tradingview_chart"
                });
                currentSymbolRef.current = selectedPair.symbol;
            }
        }
    }, [selectedPair?.symbol]);

    return (
        <div className="fair-launch-page chart-page">
            <div
                id="tradingview_chart"
                ref={container}
                className="chart-custom"
            />
        </div>
    )
};

export default ChartPage;
