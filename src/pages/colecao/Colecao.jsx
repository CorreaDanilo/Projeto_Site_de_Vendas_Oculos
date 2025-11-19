import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Colecao.css";
import { Link } from "react-router-dom";
import Produtos from "../../components/Produtos.jsx";


export default function Colecao() {
  return (
    <div className= "colecao">
<h1>Conheça nossa coleção!</h1>
      <p>Veja os modelos mais recentes e estilosos da nossa loja.</p>

      <div className="colecao-grid">
      <Produtos 
      nome="DAVID OPTICS" 
      preco={495.90}
      imagem={"/oculos11.jpg"}
      descricao=""
       />

 <Produtos 
      nome="SKYLER OPTICS" 
      preco={679.90}
      imagem={"oculos33.webp"}
      descricao=""
       />

 <Produtos 
      nome="HEXAGONAL OPTICS" 
      preco={459.90}
      imagem={"oculos3.webp"}
      descricao=""
       />

 <Produtos 
      nome="JOSEPH OPTICS" 
      preco={529.90}
      imagem={"oculos22.webp"}
      descricao=""
       />

 <Produtos 
      nome="ROUND OPTICS" 
      preco={569.90}
      imagem={"oculos5.webp"}
      descricao=""
       />

 <Produtos 
      nome="ALAIN OPTICS" 
      preco={99.90}
      imagem={"oculos6.webp"}
      descricao=""
       />
   
    </div>
    </div>
  
  );
}