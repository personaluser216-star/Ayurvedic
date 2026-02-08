import Banner from "@/componets/banner";
import BestSeller from "@/componets/BestSeller";
import JustBanner from "@/componets/JustBanner";
import MainSlider from "@/componets/mainslider"
import Poster from "@/componets/Poster";
import ShowProduct from "@/componets/ShowProduct";

export default function Home() {
  return (
   <>
   <MainSlider/>
<Banner/>
<JustBanner/>
<BestSeller/>
<Poster/>
<ShowProduct/>
   </>
  );
}
