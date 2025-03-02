import { Outlet } from "react-router-dom";
import LandingPage from "./LandingPage";
import AboutPage from "./AboutPage";
import MissionPage from "./MissionPage";
import ArchivementCol from "./ArchivementCol";
import ContactPage from "./ContactPage";
import Vission from "./Vission";
import FooterPage from "./FooterPage";
import MedicalHomePage from "./medical/MedicalHomePage";

function HomeLayout() {
  return (
    <div>
      {/* Main Landing Page */}
      <section id="Home">
        <LandingPage />
      </section>
      {/* Other Sections Display Together */}
      <section id="about">
        <AboutPage />
      </section>
      <section id="mission">
        <MissionPage />
      </section>
      <section id="achivements">
        <ArchivementCol />
      </section>
      <section id="vission">
        <Vission />
      </section>
      <section id="contact">
        <ContactPage />
      </section>
      <FooterPage />
      {/* <MedicalHomePage /> */}

      {/* Outlet for Dynamic Navigation (Optional) */}
      {/* <Outlet /> */}
    </div>
  );
}

export default HomeLayout;
