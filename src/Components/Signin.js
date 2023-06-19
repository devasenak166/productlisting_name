import {auth,db} from '../config/firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import Alert from 'react-bootstrap/Alert';

const Signin=()=>{
  const[username,setUsername]=useState("")

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const[phone,setPhone]=useState("")
const[address,setAddress]=useState("")
const[city,setCity]=useState("")
const[state,setState]=useState("")
const [gender,setGender]=useState("")

const handleSubmit=  ()=>{
createUserWithEmailAndPassword(auth, email, password)
  .then( async (userCredential) => {
    const user = userCredential.user;
    try {
     const docRef =  await addDoc(collection(db, "productlisting"), {
          id:user.uid,
          name:username,
          email:email,
          password:password,
          phone:phone,
          address:address,
          city:city,
          state:state,
          gender:gender
        });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  
  setTimeout(()=>{
    window.location="/";
  },1000)
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage);
   
  })
 

}
    return(
     
        <div class="container-fluid fw-semibold" style={{background: "rgb(44,22,82)", background: "linear-gradient(90deg, rgba(44,22,82,1) 100%, (222,142,209,1) 100%);"}}>
        <div class="row">
          <div class="col-md-6 shadow p-3 mb-5 rounded text-dark">
          <h5 class="text-center mt-4">Criteria</h5>
        <p>
          <ul class="text-center" style={{listStyleType: "none"}}>
            <li>At least 12 characters long but 14 or more is better.Not a word that can be found in a dictionary or the name of a person,    character, product, or organization.Easy for you to remember but difficult for others to guess. Consider using a memorable phrase like "6MonkeysRLooking Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quos numquam aliquam fugit et perspiciatis voluptatibus quod molestias corrupti, fuga laudantium, quidem nihil quibusdam! Quia veritatis asperiores impedit dolore iste.
            </li>
            <li>At least 12 characters long but 14 or more is better.Not a word that can be found in a dictionary or the name of a person,    character, product, or organization.Easy for you to remember but difficult for others to guess. Consider using a memorable phrase like "6MonkeysRLooking Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quos numquam aliquam fugit et perspiciatis voluptatibus quod molestias corrupti, fuga laudantium, quidem nihil quibusdam! Quia veritatis asperiores impedit dolore iste.
            </li>
            <li>At least 12 characters long but 14 or more is better.Not a word that can be found in a dictionary or the name of a person,    character, product, or organization.Easy for you to remember but difficult for others to guess. Consider using a memorable phrase like "6MonkeysRLooking Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quos numquam aliquam fugit et perspiciatis voluptatibus quod molestias corrupti, fuga laudantium, quidem nihil quibusdam! Quia veritatis asperiores impedit dolore iste.
            </li>
            
          </ul>
        </p>
            </div>
            
         <div class="col-md-6 shadow p-3 mb-5  bg-tertiary  rounded">
        <form class="row g-3 mt-3 ">
          <div class="row mb-5">
            <label for="name" class="col-sm-2 col-form-label  text-dark">Name </label>
            <div class="col-sm-10"> 
              <input type="text" class="form-control" id="name" placeholder="Enter Your Name" value={username} onChange={(e)=>{setUsername(e.target.value)}}required/>
            </div>
          </div> 
          <div class="row mb-5">
            <label for="email" class="col-sm-2 col-form-label  text-dark" >Email </label>
            <div class="col-sm-10">
              <input type="email" class="form-control" id="inputEmail4" placeholder="Enter Your Email" value={email} onChange={(e)=>{
                setEmail(e.target.value)
              }}required/>
            </div>
          </div>
          <div class="row mb-5">
            <label for="password" class="col-sm-2 col-form-label  text-dark">password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="inputPassword4" placeholder="Enter Your password" value={password} onChange={(e)=>{
                setPassword(e.target.value)
              }} required />
            </div>
          </div>
          <div class="row mb-5">
            <label for="Address" class="col-sm-2 col-form-label  text-dark">Address</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="inputAddress" placeholder="Enter Your Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
              </div>
          </div>
          <div class="row mb-5">
            <label for="Phone" class="col-sm-2 col-form-label  text-dark">Phone</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="phone" placeholder="Enter Your Phone number" value={phone} onChange={(e)=>{
                setPhone(e.target.value)
              }}/>
            </div>
          </div>
          <div class="row  mb-5">
            <label for="city" class="col-sm-2 col-form-label  text-dark">City </label>
            <div class="col-sm-10">
              <input type="text" class="form-control " placeholder="Enter Your City" id="inputCity" value={city} onChange={(e)=>{setCity(e.target.value)}}/>
            </div>
          </div>
          <div class="row  mb-5">
            <label for="state" class="col-sm-2 col-form-label  text-dark">State</label>
            <div class="col-sm-10">
              <select id="inputState" class="form-select " value={state} onChange={(e)=>{setState(e.target.value)}}>
                <option selected>Choose...</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerla">Kerla</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Andhra">Andhra</option>
              </select>
            </div>
          </div>
          <div class="row mb-5">
            <label for="gender" class="col-sm-2 col-form-label text-dark">Gender</label>
            <div class="col-sm-10 mt-2 text-dark">
              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Male" onChange={(e)=>{setGender(e.target.value)}}/>&nbsp;&nbsp;&nbsp;&nbsp;Male&nbsp;&nbsp;&nbsp;
              <input class="form-check-input " type="radio" name="exampleRadios" id="exampleRadios1" value="Female" onChange={(e)=>{setGender(e.target.value)}}/>&nbsp;Female
            </div>
          </div>
          <div class="row">
          <div class="col-sm-10">
            <button class="btn btn-outline-success col-4 rounded" type="button" id="submit" onClick={handleSubmit}>Submit</button>
         
 
          </div>
          </div>
        </form>
      </div>
  </div>
  </div> 
    )
}
export default Signin;