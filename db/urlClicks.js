import supabase from "./supabase";

export async function getUrlClicks(urlsIds){
    const {data, error} = await supabase.from("urls").select("*").in("url_Id",urlsIds );
    if(!data){
        return null;
    }
    if(error){
        throw new Error("Unable to load clicks",error.message);
    }
    return data;
}