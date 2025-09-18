import React, { useRef, useEffect } from "react";
import "./style.scss";

const ChartPage = () => {
    const container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (container.current && !container.current.querySelector("script")) {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/tv.js";
            script.async = true;
            script.onload = () => {
                new (window as any).TradingView.widget({
                    autosize: true,
                    symbol: "BINANCE:ETHUSDT",
                    interval: "60",
                    timezone: "Etc/UTC",
                    theme: "light",
                    style: "1",
                    locale: "en",
                    container_id: "tradingview_chart"
                });
            };
            container.current.appendChild(script);
        }
    }, []);
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
