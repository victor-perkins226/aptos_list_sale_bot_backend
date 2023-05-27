import axios from 'axios'
import { AptosClient, TokenClient } from 'aptos';
import { MARKET_PLACES, APTOS_API } from '../config';

export const getParsedTranactions = async (lastSignature: number) => {
  let sales = [], lists = [];
  try {
    console.log('last signature', lastSignature);
    let url = `${APTOS_API}/transactions`;
    if (lastSignature) {
      url = `${url}?lastSignature=${lastSignature}`
    }
    else {
      url = `${url}?limit=1`;
    }
    const { data } = await axios.get(url);
    let transactions = await Promise.all(
      data.map((tx: any) => 
      axios.get(`${APTOS_API}/transactions/by_version/${tx.version}`)));
    
    transactions.forEach((tx: any) => {
      const listEvents = tx.data?.events?.filter((event: any) => 
        !!MARKET_PLACES.find(market => market.listEvent === event.type));
      if (listEvents) lists = [...lists, ...listEvents.map((list: any) => ({...list, version: tx.data?.version}))];

      const saleEvents = tx.data?.events?.filter((event: any) => 
      !!MARKET_PLACES.find(market => market.buyEvent === event.type));
      if (saleEvents) sales = [...sales, ...saleEvents.map((sale: any) => ({...sale, version: tx.data?.version}))];
    })

    console.log('sales', sales, 'lists', lists);
    return {
      sales,
      lists,
      lastSignature: data[data.length - 1]?.version
    }
  }
  catch (error) {
    console.log('error', error);
  }

  return {
    sales,
    lists,
    signature: lastSignature
  }
}

export const getCoinPrice = async (coin: string) => {
  const result = await axios.get(`https://api.coinbase.com/v2/exchange-rates`);
  return 1 / result.data.data.rates[coin];
}

export const getTokenData = async (type: string, data: any, version: string) => {
  try {
    console.log('type', type);
    const market = MARKET_PLACES.find(market => market.listEvent === type || market.buyEvent === type);
    if (!market) return null;
    let price = 0;
    let sellerAddress = '', buyerAddress = '';
    let collection = '', creator = '', name = '';
    switch(market.name) {
      case 'BlueMove': 
        if (type === market.listEvent) {
          price = parseInt(data.amount) / 100000000;
          sellerAddress = data.seller_address;
        }
        else {
          const {data}: any = await axios.get(`${APTOS_API}/transactions/by_version/${version}`);
          console.log('bluemove sale event', data);
          let depositEvents = data.events
          .filter((event: any) => event.type === '0x1::coin::DepositEvent');
          price = depositEvents
          .reduce((total, event) => total + parseInt(event?.data?.amount), 0);
          price = price / 100000000
          depositEvents = depositEvents.sort((a, b) => a?.data?.amount - b?.data.amount);
          sellerAddress = depositEvents[0]?.guid?.account_address;
          buyerAddress = data.buyer_address;
        }

        collection = data?.id?.token_data_id?.collection;
        creator = data?.id?.token_data_id?.creator;
        name = data?.id?.token_data_id?.name;
        break;
      case 'Topaz':
        price = parseInt(data.price) / 100000000;
        sellerAddress = data.seller;
        buyerAddress = data.buyer;
        
        collection = data?.token_id?.token_data_id?.collection;
        creator = data?.token_id?.token_data_id?.creator;
        name = data?.token_id?.token_data_id?.name;
        break;
      case 'Soulff':
        price = parseInt(data.coin_per_token) / 100000000;
        sellerAddress = data.token_owner;
        buyerAddress = data.buyer;

        collection = data?.token_id?.token_data_id?.collection;
        creator = data?.token_id?.token_data_id?.creator;
        name = data?.token_id?.token_data_id?.name;
        break;
      case 'TopNft':
        price = parseInt(data.amount) / 100000000;
        sellerAddress = data.seller;
        buyerAddress = data.buyer;
        
        collection = data?.id?.token_data_id?.collection;
        creator = data?.id?.token_data_id?.creator;
        name = data?.id?.token_data_id?.name;
        break;
      case 'Nightly':
        price = parseInt(data.price) / 100000000;
        sellerAddress = data.creator;
        buyerAddress = data.buyer;
        
        collection = data?.token_id?.token_data_id?.collection;
        creator = data?.token_id?.token_data_id?.creator;
        name = data?.token_id?.token_data_id?.name;
        break;
      default: break;
    }
    console.log('market', market);
    console.log('collection', collection, 'creator', creator, 'name', name);
    const aptPrice = await getCoinPrice('APT');
    const client = new AptosClient(APTOS_API);
    const tokenClient = new TokenClient(client);
    const tokenData: any = await tokenClient.getTokenData(creator, collection, name);
    let image = '';
    let uri = tokenData?.uri.replace("ipfs://", "https://ipfs.io/ipfs/");
    const metadata: any = await axios.get(uri);
    if (metadata?.data?.image) {
      image = metadata?.data?.image?.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    else {
      image = uri;
    }

    console.log('image', image);


    return {
      name,
      creator,
      collection,
      image,
      price,
      usdPrice: price * aptPrice,
      sellerAddress,
      buyerAddress,
      version,
      market: market.name
    }
  }
  catch (error) {
    console.log('error', error);
  }

  return null;
}

