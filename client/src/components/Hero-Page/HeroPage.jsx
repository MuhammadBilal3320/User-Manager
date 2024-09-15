import React from 'react'
import styled from 'styled-components'
import Footer from '../Footer'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'



const HeroPage = () => {

    const websiteText = [
        {
            title: "Never Forget Passwords Again",
            content: "Tired of remembering passwords? Storing them on paper, in spreadsheets, or your browser puts you at risk. With UserManager, your passwords are safely stored in an encrypted vault, so you never have to remember them again."
        },
        {
            title: "Secure and Encrypted Vault",
            content: "All your passwords are stored in a highly secure vault, protected by strong encryption. Access your vault easily and manage your passwords with peace of mind.",
        },
        {
            title: "Organize with Ease",
            content: "Managing multiple passwords is a breeze with UserManager. Organize your passwords into categories for quick access, so you'll never waste time searching for the right one."
        },
        {
            title: "Strengthen Your Protection",
            content: "A strong password is your first defense against hackers. Let UserManager generate powerful, random passwords or check the strength of your own for optimal protection."
        }
    ]

    return (
        <div className='overflow-y-hidden'>
        <Navbar/>
            <Main>

                <HeroContainer>


                    <LeftContainer>
                        <div className="textContainer">
                            <h1><b>Protect</b> Your Digital World.</h1>
                            <p>"UserManager helps you keep your passwords and email details safe and easy to manage. With our simple tools, you can securely store and access your important information without any hassle."</p>
                        </div>

                        <div className="buttonContainer md:justify-center md:items-center">
                            <Link to={"/login"}><button>LOGIN</button></Link>
                            <Link to={"/registration"}><button>REGISTRATION</button></Link>
                        </div>
                    </LeftContainer>

                    <RightContainer>
                        <img src="./images/image.png" alt="This is image" />
                    </RightContainer>
                </HeroContainer>

            </Main>



            <ContentContainer>
                <h1>Streamline and Protect Your Digital Identity</h1>
                <Content>
                    {websiteText.map((text, index) => (
                        <div key={index} className="textContent">
                            <h1>{text.title}</h1>
                            <p>{text.content}</p>
                        </div>
                    ))
                    }
                </Content>
            </ContentContainer>

            <Footer />


        </div>
    )

}

export default HeroPage

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    width: 100%;


`

const HeroContainer = styled.div`
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    width: 80%;
    background-color: white;


    @media screen and (max-width: 900px){
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    width: 100%;
    }
`

const LeftContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 20;
    width: 50%;
    margin: 20px;

    @media screen and (max-width: 900px){
    width: 100%;
    }

    .textContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5rem;
    }

    b{
        /* -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: white; */
        color: #00dfc0;
    }

    h1{
        text-transform: uppercase;
        font-size: 5rem;
        line-height: 4rem;
        font-weight: 800;
        @media screen and (max-width: 900px){
        font-size: 3rem;
    }
    }
    

    p{
        font-size: 1.2rem;
        font-weight: 500;
        color: #888;

    }

    .buttonContainer{
        display: flex;
        justify-content: start;
        gap: 2rem;
        width: 100%;
        margin-top: 5rem;
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


    `

const RightContainer = styled.div`

    padding: 10px;
    margin: 10px;
    width: 50%;
    position: relative;
    z-index: 20;
    overflow: hidden;

    @media screen and (max-width: 900px){
    width: 100%;
    }
    
`


const PasswordGenerator = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    @media screen and (max-width: 900px){
    width: 100%;
    }

    button{
        background-color: #585858;
        transition: all 0.4s;
        scale: 0.95;
        width: 30%;
        height: 50px;
        color: white;
        font-size: 30px;
        font-weight: 800;
        border-radius: 50px;
        &:hover{
            background-color: black;
            transform: translateY(-5px);
            scale: 1;
            transition: all 0.4s;
            width: 40%;
        }
        @media screen and (max-width: 900px){
    width: 70%;
    font-size: larger;
    &:hover{
        width: 80%;
    }
    }

    }
`


const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    h1{
        text-transform: uppercase;
        font-size: 2.5rem;
        line-height: 2rem;
        font-weight: 800;
        padding: 20px;
    }
    `

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 90%;
    @media screen and (max-width: 900px) {
            width: 100%;
        }

    .textContent{
        width: 40%;
        margin: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px #00000029;
        @media screen and (max-width: 768px) {
            width: 100%;
        }
    }

    h1{
        text-transform: uppercase;
        font-size: 1.3rem;
        font-weight: 700;
    }

`


