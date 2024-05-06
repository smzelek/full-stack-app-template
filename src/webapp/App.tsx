import { useEffect } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './_global.scss';
import './App.scss';
import { COMMIT_HASH } from './env';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': any;
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export const AppLayout = () => {
  return (
    <div id='app'>
      <span style={{ display: 'none' }}>
        {COMMIT_HASH()}
      </span>
      <div className='wrapper'>
        <header id='header'>
        </header>
        <main className='main'>
          <Outlet />
        </main>
      </div >
    </div >
  );
}

export const App = () => {
  const Fallback = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate('/');
    }, []);
    return null;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: []
    },
    {
      path: '*',
      element: <Fallback />,
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  )
};

