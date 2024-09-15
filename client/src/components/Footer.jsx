import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { ImGoogle3 } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterContainer>
            <ul>
                <li>About</li>
                <li>Blog</li>
                <li>Secret</li>
                <li>Collection</li>
                <li>Contact</li>
                <li>Press</li>
            </ul>

            <div className="SocialMedia">
                <li><FaFacebook /></li>
                <li><ImGoogle3 /></li>
                <li><FaGithub /></li>
                <li><FaYoutube /></li>
                <li><FaSquareXTwitter /></li>
            </div>

            <div className="CopyRight">
                © 2024 Your Company, Inc. All rights reserved.
            </div>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.footer`

    margin-top: 8rem;
    box-shadow: 0px 0px 10px 0px #00000029;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    ul{
        display: flex;
        gap: 10px;
        list-style: none;
        padding: 5px;
        margin: 5px;
    }

    .SocialMedia{
        font-size: 2rem;
        display: flex;
        gap: 20px;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    `