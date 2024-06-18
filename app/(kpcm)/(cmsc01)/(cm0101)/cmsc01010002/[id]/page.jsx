"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Button, Stack, Box, Card, CardContent, Typography } from '@mui/material';
import { fetcher } from '@apis/api';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { pageDataState } from './atoms';
import CustomAlert from '@components/ModalComponent/CustomAlert';

/**
 * @description: 게시판리스트에서 선택된 게시글을 상세조회한다.
 * @function cm0101sq0
 * @param {*} props
 * @returns
 * 변경이 있을 때에는 수정 이력에 변경일자와 변경자, 그리고 변경사유를 기록하여 관리가 되도록 한다.
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.05.15       정성현                                  최초작성
 *   2024.05.16       홍길동                     Method 수정및 추가작업
 * ========================================================================================================
 */
export default function Cmsc01010002({ params }) {
  const router = useRouter();
  const [data, setData] = useRecoilState(pageDataState);
  const { id } = params;
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [updDt, setUpdDt] = useState('');
  const [error, setError] = useState('');

  // 수정 버튼 클릭 이벤트
  const handleUpdateClick = () => {
    setData({ title, contents, updDt });
  };

  // 함수
  async function initfresh() {
    // API 호출
    const url = 'cm/cmsc01010002/select00';
    const param = { idx: id };

    try {
      const res = await fetcher(url, param);
      console.log("res: ", res);
      setTitle(res.dateSingle.title);
      setContents(res.dateSingle.contents);
      setUpdDt(res.dateSingle.updDt);
    } catch (error) {
      console.error('API 호출 중 오류 발생: ', error);
      setError('API 호출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }

  useEffect(() => {
    initfresh();
  }, []);

  async function handleDeleteClick() {
    // API 호출
    const url = 'cm/cmsc01010002/delete00';
    const param = { idx: id };
    try {
      const res = await fetcher(url, param);
      console.log("res: ", res);
      router.push('/cmsc01010002/1');
      router.refresh();
    } catch (error) {
      console.error('API 호출 중 오류 발생: ', error);
      setError('삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }

  return (
    <Box sx={{ maxWidth: 600, padding: 2 }}>
      {error && <CustomAlert severity="error" message={error} />}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            제목: {title}
          </Typography>
          <br />
          <Typography variant="body1" color="text.secondary">
            내용: {contents}
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            작성일자: {updDt}
          </Typography>
        </CardContent>
      </Card>
      <Box component="form" sx={{ mt: 2 }}>
        <input type="hidden" name="id" value={id} />
        <Stack spacing={2} direction="row">
          <Link href={`/cmsc01010003/${id}`} passHref>
            <Button onClick={handleUpdateClick} variant="outlined">수정</Button>
          </Link>
          <Button onClick={handleDeleteClick} variant="contained">삭제</Button>
        </Stack>
      </Box>
    </Box>
  );
}