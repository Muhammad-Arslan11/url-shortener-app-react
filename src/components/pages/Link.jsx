import useFetch from "@/hooks/useFetch";
import { useUrlState } from "@/UrlContext";
import { deleteUrl, getUrl } from "../../../db/apiUrl";
import { getUrlClicks } from "../../../db/urlClicks";
import React from "react";
import { useParams } from "react-router-dom";
import DeviceStats from "@/components/DeviceStats";
// import LocationStats from "@/components/LocationStats";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

function Link() {
  const { id } = useParams();
  const { user } = useUrlState();

  const {
    loading: urlLoading,
    error: urlError,
    data: urlData,
    fn: fnGetUrl,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStat,
    error: statError,
    data: stats,
    fn: fnStat,
  } = useFetch(getUrlClicks, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);
  let link = "";
  if (url) {
    link = url?.["custom-url"] ? url?.["custom-url"] : url["short-url"];
  }

  return (
    <>
      {(urlLoading || loadingStat) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div>
        <div>
          <span>{url?.stats}</span>
          <a
            href={`https://trimrr.in/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            https://trimrr.in/{link}
          </a>
          <a
            href={url?.['original-url']}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.['original-url']}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(`https://trimrr.in/${link}`)
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }
              disable={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
        </div>
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <Location stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStat === false
                ? "No Statistics yet"
                : "Loading Statistics.."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
}

export default Link;
