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


const PasswordForm = () => {
	const [values, setValues] = React.useState({
		password: '',
		errPasssword: "",
		showPassword: false,
		repassword: '',
		errRepasssword: "",
		showRepassword: false,
		isValid: false,
	});

	const handleChange = (prop) => (event) => {
		if (prop === "password") {
			if (event.target.value.length < 8) {
				setValues({ ...values, [prop]: event.target.value, errPasssword: "Your password must be at least 8 characters."});
			} else {
				setValues({ ...values, [prop]: event.target.value,  errPasssword: "" });
			}
		} else {
			if (event.target.value != values.password) {
				setValues({ ...values, [prop]: event.target.value, errRepasssword: "Passwords don't match."});
			} else {
				setValues({ ...values, [prop]: event.target.value,  errRepasssword: "", isValid: true });
			}
		}
		
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
				STEP 1.
			</Typography>
			<Typography variant="h5" component="div">
				Create password
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 5, alignItems: 'center' }}>
				<FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
						label="Password"
					/>
					<FormHelperText id="my-helper-password" error={true}>{values.errPasssword}</FormHelperText>
				</FormControl>
				<FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-repassword">Confirm Password</InputLabel>
					<OutlinedInput
						id="outlined-adornment-repassword"
						type={values.showRepassword ? 'text' : 'password'}
						value={values.repassword}
						onChange={handleChange('repassword')}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle repassword visibility"
									onClick={handleClickShowRepassword}
									// onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{values.showRepassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Confirm Password"
					/>
					<FormHelperText id="my-helper-repassword" error={true}>{values.errRepasssword}</FormHelperText>
				</FormControl>
			</Box>
		</div>
		// <form onSubmit={this.handleSubmit}>
		// 	<div className='subTitle'>STEP 1.</div>
		// 	<div className='headLine'>Create Password</div>
		// 	<div>
		// 	<label>
		// 		Password:
		// 		<input type="password" value={this.state.value} onChange={this.handleChange} />
		// 	</label>
		// 	</div>

		// 	<label>
		// 		Confirm Password:
		// 		<input type="password" value={this.state.value} onChange={this.handleChange} />
		// 	</label>
		// </form>
	);
};
export default PasswordForm;