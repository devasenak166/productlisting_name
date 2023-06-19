import { CartState } from "../Context/Context";
import { Link ,useParams} from "react-router-dom";
import {
  Navbar,
  Container,
  FormControl,
  Dropdown,
  Nav,
  Badge,
  Button,
  DropdownButton
} from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import {auth,db} from '../config/firebase-config';
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {FaUserCircle} from "react-icons/fa";
import {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { signInWithEmailAndPassword  } from "firebase/auth";
import Login from './Login'
function MyVerticallyCenteredModal(props) {
  const [email,setEmail]=useState();
const [password,setPassword]=useState();

const handleLogin= async ()=>{
 const userCredential= await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    console.log("successfully signed in",user)
    const querySnapshot = await getDocs(collection(db, "productlisting"));
    querySnapshot.forEach((doc) => {
      const userData = doc.data();

      if (userData.id === user.uid) {
        console.log("User:", userData);
       console.log(userData.name)
        // Do something with the user data
        setTimeout(()=>{
          window.location=`/${userData.name}/${userData.id}`
         },1000);
      }
      // console.log(userData.name)
        
      });
   
 

}

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Add Users
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <h4>Login</h4>
          <div class="form-floating mb-3">
              <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"  value={email} onChange={(e)=>{
                setEmail(e.target.value)
              }}/>
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password"  value={password} onChange={(e)=>{
                setPassword(e.target.value)
              }}/>
              <label for="floatingPassword">Password</label>
            </div>
            <div class="mt-3">
              Don't you have a account? 
            <a href="/Signin">Sign In</a>
            </div>
      </Modal.Body>
      <Modal.Footer>
          <Button variant='success' onClick={handleLogin} >Login</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
 const Header =  () => {
  // console.log(useParams())
  // let { username } = useParams();
  const pathname = window.location.pathname;
  const encodedUsername = pathname.substring(1);
  const decodedUsername = decodeURIComponent(encodedUsername);
  const username= decodedUsername.split('/')[0];
  const userId=decodedUsername.split('/')[1];
  console.log(userId)
  console.log(username)
  const [modalShow, setModalShow] = useState(false);
  
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();


return (
    <>
  
    <Navbar bg="primary" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Products App
          </Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            type="search"
            placeholder="Search product"
            className="m-auto"
            onChange={(e) =>
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              })
            }
          />
        </Navbar.Text>
        <Nav>
          <Dropdown drop="start">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.map((prod) => (
                <span key={prod.id} className="cartItem">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="cartItemImg"
                  />
                  <div className="cartItemDetail">
                    <span>{prod.name}</span>
                    <span>{prod.price}</span>
                  </div>
                  <AiFillDelete
                    fontSize="20px"
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  />
                </span>
              ))}
              <Link to="/cart">
                <Button style={{ width: "95%", margin: "0 10px" }}>
                  Go to Cart
                </Button>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
         
        </Nav>
        <Button variant="success" onClick={() => setModalShow(true)}>Sign In/Up </Button>
        <DropdownButton id="dropdown-basic-button" > <Dropdown.Item  ><Link to={`/Login/${userId}`} style={{textDecoration:"none",color:"black"}}>profile </Link></Dropdown.Item>
        <Dropdown.Item href="/">sign out</Dropdown.Item> </DropdownButton>
     <FaUserCircle color="white" fontSize="25px"/>{username && <span style={{ color: 'white' ,fontSize:"14px",fontWeight:"600"}}>{username}</span>}
 
      </Container>
    </Navbar>
     <MyVerticallyCenteredModal 
     show={modalShow}
     onHide={() => setModalShow(false)}
   />
   </>
  );
};
export default Header;

