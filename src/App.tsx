import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import PromoCards from "./components/PromoCards";
import Ambassadors from "./components/Ambassadors";
import AmbassadorSuggestions from "./components/AmbassadorSuggestions";
import CommunityAffinity from "./components/CommunityAffinity";
import SportsArena from "./components/SportsArena";
import FamilyClub from "./components/FamilyClub";
import RegisterCPF from "./components/RegisterCPF";
import LiveOdds from "./components/LiveOdds";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <PromoCards />
        <Ambassadors />
        <AmbassadorSuggestions />
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
