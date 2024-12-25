import { ReactNode } from "react";
import { StockItem, TopOfBookData } from "./marketDataTypes";

export interface CustomHeaderProps {
    title: string;
    onProfilePress: () => void;
    onNotificationPress: () => void;
}

export interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
}

export interface ThemeProviderProps {
    children: ReactNode;
}

export interface SubscribeMessage {
    eventName: string;
    authorization: string;
    eventData: {
        thresholdLevel: number;
        // tickers: string[];
    };
}

export interface StockCardProps {
    item: StockItem;
    onPress: () => void;
}

export interface ErrorProps {
    errorMessage: string;
    onRetry: () => void;
}

export interface TingoApiResponse {
    topOfBookData: TopOfBookData[];
}