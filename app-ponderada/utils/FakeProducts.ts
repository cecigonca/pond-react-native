import { faker } from '@faker-js/faker';
import uuid from 'react-native-uuid';

export interface Produto {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  imagem: any;
}

export const gerarProdutosFalsos = (quantidade: number): Produto[] => {
  return Array.from({ length: quantidade }).map(() => {
    const nome = faker.commerce.productName();
    const preco = `R$ ${faker.commerce.price(20, 1000)}`;
    const descricao = faker.commerce.productDescription();
    const id = uuid.v4().toString();

    const imagem = {
      uri: `https://picsum.photos/seed/${id}/300/300`
    };

    return {
      id,
      nome,
      preco,
      descricao,
      imagem,
    };
  });
};
