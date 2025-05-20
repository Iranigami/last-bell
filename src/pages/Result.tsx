import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import reload from "../assets/images/icons/reload.svg";
import ErrorModal from "../comps/ErrorModal";
import SaveModals from "../comps/SaveModals";
import axios from "axios";
import Waiting from "../comps/Waiting";

export default function Result() {
  const [isPhotoLoading, setPhotoLoading] = useState(true);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSaveModalsOpen, setSaveModalsOpen] = useState(false);
  const navigate = useNavigate();
  const [bg, setBg] = useState("");
  const [searchParams] = useSearchParams();

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
    <div className="w-[100vw] h-[100vh] bg-linear-to-b from-light-blue to-blue-accent top-0 fixed">
      {!isPhotoLoading && (
        <img src={bg} alt="" className="w-[100vw] h-[100vh] absolute z-[-1]" />
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
            onClick={() => setSaveModalsOpen(true)}
            className="w-[714px] h-[154px] rounded-[72px] flex justify-center items-center bg-blue-accent text-white ml-[32px]"
          >
            Получить фотографию
          </button>
        </div>
      )}
      {isErrorModalOpen && <ErrorModal />}
      {isSaveModalsOpen && (
          <SaveModals />
      )}
      <Waiting />
    </div>
  );
}
