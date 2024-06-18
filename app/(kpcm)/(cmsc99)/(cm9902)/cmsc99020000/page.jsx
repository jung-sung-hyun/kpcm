"use client";
import { useState } from 'react';
import { Radio } from '@mui/material';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// from https://stackoverflow.com/questions/64981601/change-checkbox-to-radio-button-material-ui-data-grid

const rows = [
    { id: 1, codeId: 'CM.ER.01', codeName: "SELECT ERROR", explanation: '조회시 오류가 발생하였습니다.' },
    { id: 2, codeId: 'CM.ER.02', codeName: "INSERT ERROR", explanation: '입력시 오류가 발생하였습니다.' },
    { id: 3, codeId: 'CM.ER.03', codeName: "UPDATE ERROR", explanation: '수정시 오류가 발생하였습니다.' },
    { id: 4, codeId: 'CM.ER.04', codeName: "DELETE ERROR", explanation: '삭제시 오류가 발생하였습니다.' },
];

let radioChecked = [rows[0].id];

const columns = [
    {
        field: 'check',
        headerName: ' ',
        width: 40,
        renderCell: (cellValues) => {
            return (
                <Radio
                    checked={radioChecked[0] === cellValues.id}
                    value={cellValues.id}
                    name="radioCmsc99020000"
                    size="small"
                />
            )
        }
    },
    { field: 'id', headerName: '순번', width: 90 },
    { field: 'codeId', headerName: '오류메시지 코드아이디', width: 200, editable: true },
    { field: 'codeName', headerName: '오류메시지 코드명', width: 200, editable: true },
    { field: 'explanation', headerName: '설명', width: 350, editable: true },
];

export default function Cmsc99020000({ searchParams }) {
    const [selectionModel, setSelectionModel] = useState(radioChecked);
    radioChecked = selectionModel;

    const selectedRow = rows.filter((item) => {
        return item.id === selectionModel[0];
    })

    return (
        <>
            <Typography id="modal-title" variant="h6" component="h2">
                선택된 정보 : [{selectedRow[0].codeId}] {selectedRow[0].codeName}
            </Typography>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                
                selectionModel={selectionModel}
                onRowSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
            />
        </>
    );
}