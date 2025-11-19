import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import "./Navbar.css";
import { useEffect } from "react";


export default function Navbar() {
useEffect(() => {
  const handleScroll = () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  
  return (
    <nav className="navbar">


      {/*logo*/}
      <Link to="/"> <img
       src="logo empresa.png" 
       alt="logo" 
       className= "logo-site" 
       style={{
        width: "50px", 
        height: 'auto', 
        margin: '6px', 
        filter:"brightness(1000)"}}/> 
        </Link>


      
      <div className = "flex-container" 
      style={{
       display: 'flex', 
       height: 'auto', 
       margin: '6px', 
       justifyContent:"center", 
       color:'white', 
       fontSize:'18px'
       }}>

      <div className="meio" 
      style={{ 
        display: "flex", 
        gap: "30px"
        }}>

        {/*carrinho e coleção (fazer carrinho ir pro canto direito do lado do login)*/}
      <Link to="/colecao"> Coleção </Link>
      
      <Link to="/carrinho" style={{ justifyContent:"flex-end"}}><ShoppingCartIcon/></Link>
      </div>
      </div>

      <div className="nav-right-auth" 
      style={{ 
        display:'flex', 
        gap:'10px', 
        alignItems: "flex-end",  
        color:'white', 
        fontSize:'18px' 
        }}>
        
        <div className="usuario" >

          <PersonIcon className="profile-icon" 
          style={{ 
            cursor: "pointer"
            }} />


          <div className="profile-menu">
                  <p className="profile-text">Registre-se para ficar estiloso!</p>

      <Link to="/cadastro"> Cadastro </Link>
      <Link to="/login" > Login </Link>
      </div>
      </div>
      </div>

          

      
    </nav>
  );

  

  

};

// FLEXBOX --> PRA DAR ESPAÇAMENTO NO MENU(NAVBAR)
// https://css-tricks.com/snippets/css/a-guide-to-flexbox/