"use client"
import { useRouter } from "next/navigation";
import {useEffect, useState} from 'react';
import {
    TextField
   ,Button
} from '@mui/material';
import { Result } from "postcss";
/**
 * @description: 신규버튼의 선택을 게시글을 작성 저정한다.
 * @function Cmsc01010001
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
export default  function Cmsc01010001(props) {
   const id = props.params.id;
   const router = useRouter();
   const [title, setTitle] = useState('');
   const [contents, setContents] = useState('');
   const inputProps = {step: 300};
   const option = {
      method: 'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body:JSON.stringify({title,contents})
  };

    async function handleSubmit(event) {
        event.preventDefault();
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, contents })
        };
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cm/cmsc01010001/insert00`, option)
            .then(res => res.json())
            .then(result => {
                // router.push('/kpcm/cm01/cm0101/selectBoardList/1').then(() => window.location.reload());
                router.push('/cm0101mq0/1');
                router.refresh();
            })
            .catch(error => {
                console.error('Error:', error);
            });
   }

     return (
        <form onSubmit={handleSubmit}>
          <h2>insert!!</h2>
             <p>
             <Button variant="contained" type="submit">저장</Button>
             </p>
            <TextField id="title" name="title" label="제목을 입력하세요."   onChange={e=>setTitle(e.target.value)} value={title} type="text" inputProps={inputProps} fullWidth />
            <p></p>
            <TextField
             id="contents"
             name="contents"
             label="게시글"
             multiline
             rows={13}
             width={600}
             onChange={e=>setContents(e.target.value)} value={contents}
             style={{ width: 700, height: 150, borderRadius: '50%' }}
             />
        </form>
     )
 }