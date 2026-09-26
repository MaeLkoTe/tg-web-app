export const fetchTonPrice = async (): Promise<number> =>  {
    const url = `http://127.0.0.1:8000/ton_price`
    const response = await fetch(url);
    if (response.ok) { 
        const data = await response.json(); 
        return data.price
    }
    throw new Error("Status not ok")
}
