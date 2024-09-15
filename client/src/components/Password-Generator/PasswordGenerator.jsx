import React, { useState } from 'react'
import styled from 'styled-components'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import Navbar from '../Navbar';
import Footer from './../Footer'

const PasswordGenerator = () => {
    const [password, setPassword] = useState(""); // State for generated password
    const [passwordYesNot, setPasswordYesNot] = useState(true); // Toggle password visibility
    const [passwordLength, setPasswordLength] = useState(12); // State for password length
    const [isCopied, setIsCopied] = useState(false); // State to track copy status

    // Function to generate a strong random password
    const generatePassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let generatedPassword = "";
        for (let i = 0; i < passwordLength; i++) {
            generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(generatedPassword); // Set the generated password to the input
    };

    // Function to copy the password to the clipboard and change button text to 'Copied'
    const copyPassword = () => {
        navigator.clipboard.writeText(password);
        setIsCopied(true); // Change button text to 'Copied'

        // Revert back the button text after 2 seconds
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const passwordInfo = [
        {
            title:"Don't use personal information in your passwords",
            description:"Easy passwords, such as password123 or your dog’s name, are simple to remember but also simple for cybercriminals to crack. Your first line of defense against cybercriminals breaking into your online accounts and stealing your personal data is to use strong passwords and different passwords for every account. Strong passwords should be long, complex and difficult to remember."
        },
        {
            title:"Don't reuse passwords",
            description:"Reusing the same passwords puts you at risk of a cyber attack, such as credential stuffing. A credential stuffing attack is when a cybercriminal takes leaked credentials from one site and uses them on multiple sites in an attempt to gain access to your accounts. This attack works on the assumption that people often use the same username and password across multiple sites."
        },
        {
            title:"Don't use risky methods to share passwords",
            description:"Sharing your passwords through risky methods such as email, text message, Microsoft Teams, WhatsApp, Slack, Discord, etc., leaves you at a higher risk of having your accounts compromised. It’s best to never share your passwords, but if you absolutely must, we highly recommend sharing your passwords securely with the help of a password manager."
        }
    ]

    return (
        <div className='overflow-hidden'>
            <Navbar />
            <MainContainer>
                        <h1>PASSWORD GENERATOR</h1>
                <Container>
                    <div className="textContainer">
                        <h2>Easily Create Strong, Random Passwords</h2>
                        <p>Use our free tool to generate unique, strong passwords.</p>
                    </div>

                    <div className="boxContainer">
                        <div className="inputContainer">
                            <input
                                type={passwordYesNot ? "password" : "text"}
                                value={password}
                                readOnly
                            />
                            {passwordYesNot ?
                                <IoIosEye
                                    style={{ cursor: "pointer", margin: "0 10px" }}
                                    onClick={() => setPasswordYesNot(false)}
                                    fontSize={"40px"}
                                />
                                :
                                <IoIosEyeOff
                                    style={{ cursor: "pointer", margin: "0 10px" }}
                                    onClick={() => setPasswordYesNot(true)}
                                    fontSize={"40px"}
                                />
                            }
                        </div>

                        <div className="rangeContainer">
                            <label>Password Length: {passwordLength}</label>
                            <input
                                type="range"
                                min="4"
                                max="80"
                                value={passwordLength}
                                onChange={(e) => setPasswordLength(e.target.value)}
                            />
                            <div className='copyContainer'>
                                <button className='copy' onClick={copyPassword}
                                    style={{
                                        backgroundColor: isCopied ? '#00c851' : '#878888',
                                        color: isCopied ? 'white' : 'white'
                                    }}>
                                    {isCopied ? `Copied ✔` : `Copy`}
                                </button>
                            </div>
                        </div>

                        <div className="generate-Copy">
                            <button className='generate' onClick={generatePassword}>Generate</button>
                        </div>
                    </div>
                </Container>
            </MainContainer>

            <PasswordInfo className="password-info">
                <h1>Password Best Practices to Follow</h1>

                <div className="passwordContent">
                    {passwordInfo.map((info, index) => (
                        <div key={index} className="infoContainer">
                            <h3>{info.title}</h3>
                            <p>{info.description}</p>
                        </div>
                    ))}
                </div>
            </PasswordInfo>

            <Footer/>
        </div>
    );
};

export default PasswordGenerator;

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 90vh;
    width: 100%;

    h1{
        font-size: 40px;
        font-weight: 700;
        @media screen and (max-width:768px){
        background-color: #00dfc0;
        width: 80%;
        text-align: center;
        font-size: 25px;
        border-radius: 30px;
    }
    }
    

`;

const Container = styled.div`
    padding: 20px;
    border-radius: 20px;
    width: 70%;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media screen and (max-width:768px){
        width: 100%;

    }

    .textContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    
    
    h2{
        font-size: 25px;
        font-weight: 700;
        @media screen and (max-width:768px){
        width: 100%;
        text-align: center;
        font-size: 15px;
        margin: 20px;
    }
    }

    p{
        margin:20px 0;
        font-size: 18px;
        font-weight: 500;
        @media screen and (max-width:768px){
        width: 100%;
        text-align: center;
        font-size: 15px;
    }
    }

    .boxContainer{
        width: 80%;
        height: 250px;
        margin-top: 20px;
        border-radius: 15px;
        padding: 20px;
        box-shadow:0 0 8px 0px black;
        @media screen and (max-width:768px){
        box-shadow: none;
        width: 100%;
        padding: 5px;
    }
    }

    .inputContainer{
        display: flex;
        align-items: center;
        justify-content:center;
        border: 2px solid black;
        border-radius: 10px;
        padding: 10px;
        @media screen and (max-width:768px){
        width: 100%;
    }
    }

    .inputContainer > input{
        background-color: transparent;
        width: 100%;
        height: 50px;
        font-size: 20px;
        font-weight: 600;
        &:focus{
            outline: none;
        }
        @media screen and (max-width:768px){
        width: 100%;
        height: 30px;
    }
    }

    .rangeContainer{
        margin-top: 20px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 10px;
        @media screen and (max-width:768px){
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    }

    .rangeContainer label {
        font-size: 18px;
        font-weight: 600;
        @media screen and (max-width:768px){
            width: 100%;
        }
    }

    .rangeContainer input[type="range"] {
        width: 50%;
        cursor: pointer;
        @media screen and (max-width:768px){
            width: 100%;
        }
    }

    .generate-Copy{
        display: flex;
        justify-content: space-evenly;
        gap: 10px;
        margin-top: 20px;
    }

    .generate{
        background-color: #00dfc0;
        color: white;
        width: 200px;
        padding: 10px;
        border-radius: 5px;
        font-weight: 700;
        color: black;
        scale: 0.90;
        cursor: pointer;
        transition: all 0.4s;
        box-shadow:-2px 3px 3px 0px black;

        &:hover{
            background-color: #00a580;
            scale: 1;
            transition: all 0.4s;
        }
    }

    .copyContainer{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
    }

    .copy{
        background-color: #878888;
        color: white;
        border-radius: 5px;
        font-weight: 700;
        padding: 10px 30px;
        cursor: pointer;
        transition: all 0.4s;
        scale: 0.70;
        border-radius: 50px;
        border: none;

        &:hover{
            scale: 0.80;
        transition: all 0.4s;
        }
    }
`;

const PasswordInfo = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1{
        font-size: 40px;
        font-weight: 700;
        @media screen and (max-width:768px){

        width: 100%;
        text-align: center;
        font-size: 25px;
    }
}

    .passwordContent{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 50%;
        margin-top: 50px;
        @media screen and (max-width:768px){
            width: 100%;
            margin-top: 20px;
            text-align: center;
        }
    }

    .infoContainer{
        width: 100%;
        margin: 20px;
        display: flex;
        gap: 5px;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        @media screen and (max-width:768px){
            margin: 10px;
            padding: 10px;
            display: flex;
            align-items: center;
        }
        h3{
            font-size: 30px;
            font-weight: 600;
            @media screen and (max-width:768px){
            font-size: 20px;
        }
        }
        p{
            font-size: large;
        }
    }

`
