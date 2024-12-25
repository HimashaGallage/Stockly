// fetchTopOfTheBookData.test.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchTopOfTheBookData } from './TiingoApiService';
import { TopOfBookData } from '../types/marketDataTypes';

describe('fetchTopOfTheBookData', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        // Create a new instance of the mock adapter for axios
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        // Restore the default behavior of axios
        mock.restore();
    });

    it('should fetch Top-of-Book data successfully', async () => {
        const ticker = 'BTCUSD';
        const mockResponse: TopOfBookData = {
            askExchange: 'BTCUSD',
            askSize: 50000,
            bidPrice: 49900,
            askPrice: 50100,
            bidExchange: '',
            bidSize: 0,
            lastExchange: '',
            lastPrice: 0,
            lastSaleTimestamp: '',
            lastSize: 0,
            lastSizeNotional: 0,
            quoteTimestamp: ''
        };

        // Mock the API response
        mock.onGet('https://api.tiingo.com/tiingo/crypto', {
            params: {
                tickers: ticker,
                token: 'd66497b6b1088bb39ab2f2915b7ca60d6af05d8a',
            },
        }).reply(200, {
            topOfBookData: [mockResponse],
        });

        const result = await fetchTopOfTheBookData(ticker);

        expect(result).toEqual(mockResponse);
    });

    it('should return null if no Top-of-Book data is found', async () => {
        const ticker = 'BTCUSD';

        // Mock the API response with no data
        mock.onGet('https://api.tiingo.com/tiingo/crypto', {
            params: {
                tickers: ticker,
                token: 'd66497b6b1088bb39ab2f2915b7ca60d6af05d8a',
            },
        }).reply(200, {
            topOfBookData: [],
        });

        const result = await fetchTopOfTheBookData(ticker);

        expect(result).toBeNull();
    });

    it('should handle errors and return null', async () => {
        const ticker = 'BTCUSD';

        // Mock an error response
        mock.onGet('https://api.tiingo.com/tiingo/crypto', {
            params: {
                tickers: ticker,
                token: 'd66497b6b1088bb39ab2f2915b7ca60d6af05d8a',
            },
        }).reply(500);

        const result = await fetchTopOfTheBookData(ticker);

        expect(result).toBeNull();
    });
});