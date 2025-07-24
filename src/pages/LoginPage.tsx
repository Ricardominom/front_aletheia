import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useDashboardStore } from "../store/dashboardStore";
// import { loginApi } from "../api/auth"; // Comentado para usar login local

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setCurrentUser = useDashboardStore((state) => state.setCurrentUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Login con API comentado - usando credenciales locales
      // const user = await loginApi(email, password);
      
      // Login local con credenciales hardcodeadas
      let user;
      if (email === "admin" && password === "1234admin") {
        user = { role: "admin", name: "Administrador", email: "admin" };
      } else if (email === "editor" && password === "1234editor") {
        user = { role: "editor", name: "Editor", email: "editor" };
      } else {
        throw new Error("Credenciales inválidas");
      }

      setCurrentUser(user);
      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "editor") {
        navigate("/dashboard/editor");
      } else {
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0B14] relative overflow-hidden">
      {/* Enhanced animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating circles with extra slow animations */}
        <div className="absolute w-[800px] h-[800px] bg-[#1A1F4D]/30 rounded-full -top-1/2 -left-1/4 blur-3xl animate-float-slow"></div>
        <div className="absolute w-[600px] h-[600px] bg-[#242957]/30 rounded-full -bottom-1/4 -right-1/4 blur-2xl animate-float-medium"></div>

        {/* Medium floating shapes with medium speed animations */}
        <div className="absolute w-[500px] h-[500px] bg-[#2E346C]/30 rounded-full top-1/4 left-1/4 blur-xl animate-float-fast"></div>
        <div className="absolute w-[450px] h-[450px] bg-[#383E81]/30 rounded-full bottom-1/3 right-1/3 blur-xl animate-float-faster"></div>

        {/* Small accent shapes with slightly faster animations */}
        <div className="absolute w-[300px] h-[300px] bg-[#424896]/30 rounded-full top-1/3 right-1/4 blur-lg animate-float-fastest"></div>
        <div className="absolute w-[250px] h-[250px] bg-[#4C52AB]/30 rounded-full bottom-1/4 left-1/3 blur-lg animate-float"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full mx-4 relative"
      >
        <div className="bg-[#2A2E43]/60 backdrop-blur-xl rounded-lg p-8 shadow-xl border border-white/10">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-48 mx-auto mb-6 relative transition-all duration-700 hover:scale-105"
            >
              <img
                src="https://raw.githubusercontent.com/Nefta11/MiPortafolioNefta/refs/heads/main/assets/logo1.jpg"
                alt="Logo"
                className="w-full rounded-lg"
              />
            </motion.div>

            <h2 className="text-2xl font-light text-white mb-2">
              Bienvenido de nuevo
            </h2>
            <p className="text-gray-400">Inicia sesión para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400 block mb-1">
                  Usuario
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#2A2E43]/40 border border-gray-600/30 text-white rounded-lg pl-10 pr-4 py-2 
                      focus:outline-none focus:border-gray-500/50 transition-all duration-500 
                      placeholder-gray-500 hover:border-gray-500/50"
                    placeholder="Ingresa tu usuario"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400 block mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#2A2E43]/40 border border-gray-600/30 text-white rounded-lg pl-10 pr-10 py-2 
                      focus:outline-none focus:border-gray-500/50 transition-all duration-500 
                      placeholder-gray-500 hover:border-gray-500/50"
                    placeholder="Ingresa tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600/30 bg-[#2A2E43]/40 text-gray-600
                    focus:ring-0 focus:ring-offset-0 transition-colors duration-300 group-hover:border-gray-500/50"
                />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                  Recordarme
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-[#2A2E43]/80 text-white rounded-lg py-2 font-medium
                transition-all duration-500 hover:bg-[#2A2E43] disabled:opacity-50 
                disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
                  </motion.div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                "Iniciar sesión"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
