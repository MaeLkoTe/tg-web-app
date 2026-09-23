import { Address } from "@ton/core";

export const validateTonAddress = function (
    value: string,
    testnet: boolean,
): string | null {
    const address = value.trim();

    if (!address) {
        return "Введите адрес";
    }

    try {
        if (address.includes(":")) {
            // Строго проверяем raw-формат перед разбором.
            if (!/^-?\d+:[a-fA-F0-9]{64}$/.test(address)) {
                return "Некорректный raw-адрес";
            }

            Address.parseRaw(address);
        } else {
            const parsed = Address.parseFriendly(address);

            if (parsed.isTestOnly && !testnet) {
                return "Это testnet-адрес. Включите testnet";
            }
        }

        return null;
    } catch {
        return "Некорректный TON-адрес. Проверьте скопированное значение";
    }
}