import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import PromoCards from "../components/PromoCards";
import Copa2026Banner from "../components/Copa2026Banner";
import CommunityAffinity from "../components/CommunityAffinity";
import SportsArena from "../components/SportsArena";
import FamilyClub from "../components/FamilyClub";
import RegisterCPF from "../components/RegisterCPF";
import LiveOdds from "../components/LiveOdds";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Copa2026Banner />
        <TrustBar />
        <PromoCards />
        <LiveOdds />
        <CommunityAffinity />
        <SportsArena />
        <FamilyClub />
        <RegisterCPF />
      </main>
      <Footer />
    </>
  );
}
