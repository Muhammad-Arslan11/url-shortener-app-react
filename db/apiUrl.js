import supabase, { supabaseUrl } from './supabase';

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
  const response = await fetch('http://localhost:3000/delete-url', {
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

export async function createUrl({title, long_url, custom_url, user_id}, qr_code) {
  const shortUrl = Math.random().toString(36).substring(2,8);
  const fileName = `dp-${shortUrl}`;

 const {error: storageError} =  await supabase.storage.from("qr").upload(fileName, profile_pic);
 if (storageError) {
   throw new Error(`Unable to load URLs: ${error.message}`);
 }

 const qr  = `${supabaseUrl}/storage/v1/object/public/profile-pic/${fileName}`;
 const {data, error} = await supabase.from('urls').insert([
  {
    title, 
    "original-url": long_url, 
    "custom-url": custom_url || null, 
    user_id,
    qr_code
  },
 ]).select();


  return data || [];
}


 