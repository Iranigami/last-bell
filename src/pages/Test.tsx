import React, { useCallback, useRef } from 'react';
import { toBlob, toPng } from 'html-to-image';
import test from "../assets/images/female-dentist-with-dentistry-tools-isolated 1 1.webp"
import axios from 'axios';
import Description from '../comps/Description';
const Test: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  const capture = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toBlob(ref.current, { cacheBust: true, })
      .then((file) => {
        const data = {
            imageResultId: 48,
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
            console.log("yAAASSS")
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
    <>
      <div ref={ref} className="w-[100vw] h-[100vh]">
        <img src={test} alt="" className={` absolute top-0 bottom-0 my-auto h-[100vh] object-cover`} />
        <Description/>
      </div>
      <button className="size-[200px] bg-black fixed bottom-0 right-0 " onClick={capture}>Click me</button>
    </>
  )
}

export default Test;