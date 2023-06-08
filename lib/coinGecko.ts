import {  CoinGeckoClient } from 'coingecko-api-v3';

let coinGeckoClient: CoinGeckoClient | undefined = undefined;

if (!coinGeckoClient) {
	coinGeckoClient = new CoinGeckoClient({
		timeout: 10000,
		autoRetry: true,
	});
}

export default coinGeckoClient as CoinGeckoClient;