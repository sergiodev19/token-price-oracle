# Token Price Oracle

## Overview

This project is a comprehensive solution designed to manage and aggregate token pair data from various data sources. It utilizes a microservice architecture with Node.js, Express, MongoDB, Redis, and TypeScript to ensure scalability, maintainability, and efficiency.

## Features

- **Token Pair Management**: Create, update, and delete token pairs.
- **Data Source Management**: Manage supported data sources.
- **Price Aggregation**: Aggregate token prices from multiple data sources including Binance, CryptoCompare, and Uniswap.
- **Caching**: Utilize Redis for caching and optimizing performance.
- **Validation & Error Handling**: Comprehensive validation and error handling mechanisms.

## Technologies

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript.
- **Mongoose**: ODM for MongoDB and Node.js.
- **Redis**: In-memory data structure store used for caching.
- **Axios**: Promise-based HTTP client for making API requests.
- **Ethers.js**: Library for interacting with Ethereum blockchain.

## Installation

1. **Clone the repository**

   ```bash
    git clone https://github.com/sergiodev19/token-price-oracle
    cd token-price-oracle
   ```

2. **Install dependencies**

    ```bash
    npm install
   ```
3. **Configure environment variables**
Create a `.env` file in the root directory and add the necessary environment variables:

    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_uri
    REDIS_URI=your_redis_uri
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRATION_PERIOD="24h"
    BCRYPT_SALT_ROUNDS=10
   ```
4. **Run the application**
    ```bash
    npm start
    ```
## API Endpoints
#### Token Pairs
+ Create Token Pair
`POST /api/token-pairs`
Request Body:
    ```bash
    {
      "symbol": "BTC-USD",
      "address": "0x...",
      "price": 50000
    }
    ```
+ Get All Token Pairs
`GET /api/token-pairs`
+ Get Token Pair by Symbol
`GET /api/token-pairs/by-symbol/:symbol`
+ Get Token Pair by ID
`GET /api/token-pairs/:id`
+ Update Token Pair
`PUT /api/token-pairs/:id`
Request Body:
    ```bash
    {
      "price": 51000
    }
    ```
+ Delete Token Pair
`DELETE /api/token-pairs/:id`
#### Data Sources
+ Get Supported Data Sources
`GET /api/supported-data-sources`
+ Delete Supported Data Source
`DELETE /api/supported-data-sources/:id`
#### Aggregated Price
+ Get Aggregated Price
`GET /api/aggregated-price/:symbol`
#### Error Handling
##### The application provides various error classes for handling different types of errors:
+ BadRequestError Get Aggregated Price: For invalid requests.
+ UnauthorizedError: For unauthorized access.
+ ForbiddenError: For forbidden actions.
+ NotFoundError: For non-existent resources.
+ APIError: For general API errors.
+ InternalError: For internal server errors.
##### Error Handler Middleware
The `errorHandler` middleware is used to catch and respond to errors that occur during request processing.
## Contribution
1. Fork the repository
2. Create a feature branch (git checkout -b feature/new-feature)
3. Commit your changes (git commit -am 'Add new feature')
4. Push to the branch (git push origin feature/new-feature)
5. Create a new Pull Request
## License
This project is licensed under the MIT License - see the `LICENSE` file for details.