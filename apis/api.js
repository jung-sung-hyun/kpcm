export const fetcher = async (url, param) => {
  console.log("api 호출 url: ", url);
  console.log("api 호출 param: ", param);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log('200 OK');
      return data;
    } else if (res.status === 400) {
      console.log('400 Error');
      //router.push('../app/common/(exception)/400error');
    } else if (res.status === 500 || res.status === 501) {
      console.log('500, 501 Error');
      //router.push('../app/common/(exception)/400error');
    } else {
      console.log('ETC failed');
      //router.push('../app/common/(exception)/network-error');
    }
  } catch (error) {
    console.error('Error: ', error);
    //router.push('../app/common/(exception)/network-error');
    //throw error;
  }
};