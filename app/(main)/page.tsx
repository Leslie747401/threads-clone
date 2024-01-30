import HomeThread from "@/components/HomeThread";
import HomeTabs from "@/components/Home-tabs";

export default async function Home() {
  
  return (
    <div className="sm:w-[40%] pt-[74px] sm:pt-12 pb-16">

      <HomeTabs/>

      <HomeThread/>
      <HomeThread/>
      <HomeThread/>
      <HomeThread/>
      <HomeThread/>
      <HomeThread/>

    </div>
  );
}