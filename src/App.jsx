import { useState, useEffect } from "react"
import axios from "axios"
export default function App(){
   const [blogList , setBlogList ] = useState([])
   const fetchProducts = () =>{
    axios.get("http://localhost:3000/prodotti").then(function (res){
      setBlogList(res.data)
      
    })
   }
    useEffect( fetchProducts , []);
    console.log(blogList)

    

    

 return(
       <div className="container">
        <h1>Food blog</h1>
        <div className="row">
         {blogList.map((item) => {
          return(
            <div class="card" key={item.id}>
              <button class="delete-btn">×</button>
            <img src={item.immagine}alt={item.titolo}/>
            <div class="card-content">
                <div class="card-title">{item.titolo}</div>
                <div class="card-text">{item.descrizione}.</div>
            </div>
        </div>
                
          )
         })}

          
      </div> 
       </div>
 )
}