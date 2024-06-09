"use client"
import Link from "next/link"
import * as React from 'react';
import {useEffect, useState } from 'react';
import { Directions } from "@mui/icons-material";
import {
   List
  ,ListItem
  ,ListItemText
  ,Typography
  ,Button
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
/**
 * @description: 게시판의 리스트를 조회한다.
 * @function Cmsc01010000
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
 export default function Cmsc01010000(props) {

  const idx = props.params.id;
  const param = {idx:idx};
  const [boardList   , setDataList   ] = useState();

  async function initfresh(){
    const res = await  fetch(`${process.env.NEXT_PUBLIC_API_URL}/cm/cmsc01010000/selectList00`,{
      method : 'POST',
      cache:'no-store',
      headers : {
          'Content-Type' : 'application/json',
      },
      data: JSON.stringify(param),
      body : JSON.stringify({
        idx : idx,
      })
    })
    .then((response) => {
      if(response.status === 200){
        return response.json();
        //return response.text();
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
    console.log("=============res======start=========");
    console.log(res);
    console.log("==============res==============");
    setDataList(res);
  };
  useEffect((event)=>{
    //event.preventDefault();
    initfresh();
  }, []);

  if (!boardList) {
    console.log('==================================================error');
    return;
  }

  const newPage = {
    pathname: `/cm0101si0/${idx}`,
    query: {
      // title: movie.original_title,
      title: "",
    },
  };
  return (
      <>
      <Typography variant="h4"><Link key='1' href='/cm0101mq0/0'>게시판</Link></Typography>
        <ol>
        <Link href={newPage}><Button variant="contained" >신규</Button></Link>
          <List>
            {boardList.map((data) => (
              <Link key={data.idx} href={`/cm0101sq0/${data.idx}`}>
                <ListItem>
                    <ListItemText style={{ width: "10%",height:"10px",textAlign:"center"}} primary={data.idx} />
                    <ListItemText style={{ width: "30%",textAlign:"left"}} width={600} primary={data.title} />
                    <ListItemText style={{ width: "50%",textAlign:"left"}}width={600} primary={data.contents} />
                    <ListItemText style={{ width: "10%",textAlign:"center"}}width={100} primary={data.updDt} />
                </ListItem>
              </Link>
            ))}
          </List>
        </ol>
     </>
  )
}