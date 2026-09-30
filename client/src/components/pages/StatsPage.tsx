import { fetchTonPrice } from "../../api/services/fetchTonPrice";
import { fetchGramChart } from "../../api/services/fetchGramChart";
import { ChartPoint } from "../../types/apiTypes";
import { HeaderContainer } from "../HeaderContainer";

import { useEffect, useState } from "react"
import { GramPriceChart } from "../GramPriceChart";

type ChartState = 
    | { status: "loading" }
    | { status: "success"; data: ChartPoint[]}
    | { status: "error"; message: string}

export const StatsPage = () => {
    const [tonPrice, setTonPrice] = useState<number | null>(null);
    const [tonPriceLoading, setTonPriceLoading] = useState<boolean>(true);
    const [tonPriceError, setTonPriceError] = useState<string | null>(null)

    const [chartState, setChartState] = useState<ChartState>({
        status: "loading",
    })

    useEffect(() => {
        const requestGramPrice = async () => {
            try{
                setTonPriceLoading(true);
                setTonPriceError(null);
                const data = await fetchTonPrice();
                if (typeof data === "number") {
                    setTonPrice(data)
                } else { throw new Error("Неккоректная цена") }

            }
            catch{ 
                setTonPrice(null)
                setTonPriceError("Не удалось получить цену")
            }
            finally { setTonPriceLoading(false); }
        }

        requestGramPrice();
    }, [])

    useEffect(() => {
        const requestGramChart = async () => {
            try{
                setChartState( {status: "loading"} )

                const data = await fetchGramChart();
                if (Array.isArray(data)) {
                    setChartState( {status: "success", data: data} )

                } else { throw new Error("Некорректные данные для постройки графика") }

            }
            catch{ 
                setChartState( {status: "error", message: "Не удалось загрузить график"} )
            }
        }

        requestGramChart();
    }, [])

    return (
        <div>
            <HeaderContainer height="h-[20vh]" title="Statistics"/>
            
            <main className="stats-container">
                {/* Левая часть: Место под график */}
                {chartState.status === "success" ? (
                    <GramPriceChart points={chartState.data} />
                ) : (
                    <div className="glass-panel chart-card">
                        <span className="metric-label">
                            {chartState.status === "loading" ? "Загрузка графика…" : chartState.message}
                        </span>
                    </div>
                )}
                {/* Правая часть: Блок с данными */}
                <div className="glass-panel metrics-card">
                    <div className="metric-row">
                        <span className="metric-label">TON Price</span>
                        <span className="metric-value">{tonPriceLoading?
                                                        "Загрузка":
                                                            tonPriceError?
                                                            tonPriceError:
                                                                "$"+tonPrice?.toFixed(4)
                        }</span>
                    </div>
                    <div className="metric-row">
                        <span className="metric-label">TPS</span>
                        <span className="metric-value">142</span>
                    </div>
                    <div className="metric-row">
                        <span className="metric-label">Last Block</span>
                        <span className="metric-value">41389021</span>
                    </div>
                    <div className="metric-row">
                        <span className="metric-label">Validators</span>
                        <span className="metric-value">354</span>
                    </div>
                </div>
            </main>
        </div>
    )
}
