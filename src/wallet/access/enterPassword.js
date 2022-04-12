import * as React from 'react';
import './index.css';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';


const EnterPassword = () => {
	const [values, setValues] = React.useState({
		password: '',
		errPasssword: "",
		showPassword: false,
		isValid: false,
	});

	const handleChange = (prop) => (event) => {
		if (event.target.value.length < 8) {
			setValues({ ...values, [prop]: event.target.value, errPasssword: "Your password must be at least 8 characters."});
		} else {
			setValues({ ...values, [prop]: event.target.value,  errPasssword: "" });
		}
		
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
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
				Enter Password
			</Typography>
			<Typography component="div" gutterBottom>
				Enter your password to unlock your wallet.
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 5, alignItems: 'center' }}>
				<FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">Enter Password</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						type={values.showPassword ? 'text' : 'password'}
						value={values.password}
						onChange={handleChange('password')}
						helperText="Incorrect entry."
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{values.showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Enter Password"
					/>
					<FormHelperText id="my-helper-password" error={true}>{values.errPasssword}</FormHelperText>
				</FormControl>
			</Box>
		</div>
	);
};
export default EnterPassword;