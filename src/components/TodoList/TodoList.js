import React, { useRef } from 'react'
import TodoItem from '../TodoItem/TodoItem.js';
import {useContext} from 'react';
import { Merkezdata } from '../../App';


function TodoList() {
  
  const gizlicheckbox = useRef(); // hepsini tamamlandı tapan yeni kayıt girişini solundaki checkbox'a referans atandı.

  // usercontext verisi çekildi. 
  const todoveri = useContext(Merkezdata);

  // if(todoveri.todolist.length === 0){
  //   gizlicheckbox.current.removeAttribute("checked");
  // }
  // console.log(gizlicheckbox.current);


  return (
    <>
    	<section className="main">

        {/* {todoveri.todolist.length === 0 && gizlicheckbox.current.removeAttribute("checked")} */}

            {/* checkbox referans bağlantısı yapıldı.  */}
          <input className="toggle-all" type="checkbox" ref={gizlicheckbox} checked={todoveri.todolist.length === 0 || todoveri.todolist.length === todoveri.completedCount ? false : true} onChange={()=>{}}/>

          {/* checkbox'ı gösteren label etiketine onClick eklendi.  */}
          <label htmlFor="toggle-all" onClick={(e)=>{
            // checkbox'ın checked attribute toggle edildi. 
            if(gizlicheckbox.current.hasAttribute("checked")){
              gizlicheckbox.current.removeAttribute("checked");
            }else{
              gizlicheckbox.current.setAttribute("checked", "");
            }
            
            // reducer dispatch fonksiyonu, hepsiniTamamla type'ı ile çalıştırıldı.  
            todoveri.dispatch({type:"hepsiniTamamla"});
          }}>
            Mark all as complete
          </label>





          <ul className="todo-list">

            {/* // asıl todo kayıtlarının listelendiği alan. */}

            {/* userContexten alınan todoveri nesnesinin içinden todolist alındı ve map ile tüm elemanları kontrol edildi. */}
              {todoveri.todolist.map((item, index)=>{

                  // eğer filtre butonlarından girilen değer all ise kayıtlar aynen ul içine eklendi.
                if(todoveri.filtertype === 'all'){
                  return <TodoItem key={index} item={item} />
                }else if(todoveri.filtertype === 'completed'){ // filtre tipi completed ise 
                  if(item.tamamlandi === true) return <TodoItem key={index} item={item} /> // kaydın tamamlandi değişkeni true olanlar ekrana basıldı.
                }else if(todoveri.filtertype === 'active'){ // eğer filtre tipi active ise
                  if(item.tamamlandi === false) return <TodoItem key={index} item={item} /> // kaydın tamamlandi değişkeni false olanlar ekrana bastırıldı.
                }
                
              })}
              
          </ul>




      </section>
    </>
  )
}

export default TodoList