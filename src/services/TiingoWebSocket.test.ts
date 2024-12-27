import TiingoWebSocket from './TiingoWebSocket';
import Snackbar from 'react-native-snackbar';

jest.mock('react-native-snackbar', () => ({
  show: jest.fn(),
}));

interface MockWebSocket {
  send: jest.Mock;
  close: jest.Mock;
  onopen: (() => void) | null;
  onmessage: ((event: { data: string }) => void) | null;
  onerror: ((event: any) => void) | null;
  onclose: ((event: any) => void) | null;
}

global.WebSocket = jest.fn(() => ({
  send: jest.fn(),
  close: jest.fn(),
  onopen: null,
  onmessage: null,
  onerror: null,
  onclose: null,
})) as unknown as jest.MockedClass<typeof WebSocket>;

describe('TiingoWebSocket', () => {
  let mockWebSocketInstance: MockWebSocket;
  let mockOnTickerDataReceived: jest.Mock;

  beforeEach(() => {
    mockWebSocketInstance = {
      send: jest.fn(),
      close: jest.fn(),
      onopen: null,
      onmessage: null,
      onerror: null,
      onclose: null,
    };

    global.WebSocket = jest.fn(() => mockWebSocketInstance) as unknown as jest.MockedClass<typeof WebSocket>;
    mockOnTickerDataReceived = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('establishes a WebSocket connection and sends a subscribe message on open', () => {
    TiingoWebSocket(mockOnTickerDataReceived);

    expect(global.WebSocket).toHaveBeenCalledWith(process.env.TIINGO_CRYPTO_WEBSOCKET_URL);

    const subscribeMessage = {
      eventName: 'subscribe',
      authorization: process.env.TIINGO_AUTHORIZATION_TOKEN,
      eventData: {
        thresholdLevel: 5,
      },
    };

    mockWebSocketInstance.onopen?.();
    expect(mockWebSocketInstance.send).toHaveBeenCalledWith(JSON.stringify(subscribeMessage));
  });

  test('calls onTickerDataReceived with parsed data on receiving valid message', () => {
    TiingoWebSocket(mockOnTickerDataReceived);

    const validMessage = {
      data: JSON.stringify({
        messageType: 'A',
        data: ['T', 'AAPL', 1639344000, 'NASDAQ', 150.32, 200],
      }),
    };

    mockWebSocketInstance.onmessage?.(validMessage);

    expect(mockOnTickerDataReceived).toHaveBeenCalledWith({
      dataType: 'T',
      ticker: 'AAPL',
      timestamp: 1639344000,
      exchange: 'NASDAQ',
      price: 150.32,
      volum: 200,
    });
  });

  test('shows a Snackbar error on invalid message data', () => {
    TiingoWebSocket(mockOnTickerDataReceived);

    const invalidMessage = {
      data: 'Invalid JSON',
    };

    mockWebSocketInstance.onmessage?.(invalidMessage);

    expect(Snackbar.show).toHaveBeenCalledWith({
      text: 'An error occurred while processing data. Please try again later.',
      duration: Snackbar.LENGTH_LONG,
    });
  });

  test('shows a Snackbar error on WebSocket error', () => {
    TiingoWebSocket(mockOnTickerDataReceived);

    const errorEvent = { message: 'Connection error' };
    mockWebSocketInstance.onerror?.(errorEvent);

    expect(Snackbar.show).toHaveBeenCalledWith({
      text: 'WebSocket error occurred. Please check your connection.',
      duration: Snackbar.LENGTH_LONG,
    });
  });

  test('shows a Snackbar notification when WebSocket connection is closed', () => {
    TiingoWebSocket(mockOnTickerDataReceived);

    const closeEvent = { code: 1000, reason: 'Normal closure' };
    mockWebSocketInstance.onclose?.(closeEvent);

    expect(Snackbar.show).toHaveBeenCalledWith({
      text: 'WebSocket connection closed. Reloading app...',
      duration: Snackbar.LENGTH_INDEFINITE,
    });
  });
});
