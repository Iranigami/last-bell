import { useNavigate } from "react-router-dom";
import err from "../assets/images/icons/err.svg";
import reload from "../assets/images/icons/reload.svg";

export default function ErrorModal() {
  const navigate = useNavigate();
  return (
    <div className="fixed w-[1688px] h-[910px] top-[1466px] left-0 right-0 mx-auto rounded-[136px] px-[64px] bg-white shadow-[24px_16px_24px_0px_#2D374426]">
      <img src={err} alt="error" className="size-[224px] mx-auto mt-[96px]" />
      <div className="mt-[80px] text-black-primary text-[80px] tracking-0 leading-[120%] uppercase text-center font-bold font-europe">
        Ошибка
      </div>
      <div className="text-black-secondary text-[40px] tracking-[0.8px] leading-[130%] text-center font-normal font-tt mt-[32px]">
        Лицо не распознано. Попробуйте еще раз
      </div>
      <div className="flex mt-[80px] justify-center gap-[32px]">
        <button
          onClick={() => navigate("/")}
          className="w-[748px] h-[154px] rounded-[72px] flex justify-center items-center bg-blue-accent text-white font-tt font-bold text-[48px] leading-[120%] tracking-0 text-center"
        >
          На главную
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-[748px] h-[154px] rounded-[72px] flex gap-[24px] justify-center items-center bg-white border-[6px] border-blue-accent text-blue-accent font-tt font-bold text-[48px] leading-[120%] tracking-0 text-center"
        >
          <img src={reload} alt="try again" className="size-[64px]" />
          Попробовать еще раз
        </button>
      </div>
    </div>
  );
}
