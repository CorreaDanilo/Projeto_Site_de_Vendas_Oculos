import { useContext, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../context/CartContext";
import { AutenticacaoContext } from "../context/AutenticacaoContext";
import { useNavigate } from "react-router-dom";

export default function Produtos({ imagem, img, nome, preco, descricao, id }) {
  const { adicionarAoCarrinho } = useContext(CartContext);
  const { estaLogado } = useContext(AutenticacaoContext);
  const navigate = useNavigate();
  const [quantidade, setQuantidade] = useState(1);

  const imagemFinal = imagem || img || "";
  const nomeFinal = nome || "Óculos";
  const precoFinal = preco || 0;
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loginRequiredVisible, setLoginRequiredVisible] = useState(false);
  const timerRef = useRef(null);

  function addCarrinho() {
    if (!estaLogado) {
      setLoginRequiredVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setLoginRequiredVisible(false), 4000);
      return;
    }

    const q = Number(quantidade) || 1;
    adicionarAoCarrinho({ id, imagem: imagemFinal, nome: nomeFinal, preco: precoFinal, descricao, quantidade: q });
    setQuantidade(1);
    // mostra confirmação temporária
    setConfirmVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setConfirmVisible(false), 3000);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // vai confirmar o portal pra deixar o popup de produto add com sucesso no meio do site
  function ConfirmPortal({ children }) {
    if (typeof document === "undefined") return null;
    return createPortal(children, document.body);
  }

  return (
    <div className="produto">
      <div className="produto-imagem-container">
        {imagemFinal ? (
          <img src={imagemFinal} alt={nomeFinal} className="produto-imagem" />
        ) : (
          <div className="produto-imagem produto-imagem-placeholder">Sem imagem</div>
        )}
      </div>

      <h3 className="produto-nome">{nomeFinal}</h3>
      <p className="produto-descricao">{descricao}</p>
      <strong className="produto-preco">R$ {precoFinal}</strong>

      {/* lugar pra digitar quantidade e botão abaixo do preço */}
      <div className="produto-controles">
        <label className="produto-quantidade-label">Quantidade: </label>
        <input
          className="produto-quantidade"
          type="number"
          min={1}
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <button className="botao-carrinho" onClick={addCarrinho}>
          Adicionar ao carrinho
        </button>
      </div>
      {confirmVisible && (
        <ConfirmPortal>
          <div className="confirmacao" role="status" aria-live="polite">
            O produto "{nomeFinal}" foi adicionado ao carrinho com sucesso!
          </div>
        </ConfirmPortal>
      )}
      {loginRequiredVisible && (
        <ConfirmPortal>
          <div className="confirmacao confirmacao-login-erro" role="status" aria-live="polite">
            <div>Você precisa estar logado para adicionar itens ao carrinho!</div>
            <button className="btn-ir-login" onClick={() => navigate("/login")}>
              Ir para Login
            </button>
          </div>
        </ConfirmPortal>
      )}
      
    </div>
  );
}
