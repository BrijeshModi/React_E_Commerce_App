
import ReactDOM from 'react-dom';
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query';


const client = new QueryClient();

ReactDOM.render(
  <div>
<QueryClientProvider client={client}>
    <App />
    </QueryClientProvider>
    </div>,
  document.getElementById('root')
);


