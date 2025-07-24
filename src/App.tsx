import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import EditorDashboardPage from "./pages/EditorDashboardPage";
import LoginPage from "./pages/LoginPage";
import EncuestasPage from "./pages/EncuestasPage";
import FinanzasPage from "./pages/FinanzasPage";
import JuridicoPage from "./pages/JuridicoPage";
import ComunicacionPage from "./pages/ComunicacionPage";
import TerritorialPage from "./pages/TerritorialPage";
import EstrategiaPage from "./pages/EstrategiaPage";
import Navbar from "./components/Navbar";
import { useDashboardStore } from "./store/dashboardStore";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const currentUser = useDashboardStore((state) => state.currentUser);
  return currentUser ? <>{children}</> : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Navbar />
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/editor"
          element={
            <PrivateRoute>
              <Navbar />
              <EditorDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/encuestas"
          element={
            <PrivateRoute>
              <Navbar />
              <EncuestasPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/finanzas"
          element={
            <PrivateRoute>
              <Navbar />
              <FinanzasPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/juridico"
          element={
            <PrivateRoute>
              <Navbar />
              <JuridicoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/comunicacion"
          element={
            <PrivateRoute>
              <Navbar />
              <ComunicacionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/territorial"
          element={
            <PrivateRoute>
              <Navbar />
              <TerritorialPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/estrategia"
          element={
            <PrivateRoute>
              <Navbar />
              <EstrategiaPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
