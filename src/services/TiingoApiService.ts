import axios from 'axios';
import { TopOfBookData } from '../types/MarketDataTypes';
import { TingoApiResponse } from '../types/interfaces';
import { TIINGO_API_URL, TIINGO_AUTHORIZATION_TOKEN } from "@env";

// Function to fetch Top-of-Book data
export const fetchTopOfTheBookData = async (ticker: string): Promise<TopOfBookData | null> => {
    try {
        const response = await axios.get<TingoApiResponse>(TIINGO_API_URL, {
            params: {
                tickers: ticker,
                token: TIINGO_AUTHORIZATION_TOKEN,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const topOfBookData = response.data.topOfBookData[0];

        if (topOfBookData) {
            return topOfBookData;
        } else {
            console.warn('No Top-of-Book data found for the ticker:', ticker);
            return null;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching Top-of-Book data:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        return null;
    }
};