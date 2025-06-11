import supabase from "./supabase";

export async function getUrlClicks(url_id){
    const {data, error} = await supabase.from("clicks").select("*").in("url-id",url_id );
    console.log("Url click data", data);
    if(!data){
        return null;
    }
    if(error){
        throw new Error("Unable to load clicks",error.message);
    }
    return data || [];
}