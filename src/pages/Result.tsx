import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import reload from "../assets/images/icons/reload.svg";
import ErrorModal from "../comps/ErrorModal";
import SaveModals from "../comps/SaveModals";
import axios from "axios";
import Waiting from "../comps/Waiting";
import Description from "../comps/Description";
import html2canvas from "html2canvas";

export default function Result() {
  const [isPhotoLoading, setPhotoLoading] = useState(true);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSaveModalsOpen, setSaveModalsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [bg, setBg] = useState("");
  const [searchParams] = useSearchParams();
  const imageRef = useRef<any>(null);

  const captureAndConvertToFile = async (): Promise<File | null> => {
    if (!imageRef.current) return null;
    var myCanvas: HTMLCanvasElement | undefined = undefined;
      html2canvas(imageRef.current).then((canvas) => {
        myCanvas = canvas;
      });

    return new Promise((resolve) => {
      myCanvas!.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          const file = new File([blob], "screenshot.jpg", {
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

  const capture = useCallback(async () => {
    setLoading(true);
    const file = await captureAndConvertToFile();
    if (file) {
      const data = {
        imageWithDescription: file,
        imageResultId: searchParams.get("id"),
      };
      console.log(data);
      axios
        .post(`${apiUrl}/api/image_results/update-image`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.data);
        });
    } else {
      console.error("Не удалось создать файл");
    }
  }, [imageRef]);

  useEffect(() => {
    if (searchParams.get("error")) setErrorModalOpen(true);
    if (searchParams.get("id"))
      axios
        .get(`${apiUrl}/api/image_results/${searchParams.get("id")}`)
        .then((response) => {
          setBg(apiUrl + response.data.image);
          setPhotoLoading(false);
        });
  }, []);
  return (
    <div className="w-[100vw] h-[100vh] top-0 fixed overflow-hidden">
      {!isPhotoLoading && (
        <div ref={imageRef}>
        <img src={bg} alt="" className="object-cover h-[100vh] absolute z-[-1] top-0 bottom-0 my-auto" />
        {isSaveModalsOpen && <Description />}
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
            onClick={() => {setSaveModalsOpen(true); capture();}}
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
