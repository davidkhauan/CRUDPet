import api from '../utils/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from './useFlashMessage';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!';
    let msgType = 'success';

    try {
      const response = await api.post('/users/register', user); // Verifique se o endpoint está correto
      console.log(response.data);
      console.log (response)

      setFlashMessage(msgText, msgType);
      navigate('/login'); // Redireciona para a página de login após o cadastro
    } catch (error) {
      msgText = 'Ocorreu um erro ao realizar o cadastro.';
      msgType = 'error';
      setFlashMessage(msgText, msgType);
      console.log(error);
    }
  }

  return { authenticated, loading, register };
}