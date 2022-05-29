export const COINS_API_DOMAIN = "https://api.coingecko.com/api/v3";

export const CoinsListUrl = (currency: string) =>
  `${COINS_API_DOMAIN}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoinUrl = (id: string | any) =>
  `${COINS_API_DOMAIN}/coins/${id}`;

export const HistoricalChartUrl = (
  id: string,
  days: number = 365,
  currency: string
) =>
  `${COINS_API_DOMAIN}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoinsUrl = (currency: string) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
