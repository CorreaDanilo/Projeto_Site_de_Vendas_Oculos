// import react from "react";
// import Navbar from "./components/Navbar.jsx";
// import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// =======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Colecao from "./pages/colecao/Colecao";
import Carrinho from "./pages/carrinho/Carrinho";
// >>>>>>> 9a32eea7587b64a9904ff03f0e681d8534264576

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/cadastro" element={<Cadastro/>}/>
        <Route path = "/colecao" element={<Colecao/>}/>
        <Route path = "/carrinho" element={<Carrinho/>}/>

      </Routes>
    </Router>
  );
};

// https://mui.com/material-ui/react-stack/#flexbox-gap
  //   <div>
  //     <Navbar />
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/login" element={<Login />} />
  //     </Routes>
  //   </div>
  // };

// https://mui.com/material-ui/react-stack/#flexbox-gap
    // Login? 
   /* <>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="column"
        useFlexGap
        sx={{ flexWrap: 'wrap' }}
      >
        <TextField id="filled-basic" label="Nome Usuário" variant="filled" />
        <TextField id="filled-basic" label="Nome Usuário" variant="filled" />

        <TextField id="filled-basic" label="Senha" variant="filled" />

        <Button variant="contained">Entrar</Button>

      </Stack>

    </> */
// =======
      // <Routes>
      //   <Route path="/" element={<Home />} />
      //   <Route path="/login" element={<Login />} />
      // </Routes>
    // </Router>
  // );

// >>>>>>> 9a32eea7587b64a9904ff03f0e681d8534264576
