import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { LoggerBtn, Input, Messenger } from '../../components/Forms';
import API from '../../utils/API';
import Auth from '../../Auth'

export default function SignIn() {

    let history = useHistory();
    const [credentials, setCredentials] = useState({}),
        [errorMsg, setErrorMsg] = useState(''),

        onInputChange = e => {
            const { name, value } = e.target;
            setCredentials({ ...credentials, [name]: value })
    },

        authorize = (email) => {
            Auth.login(() => {
                if(email == "doctor@hospital.com"){
                    history.push("/doctor") 
                }else{
                history.push("/patients")
                }

            })
    },

        timeoutMsg = () => {
            const clearMsg = () => setErrorMsg('')
            setTimeout(clearMsg, 3500);
    },

        handleSubmit = e => {
            e.preventDefault();
            e.target.reset();

            API.login(credentials)
                .then(({ data }) => {
                    if (data.status === 'success') {
                        authorize( data.email)
                        localStorage.setItem('userEmail', data.email)
                    }
                }).catch( err => {
                    setErrorMsg('Login failed.  Please try again.')
                    timeoutMsg()
                })
    }

    return (
        <div
            style={background}
        >

        <Container>
            <Row classes="justify-content-center">
                <Col size={'md-12'} classes='box-shadow sign' >
                    <Row>
                        <div className={'mt-5'}>
                            <h5 style={text}>
                                <img 
                                style={logo} 
                                src={require('../../assets/img/Logo.png')} 
                                alt={'Logo'} />
                                Log-in to your account
                            </h5>
                        </div>
                    </Row> 

                    <div className="text-center err-msg">
                    <Messenger msg={errorMsg} color='#d9534f' />
                    </div>

                    <Row >
                        <form onSubmit={handleSubmit} className={'card-body'}>
                            <div className={'form-group usr-inpt'}>
                                <label>Email:</label>
                                <span className="fa fa-user" />
                                <Input onChange={onInputChange}
                                    name="email" type="email" placeholder="E-mail address" />
                            </div>
                            <div className={'form-group usr-inpt'}>
                                <label>Password:</label>
                                <span className="fa fa-lock" />
                                <Input onChange={onInputChange}
                                    name="password" type="password" placeholder="Password" />
                            </div>

                            <LoggerBtn btnType={'log in'} />
                        </form>
                    </Row>
                    <Row classes={'justify-content-center'}>
                        <p> New here?
                        <Link to="/signup" > Sign up.</Link>
                        </p>
                    </Row>
                </Col>
            </Row>
        </Container>

        </div>
    )
}
const  background = {
    backgroundImage: `url(${require("../../assets/img/backgroundImage2.jpg")}`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'
},

logo = {
    width: "60px",
    height: "auto",
    margin: "15px"
},

text = {
    color: "#0099ff",
    textShadow: "1px 1px #000"
}
