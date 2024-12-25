import { StockItem } from '../types/marketDataTypes';
import { SubscribeMessage} from '../types/interfaces';
 //import { AUTHORIZATION_TOKEN, REACT_APP_TIINGO_CRYPTO_WEBSOCKET_URL } from '@env';

 const REACT_APP_TIINGO_CRYPTO_WEBSOCKET_URL =  'wss://api.tiingo.com/crypto';
 const AUTHORIZATION_TOKEN =  'd66497b6b1088bb39ab2f2915b7ca60d6af05d8a';

const TiingoWebSocket = (onTickerDataReceived: (data: StockItem) => void) => {
    if (!REACT_APP_TIINGO_CRYPTO_WEBSOCKET_URL) {
        throw new Error('WebSocket URL is not defined. Please check your environment variables.');
    }

    const ws = new WebSocket(REACT_APP_TIINGO_CRYPTO_WEBSOCKET_URL);

    // Subscribe to the desired tickers when the connection opens
    ws.onopen = () => {
        const subscribeMessage: SubscribeMessage = {
            eventName: 'subscribe',
            authorization: AUTHORIZATION_TOKEN || '',
            eventData: {
                thresholdLevel: 5,
                // tickers: ['audusd', 'eurusd'],
            },
        };
        ws.send(JSON.stringify(subscribeMessage));
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);

            // Check if the message type is 'A' and the first element of data is 'T' or 'Q'
            if (data.messageType === 'A' && data.data[0] === 'T') {
                // Map the incoming data to StockItem
                const stockData: StockItem = {
                    dataType: data.data[0],
                    ticker: data.data[1],
                    timestamp: data.data[2],
                    exchange: data.data[3],
                    price: data.data[4],
                    volum: data.data[5],
                };
                onTickerDataReceived(stockData);
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    };

    // Handle errors
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return ws;
};

export default TiingoWebSocket;