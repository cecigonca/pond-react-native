# Ponderada de Desenvolvimento com React Native

## Descrição

Aplicativo mobile desenvolvido com React Native com objetivo de simular um catálogo de produtos com funcionalidades como autenticação, favoritar, cadastro e adição de produtos com imagem, notificações internas e mais.

## Vídeos para Demonstração

## Funcionalidades Implementadas

- **Login e Cadastro de Usuário**
  - Armazenamento de usuários via `AsyncStorage`
  - Validação de e-mail e senha

- **Recuperação de Senha com OTP**
  - Envio real de código por e-mail (Mailersend via backend Node.js)
  - Verificação de código e redefinição de senha

- **Lista de Produtos (Home)**
  - Exibição de 10.000 produtos falsos usando `@faker-js/faker`
  - Scroll infinito com carregamento por paginação
  - Imagens variadas e aleatórias com `loremflickr`

- **Tela de Detalhes do Produto**
  - Visualização de nome, imagem, descrição e preço
  - Botão de favoritar produto

- **Favoritos**
  - Armazenamento local de favoritos
  - Exibição de produtos favoritados na tela de perfil
  - Notificação interna ao favoritar

- **Perfil do Usuário**
  - Visualização e edição de dados (nome, e-mail, etc.)
  - Redefinição de senha
  - Foto de perfil editável

- **Adicionar Produto com Imagem**
  - Formulário para nome, descrição, preço
  - Uso da câmera ou galeria para adicionar imagem ao produto
  - Produto é adicionado no topo da Home

- **Notificações Internas**
  - Geração de notificações para eventos como:
    - Produto favoritado
    - Atualização de dados de perfil
    - Adição de novo produto

## Tecnologias Utilizadas

### Frontend (React Native)
- **React Native + Expo**
- `React Navigation` – gerenciamento de rotas e telas
- `React Native Paper` – UI Kit seguindo o Material Design
- `AsyncStorage` – persistência local de dados
- `Expo Camera` e `ImagePicker` – captura e seleção de imagens
- `@faker-js/faker` – geração de dados mockados
- `React Native UUID` – geração de identificadores únicos
- `React Native Vector Icons` – ícones
- `Expo Notifications` – notificações locais

### Backend (Node.js)
- `Express` – servidor web
- `Nodemailer` – envio de e-mails com OTP
- `Mailersend` – SMTP usado para envio real de e-mails

## Como Rodar o Projeto

1. **Clone o repositório**

```bash
git clone https://github.com/cecigonca/pond-react-native.git
```
```bash
cd pond-react-native/app-ponderada
```

2. **Inicie o backend para OTP (Node.js)**
No primeiro terminal:

```bash
cd backend
npm install
node server.js
```

Altere o IP local nas telas `ForgotPasswordScreen.tsx` e `ResetPasswordScreen.tsx`. Configure o SMTP em `server.js`.

3. **Inicie o projeto React Native com Expo**
Em um segundo terminal:

```bash
npm install
npx expo start
```

Use o aplicativo **Expo Go** para testar no celular via QR Code.