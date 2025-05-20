import Webcam from "react-webcam";
import frame from "../assets/images/frame.svg";
import sparkles from "../assets/images/sparkles.gif";
//import time from "../assets/images/icons/timer.svg";
import React, { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import LoadingModal from "../comps/LoadingModal";
import Countdown from "../comps/Countdown";
import Waiting from "../comps/Waiting";

export default function Camera() {
  const [isCountdownShown, setCountdownShown] = useState(false);
  const [isSnapButtonDisabled, setSnapButtonDisabled] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isErrorStated, setErrorStated] = useState(false);
  const [timerAppearance, setTimerAppearance] = useState(0);
  const timer = useRef(3000);
  const apiUrl = import.meta.env.VITE_API_URL;
  const webcamRef = React.useRef<Webcam>(null);
  const [isLoading, setLoading] = useState(false);
  const makePhoto = () => {
    setCountdownShown(true);
    setSnapButtonDisabled(true);
    if (!webcamRef.current) console.log("Error");
    else
      setTimeout(() => {
        capture();
      }, timer.current);
  };

  const captureAndConvertToFile = async (): Promise<File | null> => {
    if (!webcamRef.current) return null;
    const canvas = webcamRef.current.getCanvas();
    if (!canvas) return null;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          const file = new File([blob], "webcam-screenshot.jpg", {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          resolve(file);
        },
        "image/jpeg",
        0.9,
      );
    });
  };

  const capture = React.useCallback(async () => {
    setLoading(true);
    const file = await captureAndConvertToFile();
    if (file) {
      const data = {
        userImage: file,
        costumeId: searchParams.get("character"),
        backgroundId: searchParams.get("background"),
      };
      console.log(data);
      axios
        .post(`${apiUrl}/api/image_results`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          navigate(`/result?id=${response.data.id}`);
        })
        .catch((error) => {
          console.log(error.data);
          navigate("/result?error=true");
        });
    } else {
      console.error("Не удалось создать файл");
    }
  }, [webcamRef]);
  return (
    <div className="fixed top-0 w-full h-full">
      <div className="mt-[300px] text-white text-[200px] tracking-[-8px] leading-[100%] uppercase text-center font-bold font-europe">
        Поместите лицо
        <br />в область
      </div>
      <img src={frame} alt="here" className="mt-[197px] mx-auto z-100" />
      <img
        src={sparkles}
        alt="img"
        className="absolute left-0 right-0 mx-auto mt-[-1200px] z-100"
      />
      <Webcam
        onUserMediaError={() => setErrorStated(true)}
        screenshotFormat="image/jpeg"
        audio={false}
        ref={webcamRef}
        width={3840}
        height={2160}
        className="top-[600px] rotate-270 z-[-1] absolute scale-[230%]"
      />
      <div
        hidden={isSnapButtonDisabled}
        className="w-full h-[360px] rounded-t-[136px] bg-white bottom-0 fixed px-[64px] flex justify-between items-center"
      >
        <div className="flex justify-center items-center gap-[64px]">
          <div className="flex gap-[32px] justify-center items-center">
            <div className="font-tt font-normal text-black-secondary leading-[100%] tracking-0 text-[40px]">
              Таймер
            </div>
          </div>
          <div className="p-[4px] relative bg-blue-bg w-[840px] h-[114px] rounded-[44px] flex justify-left items-center font-tt text-[40px] text-center leading-[100%] tracking-0">
            <div
              onClick={() => {
                setTimerAppearance(0);
                timer.current = 3000;
              }}
              className={`${timerAppearance === 0 ? "text-white font-bold" : "text-black-secondary font-normal"} items-center flex justify-center w-[208px] h-[106px] z-1`}
            >
              3 c
            </div>
            <div
              onClick={() => {
                setTimerAppearance(1);
                timer.current = 5000;
              }}
              className={`${timerAppearance === 1 ? "text-white font-bold" : "text-black-secondary font-normal"} items-center flex justify-center w-[208px] h-[106px] z-1`}
            >
              5 c
            </div>
            <div
              onClick={() => {
                setTimerAppearance(2);
                timer.current = 7000;
              }}
              className={`${timerAppearance === 2 ? "text-white font-bold" : "text-black-secondary font-normal"} items-center flex justify-center w-[208px] h-[106px] z-1`}
            >
              7 c
            </div>
            <div
              onClick={() => {
                setTimerAppearance(3);
                timer.current = 10000;
              }}
              className={`${timerAppearance === 3 ? "text-white font-bold" : "text-black-secondary font-normal"} items-center flex justify-center w-[208px] h-[106px] z-1`}
            >
              10 c
            </div>
            <div
              style={{
                transform: `translateX(${timerAppearance * 208}px)`,
              }}
              className={`bg-blue-accent absolute w-[208px] h-[106px] rounded-[40px] duration-150 z-0`}
            />
          </div>
        </div>
        <button
          disabled={isSnapButtonDisabled}
          onClick={makePhoto}
          className="disabled:opacity-[50%] w-[664px] h-[168px] rounded-[72px] bg-blue-accent flex justify-center items-center text-white font-tt font-bold leading-[100%] tracking-0 text-[48px]"
        >
          Сделать фотографию
        </button>
      </div>
      <div
        hidden={!isErrorStated}
        className="fixed top-0 w-[100vw] h-[100vh] bg-[#000000DD] z-1000 content-center"
      >
        <div className="w-[1500px] bg-white mx-auto rounded-[70px] font-tt text-black-primary py-[150px]">
          <div className="font-bold text-[80px] text-center uppercase">
            Не удалось найти камеру
          </div>
          <div className="font-normal text-[60px] text-center mt-[32px]">
            Попробуйте следующее:
            <br />
            1. Проверьте, подключена ли веб-камера
            <br />
            2. Проверьте, даны ли соответствующие разрешения приложению
            <br />
            <br />
            После выполнения этих шагов, перезагрузите страницу
          </div>
          <div className="flex justify-center items-center gap-[64px] mt-[64px]">
            <button
              onClick={() => navigate("/")}
              className="w-[664px] h-[168px] rounded-[72px] border-4 border-blue-accent flex justify-center items-center text-blue-accent font-tt font-bold leading-[100%] tracking-0 text-[48px]"
            >
              На главную
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-[664px] h-[168px] rounded-[72px] bg-blue-accent flex justify-center items-center text-white font-tt font-bold leading-[100%] tracking-0 text-[48px]"
            >
              Перезагрузить
            </button>
          </div>
        </div>
      </div>
      {isLoading && <LoadingModal />}
      {isCountdownShown && <Countdown frames={timer.current / 1000} />}
      {!isLoading && <Waiting />}
    </div>
  );
}
