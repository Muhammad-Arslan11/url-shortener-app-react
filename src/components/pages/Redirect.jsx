import useFetch from "@/hooks/useFetch";
import { getLongUrl } from "../../../db/apiUrl";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {storeClicks} from '../../../db/urlClicks.js';

function Redirect() {
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl, id);
  const { loading: statLoading, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.["original-url"],
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading && statLoading) {
    return (
     <>
    <BarLoader width={"100%"} color="#36d7b7" />;
    <br />
    Redirecting...
    </>
    )
  }
}

export default Redirect;
