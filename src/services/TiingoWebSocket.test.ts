// TiingoWebSocket.test.ts
import TiingoWebSocket from './TiingoWebSocket';
import { StockItem } from '../../types/MarketDataTypes';

describe('TiingoWebSocket', () => {
    let mockWebSocket: WebSocket & {
        onopen?: () => void;
        onmessage?: (event: { data: string }) => void;
        onerror?: (event: Error) => void;
        send: jest.Mock;
        close: jest.Mock;
    };
    let onTickerDataReceived: jest.Mock;

    beforeEach(() => {
        // Create a mock for the WebSocket
        mockWebSocket = {
            send: jest.fn(),
            close: jest.fn(),
            onopen: undefined,
            onmessage: undefined,
            onerror: undefined,
        } as any; // Use 'as any' to bypass type checking for the mock

        // Mock the global WebSocket
        (global as any).WebSocket = jest.fn(() => mockWebSocket);

        // Create a mock function for onTickerDataReceived
        onTickerDataReceived = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should open a WebSocket connection and send a subscribe message', () => {
        const ws = TiingoWebSocket(onTickerDataReceived);

        // Simulate the WebSocket opening
        if (mockWebSocket.onopen) {
            mockWebSocket.onopen(); // Call onopen if it's defined
        }

        expect(mockWebSocket.send).toHaveBeenCalledTimes(1);
        expect(mockWebSocket.send).toHaveBeenCalledWith(expect.stringContaining('subscribe'));
    });

    it('should handle incoming messages correctly', () => {
        const ws = TiingoWebSocket(onTickerDataReceived);

        // Simulate the WebSocket opening
        if (mockWebSocket.onopen) {
            mockWebSocket.onopen(); // Call onopen if it's defined
        }

        // Simulate receiving a message
        const mockMessage = JSON.stringify({
            messageType: 'A',
            data: ['T', 'BTCUSD', 1633072800, 'Coinbase', 50000, 1],
        });
        if (mockWebSocket.onmessage) {
            mockWebSocket.onmessage({ data: mockMessage }); // Call onmessage if it's defined
        }

        expect(onTickerDataReceived).toHaveBeenCalledTimes(1);
        expect(onTickerDataReceived).toHaveBeenCalledWith({
            dataType: 'T',
            ticker: 'BTCUSD',
            timestamp: 1633072800,
            exchange: 'Coinbase',
            price: 50000,
            volum: 1,
        });
    });

    it('should log an error if message parsing fails', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        const ws = TiingoWebSocket(onTickerDataReceived);

        // Simulate the WebSocket opening
        if (mockWebSocket.onopen) {
            mockWebSocket.onopen(); // Call onopen if it's defined
        }

        // Simulate receiving an invalid message
        if (mockWebSocket.onmessage) {
            mockWebSocket.onmessage({ data: 'invalid json' }); // Call onmessage if it's defined
        }

        expect(consoleErrorSpy).toHaveBeenCalled();
        consoleErrorSpy.mockRestore();
    });

    it('should log an error on WebSocket error', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        const ws = TiingoWebSocket(onTickerDataReceived);

        // Simulate a WebSocket error
        if (mockWebSocket.onerror) {
            mockWebSocket.onerror(new Error('WebSocket error')); // Call onerror if it's defined
        }

        expect(consoleErrorSpy).toHaveBeenCalledWith('WebSocket error:', expect.any(Error));
        consoleErrorSpy.mockRestore();
    });
});