import appConfig from '../config.json';

function GlobalStyle() {
  return (
    <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Press Start 2P', cursive;
          line-height:  1.5;
          background-color: ${appConfig.theme.colors.primary['500']};
          display: flex;
        }
        textarea {
          line-height:  1.5;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
        .sknui-text{
            font-family: 'Press Start 2P', cursive !important;
        }
        .flex-col-75{
          flex: 75% !important;
        }
        .flex-col-25{
          flex: 25% !important;
        }
        .my-message{
          background-color: rgba(200,100,100,0.3);
          margin: 0 1rem 0 40%;
        }
        .other-message{
          background-color: rgba(150,150,150,0.3);
          margin-right: 40%;
        }
        /* Scroll Bar */
        /* width */
        ::-webkit-scrollbar {
          width: 5px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
          border-radius: 10%;
          background: #555;
        }

        /* Scroll Bar */
      `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  console.log('_app.js default export runing in every page...')
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}