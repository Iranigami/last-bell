import loading from "../assets/images/icons/loading.svg";

export default function LoadingModal() {
  return (
    <div className="z-[1000] w-[1347px] fixed h-[716px] top-[1565px] left-0 right-0 mx-auto rounded-[136px] py-[80px] px-[64px] bg-white shadow-[24px_16px_24px_0px_#2D374426]">
      <div className="text-black-primary text-[80px] tracking-0 leading-[120%] uppercase text-center font-bold font-europe">
        Пожалуйста, подождите
      </div>
      <div className="text-black-secondary text-[40px] tracking-0 leading-[130%] text-center font-normal font-tt mt-[32px]">
        Ваша фотография обрабатывается
      </div>
      <img
        src={loading}
        alt="loading"
        className="mt-[80px] animate-spin mx-auto size-[200px]"
      />
    </div>
  );
}
