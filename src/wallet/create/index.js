import React, { Component } from 'react';
import './index.css';
import Stepper from 'react-stepper-horizontal';
import PasswordForm from './createPassword';
import DowloadFile from './dowloadFile';
import WellDone from './wellDone';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


class CreateWallet extends Component {
    constructor() {
        super();
        this.state = {
          steps: [{
            title: 'STEP 1. Create password',
            conponent: <PasswordForm/>,
            onClick: (e) => {
              e.preventDefault()
              console.log('onClick', 1)
            }
          }, {
            title: 'STEP 2. Download keystore file',
            conponent: <DowloadFile />,
            button: <div>
                    <Button sx={{ display: 'flex', width: 160, padding: 2, textAlign: 'center', margin: '0 auto', marginTop: 3 }} variant="contained" onClick={this.onClickNext}>Create Wallet</Button>
                    <Button sx={{ display: 'flex', width: 160, padding: 2, textAlign: 'center', margin: '0 auto', marginTop: 3 }} variant="contained" onClick={this.onClickNext}>Create Wallet</Button>
                </div>,
            onClick: (e) => {
              e.preventDefault()
              console.log('onClick', 2)
            }
          }, {
            title: 'STEP 3. Well done',
            conponent: <WellDone />,
            onClick: (e) => {
              e.preventDefault()
              console.log('onClick', 3)
            }
          }],
          currentStep: 0,
        };
        this.onClickNext = this.onClickNext.bind(this);
    }
    
    onClickNext(value) {
        const { steps, currentStep } = this.state;
        this.setState({
          currentStep: currentStep + value,
        });
    }


    render() {
        const { steps, currentStep } = this.state;
        const buttonStyle = { background: '#E0E0E0', width: 200, padding: 16, textAlign: 'center', margin: '0 auto', marginTop: 32 };

        return (
            <div className='create'>
                <div className='createForm'>
                    <div className="titlePrimary">Create Wallet with Keystore File</div>
                    <Stepper steps={ steps } activeStep={ currentStep } />
                    {steps[currentStep].conponent}
                    {currentStep === 0 && <Button 
                                        sx={{ display: 'flex', width: 160, padding: 2, textAlign: 'center', margin: '0 auto', marginTop: 3 }} 
                                        variant="contained" onClick={() => this.onClickNext(1)}>
                                            Create Wallet
                                        </Button> }
                    {currentStep === 1 && <Box sx={{ display: 'flex', justifyContent: 'center'}}><Button 
                                        sx={{ padding: 2, marginTop: 3 }} 
                                        variant="outlined" onClick={() => this.onClickNext(-1)}>
                                            Back
                                        </Button>
                                        <Button 
                                        sx={{  padding: 2, marginLeft: 1, marginTop: 3 }} 
                                        variant="contained" onClick={() => this.onClickNext(1)}>
                                            Acknowledge & Download
                                        </Button></Box> }
                    {currentStep === 2 && <Box sx={{ display: 'flex', justifyContent: 'center'}}><Button 
                                        sx={{  padding: 2, marginTop: 3 }} 
                                        variant="outlined" onClick={() => this.onClickNext(-2)}>
                                            Create Another Wallet
                                        </Button>
                                        <Button 
                                        sx={{padding: 2, marginLeft: 1, marginTop: 3 }} 
                                        variant="contained" onClick={() => this.onClickNext(-2)}>
                                            Access Wallet
                                        </Button></Box> }
              </div>
                
            </div>
        );
    }
}

export default CreateWallet;