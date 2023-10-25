import React from 'react';
import Button from '../../ui/Button';
import Field from '../../ui/Field';

function Portal() {
  return (
    <div className="min-h-screen bg-slate-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r  from-lime-200 to-green-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-nolmal text-slate-600">
                Портал авторизации. Продуктивной работы 😎
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  {/* <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-green-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-400 peer focus:text-green-500"
                    placeholder=""
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-slate-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-lime-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-lime-3s00 peer-focus:text-sm"
                  >
                    Email
                  </label> */}
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder=""
                    autoCapitalize="none"
                    autoComplete="off"
                    htmlFor="email"
                    title="Email"
                  />
                </div>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder=""
                    autoCapitalize="none"
                    autoComplete="off"
                    htmlFor="password"
                    title="Пароль"
                  />
                </div>
                <div className="relative flex justify-center">
                  <Button
                    title="Войти"
                    // onClick={function (): void {
                    //   throw new Error('Function not implemented.');
                    // }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portal;
