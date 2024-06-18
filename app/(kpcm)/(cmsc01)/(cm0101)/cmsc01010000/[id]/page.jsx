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
 * ========================================================================================================
 */
 export default function Cmsc01010000(props) {
   const [boardList   , setDataList   ] = useState();
   const idx = props.params.id;

   async function initfresh() {
    // API 호출
    const url = 'cm/cmsc01010000/selectList00';
    const param = {
      idx : idx,
    };
    try {
      const data = await fetcher(url, param);
      setDataList(data.datalist);
    } catch (error) {
      console.error('API 호출 중 오류 발생: ', error);
     }
   };
   
  useEffect((event)=>{
    initfresh();
  }, []);

   console.log("boardList: ", boardList);
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