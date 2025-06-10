import supabase from "./supabase";

export async function getUrls() {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user-id", user-id);

  if (error) {
    throw new Error(`Unable to load URLs: ${error.message}`);
  }

  return data || [];
}
 