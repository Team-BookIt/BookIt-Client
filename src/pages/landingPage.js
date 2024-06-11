import React from "react";

// components
import Header from "../components/landing page/header";
import Footer from "../components/landing page/footer";
import Hero from "../components/landing page/hero";
import Section from "../components/landing page/section";
import Team from "../components/landing page/team";

const LandingPage = () => {
    return(
        <div>
            <Header />
            <Hero />
            <Section />
            <Team />
            <Footer />
        </div>
    )
};

export default LandingPage;