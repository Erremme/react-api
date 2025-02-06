import { useState, useEffect } from "react"
import axios from "axios"

const initialFormData = {
  titolo : "",
  descrizione : "",
  immagine : "",
  ingredienti :[]
}

export default function App(){
  // stato del blog list che mi arriva dal BE
   const [blogList , setBlogList ] = useState([])
   const [formData , setFormData] = useState(initialFormData)

   //funzione che fa la richiesta get al BE
   const fetchProducts = () =>{
    axios.get("http://localhost:3000/prodotti").then(function (res){
      setBlogList(res.data)
      
    })
   }
    
   //funzione che rende reattivi i campi imput modificando i valori
   const handleFormData = (fieldName , value)=> {
    setFormData( (currentFormData) =>{
      return(
              {...currentFormData , [fieldName] : value}
              
            )
    })
   }
    
   //funzione che  fa la richiesta post al BE e restituisce e restituisce il nuovo array con il nuovo oggetto
   //e poi svuota i campi
     const HandleOnSubmit = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3000/prodotti " , formData).then( function (response){
          setBlogList((currentBlogList) => ([...currentBlogList , response.data]))
          setFormData(initialFormData)
        })
              
      }


      const handleDelete = (id) =>{
        axios.delete(`http://localhost:3000/prodotti/${id}`)
        setBlogList((currentBlogList) =>
          currentBlogList.filter((product) => product.id !== id)
        )
      }

        

       
      
     



   // mi constente di fare una sola richiesta al BE appena si carica la pagina
    useEffect( fetchProducts , []);
  
 return(
       <div className="container">
        <h1>Food blog</h1>
        <div className="row">
         {blogList.map((item) => {
          return(
            <div className="card" key={item.id}>
              <button onClick={(event) => handleDelete(item.id)} className="delete-btn">×</button>
            <img src={item.immagine}alt={item.titolo}/>
            <div className="card-content">
                <div className="card-title">{item.titolo}</div>
                <div className="card-text">{item.descrizione}.</div>
            </div>
        </div>
                
          )
         })}  
      </div> 
      <hr />

      <form onSubmit={HandleOnSubmit}>
        <label htmlFor="titlo">TITOLO*</label>
        <input 
        id= "titolo"
        type="text"
        required 
         placeholder="Inserisci il titolo del prodotto" 
         value={formData.titolo}
         onChange={(event) => handleFormData("titolo" , event.target.value)}
         />
         <label htmlFor="descrizione">DESCRIZIONE*</label>
        <input 
        id="descrizione"
        type="text" 
        required
        placeholder="Inserisci la descrizione del prodotto" 
        value={formData.descrizione}
        onChange={(event) => handleFormData("descrizione" , event.target.value)}
        />
        <label htmlFor="img">IMMAGINE URL*</label>
        <input 
        id="img"
        type="url"
        required  
         placeholder="incolla l' url del immagine del prodotto"
         value={formData.immagine}
         onChange={(event) => handleFormData("immagine" , event.target.value)}
          />

        <label htmlFor="ingredienti">INGREDIENTI*</label>
        <input
        id="ingredienti"
         type="text"
         required
         placeholder="Inserici gli ingredienti del prodotti"
         value={formData.ingredienti}
         onChange={(event) => handleFormData("ingredienti" , event.target.value)}
          />

          <button type="submit"> Invia nuovo prodotto</button>
      </form>
          
       </div>
 )
}