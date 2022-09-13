
import Header from './components/Header/Header.js';
import InfoArea from './components/InfoArea/InfoArea.js';
import TodoMain from './components/TodoMain/TodoMain.js';

function Todo() {
  return (
    <>
        <div className="todoapp">
            <Header/>
            <TodoMain/>
        </div>
        <InfoArea/>
    </>
  );
}

export default Todo;
