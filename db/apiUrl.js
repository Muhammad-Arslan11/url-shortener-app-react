import supabase from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user-id", user_id);
    // console.log("Url data", data);

  if (error) {
    throw new Error(`Unable to load URLs: ${error.message}`);
  }

  return data || [];
}

// export async function deleteUrls(id) {
//   const { data, error } = await supabase
//     .from("urls")
//     .delete()
//     .eq("user-id", id);
//     // console.log("Url data", data);

//   if (error) {
//     throw new Error(`Unable to load URLs: ${error.message}`);
//   }

//   return data || [];
// }


export async function deleteUrls(id) {
  const response = await fetch('https://llwtyftxhcmbktcixqzs.functions.supabase.co/functions/v1/swift-handler', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to delete URL');
  }

  return result.data || [];
}

 