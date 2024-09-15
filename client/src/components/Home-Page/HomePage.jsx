import React from 'react'
import HomeNavbar from './HomeNavbar'
import styled from 'styled-components'
import HomeSidebar from './HomeSidebar'
import UseState from './context/UseState'
import HomeBody from './HomeBody'
import HomeEditModal from './HomeEditModal'

const HomePage = () => {
    return (
        <UseState>
            <HomeMainPage>
                <HomeNavbar />
                <div className="sideBar-Body flex bg-[#1d2a35]">
                    <HomeSidebar />
                    <HomeBody />
                </div>

            </HomeMainPage>
        </UseState>
    )
}

export default HomePage

const HomeMainPage = styled.main`
    min-height: 100vh;
    max-height: 100vh;
    width: 100%;
    overflow: hidden;
    
`
