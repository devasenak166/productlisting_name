import Button from 'react-bootstrap/Button';
import {useState,useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { doc, getDoc } from "firebase/firestore";
import Modal from 'react-bootstrap/Modal';
import {
  collection,
  getDocs,
} from "firebase/firestore";
import {auth,db} from '../config/firebase-config';
import { updateDoc } from "firebase/firestore";
function GridComplexExample() {
  const pathname = window.location.pathname;
  const encodedUsername = pathname.substring(1);
  const decodedUsername = decodeURIComponent(encodedUsername);
  const user= decodedUsername.split('/')[1];
  const [userprofile, setUserprofile] = useState(null);
  const [show, setShow] = useState(false);
 const[userIdnumber,setuserId]=useState();
  
 
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "productlisting"));
                console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        const userlogged = doc.data();
        // const userId=doc.id;
        
        console.log(userlogged)
        if (userlogged.id === user) {
          const userId=doc.id;
          console.log(userId)
          console.log("User data:", userlogged);
          setuserId(userId);
          setUserprofile(userlogged);
        }
      });
    };
  
    fetchData();
  }, []);
 
  const handleClose = () => setShow(false);
  const HandleShow = () => {
    
   
    setShow(true);
  }
  const[editname,seteditname]=useState("")
  const[editphone,seteditphone]=useState("")
  const[editaddress,seteditaddress]=useState("")
  const[editemail,seteditemail]=useState("")
  const[editcity,seteditcity]=useState("")
  const[editstate,seteditstate]=useState("")
  useEffect(() => {
    if (userprofile) {
      seteditname(userprofile.name);
      seteditphone(userprofile.phone);
      seteditaddress(userprofile.address);
      seteditemail(userprofile.email);
      seteditcity(userprofile.city);
      seteditstate(userprofile.state);
    }
  }, [userprofile]);
  

 const handlechange= async ()=>{
  console.log("hi")
  const washingtonRef = doc(db, "productlisting",userIdnumber);
  console.log(doc.id)
  await updateDoc(washingtonRef, {
    name:editname,
    email:editemail,
    phone:editphone,
    address:editaddress,
    city:editcity,
    state:editstate

  });
  handleClose ();
  setTimeout(()=>{
    window.location.reload();
  },1000)
 }





  if (!userprofile) {
    return <div>Loading...</div>;
  };
  
  return (
  
   <div class="container-fluid">
  <div class="row">
    <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div class="offcanvas-lg offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="#dashboard">
                {/* <svg class="bi"><use xlink:href="#house-fill"/></svg> */}
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#orders">
                {/* <svg class="bi"><use xlink:href="#file-earmark"/></svg> */}
                Orders
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#products">
                {/* <svg class="bi"><use xlink:href="#cart"/></svg> */}
                Products
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#customers">
                {/* <svg class="bi"><use xlink:href="#people"/></svg> */}
                Customers
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#reports">
                {/* <svg class="bi"><use xlink:href="#graph-up"/></svg> */}
                Reports
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#integration">
                {/* <svg class="bi"><use xlink:href="#puzzle"/></svg> */}
                Integrations
              </a>
            </li>
          </ul>

          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Saved reports</span>
            <a class="link-secondary" href="#plus" aria-label="Add a new report">
              {/* <svg class="bi"><use xlink:href="#plus-circle"/></svg> */}
            </a>
          </h6>
          <ul class="nav flex-column mb-auto">
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#current">
                {/* <svg class="bi"><use xlink:href="#file-earmark-text"/></svg> */}
                Current month
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#last">
                {/* <svg class="bi"><use xlink:href="#file-earmark-text"/></svg> */}
                Last quarter
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#social">
                {/* <svg class="bi"><use xlink:href="#file-earmark-text"/></svg> */}
                Social engagement
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#yearendsale">
                {/* <svg class="bi"><use xlink:href="#file-earmark-text"/></svg> */}
                Year-end sale
              </a>
            </li>
          </ul>

          <hr class="my-3"/>

          <ul class="nav flex-column mb-auto">
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#settings">
                {/* <svg class="bi"><use xlink:href="#gear-wide-connected"/></svg> */}
                Settings
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#signout">
                {/* <svg class="bi"><use xlink:href="#door-closed"/></svg> */}
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">My profile</h4>
        <form class="needs-validation" novalidate>
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">First name</label>
              {/* <input type="text" class="form-control" id="firstName" placeholder="" value="" required/> */}
              {/* {console.log(userData.name)} */}
              <h6>{userprofile.name}</h6>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Last name</label>
              {/* <input type="text" class="form-control" id="lastName" placeholder="" value="" required/> */}
              <h6>{userprofile.name}</h6>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>

           <div class="col-sm-6">
              <label for="username" class="form-label">Gender</label>
            <h6>{userprofile.gender}</h6>
              <div class="invalid-feedback">
                  Your username is required.
                </div>
              
            </div> 
            <div class="col-sm-6">
              <label for="username" class="form-label">Phone</label>
            <h6>{userprofile.phone}</h6>
              <div class="invalid-feedback">
                  Your username is required.
                </div>
              
            </div> 
            <div class="col-sm-6">
              <label for="email" class="form-label">Email </label>
              {/* <input type="email" class="form-control" id="email" placeholder="you@example.com"/> */}
              <h6>{userprofile.email}</h6>
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="address" class="form-label">Address</label>
              {/* <input type="text" class="form-control" id="address" placeholder="1234 Main St" required/> */}
              <h6>{userprofile.address}</h6>
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="country" class="form-label">City</label>
              {/* <select class="form-select" id="country" required>
                <option value="">Choose...</option>
                <option>United States</option>
              </select> */}
              <h6>{userprofile.city}</h6>
              <div class="invalid-feedback">
                Please select a valid country.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="state" class="form-label">State</label>
              {/* <select class="form-select" id="state" required>
                <option value="">Choose...</option>
                <option>California</option>
              </select> */}<h6>{userprofile.state}</h6>
              <div class="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>

            {/* <div class="col-md-3">
              <label for="zip" class="form-label">Zip</label>
              <input type="text" class="form-control" id="zip" placeholder="" required/>
              <div class="invalid-feedback">
                Zip code required.
              </div>
            </div> */}
          </div>
          </form>
          <button class="w-25 btn btn-primary btn-sm mt-5" onClick={HandleShow} >Edit My Profile</button>
      </div>
    </div>
  </main>
  
  <Modal show={show} onHide={handleClose} >
  
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" placeholder="username" value={editname} onChange={(e)=>{e.preventDefault();seteditname(e.target.value)}}/>
                        <label for="name"></label>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={editemail}  onChange={(e)=>{e.preventDefault();seteditemail(e.target.value)}}/>
                        <label for="floatingInput">Email address</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={userprofile.password}/>
                        <label for="floatingPassword">Password</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="Address" placeholder="Address" value={editaddress}  onChange={(e)=>{e.preventDefault();seteditaddress(e.target.value)}}/>
                        <label for="Address">Address</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="phone" placeholder="phone" value={editphone}  onChange={(e)=>{e.preventDefault();seteditphone(e.target.value)}}/>
                        <label for="phone">phone</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="city" placeholder="city" value={editcity}  onChange={(e)=>{e.preventDefault();seteditcity(e.target.value)}}/>
                        <label for="city">city</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="state" placeholder="state" value={editstate}  onChange={(e)=>{e.preventDefault();seteditstate(e.target.value)}}/>
                        <label for="state">state</label>
                      </div>
                    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlechange} >
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>

</div>
</div>

  );
}

export default GridComplexExample;