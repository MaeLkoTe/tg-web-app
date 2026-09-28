import { API_BASE_URL } from "../config";

export const fetchTonPrice = async (): Promise<number> =>  {
    const url = `${API_BASE_URL}/ton_price`
    const response = await fetch(url);
    if (response.ok) { 
        const data = await response.json(); 
        return data.price
    }
    throw new Error("Status not ok")
}
