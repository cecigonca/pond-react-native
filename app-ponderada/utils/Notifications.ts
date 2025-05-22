import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
}

export const adicionarNotificacao = async (
  titulo: string,
  descricao: string
): Promise<void> => {
  try {
    const notificacoesData = await AsyncStorage.getItem('notificacoes');
    const notificacoes: Notificacao[] = notificacoesData
      ? JSON.parse(notificacoesData)
      : [];

    const nova: Notificacao = {
      id: uuid.v4(),
      titulo,
      descricao,
      data: new Date().toISOString(),
    };

    const atualizadas = [nova, ...notificacoes];
    await AsyncStorage.setItem('notificacoes', JSON.stringify(atualizadas));
  } catch (e) {
    console.error('Erro ao salvar notificação:', e);
  }
};
