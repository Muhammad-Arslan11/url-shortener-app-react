import React from "react";
import { Link } from "react-router-dom";
import {
  Copy,
  Download,
  Trash,
  LinkIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "../../db/apiUrl";
import { BeatLoader } from "react-spinners";

function LinkCard({ url, fetchUrls }) {
  // console.log(url);

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title; // Desired file name for the downloaded image

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger the download by simulating a click event
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };


  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url['user-id']);


  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-800 rounded-lg">
      <img
        className="h-32 object-contain ring ring-blue-500 self-start"
        src={url?.qr}
        alt="qr code"
      />
      <Link to={`/link/${url.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url.title}
        </span>
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {`https://trimmr/in${url["short-url"]}`}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          <LinkIcon className="p-1" />
          {url["original_url"]}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() =>
            navigator.clipboard.writeText(`https://trimrr.in/${url['short-url']}`)
          }
        >
          <Copy />
        </Button>
        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>
        <Button
          variant="ghost"
          onClick={() => fnDelete().then(() => fetchUrls())}
           disabled={loadingDelete}
        >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
}

export default LinkCard;
