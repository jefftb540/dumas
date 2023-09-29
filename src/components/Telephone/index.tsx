import { useState } from 'react';
import { Title3 } from '../../pages/Profile/styled';
import { Telephone } from '../../types/Telephone';
import { api } from '../../service/api';
import queryClient from '../../service/reactQuery/queryClient';

interface TelephoneProfileProps {
  telephone: Telephone;
}

export const TelephoneProfile = ({ telephone }: TelephoneProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTelephone, setNewTelephone] = useState(telephone.number);
  const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('enviar os dados', newTelephone);
      await api.put('clients/telephones/' + telephone.id, {
        telephone: { number: newTelephone }
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditing(false);
    }
  };
  return (
    <div>
      <Title3>Telefones</Title3>
      <strong>Número:</strong>:
      {isEditing ? (
        <input
          type="phone"
          onKeyUp={handlePressEnter}
          value={newTelephone}
          onChange={e => setNewTelephone(e.target.value)}
        />
      ) : (
        <>
          {telephone.number}{' '}
          <span onClick={() => setIsEditing(true)}>Editar</span>
        </>
      )}
    </div>
  );
};
