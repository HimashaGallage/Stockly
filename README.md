# Stockly Mobile Trading App Documentation
# Introduction
•	App Name: Stockly
•	Description: A mobile trading app built with React Native and TypeScript, offering live market data, stock search functionality, and detailed stock insights.

 ## Key Features: 
	Live market data using WebSocket integration with Tiingo.
	Search and filter symbols.
  Navigate between tabs for streamlined access.
  Detailed stock view for selected symbols.



# Prerequisites
## Environment: 
  Node.js (>=18.x)
  npm or Yarn
  React Native CLI
  Dependencies: 
  React Native TypeScript Tiingo API access (API key required)

# Installation
##  Clone the Repository
in the terminal,

git clone https://github.com/HimashaGallage/Stokcly.git
cd Stockly

##  Install Dependencies
Run the following command to install all required dependencies:
npm install

For iOS: 
npx pod-install

##  Environment Setup

signup in https://www.tiingo.com/ and copy your **API Token** from docmunettation section
Create a .env file in the root directory with the following:

TIINGO_CRYPTO_WEBSOCKET_URL=wss://api.tiingo.com/crypto
TIINGO_API_URL = https://api.tiingo.com/tiingo/crypto
TIINGO_AUTHORIZATION_TOKEN=  **add your Your API Token here**

## Start the App
•	For iOS: 	npm run ios
•	For Android:	npm run android


# App Structure 
## Folder Structure
  src/

 components -> Reusable UI components
 
 screens/ -> App screens (Market, Search, Stock Details, etc.)
 
 navigation/-> React Navigation setup
 
 services/  -> API calls, WebSocket connection
 
 utils/   -> Utility functions
 
 assets/  -> Images, icons, and fonts
 
 types/   ->  TypeScript types and interfaces
 

## Key Files
•	App.tsx: Main entry point of the app.
•	navigation/: Manages tab navigation using React Navigation.
•	services/TiingoWebSocket.ts: Handles WebSocket connection and Tiingo WebSocket calls.


# Functionality Overview
## Tab Navigation
The app uses a bottom tab navigator with the following tabs:
•	Home: 
•	Market: Displays live market data streamed from Tiingo. : Allows users to search and filter symbols. see more details by click on search result items
•	Portfolio: (Optional) Displays a user's selected stocks.
•	Settings:

##  Market Tab
  Fetches live market data using WebSockets.
  Displays a list of stock symbols with live price updates.

##  Search Symbol
  Filters the stock list based on user input.
  Real-time search results as you type.

##  Stock Details
	Clicking a stock symbol navigates to a detailed view.
	Displays stock-specific information such as: 
	Current price
	Daily high/low
	Historical data (if integrated).


# Dependencies
## Key Libraries
  React Navigation: Handles app navigation.
  Axios: For REST API calls.
  react-native-reanimated: Smooth animations.
  react-native-gesture-handler: Gesture support for navigation and UI components.
  WebSocket: Real-time data streaming from Tiingo.


# Testing
##  Unit Testing
run test in the terminal of root **npm test**
•	Tools: Jest, React Native Testing Library.
•	Validate WebSocket data handling.



# Troubleshooting
Common Issues
•	WebSocket connection errors: Verify your Tiingo API key and ensure the WebSocket endpoint is reachable.
•	Dependency conflicts: Check for compatibility issues in package.json.


# Contact
For support, contact **Himasha Gallage** at **gallagehh@gmail.com**.
(https://github.com/user-attachments/assets/38242736-79a1-4909-ba16-b96e1cfae452)
