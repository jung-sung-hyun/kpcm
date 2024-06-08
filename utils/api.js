export const fetcher = async (url, param) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    });

    /*
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    */
    
    if (res.status === 200) {
       const data = await res.json();
       return data;
    } else if (res.status === 400) {
      console.log('Authentication failed');
      router.push('../app/exception/400error');
    } else if (res.status === 500 || res.status === 501) {
      console.log('Authentication failed');
      router.push('../app/exception/500error');
    } else {
      console.log('ETC failed');
      router.push('../app/exception/network-error');
    }
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};