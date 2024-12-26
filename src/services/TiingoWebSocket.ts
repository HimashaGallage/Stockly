import { StockItem } from '../types/MarketDataTypes';
import { SubscribeMessage } from '../types/interfaces';
import Snackbar from 'react-native-snackbar';

const REACT_APP_TIINGO_CRYPTO_WEBSOCKET_URL = 'wss://api.tiingo.com/crypto';
const AUTHORIZATION_TOKEN = 'd66497b6b1088bb39ab2f2915b7ca60d6af05d8a';

const TiingoWebSocket = (onTickerDataReceived: (data: StockItem) => void) => {

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
        handleIncomingMessage(event, onTickerDataReceived);
    };

    // Handle errors
    ws.onerror = (error) => {
        handleWebSocketError(error);
    };

    // Handle connection close
    ws.onclose = (event) => {
        handleConnectionClose(event);
    };
    return ws;
};

const handleIncomingMessage = (event: any, onTickerDataReceived: any) => {
    try {
        const data = JSON.parse(event.data);

        // Check if the message type is 'A' and dataType is 'T' or 'Q'
        if (data.messageType === 'A' && (data.data[0] === 'T' || data.data[0] === 'Q')) {
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
        handleError(error, event.data);
    }
};

const handleError = (error: any, rawData: any) => {

    Snackbar.show({
        text: 'An error occurred while processing data. Please try again later.',
        duration: Snackbar.LENGTH_LONG,
    });
};

const handleWebSocketError = (error: any) => {
    Snackbar.show({
        text: 'WebSocket error occurred. Please check your connection.',
        duration: Snackbar.LENGTH_LONG,
    });
};

const handleConnectionClose = (event: any) => {
    Snackbar.show({
        text: 'WebSocket connection closed. Reloading app...',
        duration: Snackbar.LENGTH_INDEFINITE,
    });
    /*  Todo - impement reconnection logic */
};

export default TiingoWebSocket;