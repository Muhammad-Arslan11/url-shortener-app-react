import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useUrlState } from "@/UrlContext";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "../../../db/apiUrl";
import { getUrlClicks } from "../../../db/urlClicks";

function Dashboard() {
  const [searchValue, setSearchValue] = useState("");

  const { user } = useUrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  const {
    loading: clickLoading,
    data: urlClicks,
    fn: fnClick,
  } = useFetch(
    getUrlClicks,
    urls?.map((url) => url.id)
  );

 useEffect(() => {
  if (user?.id) {
    getUrls();
  }
}, [user?.id]);


  useEffect(() => {
    if (urls?.length) fnClick();
  }, [urls?.length]);

  const filterUrls = urls?.filter((url) => {
    return url.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <div className="flex flex-col gap-8">
        {" "}
        {(loading ||
          clickLoading) && <BarLoader width={"100%"} color="#36d7b7" />}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4">
        <Card className=" bg-gray-800">
          <CardHeader>
            <CardTitle>Total Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>
        <Card className=" bg-gray-800">
          <CardHeader>
            <CardTitle>Total Links Visited</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between m-2 ml-4 mr-5">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <Button>Create Links</Button>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter links"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="text-black w-[80%] mx-auto border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <Filter className="absolute top-2 right-2 p-1 " />
      </div>
      {error && <Error message={error.message}/>}
    </>
  );
}

export default Dashboard;
