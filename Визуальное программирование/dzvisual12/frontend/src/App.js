import CommentsApp from './components/CommentsApp';
import LogViewer from './components/LogViewer';

function App() {
  return (
    <div className="App">
      <h2>Комментарии</h2>
      <CommentsApp />
      <h2>Логи</h2>
      <LogViewer />
    </div>
  );
}

export default App;
