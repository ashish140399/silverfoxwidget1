import axios from "axios";
import { CHAIN_CONFIG, STATE_API_URL } from "config";
import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";

const useStatus = () => {
  const { slowRefresh } = useRefresh();
  const [maintenance, setMaintenance] = useState<boolean>(false);

  const default_network_status = {};
  Object.keys(CHAIN_CONFIG).forEach((item) => {
    default_network_status[parseInt(item)] = true;
  });
  const [networkStatus, setNetworkStatus] = useState<any>(default_network_status);

  useEffect(() => {
    (async () => {
      try {
        axios
          .get(STATE_API_URL)
          .then((res) => {
            if (res.data) {
              setMaintenance(res.data?.maintenance);
              const tempStatus = {};
              (res.data?.networks || []).forEach((status) => {
                tempStatus[status.networkId] = status.active;
              });

              setNetworkStatus((prev) => ({
                ...prev,
                ...tempStatus,
              }));
            }
          })
          .catch((e: any) => {
            console.log("fetching status error", e);
            setMaintenance(false);
            setNetworkStatus({});
          });
      } catch (e: any) {
        console.error(e);
        setMaintenance(false);
        setNetworkStatus({});
      }
    })();
  }, [slowRefresh, setMaintenance]);

  return {
    maintenance,
    networkStatus,
  };
};

export default useStatus;
