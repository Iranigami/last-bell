import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SaveModals() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const photoId = [`${searchParams.get("id")}`];
  const code = searchParams.get("code");
  const [loading, setLoading] = useState(true);
  const [isHintVisible, setHintVisible] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const data = {
    imageResults: photoId,
  };
  useEffect(() => {
    setLoading(true);
    axios
      .post(`${apiUrl}/api/image_results/telegram_qr`, data, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => {
        document.getElementById("qrHandler")!.innerHTML = response.data;
        setLoading(false);
      });
  }, []);

  return (
    <div
      hidden={loading}
      className="w-[1688px] min-h-[1343px] rounded-[136px] bg-white shadow-[24px_16px_24px_0px_#2D374426] fixed top-[1222px] left-0 right-0 mx-auto"
    >
      <div className="mt-[80px] text-blue-accent font-europe font-bold text-[80px] leading-[120%] tracking-0 text-center uppercase">
        сканируйте QR-код
        <br />
        для получения фото
      </div>
      <div className="mt-[32px] text-black-secondary font-tt font-normal text-[40px] leading-[130%] tracking-[0.8px] text-center">
        Сканируйте QR-код для получения фотографии
      </div>
      <div id="qrHandler" className="size-[461px] bg-[#EFF6F9] rounded-[72px] flex justify-center items-center mt-[80px] mx-auto p-[10px]">
      </div>
      <div 
        onClick={()=>setHintVisible(true)}
        hidden={isHintVisible} className="font-tt font-normal text-[40px] leading-[130%]tracking-[0.8px] underline text-blue-accent text-center mt-[80px]">
          Не получается сканировать qr-код?
      </div>
      <div hidden={!isHintVisible} className="font-tt text-[40px] leading-[130%] text-center text-black-secondary font-normal tracking-[0.8px] mt-[80px]">
        Наберите в поиске <span className="font-bold">@ITLabs_LastBellBot</span>, затем нажмите       
        <br /> кнопку "Start" и
        отправьте сообщение “<span className="font-bold">{code}</span>”,
        вам <span className="font-bold">ответит</span> бот<br/> и{" "}
        <span className="font-bold">пришлет</span> вашу фотографию
      </div>
      <a
        href="/"
        className="mb-[80px] mt-[80px] w-[425px] h-[154px] rounded-[72px] bg-blue-accent flex justify-center items-center text-white font-tt font-bold text-[48px] leading-[120%] mx-auto"
      >
        На главную
      </a>
    </div>
  );
}
