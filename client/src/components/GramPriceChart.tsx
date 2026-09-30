import { GramPriceChartProps } from "../types/types"
import { LineChart, Line, YAxis, XAxis, ResponsiveContainer, Tooltip } from "recharts";

export const GramPriceChart = ({ points }: GramPriceChartProps) => {
     
    const chartData = points.map((point) => {
        return {
            timestamp: point[0] * 1000,
            price: point[1],
        };
        }
    );

    chartData.sort((a, b) => a.timestamp - b.timestamp)
    const Xformat = (timestamp: number): string => {
        const dateTimestamp = new Date(timestamp) 
        return dateTimestamp.toLocaleDateString("ru-RU", 
            { 
                day: "2-digit", 
                month: "2-digit"
            }
        )
    }
    const toolTipFormat = (timestamp: unknown): string => {
        if (typeof timestamp === "number"){
            const dateTimestamp = new Date(timestamp) 
            return dateTimestamp.toLocaleDateString("ru-RU", 
                { 
                    day: "2-digit", 
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )
        } else  return "" 
    }


    return (
        <div className="glass-panel chart-card">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} >
                    <Line 
                        name="Цена Gram"
                        dataKey="price" 
                        stroke="#22d3ee" 
                        dot={false}
                    />
                    <Tooltip 
                        labelFormatter={toolTipFormat}
                        formatter={(price) => {
                            if (typeof price === "number") {
                                return "$"+price.toFixed(2)
                            } else return ""
                    }}
                    />
                    <YAxis 
                        tickFormatter={(price) => "$"+price.toFixed(2)}
                    />
                    <XAxis 
                        dataKey="timestamp"
                        type="number" 
                        domain={["dataMin", "dataMax"]}
                        tickFormatter={Xformat}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}