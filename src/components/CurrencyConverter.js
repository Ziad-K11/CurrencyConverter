import React, { useState, useEffect } from 'react';
import { getLatestRates, getSymbols } from '../api';
import placeholder from '../No_flag.png';
import useDebounce from '../components/Debounce';

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [symbols, setSymbols] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmounts, setConvertedAmounts] = useState({});

  // Debounce the baseCurrency value
  const debouncedBaseCurrency = useDebounce(baseCurrency, 500);

  const fetchData = async (currency) => {
    try {
      const ratesData = await getLatestRates(currency);
      setRates(ratesData.rates);
      const symbolsData = await getSymbols();
      setSymbols(symbolsData.symbols);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (debouncedBaseCurrency) {
      fetchData(debouncedBaseCurrency);
    }
  }, [debouncedBaseCurrency]);

  useEffect(() => {
    if (rates) {
      const newConvertedAmounts = {};
      for (const [currency, rate] of Object.entries(rates)) {
        newConvertedAmounts[currency] = (amount * rate).toFixed(2);
      }
      setConvertedAmounts(newConvertedAmounts);
    }
  }, [amount, rates]);

  const handleChange = (e) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value);
    if (parsedValue >= 0 || value === '') {
      setAmount(value);
    }
  };

  const handleCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  const getFlagSrc = (currency) => {
    return `assets/${currency}.svg`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center bg-blue-600 text-white p-8 shadow-md h-auto lg:h-auto sticky top-0 lg:sticky">
        <img
          src="assets/EUR.svg"
          alt="European Union Flag"
        />
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={handleChange}
          className="text-center p-2 border-none bg-transparent outline-none shadow-none appearance-none text-8xl font-bold leading-[118px] font-roboto w-full"
        />
        <hr className="w-full opacity-40"></hr>

        <p className="text-blue-200 font-roboto font-normal text-4xl mt-2 opacity-40">{baseCurrency}</p>
      </div>

      <div className="bg-white w-auto flex flex-col justify-evenly py-10 gap-7 h-screen overflow-auto lg:h-screen sm:overflow-auto">
        {convertedAmounts && Object.entries(convertedAmounts).map(([currency, convertedAmount]) => (
          <div key={currency} className="flex justify-between items-center p-4 border rounded-md mx-10 shadow-custom-shadow">
            <div className="flex items-center gap-16">
              <span className="font-normal font-roboto text-base">{currency}</span>
              <img
                src={getFlagSrc(currency)}
                onError={(e) => e.target.src = placeholder}
                alt={currency}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <span className='font-normal font-roboto text-base'>{convertedAmount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyConverter;
