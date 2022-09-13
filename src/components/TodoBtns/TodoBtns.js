import React from 'react';
import {useRef} from 'react';
import {useContext} from 'react';
import { Merkezdata } from '../../App';

function TodoBtns() {

	const todoveri = useContext(Merkezdata);

	// bütün filtreleme tuşları için referans atamaları yapıldı. 
	const all = useRef();
	const active = useRef();
	const completed = useRef();

  return (
    <>

    	<footer className="footer">
				<span className="todo-count">
					{/* tamamlanmamış todo adetini göstermek için açılan strong etiketi içine usercontext den alınan completedCount değişkeni yazıldı.  */}
					<strong>{todoveri.completedCount}</strong>
					&nbsp;items left
				</span>

				<ul className="filters">
					<li>
						<a href="#/" ref={all} className="selected" onClick={(e)=>{

							if(e.target.classList.contains("selected")){

							}else{
								// eğer All filtre butonuna - anchor - tıklanırsa diğer butonlardan selected classı kaldırılır. ardından bu butona selected classı eklenir. daha sonrada usercontext içinden alınan setfiltrtype useState hook fonksiyonu ile en dıştaki kapsayıcı componentde bulunan filtertype değeri all olarak ayarlanır. ve yukarıdaki listede tüm todoların listelenmesi sağlanır.
								completed.current.classList.remove("selected");
								active.current.classList.remove("selected");
								all.current.classList.add("selected");
								todoveri.setfiltertype('all');

							}
						}}>All</a>
					</li>
					<li>
						<a href="#/"  ref={active} onClick={(e)=>{
							if(e.target.classList.contains("selected")){
							}else{

								// Active butonuna tıklanınca diğer butonların class isimlerinden selected silinir ve bu butona selected atanır. setfiltertype ile de tamamlanmaış todoların listelenmesi sağlanır.
								completed.current.classList.remove("selected");
								active.current.classList.add("selected");
								all.current.classList.remove("selected");
								todoveri.setfiltertype('active');
							}
						}}>Active</a>
					</li>
					<li>
						<a href="#/"   ref={completed} onClick={(e)=>{
							if(e.target.classList.contains("selected")){
							}else{
								// bu butona tıklanınca diğer butonların selected classları silinir. bu butona selected classı eklenir. setfiltertype ile aktif filtre seçeneği completed yapılır.  
								completed.current.classList.add("selected");
								active.current.classList.remove("selected");
								all.current.classList.remove("selected");
								todoveri.setfiltertype('completed');
							}
						}}>Completed</a>
					</li>

				</ul>

				<button className="clear-completed"  onClick={(e)=>{
						// tamamlananların hepsini bir defada silmek için reducer dispatch konksiyonuna type olarak tamamsil verilerek dispatch çağrılır.
							todoveri.dispatch({type:"tamamsil"});
						}}>
					Clear completed
				</button>
			</footer>

    </>
  )
}

export default TodoBtns