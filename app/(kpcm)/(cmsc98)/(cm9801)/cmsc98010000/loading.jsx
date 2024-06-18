
import { Box, CircularProgress } from '@mui/material';

const Loading = ({ open }) => {
	return (
		<div>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<CircularProgress />
			</Box>
		</div>
	);
};

export default Loading;