import Webcam from "react-webcam";
import frame from "../assets/images/frame.svg";
import sparkles from "../assets/images/sparkles.gif";
//import time from "../assets/images/icons/timer.svg";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import LoadingModal from "../comps/LoadingModal";
import Countdown from "../comps/Countdown";
import Waiting from "../comps/Waiting";

type Props = {
  onSaveFile: (file: File) => void;
}


export default function Camera({onSaveFile}: Props) {
  const [isCountdownShown, setCountdownShown] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isErrorStated, setErrorStated] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const webcamRef = React.useRef<Webcam>(null);
  const [isLoading, setLoading] = useState(false);
  const makePhoto = () => {
    setCountdownShown(true);
    if (!webcamRef.current) console.log("Error");
    else
      setTimeout(() => {
        capture();
      }, 5000);
  };

  useEffect(() => {
    makePhoto();
  }, []);

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
      if (searchParams.get("swap")==="false") 
        onSaveFile(file);
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
          navigate(`/result?id=${response.data.id}&char=${searchParams.get("character")}&code=${response.data.code}&swap=${searchParams.get("swap")}`);
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
      {isCountdownShown && <Countdown frames={5} />}
      {!isLoading && <Waiting />}
    </div>
  );
}
