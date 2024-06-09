import { Backdrop, CircularProgress } from '@mui/material';

const Loading = ({ open }) => {
	return (
		<Backdrop style={{ zIndex: 1300, color: '#fff' }} open={open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default Loading;