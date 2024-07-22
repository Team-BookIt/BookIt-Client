import React from "react";
import { MdOutlineHome, MdOutlineSettings } from "react-icons/md";

import logo from "../../assets/logo-white.png";
import { useNavigate } from "react-router-dom";

const SideBar = ({ activePage }) => {
    const navigate = useNavigate();

    const handleDashboardPress = () => {
        if (activePage !== "Dashboard") {
            navigate("/dashboard");
        }
        console.log("Active page:", activePage);
    }

    const handleSettingsPress = () => {
        if (activePage !== "Settings") {
            navigate("/organizerSettings");
        }
        console.log("Active page:", activePage);
    }

    return (
        <div className="sidebarContainer">
            <img src={logo} alt="logo" className="sideBarLogo"/>

            <div className="sidebarButtons">
                <div 
                    className={activePage === "Dashboard" ? "activeSidebarButton" : "sidebarButton"}
                    onClick={handleDashboardPress}
                >
                    <MdOutlineHome size={40} className="icon" />
                    <p>Dashboard</p>
                </div>
                
                <div 
                    className={activePage === "Settings" ? "activeSidebarButton" : "sidebarButton"}
                    onClick={handleSettingsPress}
                >
                    <MdOutlineSettings size={40} className="icon" />
                    <p>Settings</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar;