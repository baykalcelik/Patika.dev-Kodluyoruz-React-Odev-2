import React, { useRef, useState } from 'react';
import {useContext} from 'react';
import { Merkezdata } from '../../App';

function TodoItem(props) {

  // var olan todo üzerinde değişiklik yapmak için, üzerine tıklanınca açılan input için değer tutan usestate hooku
  const [degisecekYazi, setDegisecekYazi] = useState("");
  
  // const completedCheck = useRef();

  const todoveri = useContext(Merkezdata);


  return (
    <>
      {/* // eğer props dan gelen tamamlandi değeri true ise en dış kapsayıcı etiket olan li etiketinin class adını completed yaptı. */}
      {/* propstan gelen todo kaydında iki değişken var. tamamlandi ve yazi. tamamlandi todonun bitirilme değişkeni, yazi ise todonun texti. eğer todo tamamlandıysa - complete - tamamlandı değişkeni zaten true geleceğinden todonun bilgilerini tutan li elementinin class name özelliğine completed atanacak, false ise hiç bir şey atanmayacak. bu şekilde tamamlanmış öğe için hazırlanan css özellikleri todo üzerine yansıtılmış olacak.  */}
      <li className={'' + (props.item.tamamlandi ? 'completed' : '')}>
          <div className="view" >

              {/* todo textinin sol tarafında yer alan tamamlandı checkbox butonu. eğer tamamlandı true ise checked özelliği aktif ediliyor. false ise checked kaldırılıyor.  */}
              <input className="toggle" type="checkbox" checked={props.item.tamamlandi ? true : false} onChange={(e)=>{

                  // onChange eventı ile checkbox tıklamaları yakalandı. eğer en dış kaplayıcı li etiketi completed classına sahipse kaldırıldı. sahip değilse eklendi. 
                  if(e.target.parentElement.parentElement.classList.contains("completed")){
                    todoveri.dispatch({type:"tamamlandidegistir", yazi:props.item.yazi});
                    // todoveri.bitenhesapla();

                    e.target.parentElement.parentElement.classList.remove("completed");
                  }else{
                    todoveri.dispatch({type:"tamamlandidegistir", yazi:props.item.yazi});
                    // todoveri.bitenhesapla();

                    e.target.parentElement.parentElement.classList.add("completed");
                  }

              }}/>

                {/* todo yazısının tutulduğu label etiketi. todonun değiştirilebilmesi için üzerine tıklanması sağlanmış. tıklama ile beraber li etiketine editing classı ekleniyor. */}
                {/* ve editlemenin yapılacağı input ortaya çıkartılıp ona focus veriliyor. */}
              <label onClick={(e)=>{
                e.target.parentElement.parentElement.classList.add("editing"); 
                e.target.parentElement.nextSibling.focus();

                // ortaya çıkan input içine label içindeki todo yazısı aktarılıyor. daha önce atanan hookun set fonksiyonu kullanılıyor.
                setDegisecekYazi(e.target.innerText); 
                }} >{props.item.yazi}</label>

              <button className="destroy" onClick={(e)=>{
                // silme butonunun onClick metodu açıldı. reducer dispatch metodu çağrıldı. içine type olarak sil değeri verildi. silinecek kaydı bulması içinde propslarla gelen yazı değişkeni aktarıldı. 
                  todoveri.dispatch({type:"sil", yazi:props.item.yazi});
              }}></button>
          </div>



          <input 
          // editleme için kullanılacak edit
          className='edit' 
          // onBlur eventi ile input dışına tıklanınca inputun kapatılması sağlandı. 
          onBlur={(e)=>{
            // li etiketinden editing sınıfı kaldırıldı.
              e.target.parentElement.classList.remove("editing"); 
              // reducer dispatch ile todo içindeki yazı değiştirildi.
              todoveri.dispatch({type:"degistir", asilKayit:props.item.yazi, yazi:e.target.value});
          }} 
          
          // ayrıca enter tuşana basılınca kayıt değişmesi içinde onKeyUp eventi içine de  todo değişiklik kodları girildi.
          onKeyUp={(e)=>{
            e.preventDefault();

            if(e.key === 'Enter'){
              // console.log("Enter'a basıldı.");

              e.target.parentElement.classList.remove("editing"); 

              todoveri.dispatch({type:"degistir", asilKayit:props.item.yazi, yazi:e.target.value});

            }
          }}
          defaultValue={degisecekYazi} />

      </li>
    </>

  )

}

<>

</>
export default TodoItem