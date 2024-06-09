"use client";
import { useEffect, useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, Typography, Modal  } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomTextField from '@components/TextFieldComponent/CustomTextField';
import CustomPopover from '@components/PopoverComponent/CustomPopover';
import CustomContainer from '@components/ContainerComponent/CustomContainer';
import CustomBox from '@components/BoxComponent/CustomBox';
import CustomButton from '@components/ButtonComponent/CustomButton';
import CustomModal from '@components/ModalComponent/CustomModal';
import CustomAutocomplete from '@components/AutocompleteComponent/CustomAutocomplete';

// 공통코드 불러오기
import { getCommonCode } from '../../../../../utils/common';

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

let options = [];

export default function Sys28010({ searchParams }) {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    const fetchCommonCode = async () => {
      /*
      try {
        const data = await getCommonCode([
          { codeCd: 'A01'},
          { codeCd: 'B01'}
        ]);

        console.log("data: ", data);

        const A01Data = data.A01;

        options = Object.keys(A01Data).map((key, index) => ({
          label: A01Data[key],
          id: index + 1
        }));

        setDataList(options);

        console.log("options: ", options);
      } catch (error) {
        console.error('Error fetching common code:', error);
      }
      */
    };

    fetchCommonCode();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const [selectedSampleCode, setSelectedSampleCode] = useState(null);

  const handleCodeChange = (event, newValue) => {
    console.log("newValue: ", newValue);
    setSelectedSampleCode(newValue);
  };

  const handleOptions = (event, newValue) => {
    console.log("newValue: ", newValue);
    setSelectedSampleCode(newValue);
  };

	const menuName = searchParams.label;
  const [age, setAge] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
	const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
	const [openModal, setOpenModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

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

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleCityChange = (event, newValue) => {
    setSelectedCity(newValue);
  };

  const handleSearch = () => {
    console.log('Search clicked');
	};

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

      <CustomModal
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
      </CustomModal>
       <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1.7rem', // Adjust font size as needed
          fontWeight: 500,  // Optional: Change font weight
        }}
      >
				{ menuName}
      </Typography>
      <Box component="form" sx={{ mb: 4 }}>
        <Grid CustomContainer spacing={2}>
          <Grid item xs={10} sm={4} md={2}>
            <CustomTextField label="오류메시지 코드아이디" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextField
              label="오류메시지 코드명"
              variant="outlined"
              fullWidth
              value={age}
              onChange={handleAgeChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              options={dataList}
              value={selectedSampleCode}
              onChange={handleCodeChange}
              label="오토컴플릿 샘플"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Select
              label="Gender"
              value={age}
              onChange={handleAgeChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">
                <em>오류코드 셀렉트박스</em>
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomButton
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
            >
              조회
						</CustomButton>
					</Grid>
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