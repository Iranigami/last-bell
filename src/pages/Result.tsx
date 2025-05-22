import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import reload from "../assets/images/icons/reload.svg";
import ErrorModal from "../comps/ErrorModal";
import SaveModals from "../comps/SaveModals";
import axios from "axios";
import Waiting from "../comps/Waiting";
import Description from "../comps/Description";
import React from "react";
import { toBlob } from "html-to-image";
import test from "../assets/images/female-dentist-with-dentistry-tools-isolated 1 1.webp"

type Props = {
  savedFile?: Blob;
}


export default function Result({savedFile}: Props) {
  const [isPhotoLoading, setPhotoLoading] = useState(true);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSaveModalsOpen, setSaveModalsOpen] = useState(false);
  const navigate = useNavigate();
  const [bg, setBg] = useState("");
  const [searchParams] = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);
  console.log(savedFile);

  useEffect(() => {
    if (searchParams.get("error")) setErrorModalOpen(true);
    if (searchParams.get("swap") === "false") 
    {
      if (savedFile)
      {
        const imgUrl = URL.createObjectURL(savedFile!);
        setBg(imgUrl);
        setPhotoLoading(false);
      }
    }
    else {
    if (searchParams.get("id"))
      axios
        .get(`${apiUrl}/api/image_results/${searchParams.get("id")}`)
        .then((response) => {
          setBg(apiUrl + response.data.image);
          setPhotoLoading(false);
        });
      }
  }, []);

  async function getImageAsBlob(imageUrl: string) {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Ошибка при загрузке изображения: ${response.status}`);
      }
      const blob = await response.blob();
      console.log(blob);
      return blob;
    } catch (error) {
      console.error('Ошибка:', error);
      return null;
    }
  }
  
  const capture = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toBlob(ref.current, { cacheBust: true, })
      .then((file) => {
        const data = {
            imageResultId: searchParams.get("id"),
            imageWithDescription: file
          };
        axios
        .post(`https://api.fitting-room-lastbell.test.itlabs.top/api/image_results/update-image`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "multipart/form-data",
          },
        })
        .then(() => {
            console.log("Success");
        })
        .catch(() => {
          console.error("Не удалось обновить фото");
        });

      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  return (
    <div className="w-[100vw] h-[100vh] top-0 fixed overflow-hidden">
      {!isPhotoLoading && (
        <div ref={ref} className="w-[100vw] h-[100vh]">
        <img src={bg} alt="" className={`absolute top-0 bottom-0 my-auto ${searchParams.get("swap") === "false" ? "rotate-270 scale-[230%] top-[-1500px]" : "h-[100vh] object-cover"}`} />
        {isSaveModalsOpen && <Description/>}
        </div>
      )}
      {!isPhotoLoading && !isSaveModalsOpen && (
        <div className="fixed bottom-0 w-full h-[346px] bg-white rounded-t-[136px] flex justify-center items-center font-tt font-bold text-[48px]">
          <button
            onClick={() => navigate("/")}
            className="w-[425px] h-[154px] rounded-[72px] flex justify-center items-center bg-blue-accent text-white"
          >
            На главную
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-[748px] h-[154px] rounded-[72px] flex justify-center items-center border-6 border-blue-accent text-blue-accent ml-[113px] gap-[24px]"
          >
            <img src={reload} alt="try again" className="size-[64px]" />
            Попробовать еще раз
          </button>
          <button
            onClick={() => {setSaveModalsOpen(true); setTimeout(() => getImageAsBlob("http://api.fitting-room-lastbell.test.itlabs.top/images/background/image-2-682d756beb502303276019.webp"), 2000);}}
            className="w-[714px] h-[154px] rounded-[72px] flex justify-center items-center bg-blue-accent text-white ml-[32px]"
          >
            Получить фотографию
          </button>
        </div>
      )}
      {isErrorModalOpen && <ErrorModal />}
      {isSaveModalsOpen && <SaveModals />}
    </div>
  );
}
