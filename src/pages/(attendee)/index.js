import React, { useState } from "react";
import SideBar from "../../components/(universal)/sideBar";
import Header from "../../components/(attendee)/header";
import Home from "./home";
import Bookings from "./bookings";
import Settings from "./settings";

const Main = () => {
    const [activePage, setActivePage] = useState("Home");

    return(
        <div className="parent-container">
            <Header title={activePage} />
            <SideBar onPageChange={setActivePage} />

            {activePage === "Home" && <Home />}
            {activePage === "Bookings" && <Bookings />}
            {activePage === "Settings" && <Settings />}
        </div>
    );
};

export default Main;