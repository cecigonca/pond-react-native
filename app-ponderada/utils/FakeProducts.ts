import Fakerator from 'fakerator';
import uuid from 'react-native-uuid';

const faker = Fakerator('pt-BR');

export interface Produto {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  imagem: any;
}

export const gerarProdutosFalsos = (quantidade: number): Produto[] => {
  return Array.from({ length: quantidade }).map(() => ({
    id: uuid.v4().toString(),
    nome: faker.lorem.word(),
    preco: `R$ ${faker.random.number(10, 1000)}`,
    descricao: faker.lorem.sentence(),
    imagem: {
      uri: `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 10000)}`
    },
  }));
};
