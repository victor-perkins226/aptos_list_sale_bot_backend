import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { AptosClient, TokenClient } from 'aptos';

import * as dotenv from 'dotenv';

import { MARKET_PLACES, APTOS_API } from './config';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.listen(process.env.PORT, () => {
  console.log(`Express is listening at http://127.0.0.1:${process.env.PORT}`);
});

app.get('/test', async (req, res) => {
  const client = new AptosClient(APTOS_API);
  const tokenClient = new TokenClient(client);
  const tokenData: any = await tokenClient.getTokenData("0x97d8291b05b5438b0976b93554074f933608a491d63dcb2cfec368d6777631ef", "The Bored Aptos Yacht Club", "#2843");
  res.json({uri: tokenData?.uri});
})
import { getParsedTranactions } from './helpers/web3';
import { sendListData, sendSaleData } from './helpers/api';


export const delayTime = (ms: number) => new Promise(res => setTimeout(res, ms));

const runBot = async (lastSignature: number) => {
  let signature = lastSignature;
  try {
    const result: any = await getParsedTranactions(lastSignature);
    signature = result?.lastSignature;
    Promise.all(result?.lists?.map((list: any) => sendListData(list)));
    Promise.all(result?.sales?.map((sale: any) => sendSaleData(sale)));

  }
  catch (err) {
    console.log(`Error in runnig bot::`, err);
  }

  await delayTime(1000);
  await runBot(signature);
}


(async () => {
  await runBot(-1);
})()