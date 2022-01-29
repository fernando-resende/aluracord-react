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
          background-color: ${appConfig.theme.colors.primary['500']};
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
      `}</style>
    );
}

export default function MyApp({Component, pageProps}){
    console.log('_app.js default export runing in every page...')
    return (
        <>
        <GlobalStyle/>
        <Component {...pageProps}/>
        </>
    );
}