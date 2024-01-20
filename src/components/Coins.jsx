import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');
  const [activePage, setActivePage] = useState(1);

  const currencysymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

  const changePage = (newPage) => {
    if (newPage === page) {
      return; 
    }
    setPage(newPage);
    setLoading(true);

  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message="Error While Fetching Coins" />;

  return (
    <Container maxW="container.xl">
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={(value) => setCurrency(value)} p="8">
            <HStack spacing="4">
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap="wrap" justifyContent="space-evenly">
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                symbol={i.symbol}
                currencysymbol={currencysymbol}
              />
            ))}
          </HStack>
          <HStack overflowX="auto" p="8">
            {btns.map((_, index) => (
              <Button
              key={index + 1}
              bgColor={activePage === index + 1 ? 'blue.500' : 'blackAlpha.900'} // Change button color if active
              color={'white'}
              onClick={() => {changePage(index + 1);
                setActivePage(index + 1);}}
              _hover={{ bgColor: 'blue.500' }}
                // disabled={page === index + 1}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
