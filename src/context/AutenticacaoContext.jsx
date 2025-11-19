import { createContext, useState, useEffect } from "react";

export const AutenticacaoContext = createContext();

export function ProvedorAutenticacao({ children }) {
  const [estaLogado, setEstaLogado] = useState(() => {
    try {
      const raw = localStorage.getItem("usuarioLogado");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  function fazer_login(usuario) {
    setEstaLogado(usuario);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  }

  function fazer_logout() {
    setEstaLogado(null);
    localStorage.removeItem("usuarioLogado");
  }

  return (
    <AutenticacaoContext.Provider value={{ estaLogado, fazer_login, fazer_logout }}>
      {children}
    </AutenticacaoContext.Provider>
  );
}

export default ProvedorAutenticacao;
