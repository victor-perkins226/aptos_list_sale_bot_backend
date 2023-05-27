
export const BOT_API = 'http://191.101.232.122:5000';
export const API_KEY = '7mS3qw4lDq0iJLf828ov8VfZABv6aMKx';
export const SOLSCAN = `https://solscan.io`;
export const APTOS_API = 'https://rpc.ankr.com/premium-http/aptos/cd035f2ed8406070b8e9e92135e1d0478b5fa5b20ae1fa85243c74c7acdbf256/v1';

export const GET_COIN_RATE = `https://api.coinbase.com/v2/exchange-rates`;

export const TWITTER_INFO = {
  TWITTER_ACCESS_TOKEN: '1534951194099339264-z7onFNYZGBWeOJ8osdy7Z251JQTXtH', TWITTER_ACCESS_TOKEN_SECRET: 'QyESTD8Xy3xb41LiHz9azaCbxQM4d7jqo6ZCIxDx5bca8',
  CONSUMER_KEY: 'qVceJyEHyBZGj7mVD6PVlPRzr',
  CONSUMER_SECRET: 'qT9qmjKABaxvC1i3iJ8hj7K9wm5zCvBUDI3NxxEpgU4PPHW6Oq',
}

export const DISCOTD_AUTH = `RU_cWygUsAcoiWQi2P4b2sB8FTxWxHcO`;
export const MARKET_PLACES = [
  {
    name: 'BlueMove',
    listEvent: '0xd1fd99c1944b84d1670a2536417e997864ad12303d19eac725891691b04d614e::marketplaceV2::ListEvent',
    buyEvent: '0xd1fd99c1944b84d1670a2536417e997864ad12303d19eac725891691b04d614e::marketplaceV2::BuyEvent'
  },
  {
    name: 'Topaz',
    listEvent: '0x2c7bccf7b31baf770fdbcc768d9e9cb3d87805e255355df5db32ac9a669010a2::events::ListEvent',
    buyEvent: '0x2c7bccf7b31baf770fdbcc768d9e9cb3d87805e255355df5db32ac9a669010a2::events::BuyEvent'
  },
  {
    name: 'Soulff',
    listEvent: '0xf6994988bd40261af9431cd6dd3fcf765569719e66322c7a05cc78a89cd366d4::FixedPriceMarket::ListTokenEvent<0x1::aptos_coin::AptosCoin>',
    buyEvent: '0xf6994988bd40261af9431cd6dd3fcf765569719e66322c7a05cc78a89cd366d4::FixedPriceMarket::BuyTokenEvent<0x1::aptos_coin::AptosCoin>'
  },
  {
    name: 'TopNft',
    listEvent: '0x154e41a73bcbc5836d0f4c82468cfb2a6022184fd1f7344e7d07c4b6127958c8::FixedPriceSale::ListEvent',
    buyEvent: '0x154e41a73bcbc5836d0f4c82468cfb2a6022184fd1f7344e7d07c4b6127958c8::FixedPriceSale::BuyEvent'
  },
  {
    name: 'Nightly',
    listEvent: '0x2222bd7309ccbefdbf2e2d09f52b2ee64bb46f00fe6742a61dfaf6218dc4e1e0::custom_event::ListItemEvent',
    buyEvent: '0x2222bd7309ccbefdbf2e2d09f52b2ee64bb46f00fe6742a61dfaf6218dc4e1e0::custom_event::ListItemEvent'
  },
]