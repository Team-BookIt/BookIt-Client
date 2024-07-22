import React, { useState } from "react";
import { MdOutlineHome, MdOutlineConfirmationNumber, MdOutlineSettings } from "react-icons/md";

import logo from "../../assets/logo-white.png";

const SideBar = ({ onPageChange }) => {
    const [isActive, setIsActive] = useState("Home");
    return (
        <div className="sidebarContainer">
            <img src={logo} alt="logo" className="sideBarLogo"/>

            <div className="sidebarButtons">
                <div 
                    className={isActive === "Home" ? "activeSidebarButton" : "sidebarButton"}
                    onClick={() => {
                        setIsActive("Home");
                        onPageChange("Home");
                    }}
                >
                    <MdOutlineHome size={40} className="icon" />
                    <p>Home</p>
                </div>

                <div 
                    className={isActive === "Bookings" ? "activeSidebarButton" : "sidebarButton"}
                    onClick={() => {
                        setIsActive("Bookings");
                        onPageChange("Bookings");
                    }}
                >
                    <MdOutlineConfirmationNumber size={40} className="icon" />
                    <p>Bookings</p>
                </div>
                
                <div 
                    className={isActive === "Settings" ? "activeSidebarButton" : "sidebarButton"}
                    onClick={() => {
                        setIsActive("Settings");
                        onPageChange("Settings");
                    }}
                >
                    <MdOutlineSettings size={40} className="icon" />
                    <p>Settings</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar;