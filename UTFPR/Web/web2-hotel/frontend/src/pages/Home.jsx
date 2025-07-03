// src/pages/Home.jsx
import React from "react";
import AppNavbar from "../components/Navbar";
import { Container } from "react-bootstrap";

const Home = () => {
  const perfil = localStorage.getItem("perfil");
  const saudacao = {
    admin: "Administrador",
    dono: "Dono de Restaurante",
    cliente: "Cliente",
  };

  return (
    <>
      <Container className="mt-4">
        <h1>Bem-vindo ao Sistema de Restaurantes!</h1>
        <p className="lead">
          Perfil logado: <strong>{saudacao[perfil] || "Desconhecido"}</strong>
        </p>
        <p>
          Navegue utilizando o menu acima para acessar as funcionalidades
          disponíveis.
        </p>
      </Container>
    </>
  );
};

export default Home;
