import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "14px 28px",
      background: "#fff", borderBottom: "1px solid #eee",
      position: "sticky", top: 0, zIndex: 100
    }}>
      <Link to="/" style={{ fontSize: 20, fontWeight: 500, color: "#D4537E", textDecoration: "none" }}>
        Stitch & Style
      </Link>

      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Link to="/catalogue" style={{ color: "#666", textDecoration: "none", fontSize: 14 }}>Shop</Link>
        <Link to="/how-it-works" style={{ color: "#666", textDecoration: "none", fontSize: 14 }}>How it works</Link>

        {user ? (
          <>
            {/* ✅ Admin link — sirf admin ko dikhega */}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                style={{
                  background: "#1a1a1a", color: "#fff",
                  padding: "7px 14px", borderRadius: 8,
                  textDecoration: "none", fontSize: 13
                }}
              >
                Admin
              </Link>
            )}
            <Link to="/order" style={{ color: "#666", textDecoration: "none", fontSize: 14 }}>Order</Link>
            <Link to="/profile" style={{ color: "#666", textDecoration: "none", fontSize: 14 }}>
              {user.name?.split(" ")[0]}
            </Link>
            <button onClick={handleLogout} style={{
              background: "none", border: "1px solid #ddd",
              padding: "7px 16px", borderRadius: 8,
              cursor: "pointer", fontSize: 13, color: "#666"
            }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#666", textDecoration: "none", fontSize: 14 }}>Login</Link>
            <Link to="/register" style={{
              background: "#D4537E", color: "#fff",
              padding: "8px 18px", borderRadius: 8,
              textDecoration: "none", fontSize: 13
            }}>
              Register free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}