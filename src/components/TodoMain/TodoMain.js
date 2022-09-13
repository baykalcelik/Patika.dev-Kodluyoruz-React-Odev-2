import TodoList from "../TodoList/TodoList";
import TodoBtns from "../TodoBtns/TodoBtns";
import {useContext} from 'react';
import { Merkezdata } from '../../App';


function TodoMain() {

  const todoveri = useContext(Merkezdata);


  return (
    <>
    <section className="todo-area">

    <TodoList/>

    {/* eğer todolist içinde kayıt varsa en alttaki filtreleme butonları ekrana basıldı. yoksa basılmadı.  */}
    {todoveri.todolist.length > 0 ? <TodoBtns/> : ''}

    </section>
    
    </>

  );
}

export default TodoMain;
