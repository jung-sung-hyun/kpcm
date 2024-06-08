"use client"
import Link        from "next/link"
import {useRouter} from "next/navigation";
import {useEffect, useState } from 'react';
import {Button
      ,TextField
} from '@mui/material';

export default  function Update(props){
    const idx = props.params.id;
    const router = useRouter();

    const [title   , setTitle   ] = useState('');
    const [contents, setContents] = useState('');
    const [updDt   , setUpdDt   ] = useState('');
    //함수
    async function initfresh(){
      const res = await	fetch(`${process.env.NEXT_PUBLIC_API_URL}/selectBoard`,{
          cache:'no-store',
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify({idx:idx})
        })
        .then((response) => {
          if(response.status === 200){
            return response.json();
          }else {
            // 서버 에러 코드 전송 시 실행할 부분
          }
        })
        .then((result) => {
          // 성공 시 실행할 부분
          return result;
        })
        .catch((err) => {
          // 인터넷 문제로 실패 시 실행할 부분
          console.log(err);
        });
        setTitle(res.Alllist.title);
        setContents(res.Alllist.contents);
        setUpdDt(res.Alllist.updDt);


        // 리다이렉션 객체 사용해 리다이렉션
        if (!res) {
          return {
            redirect: {
              destination: '/',
              permanent: false,
              statusCode: 301
            },
          }
        }
    }

    useEffect(()=>{
      initfresh();
    }, []);

  async function updateSubmit() {
    //event.preventDefault();
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({idx:idx,title:title,contents:contents})
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateBoard`, option)
        .then(res => res.json())
        .then(result => {
            console.log("result: ", result);
            // router.push('/kpcm/cm01/cm0101/selectList/1').then(() => window.location.reload());
            router.push('/kpcm/cm01/cm0101/selectBoardList/1');
            router.refresh();
        })
        .catch(error => {
            console.error('Error:', error);
        });
  }
  const inputProps = {step: 300};
  return(
<>

<form action={updateSubmit}>
<h2>update!!</h2>
   <p>
   <Button variant="contained" type={'submit'}>저장</Button>
   </p>
   <input type="hidden" name="idx" placeholder="idx"  value={idx}/>
   <TextField id="title" name="title"   type="text" onChange={e=>setTitle(e.target.value)}  inputProps={inputProps} defaultValue={title}/>
   <TextField
      id="contents"
      name="contents"
      multiline
      rows={10}
      width={600}
      onChange={e=>setContents(e.target.value)}
      defaultValue={contents}
      style={{ width: 700, height: 150, borderRadius: '50%' }}
      />

</form>

</>

  )
}