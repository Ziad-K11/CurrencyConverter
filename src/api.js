import axios from 'axios';

// Replace 'YOUR_API_KEY' with your actual API key from Fixer
const API_KEY = process.env.REACT_APP_FIXER_API_KEY;
const BASE_URL = 'http://data.fixer.io/api';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        access_key: API_KEY,
    },
});

export const getLatestRates = async (baseCurrency = 'EUR') => {
    try {
        const response = await api.get('/latest', {
            params: { base: baseCurrency },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching latest rates:', error);
        throw error;
    }
};

export const getSymbols = async () => {
    try {
        const response = await api.get('/symbols');
        const symbols = response.data.symbols;
    
        
        const filteredSymbols = {
          USD: symbols.USD,
          GBP: symbols.GBP,
          EUR: symbols.EUR,
          AUD: symbols.AUD,
          CNY: symbols.CNY,
          INR: symbols.INR,
          JPY: symbols.JPY,
        };
    
        return filteredSymbols;
      } catch (error) {
        console.error('Error fetching symbols:', error);
        throw error;
      }    
};