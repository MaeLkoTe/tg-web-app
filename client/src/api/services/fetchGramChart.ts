import { API_BASE_URL } from "../config"
import { ChartPoint, GramChartResponse } from "../../types/apiTypes";

export const fetchGramChart = async (): Promise<ChartPoint[]> => {
    const url = `${API_BASE_URL}/charts`
    const response = await fetch(url);
    if (response.ok) { 
        const data: GramChartResponse = await response.json(); 
        return data.points
    }
    throw new Error("Status not ok")
};