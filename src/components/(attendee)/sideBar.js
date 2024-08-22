import React from "react";
import { MdOutlineHome, MdOutlineConfirmationNumber, MdOutlineSettings } from "react-icons/md";

import logo from "../../assets/logo-white.png";
import { useNavigate } from "react-router-dom";

const SideBar = ({ activePage }) => {
    const navigate = useNavigate();

    const handleHomePress = () => {
        if (activePage !== "Home"){
            navigate("/home");
        }
    }

    const handleBookingsPress = () => {
        if (activePage !== "Bookings"){
            navigate("/bookings");
        }
    }

    const handleSettingsPress = () => {
        if (activePage !== "Settings"){
            navigate("/attendeeSettings");
        }
    }


    return (
        <div className="sidebarContainer">
            <img src={logo} alt="logo" className="sideBarLogo"/>

            <div className="sidebarButtons">
                <div 
                    className={activePage === "Home" ? "activeSidebarButton" : "sidebarButton"}
                    onClick={handleHomePress}
                >
                    <MdOutlineHome size={30} className="icon" />
                    <p>Home</p>
                </div>

                <div 
                    className={activePage === "Bookings" ? "activeSidebarButton" : "sidebarButton"}
                    onClick={handleBookingsPress}
                >
                    <MdOutlineConfirmationNumber size={30} className="icon" />
                    <p>Bookings</p>
                </div>
                
                <div 
                    className={activePage === "Settings" ? "activeSidebarButton" : "sidebarButton"}
                    onClick={handleSettingsPress}
                >
                    <MdOutlineSettings size={30} className="icon" />
                    <p>Settings</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar;