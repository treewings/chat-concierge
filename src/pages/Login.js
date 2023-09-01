"use client";

import { useState } from "react";

import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { secretKey } from "../../config";

import axios from "axios";
import apiUrl from "../utils/Utils";

if (!secretKey) {
  throw new Error("A chave secreta não está definida.");
}

// export default FormGroupExample;
export default function Login() {
  const jwt = require("jsonwebtoken");

  // PREDEFINE AS VARIÁVEIS DE LOGIN
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [empresa, setEmpresa] = useState("");

  // DEFINE UM ESTADO PARA GUARDAR O RESULTADO DA API
  const [apiResultado, setApiResultado] = useState(null);
  const [mostrarBotao, setMostrarBotao] = useState(true);

  const EnviarDadosAPI = async ({ loginValue, senhaValue, empresaValue }) => {
    try {
      const response = await axios.post(apiUrl + "/login", {
        empresa: empresaValue,
        login: loginValue,
        senha: senhaValue,
      });
      return response;
    } catch (error) {
      // console.error('Erro na requisição à API:', error);
      return error;
    }
  };

  // Função para criar um token JWT com informações do usuário
  function gerarToken(usuario) {
    try {
      // Verifica se a secretKey está definida
      if (!secretKey) {
        throw new Error("A chave secreta não está definida.");
      }

      // Gere o token com a chave secreta e defina a expiração (opcional)
      const token = jwt.sign(
        {
          usuario: usuario.infos_usuario,
          empresa: usuario.empresa,
          permissoes: usuario.permissoes,
        },
        secretKey,
        { expiresIn: 60 * 60 }
      );
      return token;
    } catch (error) {
      console.error("Erro ao gerar token:", error.message);
      // Você pode tratar o erro aqui, como exibir uma mensagem de erro para o usuário
      return ""; // ou lançar uma exceção, dependendo da lógica do seu aplicativo
    }
  }

  // FUNÇÃO QUE ENVIA OS DADOS PARA VERIFICAR O LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMostrarBotao(false); // Esconde o primeiro botão após o envio do formulário

    // Pega os valores informados pelo usuário
    const formData = new FormData(e.currentTarget);
    const loginValue = String(formData.get("login"));
    const senhaValue = String(formData.get("senha"));
    const empresaValue = String(formData.get("empresa"));

    // Verifica se o usuário informou todos os campos
    if (loginValue === "" || senhaValue === "" || empresaValue === "") {
      toast.warning("Preencha todos os campos necessários!");
      setMostrarBotao(true); // Mostra novamente o primeiro botão após a resposta ser recebida
    } else {
      // Se todos os campos estiverem preenchidos, envia os dados para a API
      const dadosParaAPI = { loginValue, senhaValue, empresaValue };
      const resultado = await EnviarDadosAPI(dadosParaAPI); // Utiliza await para esperar pela resolução da Promise
      // Verifica o resultado retornado pela API
      if (resultado && resultado.code) {
        // A API retornou a propriedade 'code', portanto, tratamos os casos de erro
        const status = resultado.response.status;
        if (status === 404) {
          toast.warning("Empresa não encontrada!");
        } else if (status === 401) {
          toast.info("Login ou senha incorretos!");
        }
        setMostrarBotao(true); // Mostra novamente o primeiro botão após a resposta ser recebida
      } else {
        console.log(resultado);
        const nomeUsuario = resultado.data.infos_usuario.nome;
        const token = gerarToken(resultado.data);

        localStorage.setItem("jwtToken", token);
        localStorage.setItem("k", secretKey);

        // A API não retornou a propriedade 'code', significa que foi bem-sucedida
        toast.success("Seja bem-vindo(a) " + nomeUsuario);

        //depois de 3 segundos redirecione
        setTimeout(() => {
          //   router.push("/home");
        }, 3000);
      }
    }
  };

  return (
    <div className="nk-app-root">
      <div className="nk-main ">
        <div className="nk-wrap nk-wrap-nosidebar">
          <div className="nk-content ">
            <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
              {/* <div className="brand-logo pb-4 text-center">
                                <Link href="html/index.html" className="logo-link"></Link>
                            </div> */}
              <div className="card card-bordered">
                <div className="card-inner card-inner-lg">
                  <div className="nk-block-head">
                    <div className="nk-block-head-content">
                      <h4 className="nk-block-title">Login Centro Cirúrgico</h4>
                      <div className="nk-block-des">
                        <p>Acesse o ambiente do centro cirúrgico informando sua empresa, seu login e sua senha.</p>
                      </div>
                    </div>
                  </div>
                  <Form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label">Empresa</label>
                      </div>
                      <div className="form-control-wrap">
                        {/* <Col> */}
                        <Form.Control
                          type="text"
                          className="form-control form-control-lg"
                          id=""
                          placeholder="Informe o nome da empresa"
                          onChange={(e) => setEmpresa(e.target.value)}
                          name="empresa"
                          value={"scba"}
                        />
                        {/* </Col> */}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label">Login</label>
                      </div>
                      <div className="form-control-wrap">
                        {/* <Col> */}
                        <Form.Control
                          type="text"
                          className="form-control form-control-lg"
                          id="default-01"
                          placeholder="Informe seu login"
                          onChange={(e) => setLogin(e.target.value)}
                          name="login"
                          value={"matheus.domingos"}
                        />
                        {/* </Col> */}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label">Senha</label>
                      </div>
                      <div className="form-control-wrap">
                        <Form.Control
                          type="password"
                          className="form-control form-control-lg"
                          id="password"
                          placeholder="Informe sua senha"
                          onChange={(e) => setSenha(e.target.value)}
                          name="senha"
                          value={"password"}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      {mostrarBotao ? (
                        <Button type="submit" className="btn btn-lg btn-primary btn-block">
                          <span className="ps-0">Entrar</span>
                        </Button>
                      ) : (
                        <Button className="btn btn-lg btn-primary btn-block disabled">
                          <div className="spinner-border spinner-border-sm" role="status"></div>
                          <span className="ps-0">Entrar</span>
                        </Button>
                      )}
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
