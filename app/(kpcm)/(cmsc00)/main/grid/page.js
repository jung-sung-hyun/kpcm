"use client";
import { Container, Typography, Grid } from '@mui/material';
import SearchConditions from '../../../../../components/searchCondition';
import GridExample from '../../../../../components/grid';

const DashboardPage = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
                목록 그리드
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SearchConditions />
                </Grid>
                <Grid item xs={12}>
                    <GridExample />
                </Grid>
            </Grid>
        </Container>
    );
};

export default DashboardPage;