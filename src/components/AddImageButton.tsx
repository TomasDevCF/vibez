import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Image } from "./PostInput";

interface Props {
  setImages: Dispatch<SetStateAction<Image[] | null>>
  images: Image[] | null
}

export default function AddImageButton({ images, setImages }: Props) {
  function blobImages(files: FileList): Promise<Image[] | null> {
    return new Promise((resolve, reject) => {
      const file = files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
          if (event.target && event.target.result) {
            const blob = new Blob([event.target.result], { type: file.type });
            const url = URL.createObjectURL(blob);
            resolve([{ file, url }]);
          } else {
            reject(null);
          }
        };

        reader.onerror = function () {
          reject(null);
        };

        reader.readAsArrayBuffer(file);
      } else {
        resolve(null);
      }
    });
  }

  async function addImages(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      try {
        const imagesUrl: Image[] | null = await blobImages(e.target.files);

        if (imagesUrl) {
          if (images && images.length > 0) {
            if (images.length < 4) {
              setImages([...images, ...imagesUrl]);
            } else {
              //TODO: ERROR
            }
          } else {
            setImages(imagesUrl);
          }
        }
      } catch (error) {
        console.error("Ha ocurrido un error: ", error);
      }
    }
  }

  return (
    <button type="button" className="add-image">
      <label htmlFor="images">
        <svg className="w-5 h-5 text-white hover:text-zinc-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
        </svg>
      </label>
      <input type="file" onChange={addImages} name="images" id="images" className="hidden" />
    </button>
  )
}