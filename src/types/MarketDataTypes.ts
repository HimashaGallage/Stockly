export interface MarketData {
    messageType: string;
    service?: string;
    data?: any[];
  }
  
  export interface SubscriptionResponse {
    messageType: string;
    response: {
      code: number;
      message: string;
    };
    data?: {
      subscriptionId: number;
    };
  }

  export interface StockItem {
    dataType: string;
    ticker: string;
    timestamp: number;
    exchange: string;
    price: number;
    volum: number;
}

export interface TopOfBookData {
    askExchange: string;  
    askPrice: number;         
    askSize: number;          
    bidExchange: string;         
    bidPrice: number;           
    bidSize: number;              
    lastExchange: string;      
    lastPrice: number;            
    lastSaleTimestamp: string;   
    lastSize: number;           
    lastSizeNotional: number;    
    quoteTimestamp: string;       
}

export type CustomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  item: StockItem;
};