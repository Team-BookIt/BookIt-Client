import React from "react";
import Header from "../../components/(attendee)/header";
import SideBar from "../../components/(universal)/sideBar";
import Event from "../../components/(attendee)/event";
import SearchBar from "../../components/(universal)/searchBar";

const Home = () => {
    return(
        <div className="page-container">
            <p>Hi there, User</p>
            <SearchBar />

            <div className="events-container">
                <Event 
                    name="Codefest" 
                    rate="GHS 20.00" 
                    date="12-12/2024" 
                    time="10 AM" 
                    venue="Kumapley" 
                    description="the best in town" 
                    organizer="ACES KNUST"
                    categories={["Tech", "Innovation", "Workshop"]}
                />
                <Event 
                    name="Codefest" 
                    rate="GHS 20.00" 
                    date="12-12/2024" 
                    time="10 AM" 
                    venue="Kumapley" 
                    description="the best in town" 
                    organizer="ACES KNUST"
                    categories={["Tech", "Innovation", "Workshop"]}
                />
                <Event 
                    name="Codefest" 
                    rate="GHS 20.00" 
                    date="12-12/2024" 
                    time="10 AM" 
                    venue="Kumapley" 
                    description="the best in town" 
                    organizer="ACES KNUST"
                    categories={["Tech", "Innovation", "Workshop"]}
                />
            </div>
        </div>
    );
}

export default Home;