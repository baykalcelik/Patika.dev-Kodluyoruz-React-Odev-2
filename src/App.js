import './App.css';

// UseContext hookunu kullanabilmek için createContext metodu reacttan çekildi. 
import { createContext, useEffect, useReducer, useState } from 'react';


import Todo from './Todo.js';


// localstorage kaydında, aynı içeriğe sahip key birden fazla kullanılamayacağı için, keyleri farklılaştırmak için rastgele id değerleri eklenmesi bir çözüm olarak kullanıldı. rastgele idler için bu fonksiyon yazıldı.  
function getRandomid(){
  return Math.floor(Math.random() * 1000000);
}

// tamamlanan görevlerin sayısını tutmak için değişken atandı.
let completedCount = 0;

// createContext ile Merkezdata adında bir useContext hooku açıldı.
export const Merkezdata = createContext();




// App  fonk. başlangıç
function App() {

  // tüm verilerin toplanması için useReducer hooku kullanıldı.
  const [todolist, dispatch] = useReducer(reducer, []);

  // alttaki filtreleme butonlarının çalışması için bir useState hooku kullanıldı. bu hookun değişkeni ve fonksiyonunu, userContext ile açtığımız Merkezdata provider'ına atandı.
  const [filtertype, setfiltertype] = useState('all');
  

  // program ilk başladığında localstorageda bulunan, daha önce kayıt edilmiş veriyi çekmek için fonksiyon
  const lsdatagetir = ()=>{
  
    if(localStorage.length > 0){ // local storageda veri varmı yok mu bakıldı

      for(let x = 0; x < localStorage.length; x++){ // localstorage verilerini sırayla okuyacak for döngüsü
        
        if(localStorage.key(x).includes("todoapp") ){  // localstoragedan key metodu ile x indexine göre alınan key değeri bizim özellikle eklediğimiz  todoapp  textini içinde barındırıyormu bakıldı. yani bizim kayıtlarla diğer kayıtlar ayıklandı.

          // key'in sakladığı değer alındı.
          let gelenyazi = localStorage.getItem(localStorage.key(x));
          
          // (bitti) texti, kayda alınan todo görevinin tamamlandığını gösteren anahtar kelime. asıl kayıt nesnesinde tamamlandi-boolean değişkeni ile tutulan değerin localstorage yapısında kaydı bu şekilde tutuldu. asıl yazı değerinin sonuna (bitti) texti eklendikten sonra localstorage içine kaydı yapıldı.
          // key'den gelen değerde (bitti) yazısının olup olmadığına bakıldı. eğer varsa durum değişkenine true yoksa false atandı. 
          let durum = gelenyazi.includes('(bitti)') ? true : false;

          // eğer keyden gelen değer içinde (bitti) texti varsa replace komutu ile çıkartılarak, dispatch fonk. gönderilecek text olarak atandı, eğer yoksa keyden gelen değerin aynen kendisi verildi.
          let text = gelenyazi.includes('(bitti)') ? gelenyazi.replace("(bitti)", "") : gelenyazi;

          // son olarak dispatch fonk. ile reducera kayıt yollandı. 
          // localstoragedan ilk kez okunan veri olduğu için, reducer içinde ilkacilisekle adında bir type tanımlandı ve todo nesnesi için gereken todo yazisi ve tamamlandı-boolean değişkenide parametrelere eklenip dispatch çalıştırıldı.
          dispatch({type:"ilkacilisekle", yazi: text, tamamlandi:durum});

        }
      }
    }else{
      console.log("localstorage boş !");
    }
  }
  
  
  // state değişimleri için reducer hooku kullanıldı. aşağıdaki reducer fonksiyonuda useReducer() hookunun içine parametre olarak verilen reducer fonksiyonu.
  function reducer(state, action){


    // reducer içindeki asıl işlemlerde kullanmak için gerekli olan ilk yardımcı fonksiyon.
    // todo kayıtlarında yapılan değişikliklerde 2. kayıtlar localstorageda tutulduğu için onlarında değişmesi gerekmektedir. bu değişimi sağlamak için aşağıdaki fonk. yazıldı.
    // bu fonksiyon local storagedaki tüm todo kayıtlarını  siler, ardından todolist-array'inde tutulan tüm kayıtları tekrar locak storage içine atar.
    function updateLocalStorage(){

      if(localStorage.length > 0){  // localstorage boş mu kontrol et!

        // tüm localstorage kayıtlarına tek tek bak
        for(let x = localStorage.length - 1; x > -1 ; x--){
          // eğer kayıtta todoapp  texti varsa sil
          if(localStorage.key(x).includes("todoapp") ){
            localStorage.removeItem(localStorage.key(x));
          }
        }

      }else{
        console.log("localstorage boş !");
      }


      // ardından   state içindeki (todolist) tüm veriyi tekrar localstorage içine yaz.
        state.forEach((item)=>{
          localStorage.setItem("todoapp"+getRandomid(), item.yazi + (item.tamamlandi === true ? '(bitti)':''));
        });
  

      


    }


    // todolist kayıtlarında toplam kaçtane tamamlanmamış görev var hesaplayan fonksiyon 
    const bitmeyenhesapla = ()=>{
      let result = 0;
      state.forEach((item)=>{
        if(item.tamamlandi === false) result++;
      });
      completedCount = result;
    }


    // kayıt ekleme reducer conditionı. dispatch içinden gelen nesnenin type özelliğine bakılır. eğer ekle ise yeni kayıt eklenir. parametre olarak todonun yazı kısmıda gelir.  
    if(action.type === "ekle"){
      // state arrayi içine yeni kayıt nesnesi push edilir. parametre olarak tamamlandi için default olarak false verilir. yazi olarakta dispatchden gelen yazi kullanılır.
      state.push({tamamlandi:false, yazi:action.yazi });
      // tamamlanmamış kayıt adeti bulunur.
      bitmeyenhesapla();

      // localstorage update edilir.
      updateLocalStorage();
      return [...state];
    }


    // ilk program açılışında localstoragedan çekilen kayıtları ekleyen reducer condition. 
    if(action.type === "ilkacilisekle"){

      // state içine hazırlanan todo nesnesi push edilir. push nesnesine dispatchden gelen tamamlandi ve yazi değerleri aktarılır.
      state.push({tamamlandi:action.tamamlandi, yazi:action.yazi });

      // tamamlanmamış kayıt adeti bulunur.
      bitmeyenhesapla();
      return [...state];
    }



    // kayıt silme condition.
    if(action.type === "sil"){
      // filter ile state içindeki array elemanları tek tek gözden geçirilir ve dispatchden gelen todo yazısı ile eleman içindeki yazi karşılaştırılır. filter aynı olan kaydı gözardı eder ve diğer kayıtları geri döner.
      let temp = state.filter(item=>{return item.yazi !== action.yazi });
      
      state = temp; 
      // tamamlanmamış kayıt adeti bulunur.
      bitmeyenhesapla();

      // localstorage update edilir.
      updateLocalStorage();
      return [...state];
    }


    // sadece todo kaydının tamamlandi-boolean değerini değiştirir. yani kaydı completed sınıfına alır.
    if(action.type === "tamamlandidegistir"){
      // map ile state elemanları tek tek alınır. eğer state elemanının yazı değeri ile dispatchden gelen yazi değeri aynı ise tamamlandi-boolean değişkenini tersine çevirir.
      let temp = state.map(item=>{
          if(item.yazi === action.yazi){
            item.tamamlandi = !item.tamamlandi; return item;
          }else{
            return item
          }  
      });      
      state = temp; 
      bitmeyenhesapla();
      updateLocalStorage();
      return [...state];
    }


    // todo kaydının yazı kısmında değişiklik yapar.
    if(action.type === "degistir"){

      let temp = state.map(item=>{
          if(item.yazi === action.asilKayit){
            item.yazi = action.yazi; return item;
          }else{
            return item
          }  
      });   
      updateLocalStorage();   
      return [...temp];
    }





    // clear completed   butonu için hazırlandı. tamamlanmış tüm görevleri siler.
    if(action.type === "tamamsil"){
      // filter ile tüm todo kayıtlarına bakılır. eğer tamamlandı değeri false ise (yani tamamlanmadıysa return edilip state içinde tutulur. diğerleri atılır.)
      let temp = state.filter(item=>{
          return item.tamamlandi === false;
      });   
      state = temp; 
      bitmeyenhesapla();
      updateLocalStorage();
      return [...state];
    }




    // todolist kayıtlarının tamamının tamamlandi-boolean değişkenini true yapar. eğer tamamı true ise false yapar.
    if(action.type === "hepsiniTamamla"){
      let sayac =  0;

      // bütün todo kayıtları içinde kaç tane tamamlanan var bulur.
      state.forEach(item => {
        if(item.tamamlandi === true) sayac += 1;
      });

      // eğer bulunan değer todokayıtlarının (state) uzunluğu ile aynıysa hepsi tamamlanmış olduğu için hepsini foreach ile false yapar.
      if(sayac === state.length) {
        state.forEach((item, index, array) => {
          array[index].tamamlandi = false;
        });
      }else{  // eğer arada tamamlanmamış kayıtlar varsa hepsini tamamlandi - true yapar.
        state.forEach((item, index, array) => {
          array[index].tamamlandi = true;
        });
      }

      
      bitmeyenhesapla();
      updateLocalStorage();
      return [...state];

    }  // hepsitamamlandi if sonu



  }  //   reducer sonu


  useEffect(()=>{
    // dependence için verilen boş array [] ile yalnızca 1 kez çalıştırılır.
    // lsdatagetir fonksiyonu ile açılışta localstoragedaki veriler okunur.
    lsdatagetir();
  }, []);



  return (
    <>   
        {/* UserContext hookunun provider kapsayıcısı, en üst seviyeye konularak todo application'ı içine alınır. */}
        {/* reducer state'i içindeki todolist ve dispatch value kısmına nesne öğesi olarak eklenir. */}
        {/* tamamlanmamış todo adeti completedCount değişkeni olarak eklenir. */}
        {/* filter butonlarının çalışması için gerekli olan filtertype ve setfiltertype useState hook anahtarlı eklenir. */}
        <Merkezdata.Provider value={{todolist, dispatch,  completedCount, filtertype, setfiltertype }}>
            <Todo  />
        </Merkezdata.Provider>
    </>
  );
}

export default App;
