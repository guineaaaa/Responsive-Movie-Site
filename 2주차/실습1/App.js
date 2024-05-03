
import Counter from './components/counter'; // Counter 컴포넌트를 불러옵니다.

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppContent />
      </header>
    </div>
  );
}

// App 컴포넌트 밖에서 JSX 내에 포함될 함수 컴포넌트를 정의합니다.
const AppContent = () => {
  return (
    <div>
      <Counter /> {/* Counter 컴포넌트를 렌더링합니다. */}
    </div>
  );
};

export default App;
