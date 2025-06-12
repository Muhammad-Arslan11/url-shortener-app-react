async function CORShandler() {
  const response = await fetch('https://llwtyftxhcmbktcixqzs.functions.supabase.co/functions/v1/swift-handler', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'Alice' }),
  });

  const result = await response.json();
  console.log(result); // Expected: { message: "Hello Alice!" }
}

call();
