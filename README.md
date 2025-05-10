# Projeto de Upload e Reprodução de Vídeos

Este projeto é uma aplicação web desenvolvida com React e Vite que permite o upload de vídeos, exibição de progresso de upload e reprodução dos vídeos enviados. Ele suporta tanto uploads reais quanto simulados, com uma interface amigável e responsiva.

## Funcionalidades

- Upload de arquivos de vídeo com barra de progresso.
- Suporte a upload real (com integração a uma API) e upload simulado.
- Reprodução de vídeos enviados com controles personalizados.
- Cancelamento de uploads em andamento.
- Modal de sucesso ao concluir o upload.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface do usuário.
- **Vite**: Ferramenta de build rápida para desenvolvimento front-end.
- **Axios**: Biblioteca para requisições HTTP.
- **CSS**: Estilização personalizada para os componentes.
- **PropTypes**: Validação de propriedades dos componentes React.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- Gerenciador de pacotes npm ou yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```
   VITE_API_URL=http://localhost:8000
   VITE_UPLOAD_ENDPOINT=/upload
   VITE_USE_FAKE_UPLOAD=true
   ```

## Uso

### Ambiente de Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute:
```bash
npm run dev
```
Acesse a aplicação em [http://localhost:5173](http://localhost:5173).

### Build para Produção

Para gerar os arquivos otimizados para produção, execute:
```bash
npm run build
```
Os arquivos serão gerados na pasta `dist`.

### Pré-visualização do Build

Para pré-visualizar o build gerado:
```bash
npm run preview
```

## Estrutura do Projeto

- `src/components`: Contém os componentes reutilizáveis, como `VideoUploader`, `VideoPlayer` e `UploadForm`.
- `src/api`: Configuração do Axios para integração com a API.
- `src/assets`: Recursos estáticos, como ícones e imagens.
- `src/styles`: Estilos globais e específicos dos componentes.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
