import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '.';
import { Home } from '../pages/Home';
import { PageLayout } from '../pages/PageLayout';
import { Login } from '../pages/Login';
import { MainLayout } from '../components/MainLayout';

const isAutenticated = () => false; //TODO: Implementar função no authContext

export const AppRoutes = () => {
  return (
    <Routes>
      {isAutenticated() ? (
        <>
          <Route path={routes.home} element={<PageLayout />}>
            <Route path={routes.home} element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to={routes.home} />} />
          <Route></Route>
        </>
      ) : (
        <Route element={<MainLayout />}>
          <Route path={routes.login} element={<Login />} />

          <Route
            path={routes.signUp.profile}
            element={<h1>SignUp placeholder</h1>}
          />
          <Route
            path={routes.signUp.address}
            element={<h1>Add Address placeholder</h1>}
          />
          <Route
            path={routes.recoverPassword}
            element={<h1>Recover Password placeholder</h1>}
          />
          <Route path="*" element={<Navigate to={routes.login} />} />
        </Route>
      )}
    </Routes>
  );
};

//TODO: Adicionar pages de acordo com a criação das mesmas
