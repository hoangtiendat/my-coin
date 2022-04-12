import React, { Component } from 'react';
import './index.css';
import Stepper from 'react-stepper-horizontal';
import SelectFile from './selectFile';
import EnterPassword from './enterPassword';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


class AccessWallet extends Component {
    constructor() {
        super();
        this.state = {
            steps: [{
                title: 'STEP 1. Select File',
                conponent: <SelectFile />,
                onClick: (e) => {
                    e.preventDefault()
                    console.log('onClick', 1)
                }
            }, {
                title: 'STEP 2. Enter Password',
                conponent: <EnterPassword />,
                onClick: (e) => {
                    e.preventDefault()
                    console.log('onClick', 2)
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
                    <Stepper steps={steps} activeStep={currentStep} />
                    {steps[currentStep].conponent}
                    {currentStep === 0 && <Button
                        sx={{ display: 'flex', width: 160, padding: 2, textAlign: 'center', margin: '0 auto', marginTop: 3 }}
                        variant="outlined" onClick={() => this.onClickNext(1)}>
                        Select File
                    </Button>}
                    {currentStep === 1 && <Box sx={{ display: 'flex', justifyContent: 'center' }}><Button
                        sx={{ padding: 2, marginTop: 3 }}
                        variant="outlined" onClick={() => this.onClickNext(-1)}>
                        Back
                    </Button>
                        <Button
                            sx={{ padding: 2, marginLeft: 1, marginTop: 3 }}
                            variant="contained" onClick={() => this.onClickNext(0)}>
                            Access Wallet
                        </Button></Box>}
                </div>

            </div>
        );
    }
}

export default AccessWallet;