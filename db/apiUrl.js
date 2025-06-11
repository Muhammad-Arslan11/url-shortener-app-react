import supabase from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user-id", user_id);
    console.log("Url data", data);

  if (error) {
    throw new Error(`Unable to load URLs: ${error.message}`);
  }

  return data || [];
}
 