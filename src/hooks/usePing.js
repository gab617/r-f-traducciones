import { useEffect } from "react";
import { pingBDD } from "../services/dataService";

export function usePing() {
  useEffect(() => {
    const fetchData = () => {
      pingBDD().then((res) => console.log(res)).catch(console.error);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 240000);
    return () => clearInterval(intervalId);
  }, []);
}
