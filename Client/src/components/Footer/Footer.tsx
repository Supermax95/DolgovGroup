const Footer = () => {
  return (
    <footer className="bg-slate-100 rounded-lg shadow border-t border-slate-200 m-0 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
        <span className="text-sm text-slate-500 sm:text-center dark:text-slate-400">
          © 2023{' '}
          <a href="#" className="hover:underline">
            DolgovGroup{' '}
          </a>
          Все права защищены.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
