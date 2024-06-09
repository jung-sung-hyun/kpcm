"use client"
import {useState} from 'react';
import {
  Button
 ,Dialog
 ,DialogActions
 ,DialogContent
 ,DialogContentText
 ,DialogTitle
 ,MenuItem
 ,Select
 ,FormControl
 ,InputLabel
} from '@mui/material';
import ComboBox from './components/ComboBox'; // 경로는 실제 프로젝트의 구조에 따라 조정

export default function AlertDialog() {
    //콤보박스
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    //모달 다이얼 로그 관련 소스
    const [open, setOpen] = useState(false);
    function handleClickOpen()  {
      setOpen(true);
    };
    function handleClose(){
      setOpen(false);
    };
    //콤보박스 옵션
    const options = [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' }
    ];

    const handleComboBoxChange = (selectedValue) => {
      console.log('선택된 값:', selectedValue);
    };
    return (
      <>

        <div>
        <p>@@@콤보박스@@@</p>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select an option</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedValue}
              label="Select an option"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'option1'}>Option 1</MenuItem>
              <MenuItem value={'option2'}>Option 2</MenuItem>
              <MenuItem value={'option3'}>Option 3</MenuItem>
            </Select>
          </FormControl>
          <div>
            Selected value: {selectedValue}
          </div>
          <p></p>
        </div>

        <div>
        <p>@@모달 메세지창@@</p>
          <Button variant="outlined" onClick={handleClickOpen}>
            Open alert dialog
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"저장 하시겠습니까?====================================>>"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                메세지 코드 에제 입니다.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={handleClose} autoFocus>
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
        <ComboBox
          label="선택하세요"
          options={options}
          defaultValue="option1"
          onChange={handleComboBoxChange}
        />
        </div>

        </>
      );
}
