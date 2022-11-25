import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

function Dashboard() {
    return(

        <div>
            <NavBar></NavBar>

            <SideBar></SideBar>

            <nav className='content-wrapper'>
                <Header></Header>
                
            </nav>


            <Footer></Footer>
        </div>

    );
}
export default Dashboard;