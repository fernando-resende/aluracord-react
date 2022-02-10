# About / Sobre
This project was built in the Alura's React immersion (jan/2022).

-------------------------------------------------

Este projeto foi construído na imersão React da Alura (jan/2022).

-------------------------------------------------

Link: [https://aluracord-react-sage.vercel.app/](https://aluracord-react-sage.vercel.app/).

[@alura-challenges](https://github.com/alura-challenges) [@omariosouto](https://github.com/omariosouto) [@peas](https://github.com/peas)

# Objective / Objetivo
Create a realtime **Discord's** based chat using github users to send messages. User authentication and another resources are not the main focus.

-------------------------------------------------

Criar um chat em tempo real baseado no **Discord** usando usuários do github para enviar mensagens. Autenticação de usuário e outros recursos não são o foco principal.

# Technologies / Tecnologias
- HTML;
- CSS;
- JavaScript;
- [React](https://reactjs.org);
- [NextJs](https://nextjs.org);
- [Supabase](https://supabase.com);

# Install / Instalação
First of all, you'll need a project on [Supabase](https://supabase.com) with a table named as "**messages**" and the following fields: id (integer auto increment), created_at (timestamp default value now()), from (varchar), message (text) and channel (varchar), so follow the steps below:
1. Clone the project `git clone https://github.com/fernando-resende/aluracord-react.git`;
2. Create a file named ".env.local" in the root folder with the vars NEXT_PUBLIC_SUPABASE_ANON_KEY and NEXT_PUBLIC_SUPABASE_URL with the values that you can get in your Supabase project;
3. Run `npm install` to install the dependencies;
4. Run the project `npm run dev`;
5. Open the browser and go to [http://localhost:3000](http://localhost:3000).

-------------------------------------------------

Antes de tudo, você precisará de um projeto no [Supabase](https://supabase.com) com uma tabela chamada "**messages**" e os seguintes campos: id (integer auto increment), created_at (timestamp valor padrão now()), from (varchar), message (text) e channel (varchar), então siga os passos abaixo:
1. Clone o projeto `git clone https://github.com/fernando-resende/aluracord-react.git`;
2. Crie um arquivo chamado ".env.local" na pasta raiz com as vars NEXT_PUBLIC_SUPABASE_ANON_KEY e NEXT_PUBLIC_SUPABASE_URL com os valores que você pode obter em seu projeto Supabase;
3. Execute `npm install` para instalar as dependências;
4. Execute o projeto `npm run dev`;
5. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).