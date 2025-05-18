# Projeto de Upload, Reprodução e Transcrição de Vídeos

Este projeto é uma aplicação web desenvolvida em **React** com **Vite** que permite ao usuário fazer upload de vídeos, acompanhar o progresso do upload, assistir ao vídeo com um player customizado e visualizar a transcrição sincronizada (legenda) do vídeo. O sistema suporta tanto uploads reais (com integração a uma API) quanto uploads simulados para fins de teste.

## Funcionalidades

- **Upload de Vídeos**: Permite selecionar ou arrastar arquivos de vídeo para upload, com barra de progresso animada.
- **Upload Simulado ou Real**: O usuário pode alternar entre upload real (requisições para API) e upload simulado (progresso fictício).
- **Cancelamento de Upload**: Possibilidade de cancelar uploads em andamento.
- **Player de Vídeo Customizado**: Reprodução do vídeo enviado com controles personalizados (play/pause, barra de progresso, controle de volume).
- **Transcrição Sincronizada**: Exibe a transcrição do vídeo (obtida via API ou arquivo local), destacando o trecho atual conforme o vídeo avança. Permite clicar em um trecho para navegar diretamente para o tempo correspondente no vídeo.
- **Interface Responsiva**: Layout adaptado para desktop e dispositivos móveis.
- **Feedback Visual**: Modal de sucesso ao concluir o upload e mensagens de erro amigáveis.

## Tecnologias Utilizadas

- **React** (componentização e hooks)
- **Vite** (build e desenvolvimento rápido)
- **Axios** (requisições HTTP)
- **PropTypes** (validação de props)
- **CSS** (estilização customizada e responsiva)
- **JSON** (transcrição local de exemplo)

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm (ou yarn)

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

Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```
Acesse em [http://localhost:5173](http://localhost:5173).

### Build para Produção

Para gerar os arquivos otimizados:
```bash
npm run build
```
Os arquivos serão gerados na pasta `dist`.

### Pré-visualização do Build

Para pré-visualizar o build:
```bash
npm run preview
```

## Estrutura do Projeto

- `src/components`: Componentes reutilizáveis (`VideoUploader`, `VideoPlayer`, `UploadForm`, `TimeStamp`).
- `src/api`: Configuração do Axios para integração com a API.
- `src/assets`: Recursos estáticos (ícones, imagens, transcrição de exemplo).
- `src/utils`: Funções utilitárias (formatação de tempo, requisições).
- `src/styles`: Estilos globais e específicos dos componentes.

## Como funciona a transcrição?

- O componente de transcrição tenta buscar os dados na API configurada.
- Caso a API não responda, utiliza um arquivo JSON local de exemplo.
- Os trechos da transcrição são sincronizados com o tempo do vídeo e podem ser clicados para navegar diretamente no player.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
