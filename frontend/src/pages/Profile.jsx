import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUserOrdersAPI } from "../api/orderAPI";
import { useAuth } from "../context/AuthContext";

const STATUS_COLOR = {
  DELIVERED: { bg: "#E1F5EE", color: "#085041" },
  CONFIRMED: { bg: "#E6F1FB", color: "#0C447C" },
  STITCHING: { bg: "#FAEEDA", color: "#633806" },
  CANCELLED: { bg: "#FCEBEB", color: "#A32D2D" },
};

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrdersAPI,
  });

  const orders = data?.data || [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 600, margin: "32px auto", padding: "0 24px" }}>

      {/* Profile hero */}
      <div style={{
        background: "#fff", border: "1px solid #eee",
        borderRadius: 12, padding: 22,
        textAlign: "center", marginBottom: 16
      }}>
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: "#FBEAF0", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 22, fontWeight: 500, color: "#72243E",
          margin: "0 auto 12px"
        }}>
          {user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)}
        </div>
        <div style={{ fontSize: 16, fontWeight: 500 }}>{user?.name}</div>
        <div style={{ fontSize: 13, color: "#888", marginTop: 3 }}>{user?.phone}</div>
        <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{user?.email}</div>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3,1fr)",
        gap: 10, marginBottom: 16
      }}>
        {[
          { num: orders.length, label: "Total orders" },
          { num: orders.filter(o => o.status !== "DELIVERED").length, label: "In progress" },
          { num: orders.filter(o => o.status === "DELIVERED").length, label: "Delivered" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "#fff", border: "1px solid #eee",
            borderRadius: 10, padding: 14, textAlign: "center"
          }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#D4537E" }}>{s.num}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Orders list */}
      <div style={{
        background: "#fff", border: "1px solid #eee",
        borderRadius: 12, padding: 18, marginBottom: 12
      }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>My orders</div>

        {isLoading ? (
          <div style={{ color: "#888", fontSize: 13 }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div style={{ color: "#aaa", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
            No orders yet —{" "}
            <span
              onClick={() => navigate("/catalogue")}
              style={{ color: "#D4537E", cursor: "pointer" }}
            >
              browse catalogue
            </span>
          </div>
        ) : (
          orders.map((order) => {
            const sc = STATUS_COLOR[order.status] || { bg: "#f5f5f5", color: "#666" };
            return (
              <div
                key={order._id}
                onClick={() => navigate(`/track/${order._id}`)}
                style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "11px 0",
                  borderBottom: "1px solid #f5f5f5", cursor: "pointer"
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>
                    {order.clothType} · {order.fabric}
                  </div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>
                    #{order._id.slice(-6).toUpperCase()} · ₹{order.totalAmount}
                  </div>
                </div>
                <div style={{
                  fontSize: 10, background: sc.bg,
                  color: sc.color, padding: "4px 10px",
                  borderRadius: 20, fontWeight: 500
                }}>
                  {order.status?.replace(/_/g, " ")}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Action buttons */}
      <button
        onClick={() => navigate("/order")}
        style={{
          width: "100%", padding: 12,
          background: "#D4537E", color: "#fff",
          border: "none", borderRadius: 8,
          fontSize: 14, cursor: "pointer", marginBottom: 8
        }}
      >
        Place new order
      </button>

      <button
        onClick={handleLogout}
        style={{
          width: "100%", padding: 12,
          background: "#FCEBEB", color: "#A32D2D",
          border: "1px solid #F09595", borderRadius: 8,
          fontSize: 13, cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}