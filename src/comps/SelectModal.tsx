import { useCallback, useRef, useState } from "react";
import type { VariantData } from "../Types";
import next from "../assets/images/icons/arr.svg";
import back from "../assets/images/icons/blue arr.svg";
import selectedIcon from "../assets/images/icons/selected.svg";
import arrRight from "../assets/images/icons/next arr.svg";
import up from "../assets/images/icons/up.svg"
import { useNavigate } from "react-router-dom";
type Props = {
  data: VariantData[];
  texts: string[];
  init: number;
  onSelect: (id: number) => void;
  onNext?: () => void;
  onBack?: () => void;
};

export default function SelectModal({
  data,
  texts,
  init,
  onSelect,
  onNext,
  onBack,
}: Props) {
  const lastObserver = useRef<IntersectionObserver | null>(null);
  const firstObserver = useRef<IntersectionObserver | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [selected, setSelected] = useState(init);
  const [isLastButtonEnabled, setLastButtonEnabled] = useState(true);
  const [isFirstButtonEnabled, setFirstButtonEnabled] = useState(false);
  const [isModalDowned, setModalDowned] = useState(false);
  const page = useRef(0);
  const maxPages = data.length / 3;
  const scrollable = document.getElementById("scrollable");
  const [isLoading] = useState(false);
  const lastItemRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (lastObserver.current) lastObserver.current.disconnect();

      lastObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLastButtonEnabled(false);
          page.current = maxPages - 1;
        } else {
          setLastButtonEnabled(true);
          page.current = 0;
        }
      });

      if (node) lastObserver.current.observe(node);
    },
    [isLoading],
  );
  const firstItemRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (firstObserver.current) firstObserver.current.disconnect();

      firstObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setFirstButtonEnabled(false);
          page.current = 0;
        } else {
          setFirstButtonEnabled(true);
          page.current = maxPages - 1;
        }
      });

      if (node) firstObserver.current.observe(node);
    },
    [isLoading],
  );
  return (
    <div
      className={`duration-150 ${isModalDowned && "translate-y-[1600px]"} w-full bottom-0 pt-[112px] pb-[128px] bg-white fixed gap-[64px] rounded-t-[136px] px-[64px] ${texts[2] ? "h-[1492px]" : "h-[1882px]"}`}
    >
      <div 
        onTouchStart={() => setModalDowned(!isModalDowned)}
        className="absolute w-full h-[43px] top-[64px] left-0 right-0 mx-auto flex justify-center items-start">
        <img hidden={!isModalDowned} src={up} alt="open menu" />
        <div hidden={isModalDowned} className="w-[160px] h-[16px] rounded-full bg-[#2D3744]"/>
      </div>
      <div className="text-black-primary text-[80px] tracking-0 leading-[100%] uppercase text-left font-bold font-europe">
        {texts[0]}
      </div>
      <div
        id={"scrollable"}
        className={
          "w-[2032px] h-[874px] mt-[32px] flex gap-[32px] overflow-auto hide-scroll"
        }
      >
        <button
          onClick={() => {
            page.current--;
            scrollable?.scroll(page.current * 2048, 0);
          }}
          disabled={!isFirstButtonEnabled}
          className="absolute mt-[393px] left-[96px] disabled:opacity-[30%] size-[112px] shadow-[0px_0px_24px_0px_#58687C26] rounded-full bg-white flex justify-center items-center z-100"
        >
          <img src={arrRight} alt="prev" className="rotate-180 " />
        </button>
        <button
          onClick={() => {
            page.current++;
            scrollable?.scroll(page.current * 2048, 0);
          }}
          disabled={!isLastButtonEnabled}
          className="absolute mt-[393px] right-[96px] disabled:opacity-[30%] size-[112px] shadow-[0px_0px_24px_0px_#58687C26] rounded-full bg-white flex justify-center items-center z-100"
        >
          <img src={arrRight} alt="next" />
        </button>
        <div
          ref={firstItemRef}
          className="min-w-[1px] h-[874px] mr-[-32px]"
        ></div>
        {data?.map((variant: VariantData, index: number) => (
          <div
            onClick={() => {
              setSelected(index);
              onSelect(index);
            }}
            key={variant.id}
            className={`duration-150 relative min-w-[656px] h-[874px] rounded-[72px] ${index === selected ? "bg-blue-accent text-white font-bold" : "bg-[#EFF6F9] text-black-secondary font-normal"} p-[48px] overflow-hidden`}
          >
            <img
              hidden={index !== selected}
              src={selectedIcon}
              alt="selected"
              className="size-[64px] absolute top-[37px] right-[40px] z-100"
            />
            <div className="font-tt text-[32px] leading-[100%] w-[436px]">
              {variant && variant.title}
              <img
                src={apiUrl + variant.image}
                alt=""
                className={`${texts[2] ? "absolute top-0 h-full w-full mx-auto left-0 right-0" : "h-[830px] mt-[32px] ml-[15%]"}`}
              />
            </div>
          </div>
        ))}
        <div ref={lastItemRef} className="min-w-[1px] h-[874px] ml-[-32px]" />
      </div>
      {data[selected] && (
        <div hidden={!!texts[2]}>
          <div className="mt-[64px] font-europe font-bold text-[64px] leading-[100%] tracking-0 text-black-primary uppercase">
            {data[selected].title}
          </div>
          <div className="mt-[32px] font-tt font-normal text-[40px] leading-[100%] tracking-0 text-black-secondary">
            {data[selected].description}
          </div>
        </div>
      )}
      <div className="w-[2032px] fixed bottom-[128px] right-[64px] flex justify-end gap-[64px] items-center h-[146px]">
        <button
          onClick={() => navigate("/")}
          hidden={!!texts[2]}
          className="absolute w-[432px] h-[146px] border-[4px] border-blue-accent rounded-[72px] fixed left-[64px] gap-[24px] font-tt font-bold text-[48px] leading-[100%] tracking-0 flex justify-center items-center text-blue-accent"
        >
          <img src={back} alt="back" className="size-[48px]" />
          На главную
        </button>
        <button
          onClick={onBack}
          hidden={!texts[2]}
          className="absolute w-[378px] h-[146px] border-[4px] border-blue-accent rounded-[72px] fixed left-[64px] gap-[24px] font-tt font-bold text-[48px] leading-[100%] tracking-0 flex justify-center items-center text-blue-accent"
        >
          <img src={back} alt="back" className="size-[48px] rotate-180" />
          {texts[2]}
        </button>
        <div className="w-[520px] flex gap-[16px] font-tt font-normal leading-[100%] tracking-0 text-[40px] text-black-secondary">
          {texts[1]}
          <img src={next} alt="next step" className="size-[48px]" />
        </div>
        <button
          onClick={onNext}
          className="w-[461px] h-[146px] rounded-[72px] bg-blue-accent flex justify-center items-center font-tt font-bold text-[48px] text-white leading-[100%] tracking-0 text-center"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}
