import logo from "../assets/images/logo.svg";
import pick from "../assets/images/icons/pick.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/select")}
      className="w-full h-full fixed top-0 bg-linear-to-b from-[#A8E2FF] to-[#0095DB] justify-center"
    >
      <img src={logo} alt="logo" className="mt-[300px] mx-auto h-[262px]" />

      <div className="mt-[300px] font-europe font-bold text-[182px] leading-[100%] tracking-[-7.28px] text-center uppercase">
        Кем ты будешь, когда вырастешь?
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
