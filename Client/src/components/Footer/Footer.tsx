// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-slate-100 rounded-lg shadow border-t border-slate-200 m-0 dark:bg-slate-800">
//       <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
//         <span className="text-sm text-slate-500 sm:text-center dark:text-slate-400">
//           © 2023{' '}
//           <a href="https://flowbite.com/" className="hover:underline">
//             DolgovGroup{' '}
//           </a>
//           Все права защищены.
//         </span>
//         {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-slate-500 dark:text-slate-400 sm:mt-0">
//           <li>
//             <a href="#" className="mr-4 hover:underline md:mr-6">
//               About
//             </a>
//           </li>
//           <li>
//             <a href="#" className="mr-4 hover:underline md:mr-6">
//               Privacy Policy
//             </a>
//           </li>
//           <li>
//             <a href="#" className="mr-4 hover:underline md:mr-6">
//               Licensing
//             </a>
//           </li>
//           <li>
//             <a href="#" className="hover:underline">
//               Contact
//             </a>
//           </li>
//         </ul> */}
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';

const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Весь ваш контент будет здесь */}
  
      <footer className="bg-slate-100 rounded-lg shadow border-t border-slate-200 dark:bg-slate-800 p-4 mt-auto">
        <div className="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-center">
          <span className="text-sm text-slate-500 sm:text-center dark:text-slate-400">
            © 2023{' '}
            <a href="https://flowbite.com/" className="hover:underline">
              DolgovGroup{' '}
            </a>
            Все права защищены.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
