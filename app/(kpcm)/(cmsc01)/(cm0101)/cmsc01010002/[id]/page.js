"use client"
import Link        from "next/link"
import {useRouter} from "next/navigation";
import {useEffect, useState } from 'react';
import {Button
      , Stack
} from '@mui/material';
/**
 * @description: 게시판리스트에서 선택된 게시글을 조회한다.
 * @function cm0101sq0
 * @param {*} props
 * @returns
 * 변경이 있을 때에는 수정 이ㅣ력에 변경일자와 변경자, 그리고 변경사유를 기록하여 관리가 되도록 한다.
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy휴 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.05.15       정성현                                  최초작성
 *   2024.05.16       홍길동                     Method 수정및 추가작업
 * ========================================================================================================
 */
export default  function Select(props){
    const idx = props.params.id;
    const router = useRouter();
    const [title   , setTitle   ] = useState('');
    const [contents, setContents] = useState('');
    const [updDt   , setUpdDt   ] = useState('');
    //함수
    async function initfresh(){
      const res = await	fetch(`${process.env.NEXT_PUBLIC_API_URL}/cm/cmsc01010002/select00`,{
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


  async function deleteSubmit(event) {
    event.preventDefault();
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({idx:idx})
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteBoard`, option)
        .then(res => res.json())
        .then(result => {
            console.log("result: ", result);
            // router.push('/kpcm/cm01/cm0101/selectBoardList/1').then(() => window.location.reload());
            router.push('/cm0101mq0/1');
            router.refresh();
        })
        .catch(error => {
            console.error('Error:', error);
        });
  }

  return(
<>
<form onSubmit={deleteSubmit}>
    <input type="hidden" name="idx" placeholder="idx"  value={idx}/>
    <h2>제목: {title}</h2>
    <h2>내용: {contents}</h2>
    <h2>작성일자: {updDt}</h2>
    <Stack spacing={2} direction="row">
        <Button variant="contained" href={`/cm0101su0/${idx}`}>수정</Button>
        <Button variant="outlined" type="submit">삭제</Button>
    </Stack>
</form>
</>

  )
}