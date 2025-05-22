import React, { useState, useEffect } from "react";
import AppRoutes from "routes";
import useAppLoad from "common/hooks/useAppLoad";
const SplashPage = React.lazy(() => import("pages/splash"));

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept any email/password
    localStorage.setItem("isLoggedIn", "true");
    onLogin();
  };
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      background: "#ece5dd"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        padding: "40px 32px",
        minWidth: 340,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {/* WhatsApp logo SVG */}
        <div style={{
          background: "#25d366",
          borderRadius: "50%",
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16
        }}>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="19" fill="#25d366"/>
            <path d="M28.5 21.5c-.4-.2-2.3-1.1-2.6-1.2-.3-.1-.5-.2-.7.2-.2.4-.8 1.2-1 1.4-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.3-.7.1-.2 0-.5 0-.7 0-.2-.7-1.7-1-2.3-.3-.6-.6-.5-.8-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.7.3-.2.2-1 1-1 2.4 0 1.4 1 2.7 1.1 2.9.1.2 2.1 3.3 5.1 4.5.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2z" fill="#fff"/>
          </svg>
        </div>
        <h2 style={{
          color: "#075e54",
          marginBottom: 24,
          fontWeight: 700,
          fontFamily: "Segoe UI, Arial, sans-serif"
        }}>Login to WhatsApp</h2>
        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%"
        }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: 6,
              border: "1px solid #ddd",
              outline: "none",
              fontSize: 16
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: 6,
              border: "1px solid #ddd",
              outline: "none",
              fontSize: 16
            }}
          />
          <button type="submit" style={{
            background: "#25d366",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "12px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            marginTop: 8,
            transition: "background 0.2s"
          }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const { isLoaded, progress } = useAppLoad();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", checkLogin);
    // Also check on mount in case of navigation reload
    checkLogin();
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  if (!isLoaded) return <SplashPage progress={progress} />;
  return <AppRoutes />;
}
