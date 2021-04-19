import { useCallback, useState } from 'react';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import { Container, SearchContent, Title } from './style';

export default function TicketGate() {
  const [findUserInput, setFindUserInput] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const handlefindUser = useCallback(async () => {
    const findUser = await api.put('users/find', findUserInput);

    if (findUser.data[0] === null) {
      setUserMessage('Ops! tem algo errado!');
    }

    if (findUser.data[0].length > 0) {
      const { user } = findUser.data[0];
      setUserMessage(`Acesso liberado para ${user.name}`);
    }
  }, [findUserInput]);

  return (
    <Container>
      <Title>TicketGate - catraca</Title>
      <SearchContent>
        <Input
          icon={HiOutlineDocumentReport}
          name="id"
          onChange={e => setFindUserInput(e.target.value)}
        />
        <Button type="button" onClick={handlefindUser}>
          Buscar
        </Button>
      </SearchContent>
      <p>{userMessage}</p>
    </Container>
  );
}
