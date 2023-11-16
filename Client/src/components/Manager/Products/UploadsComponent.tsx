import React, { useState, ChangeEvent } from 'react';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

type UploadResponse = string | null;

type UploadFileProps = {
    id: number; 
  };

  function UploadFile({ id }: UploadFileProps):React.JSX.Element {
  
  const [uploadResponse, setUploadResponse] = useState<UploadResponse>(null);

  const uploadFile = async (file: File | null): Promise<void> => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response: AxiosResponse<{ msg: string }> = await axios.put(
          `${VITE_URL}/admin/productsPhoto/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          },
        );

        if (response && response.data && response.data.msg) {
          setUploadResponse(`✅`);
        }
      } catch (error) {
        console.error(`Ошибка при загрузке файла:`, error);
      }
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    void uploadFile(file);
  };

  return (
    <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-md dark:bg-neutral-700">
      <div className="px-4 sm:px-0 text-center ">
        <h1 className="text-2xl font-bold mb-4">Форма загрузки фотографии продукта</h1>
        <div className="mt-6">
          <div className="mb-4">
            <form
              className="w-full py-1 px-2 rounded-md"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <span className="text-center block mb-1 s text-md font-medium leading-6 text-gray-900 mt-2">
                Загрузите фотографию продукта
              </span>
              <input
                type="file"
                name="productPhoto"
                className="mb-2 border rounded-md mr-2"
                onChange={handleFileInputChange}
              />

              {uploadResponse ? (
                <button
                  type="button"
                  style={{ width: '100px' }}
                  className="m-2 mt-4 px-4 py-2 text-white rounded-md bg-gradient-to-br from-green-700 to-green-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm text-center mr-2"
                >
                  Загружено
                </button>
              ) : (
                <button
                  type="submit"
                  style={{ width: '100px' }}
                  className="m-2 mt-4 px-4 py-2 text-white rounded-md bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm text-center mr-2"
                >
                  Загрузить
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
