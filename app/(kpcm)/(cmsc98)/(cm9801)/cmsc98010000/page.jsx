"use client";
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Grid, Typography } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import CustomTextField from '@components/TextFieldComponent/CustomTextField';
import CustomContainer from '@components/ContainerComponent/CustomContainer';
import CustomButton from '@components/ButtonComponent/CustomButton';
import { cm98010000CodeNm, cm98010000DataGrid, cm98010000RowCount } from '../../../../common/state';
import { fetcher } from '../../../../../apis/api';
import useAlert from '@hooks/useAlert';
import CustomMessageModal from '@components/ModalComponent/CustomMessageModal';

/**
 * @description: 오류메시지코드 관리를 위한 화면.
 * @function Csmc98010000
 * @param {string} msgCd - 선택 항목의 레이블
 * @returns
 * 변경이 있을 때에는 수정 이력에 변경일자와 변경자, 그리고 변경사유를 기록하여 관리가 되도록 한다.
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.05.15       정성현                                  최초작성
 *   2024.06.13       박대철                     컴포넌트 유효성체크 공통화 작업
 * ========================================================================================================
 */

// 그리드 header
const columns = [
  { field: 'rnum', headerName: '순번', width: 90, editable: false, align: 'left' },
  { field: 'regStatus', headerName: '등록상태', width: 100, editable: false, align: 'left' },
  { field: 'msgCd', headerName: '오류코드', width: 200, editable: true, align: 'left' },
  { field: 'msgCn', headerName: '오류메시지', width: 350, editable: true, align: 'left' },
];

// 그리드 toolbar
const CustomToolbar = ({ rowCount, handleAddRow }) => {
  return (
    <GridToolbarContainer>
      <div style={{ flexGrow: 1 }} />
      <div>
        <CustomButton
          variant="outlined"
          color="primary"
          fullWidth
          size="small"
          onClick={handleAddRow}
        >
          행추가
        </CustomButton>
      </div>
      <div>총 {rowCount ? rowCount : 0} 개의 행</div>
    </GridToolbarContainer>
  );
};

const CustomFooter = ({ handleApply, handleReset }) => {
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <CustomButton
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleReset}
      >
        초기화
      </CustomButton>
      <CustomButton
        variant="contained"
        color="primary"
        size="large"
        onClick={handleApply}
      >
        적용
      </CustomButton>
    </Box>
  );
};

export default function Csmc98010000({ searchParams }) {
  // 상태관리
  const [dataList, setDataList] = useRecoilState(cm98010000DataGrid);
  const [codeNm, setCodeNm] = useRecoilState(cm98010000CodeNm);
  const [rowCount, setRowCount] = useRecoilState(cm98010000RowCount);
  const {
    openAlert,
    alertMessage,
    handleOpenAlert,
    handleCloseAlert,
    setOpenAlert,
  } = useAlert();

  // 메뉴명 가져오기
  const menuName = searchParams.label;

  // react hook : useEffect
  useEffect(() => {
    if (codeNm === '') {
      setCodeNm(null);
    }
  }, [codeNm, setCodeNm]);

  // 오류코드 인풋박스 변경 이벤트
  const changeErrInput = (event) => {
    console.log('event value: ', event.target.value);
    setCodeNm(event.target.value);
  };

  // 조회 버튼 클릭 이벤트
  const handleSearch = async () => {
    // API 호출 시 필요한 URL과 파라미터 정의
    const url = 'cm/cmsc98010000/select00';
    const param = {
      msgCd: codeNm,
    };
    // fetcher 함수 호출
    try {
      const data = await fetcher(url, param);
      const updatedDataList = data.dataList.map((row) => ({
        ...row,
        regStatus: '등록',
      }));
      setDataList(updatedDataList);
      setRowCount(updatedDataList.length);
      console.log('그리드데이터: ', dataList);
    } catch (error) {
      console.error('API 호출 중 오류 발생: ', error);
    }
  };

  // 행 추가 버튼 클릭 이벤트
  const handleAddRow = () => {
    const highestRnum = Math.max(0, ...dataList.map((row) => row.rnum));
    const newRow = {
      rnum: highestRnum + 1,
      regStatus: '추가',
      msgCd: '',
      msgCn: '',
    };
    setDataList((prevDataList) => [...prevDataList, newRow]);
    setRowCount((prevRowCount) => prevRowCount + 1);
  };

  // 적용 버튼 클릭 이벤트
  const handleApply = async () => {
    const hasOnlyRegisteredItems = dataList.every((row) => row.regStatus === '등록');
    if (hasOnlyRegisteredItems) {
      alert('추가 또는 수정할 행이 없습니다.');
      return;
    }

    handleOpenAlert('적용하시겠습니까?');
  };

  // alert 확인버튼 클릭 이벤트
  const handleConfirmAlert = async () => {
    handleCloseAlert();
    console.log('dataList', dataList);
    const applicableDataList = dataList.filter((row) => row.regStatus !== '등록');
    console.log('applicableDataList', applicableDataList);
    // API 호출 시 필요한 URL과 파라미터 정의
    const url = 'cm/cmsc98010000/exec00';
    const param = {
      list: applicableDataList,
    };

    // fetcher 함수 호출
    try {
      const data = await fetcher(url, param);
      const updatedDataList = data.dataList.map((row) => ({
        ...row,
        regStatus: '등록',
      }));
      setDataList(updatedDataList);
      setRowCount(updatedDataList.length);
      console.log('그리드데이터: ', dataList);
    } catch (error) {
      console.error('API 호출 중 오류 발생: ', error);
    }
  };

  // 초기화 버튼 클릭 이벤트
  const handleReset = () => {
    setCodeNm('');
    setDataList([]);
  };

  // 셀 편집 이벤트 핸들러
  const handleEditCellChange = ({ id, field, value }) => {
    setDataList((prevDataList) =>
      prevDataList.map((row) => (row.rnum === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <CustomContainer>
      {/* 메뉴명 */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1.7rem',
          fontWeight: 500,
        }}
      >
        {menuName}
      </Typography>

      {/* 조회조건 */}
      <Box component="form" sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextField
              label="오류코드(선택)"
              value={codeNm}
              variant="outlined"
              onChange={changeErrInput}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={9} container justifyContent="flex-end" spacing={2}>
            <Grid item></Grid>
            <Grid item>
              <CustomButton variant="contained" color="primary" fullWidth size="large" onClick={handleSearch}>
                조회
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* 그리드 */}
      <Box sx={{ height: '90%', width: '100%' }}>
        <DataGrid
          rows={dataList}
          getRowId={(row) => row.rnum}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
          pagination={false}
          components={{
            Toolbar: (props) => <CustomToolbar {...props} rowCount={rowCount} handleAddRow={handleAddRow} />,
          }}
          localeText={{
            noRowsLabel: '조회된 데이터가 없습니다.',
          }}
          processRowUpdate={(newRow, oldRow) => {
            const updatedDataList = dataList.map((row) =>
              row.rnum === newRow.rnum ? { ...row, ...newRow } : row
            );
            setDataList(updatedDataList);
            return newRow;
          }}
        />
        <CustomFooter handleReset={handleReset} handleApply={handleApply} />
      </Box>
      <CustomMessageModal
        open={openAlert}
        setOpen={setOpenAlert}
        message={alertMessage}
        onConfirm={handleConfirmAlert}
        showCancelButton={true}
      />
    </CustomContainer>
  );
}