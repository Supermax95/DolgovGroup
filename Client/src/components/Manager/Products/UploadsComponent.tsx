
import React, { useState, ChangeEvent } from 'react';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { VITE_URL } from '../../../VITE_URL';

type UploadResponse = string | null;

type UploadFileProps = {
  id: number;
  uploadStart: () => void; 
};

function UploadFile({ id, uploadStart }: UploadFileProps): React.JSX.Element {
  console.log('uploadStart',uploadStart);
  
  const uploadFile = async (file: File | null): Promise<void> => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log(file);

      try {
        const response = await axios.put(
          `${VITE_URL}/admin/productsPhoto/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );

        uploadStart();
      } catch (error) {
        console.error(`Ошибка при загрузке файла:`, error);
      }
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log('я в хендлере');
    const file = e.target.files?.[0] || null;
    void uploadFile(file);
  };

  return (
    <div className="container mx-auto mt-8 p-8 max-w-4xl justify-center items-center flex-col block rounded-lg bg-white shadow-md dark:bg-neutral-700">
      <div className="px-4 sm:px-0 text-center ">
        <h1 className="text-2xl font-bold mb-4">
          Форма загрузки фотографии продукта
        </h1>
        <div className="mt-6">
          <div className="mb-4">
            <span className="text-center block mb-1 s text-md font-medium leading-6 text-gray-900 mt-2">
              Загрузите фотографию продукта
            </span>
            <input
              type="file"
              name="productPhoto"
              className="mb-2 border rounded-md mr-2"
              onChange={handleFileInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
