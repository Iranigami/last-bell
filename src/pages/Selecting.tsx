import { useEffect, useState } from "react";
import SelectModal from "../comps/SelectModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { VariantData } from "../Types";
import Waiting from "../comps/Waiting";
import loadIcon from "../assets/images/icons/loading.svg";

export default function Selecting() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [characterList, setCharacterList] = useState<VariantData[]>([]);
  const [backgroundList, setBackgroundList] = useState<VariantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [selectedBackground, setSelectedBackground] = useState(1);
  const [openedModal, setOpenedModal] = useState("none");
  const [imageLoading, setImageLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/api/costumes`)
      .then((response) => {
        setCharacterList(response.data);
        setLoading(false);
        setOpenedModal("character");
      })
      .catch((error) => {
        navigate(`/error?error=${error.message}`);
      });
    axios
      .get(`${apiUrl}/api/backgrounds`)
      .then((response) => {
        setBackgroundList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        navigate(`/error?error=${error.message}`);
      });
    setTimeout(() => setImageLoading(false), 200);
  }, []);
  return (
    <div className="w-full h-full fixed top-0 justify-center">
      {loading === false &&
        backgroundList[selectedBackground] !== undefined &&
        characterList[selectedCharacter] !== undefined && (
          <div className="w-full h-full">
            <img
              src={apiUrl + backgroundList[selectedBackground].image}
              alt="background"
              className="absolute w-full h-full"
            />
            <div className="top-[250px] fixed text-white font-europe font-bold text-[200px] leading-[100%] tracking-[8px] text-center mx-auto left-0 right-0 uppercase drop-shadow-2xl">
              {characterList[selectedCharacter].title}
            </div>
            <img
              src={apiUrl + characterList[selectedCharacter].image}
              alt="costume"
              className="absolute h-[3234px] mt-[606px] left-0 right-0 mx-auto"
            />
          </div>
        )}
      {openedModal === "character" && !loading && (
        <SelectModal
          init={selectedCharacter}
          data={characterList}
          texts={["Персонажи", "Перейти к выбору фона", ""]}
          onSelect={(id) => setSelectedCharacter(id)}
          onNext={() => setOpenedModal("background")}
        />
      )}
      <div className={`${openedModal === "background" ? "" : "hidden"}`}>
        {!loading && (
          <SelectModal
            init={selectedBackground}
            data={backgroundList}
            texts={["Фоновое изображение", "Сделать фотографию", "Назад"]}
            onSelect={(id) => setSelectedBackground(id)}
            onBack={() => {
              setOpenedModal("character");
            }}
            onNext={() =>
              {
                navigate(
                  `/camera?character=${selectedCharacter + 1}&background=${selectedBackground + 1}&swap=${characterList[selectedCharacter].enableSwap}`,
                )
              }
            }
          />
        )}
      </div>
      {imageLoading && (
        <div className="w-full h-full fixed top-0 left-0 bg-linear-to-b from-[#A8E2FF] to-[#0095DB] flex justify-center items-center">
          <img
            src={loadIcon}
            alt="loading"
            className="mt-[64px] animate-spin mx-auto"
          />
        </div>
      )}
      <Waiting />
    </div>
  );
}
