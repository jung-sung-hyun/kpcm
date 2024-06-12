"use client";
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Grid, MenuItem, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomTextField from '@components/TextFieldComponent/CustomTextField';
import CustomPopover from '@components/PopoverComponent/CustomPopover';
import CustomContainer from '@components/ContainerComponent/CustomContainer';
import CustomBox from '@components/BoxComponent/CustomBox';
import CustomButton from '@components/ButtonComponent/CustomButton';
import CustomPageModal from '@components/ModalComponent/CustomPageModal';
import CustomSelect from '@components/SelectComponent/CustomSelect';
import CustomDatePicker from '@components/DatePickerComponent/CustomDatePicker';
import { codeNmState } from '../../../../common/state';
import dayjs from 'dayjs';

const columns = [
  { field: 'id', headerName: '순번', width: 90 },
  { field: 'codeId', headerName: '오류메시지 코드아이디', width: 200, editable: true },
  { field: 'codeName', headerName: '오류메시지 코드명', width: 200, editable: true },
  { field: 'explanation', headerName: '설명', width: 350, editable: true },
];

const rows = [
  { id: 1, name: 'John Doe', age: 25, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 30, city: 'Los Angeles' },
  { id: 3, name: 'Michael Brown', age: 35, city: 'Chicago' },
];

export default function Sys28010({ searchParams }) {
  const [dataList, setDataList] = useState([]);
  const [selectedSampleCode, setSelectedSampleCode] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [codeNm, setCodeNm] = useRecoilState(codeNmState);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2023-01-01');

  const handleDateChange = (newDate) => {
    console.log('Selected date:', newDate.format('YYYY-MM-DD'));
    setSelectedDate(newDate.format('YYYY-MM-DD'));
  };
  const menuName = searchParams.label;

  const handleInputChange = (event) => {
    console.log("event value: ", event.target.value);
    setCodeNm(event.target.value);
    setError(false);
    setHelperText('');
  };

  useEffect(() => {
    if (codeNm === '') {
      setCodeNm(null);
    }
  }, [codeNm, setCodeNm]);

  const handleCodeChange = (event, newValue) => {
    console.log("newValue: ", newValue);
    setSelectedSampleCode(newValue);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSearch = () => {
    console.log("codeNm: ", codeNm);
    if (!codeNm) {
      setError(true);
      setHelperText('오류메시지 코드명을 입력하세요.');
    } else {
      setError(false);
      setHelperText('');
      // 여기에서 조회 로직을 추가합니다.
    }
  };

  const selectOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  return (
    <CustomContainer>
      <CustomPopover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
      >
        <CustomBox>
          <Typography variant="h6" component="h2">
            오류메시지 코드 변경
          </Typography>
          <CustomTextField label="Input 1" variant="outlined" />
          <CustomTextField label="Input 2" variant="outlined" />
          <CustomTextField label="Input 3" variant="outlined" />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <CustomButton variant="contained" color="primary">
              적용
            </CustomButton>
            <CustomButton variant="outlined" color="secondary" onClick={handlePopoverClose}>
              취소
            </CustomButton>
          </Box>
        </CustomBox>
      </CustomPopover>

      <CustomPageModal
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            오류메시지 코드 등록
          </Typography>
          <CustomTextField label="오류메시지 코드아이디" variant="outlined" />
          <CustomTextField label="오류메시지 코드명" variant="outlined" />
          <CustomTextField label="설명" variant="outlined" />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <CustomButton variant="contained" color="primary">
              등록
            </CustomButton>
            <CustomButton variant="outlined" color="secondary" onClick={handleCloseModal}>
              취소
            </CustomButton>
          </Box>
        </Box>
      </CustomPageModal>
      
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1.7rem', // Adjust font size as needed
          fontWeight: 500,  // Optional: Change font weight
        }}
      >
        {menuName}
      </Typography>
      <Box component="form" sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label="조회시작일자"
              defaultValue="2023-01-01"
              controlled={true}
              disabled={false}
              minDate="1901-01-01"
              maxDate="2030-12-31"
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomDatePicker
              label="조회종료일자"
              defaultValue="2023-01-01"
              controlled={true}
              disabled={false}
              minDate="1901-01-01"
              maxDate="2030-12-31"
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextField
              label="오류메시지 코드명"
              value={codeNm}
              variant="outlined"
              error={error}
              helperText={helperText}
              onChange={handleInputChange}
            />
          </Grid>
          {/* autocomplete 사용안한다고함 (24.06.10 그룹장님)
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              options={dataList}
              value={selectedSampleCode}
              onChange={handleCodeChange}
              label="오토컴플릿 샘플"
            />
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <CustomSelect
              label="오류메시지 코드명"
              value={selectedSampleCode}
              onChange={handleCodeChange}
              options={selectOptions}
              displayEmpty
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
             <CustomButton
                variant="contained"
                color="primary"
                fullWidth
                size="medium"
                onClick={handleSearch}
                disabled={isDisabled}
              >
              조회
            </CustomButton>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomButton
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleOpenModal}
            >
              등록
            </CustomButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomButton
              variant="contained"
              color="warning"
              fullWidth
              onClick={handlePopoverOpen}
            >
              변경
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </CustomContainer>
  );
}