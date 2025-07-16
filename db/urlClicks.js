import supabase from "./supabase";
import {UAParser} from 'ua-parser-js';


export async function getUrlClicks(url_id){
    const {data, error} = await supabase.from("clicks").select("*").in("url-id",url_id );
    // console.log("Url click data", data);
    if(!data){
        return null;
    }
    if(error){
        throw new Error("Unable to load clicks",error.message);
    }
    return data || [];
}

// statistics api
 const parser = UAParser();

 export const storeClicks = async ({ id, originalUrl }) => {
  try {
    // Assuming parser is defined and getResult() returns an object with 'type' property
    const res = parser.getResult();
    const device = res.type || "desktop";

    // Fetch location data from ipapi.co
    const response = await fetch("https://ipapi.co/json");
    if (!response.ok) {
      throw new Error(`Failed to fetch location data: ${response.status} ${response.statusText}`);
    }
    const { city, country_name: country } = await response.json();

    // Insert data into Supabase
    await supabase.from("clicks").insert({
      "url-id": id, // Adjusted property name to url_id
      city: city,
      country: country,
      device: device
    });

    // route the user
     window.location.href = originalUrl;

  } catch (error) {
    throw new Error(`Failed to store click data: ${error.message}`);
  }
}

export async function getUrl(url_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("url-id", url_id)

  if (error) {
    throw new Error(`error loading stats: ${error.message}`);
  }

  return data || [];
}