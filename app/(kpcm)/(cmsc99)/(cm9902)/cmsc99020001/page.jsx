"use client";
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
    DataGrid,
    GridFooterContainer,
    GridPagination
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";

// from https://stackoverflow.com/questions/64981601/change-checkbox-to-radio-button-material-ui-data-grid

export default function Cmsc99020000({ searchParams }) {
    const [scoreSum, setScoreSum] = useState(0);
    const [scoreAvg, setScoreAvg] = useState(0);

    const [rows, setRows] = useState([
        { id: 1, subject: '국어', score: "90" },
        { id: 2, subject: '영어', score: "80" },
        { id: 3, subject: '수학', score: "70" },
        { id: 4, subject: '사회', score: "85" },
        { id: 5, subject: '과학', score: "75" },
    ]);
    
    const columns = [
        { field: 'id', headerName: '순번', width: 90 },
        { field: 'subject', headerName: '과목', width: 350, editable: true },
        { field: 'score', headerName: '점수', width: 350, editable: true },
    ];
    
    // export function CustomFooterArea() {
    //     const apiRef = useGridApiContext();
    //     const page = useGridSelector(apiRef, gridPageSelector);
    //     const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    
    //     return (
    //         <Pagination
    //             color="primary"
    //             count={pageCount}
    //             page={page + 1}
    //             onChange={(event, value) => apiRef.current.setPage(value - 1)}
    //         />
    //     );
    // }

    const CustomFooterArea = () => {
        return (
            <Box>
                점수 합계: {scoreSum}, 점수 평균: {scoreAvg}
            </Box>
        );
    }
    
    const CustomFooter = () => {
        return (
            <GridFooterContainer>
                <CustomFooterArea />
                <GridPagination />
            </GridFooterContainer>
        );
    }

    useEffect(() => {
        console.log("useEffect");

        let sum = rows.reduce((prev, current) => prev + Number(current.score), 0);
        setScoreSum(sum);
        setScoreAvg(sum/rows.length);
        console.log("sum:", sum);
    }, [rows]);
    
    const handleProcessRowUpdate = (updatedRow, originalRow) => {
        console.log("handleProcessRowUpdate");

        // Find the index of the row that was edited
        const rowIndex = rows.findIndex((row) => row.id === updatedRow.id);
    
        // Replace the old row with the updated row
        const updatedRows = [...rows];
        updatedRows[rowIndex] = updatedRow;
    
        // Update the state with the new rows
        setRows(updatedRows);
    
        // Return the updated row to update the internal state of the DataGrid
        return updatedRow;
      };

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}

                processRowUpdate={handleProcessRowUpdate}
                slots={{ footer: CustomFooter }}
            />
        </>
    );
}