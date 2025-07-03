import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();
  const perfil = localStorage.getItem("perfil");

  // Função para realizar o logout do usuário.
  const logout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    localStorage.removeItem("perfil"); // Remove o perfil do localStorage
    navigate("/"); // Redireciona para a página de login
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        >
          Sistema de Restaurantes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="me-auto">
            {/* O dropdown "Usuários" agora só aparece se o perfil for "admin" */}
            {perfil === "admin" && (
              <NavDropdown title="Usuários" id="usuarios-dropdown">
                {/* As opções de "Cadastrar" e "Listar" usuários são apenas para "admin" */}
                <NavDropdown.Item onClick={() => navigate("/usuario/create")}>
                  Cadastrar
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/usuario/list")}>
                  Listar
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {/* O dropdown "Restaurantes" agora só aparece se o perfil for "admin" ou "dono" */}
            {(perfil === "admin" || perfil === "dono") && ( // <-- Condição alterada aqui
              <NavDropdown title="Restaurantes" id="restaurantes-dropdown">
                <NavDropdown.Item
                  onClick={() => navigate("/restaurante/create")}
                >
                  Cadastrar
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/restaurante/list")}>
                  Listar
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {/* O dropdown "Pedidos" aparece para admin, dono e cliente */}
            {(perfil === "admin" ||
              perfil === "dono" ||
              perfil === "cliente") && (
              <NavDropdown title="Pedidos" id="pedidos-dropdown">
                <NavDropdown.Item onClick={() => navigate("/pedido/create")}>
                  Fazer Pedido
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/pedido/list")}>
                  Listar
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {(perfil === "admin" || perfil === "dono") && (
              <>
                <NavDropdown title="Endereços" id="enderecos-dropdown">
                  <NavDropdown.Item
                    onClick={() => navigate("/endereco/create")}
                  >
                    Cadastrar
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/endereco/list")}>
                    Listar
                  </NavDropdown.Item>
                </NavDropdown>

                {/* O dropdown "Favoritos" para admin/dono */}
                <NavDropdown title="Favoritos" id="favoritos-dropdown">
                  <NavDropdown.Item
                    onClick={() => navigate("/favoritos/create")}
                  >
                    Adicionar
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/favoritos/list")}>
                    Listar
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Usuário-Endereço"
                  id="usuario-endereco-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() => navigate("/usuario-endereco/create")}
                  >
                    Vincular
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate("/usuario-endereco/list")}
                  >
                    Listar
                  </NavDropdown.Item>
                </NavDropdown>

                {perfil === "admin" && (
                  <NavDropdown
                    title="Usuário-Restaurante"
                    id="usuario-restaurante-dropdown"
                  >
                    <NavDropdown.Item
                      onClick={() => navigate("/usuario-restaurante/create")}
                    >
                      Vincular
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => navigate("/usuario-restaurante/list")}
                    >
                      Listar
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            )}

            {/* O dropdown "Favoritos" para cliente (separado do admin/dono) */}
            {perfil === "cliente" && (
              <NavDropdown title="Favoritos" id="favoritos-dropdown-cliente">
                {" "}
                {/* ID alterado para evitar conflito */}
                <NavDropdown.Item onClick={() => navigate("/favoritos/create")}>
                  Adicionar Favorito
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/favoritos/list")}>
                  Listar Favoritos
                </NavDropdown.Item>
              </NavDropdown>
            )}

            <Nav.Link className="text-danger" onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
