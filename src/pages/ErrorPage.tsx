import { useNavigate, useSearchParams } from "react-router-dom";
import err from "../assets/images/icons/err.svg";
import Waiting from "../comps/Waiting";

export default function ErrorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <div className="fixed top-0 w-full h-full">
      <div className="fixed w-[1688px] h-[910px] top-[1466px] left-0 right-0 mx-auto rounded-[136px] px-[64px] bg-white shadow-[24px_16px_24px_0px_#2D374426]">
        <img src={err} alt="error" className="size-[224px] mx-auto mt-[96px]" />
        <div className="mt-[80px] text-black-primary text-[80px] tracking-0 leading-[120%] uppercase text-center font-bold font-europe">
          Ошибка
        </div>
        <div className="text-black-secondary text-[40px] tracking-[0.8px] leading-[130%] text-center font-normal font-tt mt-[32px]">
          Произошла ошибка: {searchParams.get("error")}
        </div>
        <div className="flex mt-[80px] justify-center gap-[32px]">
          <button
            onClick={() => navigate("/")}
            className="w-[748px] h-[154px] rounded-[72px] flex justify-center items-center bg-blue-accent text-white font-tt font-bold text-[48px] leading-[120%] tracking-0 text-center"
          >
            На главную
          </button>
        </div>
      </div>
      <Waiting />
    </div>
  );
}
