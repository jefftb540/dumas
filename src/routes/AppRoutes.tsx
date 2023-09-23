import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '.';
import { FormLogin } from '../components/FormLogin';

const isAutenticated = () => true; //TODO: Implementar função no authContext

export const AppRoutes = () => {
  return (
    <Routes>
      {isAutenticated() ? (
        <>
          <Route path={routes.home} element={<FormLogin />} />
          <Route path="*" element={<Navigate to={routes.home} />} />
        </>
      ) : (
        <>
          <Route path={routes.login} element={<h1>Login placeholder</h1>} />
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
        </>
      )}
    </Routes>
  );
};

//TODO: Adicionar pages de acordo com a criação das mesmas
