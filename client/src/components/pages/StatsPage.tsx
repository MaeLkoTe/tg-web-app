import { HeaderContainer } from "../HeaderContainer"

export const StatsPage = () => {

    return (
        <div>
            <HeaderContainer height="h-[20vh]" title="Statistics"/>
            
            <div className="stats-container">
                {/* Левая часть: Место под график */}
                <div className="glass-panel chart-card">
                    <span className="metric-label">Graphic block (Chart Placeholder)</span>
                </div>

                {/* Правая часть: Блок с данными */}
                <div className="glass-panel metrics-card">
                    <div className="metric-row">
                        <span className="metric-label">TON Price</span>
                        <span className="metric-value">$5.24</span>
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
            </div>
        </div>
    )
}