import * as React from 'react';
import './index.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import selectFileImg from '../../img/selectFile.jpg';

const SelectFile = () => {


	return (
		<div>
			<Typography sx={{ fontSize: 14, fontWeight: 700 }} color="text.secondary" gutterBottom>
				STEP 1.
			</Typography>
			<Typography variant="h5" component="div">
				Select your Keystore File
			</Typography>
			<Box sx={{ display: 'flex', marginTop: 1}}>
				<Typography component="div" >
					Please select keystore file that unlocks your wallet.
				</Typography>
				<Box
					component="img"
					sx={{
						height: 158,
						width: 250,
						maxHeight: { xs: 233, md: 167 },
						maxWidth: { xs: 350, md: 250 },
					}}
					alt="Select file"
					src={selectFileImg}
				/>
			</Box>
		</div>

	);
};
export default SelectFile;