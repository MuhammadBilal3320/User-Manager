import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const RegistrationSuccessful = () => {
    return (
        <RegistrationSuccessfullContainer>
            <div className="registrationCard">
                <div className="imageController flex justify-center items-center"><img src="./images/greenTick.png" alt="This is image" width={"80px"} /></div>
                <h1>Registration Successful</h1>
                <p>Your registration was successful. You can now Login.</p>
                <Link to={"/login"}><button>LOGIN</button></Link>
            </div>
        </RegistrationSuccessfullContainer>
    )
}

export default RegistrationSuccessful

const RegistrationSuccessfullContainer = styled.main`
    
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .registrationCard{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 500px;
        padding: 50px;
        background-color: whitesmoke;
        border-radius: 15px;
        box-shadow: rgb(0, 223, 192) 0 0 6px 2px;
        text-align: center;

        @media screen and (max-width: 500px) {
            box-shadow: none;
            background-color: white;
        }


        > h1{
            font-size: 30px;
            font-weight: 700;
            @media screen and (max-width: 500px) {
                font-size: 25px;
            }
        }

        > p{
            font-size: 15px;
            @media screen and (max-width: 500px) {
                font-size: 12px;
            }
        }

        button{
        background-color: #00dfc0;
        width: 250px;
        padding: 0 5px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 25px;
        box-shadow: 0px 2px 5px 0px #000000ba;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        scale: 0.95;

        &:hover{
            background-color: #00c894;
            transform: translateY(-5px);
            scale: 1;
        }
    }

    }

`;
