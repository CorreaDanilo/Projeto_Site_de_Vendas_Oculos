import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Cadastro() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = false;
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState(dayjs());
  const [endereco, setEndereco] = useState("");
  const [erroNascimento, setErroNascimento] = useState("");
  const [erroEmail, setErroEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // 🔹 VALIDAÇÃO DO E-MAIL
    const emailValido = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/;
    if (!emailValido.test(username)) {
      setErroEmail("Email inválido! Use: gmail, hotmail ou outlook.com");
      return;
    } else{
      setErroEmail("");
    }

    // 🔹 VALIDAÇÃO DA DATA DE NASCIMENTO
    if (!nascimento || !dayjs(nascimento).isValid()) {
      setErroNascimento("Data de nascimento inválida.");
      return;
    }

    const hoje = dayjs();
    const dataNasc = dayjs(nascimento);
    const idade = hoje.diff(nascimento, "year");

    if (dataNasc.isAfter(hoje)) {
      setErroNascimento("A data de nascimento não pode ser no futuro.");
      return;
    }

    setErroNascimento("");

    console.log("Dados de Cadastro:", {
      nome,
      nascimento: nascimento.format("DD-MM-YYYY"),
      endereco,
      username,
      password,
    });

    // 🔹 ADIÇÃO: salvar usuário no "JSON" (localStorage)
    const novoUsuario = {
      nome,
      nascimento: nascimento.format("DD-MM-YYYY"),
      endereco,
      username,
      password,
    };

    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuariosSalvos.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));

    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Acesse o sistema</h1>

          {/* E-mail */}
          <div className="input-field">
            <input
              type="text"
              placeholder="E-mail"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
              {erroEmail && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {erroEmail}
              </p>
            )}
          </div>

          {/* Nome */}
          <div className="input-field">
            <input
              type="text"
              placeholder="Nome completo"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Data de Nascimento */}
          <div className="input-field">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data de Nascimento"
                value={nascimento}
                onChange={(novaData) => setNascimento(novaData)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    InputLabelProps: {
                      style: { color: "#fff" },
                    },
                    InputProps: {
                      style: {
                        color: "#fff",
                        backgroundColor: "transparent",
                        borderRadius: "40px",
                        height: "50px",
                        padding: "0 20px",
                      },
                    },
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid rgba(255,255,255,0.2)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#fff",
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>

            {erroNascimento && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {erroNascimento}
              </p>
            )}
          </div>

          {/* Endereço */}
          <div className="input-field">
            <input
              type="text"
              placeholder="Endereço"
              required
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>

          {/* Senha */}
          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Cadastrar</button>

          <div className="signup-link">
            <p>
              Já tem uma conta? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}