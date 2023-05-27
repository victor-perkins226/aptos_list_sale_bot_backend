import axios from "axios";
import { API_KEY, BOT_API } from "../config";
import { getTokenData } from "./web3";

export const sendListData = async (list: any) => {
  try {
    const tokenData: any = await getTokenData(list?.type, list?.data, list?.version);
    console.log('list tokenData', tokenData);
    await axios.post(`${BOT_API}/list`, tokenData, {
      headers: {
        'Authorization': API_KEY
      }
    });
  }
  catch (error) {
    console.log('error', error);
  }
}

export const sendSaleData = async (sale: any) => {
  try {
    const tokenData: any = await getTokenData(sale?.type, sale?.data, sale?.version);
  
    console.log('sale tokenData', tokenData);

    await axios.post(`${BOT_API}/sale`, tokenData, {
      headers: {
        'Authorization': API_KEY
      }
    });
  }
  catch (error) {
    console.log('error', error);
  }
}