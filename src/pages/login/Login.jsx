import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { AutenticacaoContext } from "../../context/AutenticacaoContext";
// import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { fazer_login } = useContext(AutenticacaoContext);

  useEffect(() => {
    const isAuthenticated = false;
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorVisible, setLoginErrorVisible] = useState(false);
  const timerRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados de Login:", { username, password });

    // 🔹 ADIÇÃO: verificar usuário salvo no "JSON" (localStorage)
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuariosSalvos.find(
      (u) => u.username === username && u.password === password
    );

    if (usuarioEncontrado) {
      alert(`Bem-vindo, ${usuarioEncontrado.nome}!`);
      fazer_login(usuarioEncontrado);
      navigate("/");
    } else {
      // mostrar toast/portal de erro
      setLoginErrorVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setLoginErrorVisible(false), 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function ConfirmPortal({ children }) {
    if (typeof document === "undefined") return null;
    return createPortal(children, document.body);
  }

  return (    
    <div className="page-wrapper">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Acesse o sistema</h1>
          <div className="input-field">
            <input
              type="text"
              placeholder="E-mail"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>

          <div className="signup-link">
            <p>
              Não tem uma conta? <Link to="/cadastro"> Registrar</Link>
            </p>
       
          </div>
        </form>
      </div>
      {loginErrorVisible && (
        <ConfirmPortal>
          <div className="confirmacao" role="status" aria-live="polite">
            Usuário ou senha incorretos!
          </div>
        </ConfirmPortal>
      )}
    </div>
  );
}