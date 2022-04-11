import * as React from 'react';
import './index.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyImg from '../../img/keystore.png';

const WellDone = () => {


	return (
		<div>
			<Typography sx={{ fontSize: 14, fontWeight: 700 }} color="text.secondary" gutterBottom>
				STEP 3.
			</Typography>
			<Typography variant="h5" component="div">
				You are done!
			</Typography>
			<Box sx={{ display: 'flex', marginTop: 1}}>
				<Typography component="div" >
					You are now ready to take advantage of all <br />
					that Ethereum has to offer! Access with <br />
					keystore file should only be used in an offline <br />
					setting.
				</Typography>
				<Box
					component="img"
					sx={{
						height: 158,
						width: 250,
						maxHeight: { xs: 233, md: 167 },
						maxWidth: { xs: 350, md: 250 },
					}}
					alt="The house from the offer."
					src={KeyImg}
				/>
			</Box>
		</div>

	);
};
export default WellDone;