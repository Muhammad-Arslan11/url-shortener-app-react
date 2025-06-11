import React from 'react';
import { Link } from "react-router-dom";

function LinkCard({url, fetchUrls}) {
    // console.log(url);
  return (
    <div  className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-800 rounded-lg">
        <img  className="h-32 object-contain ring ring-blue-500 self-start" src={url?.qr} alt="qr code" />
        <Link to={`/link/${url.id}`}>
        <span>{url.title}</span>
        </Link>
        
    </div>
  )
}

export default LinkCard