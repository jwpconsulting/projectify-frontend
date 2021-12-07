import './App.css';
import { Welcome } from './screens/Welcome';
import store from './redux/Store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Welcome />
      </Provider>
    </div>
  );
}

export default App;
