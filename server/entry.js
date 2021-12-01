import ReactDOMServer from 'react-dom-server';
import App from '../src/demo/SSRDemo';


// console.log('ReactDOMServer::', ReactDOMServer);

export const render = () => {
  return ReactDOMServer.renderToString(<App />);
}