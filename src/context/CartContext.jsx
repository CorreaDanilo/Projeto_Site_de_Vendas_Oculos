import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  function adicionarAoCarrinho(item) {
    setCart((prev) => {
      const idx = prev.findIndex(
        (p) => (p.nome && item.nome && p.nome === item.nome)
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantidade: (copy[idx].quantidade || 1) + (item.quantidade || 1) };
        return copy;
      }
      return [...prev, { ...item, quantidade: item.quantidade || 1 }];
    });
  }

  function removerDoCarrinho(index1) {
    setCart((prev) => prev.filter((p, i) => p.nome !== index1 && i !== index1));
  }

  function limparCarrinho() {
    setCart([]);
  }

  function atualizarQuantidade(index2, quantidade) {
    setCart((prev) => {
      const copy = [...prev];
      if (copy[index2]) copy[index2].quantidade = quantidade;
      return copy;
    });
  }

  const total = cart.reduce((acc, p) => acc + (Number(p.preco) || 0) * (p.quantidade || 1), 0);

  return (
    <CartContext.Provider value={{ cart, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, atualizarQuantidade, total }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
