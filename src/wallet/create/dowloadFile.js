import * as React from 'react';
import './index.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import SendSvg from '../../img/send.svg';
import ShareSvg from '../../img/share.svg';
import BackupSvg from '../../img/backup.svg';

const DowloadFile = () => {
	const [values, setValues] = React.useState({
		password: '',
		showPassword: false,
		repassword: '',
		showRepassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};
	const handleClickShowRepassword = () => {
		setValues({
			...values,
			showRepassword: !values.showRepassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<div>
			<Typography sx={{ fontSize: 14, fontWeight: 700 }} color="text.secondary" gutterBottom>
				STEP 2.
			</Typography>
			<Typography variant="h5" component="div">
				Download keystore file
			</Typography>
			<Typography component="div" gutterBottom>
				Important things to know before downloading your keystore file.
			</Typography>
			<Box sx={{ flexGrow: 1, marginTop: 5 }}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Card variant="outlined" sx={{ maxWidth: 170, minHeight: 200,  borderColor: 'success.main', padding: 1 }}>
							<CardActionArea sx={{ display: 'flex', flexDirection: 'column'}}>
								<CardMedia
									component="img"
									sx={{ width: 70, height: 70, display: 'flex', alignItems: 'center' }}
									image={SendSvg}
									alt="green iguana"
								/>
								<CardContent>
									<Typography sx={{ fontSize: 14, fontWeight: 700 }} variant="h5" component="div">
										Don't lose it
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Be careful, it can not be recovered if you lose it.
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card variant="outlined" sx={{ maxWidth: 170, minHeight: 200,  borderColor: 'success.main', padding: 1 }}>
							<CardActionArea sx={{ display: 'flex', flexDirection: 'column'}}>
								<CardMedia
									component="img"
									sx={{ width: 70, height: 70, display: 'flex', alignItems: 'center' }}
									image={ShareSvg}
									alt="green iguana"
								/>
								<CardContent>
									<Typography sx={{ fontSize: 14, fontWeight: 700 }} variant="h5" component="div">
										Don't share it
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Your funds will be stolen if you use this file on a malicious phishing site.
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card variant="outlined" sx={{ maxWidth: 170, minHeight: 200,  borderColor: 'success.main', padding: 1 }}>
							<CardActionArea sx={{ display: 'flex', flexDirection: 'column'}}>
								<CardMedia
									component="img"
									sx={{ width: 70, height: 70, display: 'flex', alignItems: 'center' }}
									image={BackupSvg}
									alt="green iguana"
								/>
								<CardContent>
									<Typography sx={{ fontSize: 14, fontWeight: 700 }} variant="h5" component="div">
										Make a backup
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Secure it like the millions of dollars it may one day be worth.
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</div>

	);
};
export default DowloadFile;