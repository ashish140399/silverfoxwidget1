/* eslint-disable */
import { useWeb3React } from "@web3-react/core";
import axios from "axios";

export function useAxios() {
  const { account } = useWeb3React();

  axios.interceptors.request.use((request) => {
    if (
      request?.headers &&
      (request.url.includes("https://api2.fibswap.io") || request.url.includes("http://localhost"))
    ) {
    }

    request.baseURL = `https://api2.fibswap.io/`;
    request.timeout = 300000;

    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      const { status, statusText, data } = response;
      return Promise.resolve(response);
    },
    (error) => {
      const { status, statusText, data } = error.response;

      if (status === 401 || status === 403) {
        window.location.reload();
      }

      return Promise.reject(error);
    },
  );
}
