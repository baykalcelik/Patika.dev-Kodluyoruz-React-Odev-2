import React, { useState } from 'react';
import {useContext} from 'react';
import { Merkezdata } from '../../App';



function Header() {;

  // userContext içeriği çekildi
  const todoveri = useContext(Merkezdata);

  // input içinde veri girişi yapılabilmesi için usestate hooku atandı. 
  const [inputveri, setInputveri] = useState('');

  return (
    <>
      <header className="header">
          <h1>todos</h1>
          <form onSubmit={(e)=>{e.preventDefault();}}>

            <input 
            className="new-todo" 
            placeholder="What needs to be done?" 
            autoFocus 
            value={inputveri}

            // onchange ile klavyeden yazılan tazının input için açılan hooka aktarılması sağlandı.
            onChange={(e)=>{ setInputveri(e.target.value)}}

            // onkeyup ile enter tuşan basılması yakalandı.
            onKeyUp={(e)=>{

                if(e.key === 'Enter'){
                  if(e.target.value.trim().length > 0){ // eğer kalvyeden girilen textin uzunluğu 0 dan uzunsa işlem başladı.

                    // reducer dispatch fonksiyonu usercontext den çağrıldı. type olarak ekle verildi. yazi olarak input içindeki değer verildi. 
                    todoveri.dispatch({type:"ekle", yazi:e.target.value});

                    // girişten sonra inputun içinin temizlenmesi için setInput hook metoduna boş string verildi.
                    setInputveri('');
                  }else{
                    console.log("boş giriş");
                  }

                }
            }}/>
          </form>
      </header>
    </>
    )
}

export default Header