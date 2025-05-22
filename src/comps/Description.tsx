import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Tag, VariantData } from "../Types";

export default function Description() {
  const [isLoading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [charData, setCharData] = useState<VariantData>();
  const charId = searchParams.get("char");
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(()=>{
    setLoading(true);
    axios
      .get(`${apiUrl}/api/costumes`)
      .then((response) => {
        const index = response.data.findIndex((elem:VariantData) => elem.id === Number(charId));
        setCharData(response.data[index]);
        setLoading(false);
        if(document.getElementById("desc"))
          document.getElementById("desc")!.innerHTML = response.data[index].description;
      })
      .catch((error) => {
        console.log(error);
      });
  },[])
  return(
    <div id="textWrapper" className="w-full h-[718px] bg-white rounded-t-[136px] p-[64px] fixed bottom-0">
      {!isLoading && charData &&
      (
        <>
          <div className="font-europe font-bold text-[64px] leading-[100%] tracking-0 uppercase text-black-primary">
            {charData.title}
          </div>
          <div className="tagWrapper">
          {charData.tags.map((tag: Tag, index: number) => (
            <div key={index} className="tag">
              {tag.text}
            </div>
          ))}
          </div> 
        </>
      )
      }
                <div id="desc" className="text-black-secondary font-tt font-normal text-[32px] leading-[130%] tracking-0">
                </div>
    </div>
  );
}
