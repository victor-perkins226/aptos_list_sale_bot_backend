import axios, {
  AxiosResponse,
  AxiosError,
  AxiosPromise,
  Method,
  AxiosRequestHeaders,
} from "axios";


const setHeader = (
  header:
    | {
      authorization?: string;
      contentType?: string;
    }
    | undefined
): object => {
  return {
    Accept: "*/*",
    "Content-Type": header?.contentType || "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Authorization": `${header?.authorization}`
  };
}

interface ServiceParams {
  method: Method;
  route: string;
  headerCred?: {
    authorization?: string;
    contentType?: string;
  };
  data?: object | string;
}

const requestByAxios = async ({
  method,
  route,
  headerCred,
  data,
}: ServiceParams): Promise<AxiosPromise<AxiosResponse | AxiosError> | null> => {
  const headers = setHeader(headerCred) as AxiosRequestHeaders;

  try {
    const response: AxiosResponse = await axios({
      method,
      url: route,
      data,
      headers
    });

    if (response.data?.data) {
      return response.data.data;
    }
    return response.data;
  }
  catch (err) {
    console.log(`axios error`, err);
    return null;
  }

};

export default requestByAxios;
