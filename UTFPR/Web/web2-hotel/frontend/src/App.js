// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

// Páginas
import Login from "./pages/Usuario/Login";

// Endereço
import EnderecoCreate from "./pages/Endereco/EnderecoCreate";
import EnderecoList from "./pages/Endereco/EnderecoList";
import EnderecoUpdate from "./pages/Endereco/EnderecoUpdate";

// Favorito
import FavoritoCreate from "./pages/Favorito/FavoritoCreate";
import FavoritoList from "./pages/Favorito/FavoritoList";
import FavoritoUpdate from "./pages/Favorito/FavoritoUpdate";

// Pedido
import PedidoCreate from "./pages/Pedido/PedidoCreate";
import PedidoList from "./pages/Pedido/PedidoList";
import PedidoUpdate from "./pages/Pedido/PedidoUpdate";

// Prato
import PratoCreate from "./pages/Prato/PratoCreate";
import PratoList from "./pages/Prato/PratoList";
import PratoUpdate from "./pages/Prato/PratoUpdate";

// Restaurante
import RestauranteCreate from "./pages/Restaurante/RestauranteCreate";
import RestauranteList from "./pages/Restaurante/RestauranteList";
import RestauranteUpdate from "./pages/Restaurante/RestauranteUpdate";

// Usuário
import UsuarioCreate from "./pages/Usuario/UsuarioCreate";
import UsuarioList from "./pages/Usuario/UsuarioList";
import UsuarioUpdate from "./pages/Usuario/UsuarioUpdate";

// Usuário-Endereço
import UsuarioEnderecoCreate from "./pages/UsuarioEndereco/UsuarioEnderecoCreate";
import UsuarioEnderecoList from "./pages/UsuarioEndereco/UsuarioEnderecoList";
import UsuarioEnderecoUpdate from "./pages/UsuarioEndereco/UsuarioEnderecoUpdate";

// Usuário-Restaurante
import UsuarioRestauranteCreate from "./pages/UsuarioRestaurante/UsuarioRestauranteCreate";
import UsuarioRestauranteList from "./pages/UsuarioRestaurante/UsuarioRestauranteList";
import UsuarioRestauranteUpdate from "./pages/UsuarioRestaurante/UsuarioRestauranteUpdate";

// Página inicial
import Home from "./pages/Home";

// Página 404
const NotFound = () => (
  <div className="container mt-4">
    <h2>404 - Página Não Encontrada</h2>
    <p>A página que você está procurando não existe.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          {/* Login e Home */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />

          {/* Endereço */}
          <Route path="/endereco/create" element={<EnderecoCreate />} />
          <Route path="/endereco/list" element={<EnderecoList />} />
          <Route path="/endereco/update/:id" element={<EnderecoUpdate />} />

          {/* Favorito */}
          <Route path="/favoritos/create" element={<FavoritoCreate />} />
          <Route path="/favoritos/list" element={<FavoritoList />} />
          <Route path="/favoritos/update/:id" element={<FavoritoUpdate />} />

          {/* Pedido */}
          <Route path="/pedido/create" element={<PedidoCreate />} />
          <Route path="/pedido/list" element={<PedidoList />} />
          <Route path="/pedido/update/:id" element={<PedidoUpdate />} />

          {/* Prato */}
          <Route path="/prato/create" element={<PratoCreate />} />
          <Route path="/prato/list" element={<PratoList />} />
          <Route path="/prato/update/:id" element={<PratoUpdate />} />

          {/* Restaurante */}
          <Route path="/restaurante/create" element={<RestauranteCreate />} />
          <Route path="/restaurante/list" element={<RestauranteList />} />
          <Route
            path="/restaurante/update/:id"
            element={<RestauranteUpdate />}
          />

          {/* Usuário */}
          <Route path="/usuario/create" element={<UsuarioCreate />} />
          <Route path="/usuario/list" element={<UsuarioList />} />
          <Route path="/usuario/update/:id" element={<UsuarioUpdate />} />

          {/* Usuário-Endereço */}
          <Route
            path="/usuario-endereco/create"
            element={<UsuarioEnderecoCreate />}
          />
          <Route
            path="/usuario-endereco/list"
            element={<UsuarioEnderecoList />}
          />
          <Route
            path="/usuario-endereco/update/:id"
            element={<UsuarioEnderecoUpdate />}
          />

          {/* Usuário-Restaurante */}
          <Route
            path="/usuario-restaurante/create"
            element={<UsuarioRestauranteCreate />}
          />
          <Route
            path="/usuario-restaurante/list"
            element={<UsuarioRestauranteList />}
          />
          <Route
            path="/usuario-restaurante/update/:id"
            element={<UsuarioRestauranteUpdate />}
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
