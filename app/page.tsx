import Hero from "@/components/hero/Hero";
import Vision from "@/components/sections/Vision";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Token from "@/components/sections/Token";
import Blockchain from "@/components/sections/Blockchain";
import Utility from "@/components/sections/Utility";
import Intelligence from "@/components/intelligence/Intelligence";
import Global from "@/components/sections/Global";
import Ecosystem from "@/components/sections/Ecosystem";
import Security from "@/components/sections/Security";
import Growth from "@/components/sections/Growth";
import Roadmap from "@/components/sections/Roadmap";
import Community from "@/components/sections/Community";

export default function Home() {
  return (
    <main id="top">
      <Hero />{/* 01 */}
      <Vision />{/* 02 */}
      <Problem />{/* 03 */}
      <Solution />{/* 04 */}
      <Token />{/* 05 */}
      <Blockchain />{/* 06 */}
      <Utility />{/* 07 */}
      <Intelligence />{/* 08 */}
      <Global />{/* 09 */}
      <Ecosystem />{/* 10 */}
      <Security />{/* 11 */}
      <Growth />{/* 12 */}
      <Roadmap />{/* 13 */}
      <Community />{/* 14 + footer */}
    </main>
  );
}
