import logo from "../assets/images/logo.svg";
import pick from "../assets/images/icons/pick.png";
import { useNavigate } from "react-router-dom";
import brokerMan from "../assets/images/Adobe Express - file (5) 2.webp";
import brokerWoman from "../assets/images/Adobe Express - file (6) 1.webp";
import dentist from "../assets/images/female-dentist-with-dentistry-tools-isolated 1 1.webp";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/select")}
      className="w-full h-full fixed top-0 justify-center"
    >
      <img src={logo} alt="logo" className="mt-[300px] mx-auto h-[262px]" />

      <div className="mt-[300px] font-europe font-bold text-[182px] leading-[100%] tracking-[-7.28px] text-center uppercase">
        Кем ты будешь, когда вырастешь?
      </div>
      <div>
      <img
        src={brokerWoman}
        alt="broker woman"
        className="fixed w-[1076px] h-[2164px] top-[1676px] left-[27px]"
      />
      <img
        src={dentist}
        alt="dentist"
        className="fixed w-[939.08px] h-[2211px] top-[1670px] left-[1211px]"
      />
      <img
        src={brokerMan}
        alt="broker man"
        className="fixed w-[1221.87pxpx] h-[2471px] top-[1410px] left-[459.39px]"
      />
      </div>
      <div className="flex w-full">
        <div className="size-[520px] rounded-full bg-white mx-auto z-10 mt-[1444px]">
          <div className="font-tt font-bold text-[56px] leading-[100%] tracking-0 text-center uppercase text-blue-accent mt-[100px]">
            Коснитесь экрана
          </div>
          <img
            src={pick}
            alt="pick"
            className="h-[400px] mt-[-20px] mx-auto animate-float"
          />
        </div>
      </div>
    </div>
  );
}
