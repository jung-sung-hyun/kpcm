"use client"
import Link from "next/link";
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
  Paper,
  Grid
} from '@mui/material';
import { fetcher } from '@apis/api';

/**
 * @description: 게시판의 리스트를 조회한다.
 * @function Cmsc01010000
 * @param {*} props
 * @returns
 * 변경이 있을 때에는 수정 이력에 변경일자와 변경자, 그리고 변경사유를 기록하여 관리가 되도록 한다.
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy 휴 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.05.15       정성현                                  최초작성
 *   2024.05.16       홍길동                     Method 수정및 추가작업
 * ========================================================================================================
 */
export default function Cmsc01010000(props) {
  const idx = props.params.id;
  const [boardList, setDataList] = useState([]);

  async function initfresh() {
    // API 호출
    const url = 'cm/cmsc01010000/selectList00';
    const param = { idx: idx };
    try {
      const data = await fetcher(url, param);
      setDataList(data.dataList || []);
    } catch (error) {
      console.error('API 호출 중 오류 발생: ', error);
    }
  }

  const newPage = {
    pathname: `/cmsc01010001`
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Link href={newPage}>
          <Button variant="contained">신규</Button>
        </Link>
        <Button variant="contained" onClick={initfresh}>조회</Button>
      </Box>
      <Paper elevation={3}>
        <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          <Grid container>
            <Grid item xs={1}>
              <Typography variant="body1" align="center">순번</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="center">제목</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" align="center">내용</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" align="center">등록일자</Typography>
            </Grid>
          </Grid>
        </Box>
        <List>
          {boardList.map((data) => (
            <Link key={data.idx} href={`/cmsc01010002/${data.idx}`} passHref>
              <ListItem button component="a">
                <Grid container spacing={0}>
                  <Grid item xs={1}>
                    <Box borderRight={1} borderColor="grey.300">
                      <ListItemText primary={data.idx} sx={{ textAlign: 'center' }} />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box borderRight={1} borderColor="grey.300">
                      <ListItemText primary={data.title} sx={{ textAlign: 'left' }} />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box borderRight={1} borderColor="grey.300">
                      <ListItemText primary={data.contents} sx={{ textAlign: 'left' }} />
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <ListItemText primary={data.updDt} sx={{ textAlign: 'left' }} />
                  </Grid>
                </Grid>
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Box>
  );
}