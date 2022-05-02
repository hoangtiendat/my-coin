import React, { useState } from 'react';
import './index.css';
import Stepper from 'react-stepper-horizontal';
import PasswordForm from './createPassword';
import DowloadFile from './dowloadFile';
import WellDone from './wellDone';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import keythereum from 'keythereum';


const CreateWallet = () => {
    const [step, setStep] = useState(0);
    const [password, setPassword] = useState('123456');
    // const handleChange = (event) => {
    //     const updatedPassword = event.target.value;
    //     setPassword(updatedPassword);
    // }

    var params = { keyBytes: 32, ivBytes: 16 };

    // synchronous
    var dk = keythereum.create(params);

    var options = {
        kdf: "pbkdf2",
        cipher: "aes-128-ctr",
        kdfparams: {
          c: 262144,
          dklen: 32,
          prf: "hmac-sha256"
        }
      };
      
      // synchronous
      var keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options);

    const onClickNext = (value) => {
        // setStep(step => step + value);
        keythereum.exportToFile(keyObject);
    }

    const steps = [{
        title: 'STEP 1. Create password',
        conponent: <PasswordForm password={password} setPassword={setPassword} />,
        onClick: (e) => {
            e.preventDefault()
            console.log('onClick', 1)
        }
    }, {
        title: 'STEP 2. Download keystore file',
        conponent: <DowloadFile />,
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
    }];

    return (
        <div className='create'>
            <div className='createForm'>
                <div className="titlePrimary">Create Wallet with Keystore File</div>
                <Stepper steps={steps} activeStep={step} />
                {steps[step].conponent}
                {step === 0 && <Button
                    sx={{ display: 'flex', width: 160, padding: 2, textAlign: 'center', margin: '0 auto', marginTop: 3 }}
                    variant="contained" onClick={() => onClickNext(1)}>
                    Create Wallet
                </Button>}
                {step === 1 && <Box sx={{ display: 'flex', justifyContent: 'center' }}><Button
                    sx={{ padding: 2, marginTop: 3 }}
                    variant="outlined" onClick={() => onClickNext(-1)}>
                    Back
                </Button>
                    <Button
                        sx={{ padding: 2, marginLeft: 1, marginTop: 3 }}
                        variant="contained" onClick={() => onClickNext(1)}>
                        Acknowledge & Download
                    </Button></Box>}
                {step === 2 && <Box sx={{ display: 'flex', justifyContent: 'center' }}><Button
                    sx={{ padding: 2, marginTop: 3 }}
                    variant="outlined" onClick={() => onClickNext(-2)}>
                    Create Another Wallet
                </Button>
                    <Button
                        sx={{ padding: 2, marginLeft: 1, marginTop: 3 }}
                        variant="contained" onClick={() => onClickNext(-2)}>
                        Access Wallet
                    </Button></Box>}
            </div>

        </div>
    );
}

export default CreateWallet;