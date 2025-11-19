import { useContext, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Carrinho.css";
import { Link } from "react-router-dom";

export default function Carrinho() {
    const { cart, removerDoCarrinho, limparCarrinho, total } = useContext(CartContext);
    const navigate = useNavigate();
    const [compraFinalizada, setCompraFinalizada] = useState(false);
    const timerRef = useRef(null);

    function handleFinalizarCompra() {
        setCompraFinalizada(true);
        limparCarrinho();
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            navigate("/");
        }, 3000);
    }

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
        <div className="carrinho-pagina">
            <h1>Seu Carrinho</h1>
            {cart.length === 0 ? (
                <div>
                    <p>Seu carrinho está vazio.</p>
                    <Link to="/colecao">Voltar à loja</Link>
                </div>
            ) : (
                <div className="carrinho-lista">
                    {cart.map((item, index) => (
                        <div className="carrinho-item" key={item.id || index}>
                            <div className="item-imagem">
                                {item.imagem ? (
                                    <img src={item.imagem} alt={item.nome} />
                                ) : (
                                    <div className="imagem-placeholder">Sem imagem</div>
                                )}
                            </div>
                            <div className="item-detalhes">
                                <h3>{item.nome}</h3>
                                <p>{item.descricao}</p>
                                <div className="item-controles">
                                    <div className="item-quantidade">Quantidade: {item.quantidade || 1}</div>
                                    <strong>R$ {(Number(item.preco) || 0).toFixed(2)}</strong>
                                    <button onClick={() => removerDoCarrinho(index)}>Remover</button>
                                </div>
                            </div>
                            <div className="item-subtotal">R$ {((Number(item.preco) || 0) * (item.quantidade || 1)).toFixed(2)}</div>
                        </div>
                    ))}

                    <div className="carrinho-resumo">
                        <strong>Total: R$ {total.toFixed(2)}</strong>
                        <div className="resumo-acoes">
                            <Link to="/colecao" className="voltar-loja">Voltar à loja</Link>
                            <button onClick={limparCarrinho}>Esvaziar carrinho</button>
                            <button onClick={handleFinalizarCompra}>Finalizar compra</button>
                        </div>
                    </div>
                </div>
            )}
            {compraFinalizada && (
                <ConfirmPortal>
                    <div className="confirmacao" role="status" aria-live="polite">
                        Compra finalizada com sucesso!
                    </div>
                </ConfirmPortal>
            )}
        </div>
    );
}

