import React from 'react';

import { MenuContainer, MenuItem } from './styled';
import { routes } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/themeContext';
import { useAuth } from '../../contexts/authContext';
import { FaMoon, FaSignOutAlt, FaSun, FaUserAlt } from 'react-icons/fa';

export const UserMenu: React.FC = () => {
  const { toggle, theme } = useTheme();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  return (
    <MenuContainer>
      <MenuItem onClick={toggle}>
        {theme === 'dark' ? (
          <>
            Modo claro <FaSun />
          </>
        ) : (
          <>
            Modo escuro <FaMoon />
          </>
        )}
      </MenuItem>
      <MenuItem onClick={() => navigate(routes.profile)}>
        Perfil
        <FaUserAlt />
      </MenuItem>
      <MenuItem onClick={signOut}>
        Sair <FaSignOutAlt />
      </MenuItem>
    </MenuContainer>
  );
};
