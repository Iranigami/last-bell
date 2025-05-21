import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import err from "../assets/images/icons/err.svg";

export default function Waiting() {
  const [isUserInactive, setUserInactive] = useState(false);
  let time: number;
  const resetTimer = () => {
    clearTimeout(time);
    time = setTimeout(() => {
      setUserInactive(true);
    }, 60000); //1min of inactivity
  };
  document.addEventListener("touchstart", resetTimer);
  const navigate = useNavigate();
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(() => {
      setUserInactive(true);
    }, 60000); //1min of inactivity
  }, []);

  function MyTimer() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 59);
    const expiryTimestamp = time;
    const { seconds } = useTimer({
      expiryTimestamp,
      onExpire: () => {
        navigate("/");
      },
    });

    return (
      <div>
        <div className="text-black-secondary text-[40px] font-tt font-normal text-center">
          Выход на начальный экран произойдет через{" "}
          <span className="text-blue-accent font-bold">{seconds}</span> секунд
        </div>
      </div>
    );
  }

  return (
    <>
      {isUserInactive && (
        <div className="z-[1000] fixed w-[1347px] h-[910px] top-[1487.5px] left-[407px] rounded-[64px] py-[128px] px-[64px] bg-white shadow-[0px_16px_24px_30px_#2D374426]">
          <img src={err} alt="error" className="size-[156px] mx-auto" />
          <div className="mt-[64px] text-black-primary text-[80px] tracking-0 leading-[100%] uppercase text-center font-bold font-europe mb-[32px]">
            Хотите продолжить?
          </div>
          <MyTimer />
          <div className="flex mt-[64px] justify-center gap-[32px]">
            <button
              onClick={() => navigate("/")}
              className="w-[593.5px] h-[168px] rounded-[64px] flex justify-center items-center bg-blue-accent text-white font-tt font-bold text-[48px] leading-[100%] tracking-0 text-center"
            >
              Выйти
            </button>
            <button
              onClick={() => {
                setUserInactive(false);
                resetTimer;
              }}
              className="w-[593.5px] h-[168px] rounded-[72px] flex gap-[24px] justify-center items-center bg-white border-[6px] border-blue-accent text-blue-accent font-tt font-bold text-[48px] leading-[100%] tracking-0 text-center"
            >
              Продолжить
            </button>
          </div>
        </div>
      )}
    </>
  );
}
