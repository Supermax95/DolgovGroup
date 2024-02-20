import { FC, useEffect } from 'react';
import Navigation from './Navigation/Navigation';
import { useAppDispatch } from './Redux/hooks';
import portalCheck from './Redux/thunks/PortalLogin/portalCheck';
import { Toaster } from 'sonner';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(portalCheck());
  }, [dispatch]);

  return (
    <>
      <Toaster position="bottom-left" expand={true} />

      <Navigation />
    </>
  );
};

export default App;
