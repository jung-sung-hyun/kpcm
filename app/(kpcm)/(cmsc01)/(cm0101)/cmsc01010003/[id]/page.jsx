"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { fetcher } from '@apis/api';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { pageDataState } from '../../../(cm0101)/cmsc01010002/[id]/atoms';

/**
 * @description: 게시리스트에서 선택된 게시글을 업데이트 한다.
 * @function Cmsc01010003
 * @param {*} props
 * @returns
 * 변경이 있을 때에는 수정 이력에 변경일자와 변경자, 그리고 변경사유를 기록하여 관리가 되도록 한다.
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy휴 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.05.15       정성현                                  최초작성
 *   2024.05.16       홍길동                     Method 수정및 추가작업
 * ========================================================================================================
 */
export default function Cmsc01010003(props) {
    const router = useRouter();
    const idx = props.params.id;
    const data = useRecoilValue(pageDataState);
    const setData = useSetRecoilState(pageDataState);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    useEffect(() => {
      console.log("data:", data);
      if (data.title) setTitle(data.title);
      if (data.contents) setContents(data.contents);
    }, [data]);
    
    async function updateSubmit(event) {
        event.preventDefault();

        // API 호출
        const url = 'cm/cmsc01010003/update00';
        const param = { idx: idx, title: title, contents: contents };

        try {
            const res = await fetcher(url, param);
            router.push('/cmsc01010002/1');
            router.refresh();
        } catch (error) {
            console.error('API 호출 중 오류 발생: ', error);
        }
    }

    const inputProps = { step: 300 };

    return (
        <form onSubmit={updateSubmit}>
            <p>
                <Button variant="contained" type="submit">저장</Button>
            </p>
            <input type="hidden" name="idx" placeholder="idx" value={idx} />
            <TextField
                id="title"
                name="title"
                type="text"
                onChange={e => setTitle(e.target.value)}
                inputProps={inputProps}
                defaultValue={title}
            />
            <TextField
                id="contents"
                name="contents"
                multiline
                rows={10}
                width={600}
                onChange={e => setContents(e.target.value)}
                defaultValue={contents}
                style={{ width: 700, height: 150, borderRadius: '50%' }}
            />
        </form>
    );
}