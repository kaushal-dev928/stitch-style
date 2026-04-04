import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrderAPI } from "../api/orderAPI";
import toast from "react-hot-toast";

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    clothType: location.state?.product?.name || "Kurti",
    fabric: "Cotton",
    measurements: { chest: "", waist: "", hip: "", length: "" },
    paymentMethod: "UPI",
    totalAmount: location.state?.product?.price || 599,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createOrderAPI,
    onSuccess: (res) => {
      toast.success("Order placed successfully!");
      navigate(`/track/${res.data.order._id}`);
    },
    onError: (err) => {
      toast.error(err.response?.data?.msg || "Order failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    border: "1px solid #eee", borderRadius: 8,
    fontSize: 13, marginTop: 4,
    outline: "none", background: "#fafafa"
  };

  const labelStyle = {
    fontSize: 11, fontWeight: 500,
    color: "#888", textTransform: "uppercase",
    letterSpacing: "0.04em"
  };

  return (
    <div style={{ maxWidth: 600, margin: "32px auto", padding: "0 24px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>Place your order</h2>
      <p style={{ fontSize: 14, color: "#888", marginBottom: 24 }}>
        Custom stitched to your measurements
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{
          background: "#fff3f7", borderLeft: "3px solid #D4537E",
          borderRadius: "0 8px 8px 0", padding: "12px 16px",
          marginBottom: 20, fontSize: 13, color: "#666", lineHeight: 1.6
        }}>
          Use a soft measuring tape. Stand straight. Measure in inches.
        </div>

        {/* Cloth details */}
        <div style={{
          background: "#fff", border: "1px solid #eee",
          borderRadius: 12, padding: 20, marginBottom: 16
        }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Cloth details</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={labelStyle}>Cloth type</label>
              <select
                value={form.clothType}
                onChange={(e) => setForm({ ...form, clothType: e.target.value })}
                style={inputStyle}
              >
                {["Kurti", "Salwar suit", "Blouse", "Lehenga", "Palazzo set", "Anarkali suit"].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Fabric</label>
              <select
                value={form.fabric}
                onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                style={inputStyle}
              >
                {["Cotton", "Silk", "Georgette", "Linen", "Rayon"].map(f => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Measurements */}
        <div style={{
          background: "#fff", border: "1px solid #eee",
          borderRadius: 12, padding: 20, marginBottom: 16
        }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Measurements (inches)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {["chest", "waist", "hip", "length"].map((field) => (
              <div key={field}>
                <label style={labelStyle}>{field}</label>
                <input
                  type="number"
                  placeholder={field === "chest" ? "e.g. 36" : field === "waist" ? "e.g. 30" : field === "hip" ? "e.g. 38" : "e.g. 42"}
                  value={form.measurements[field]}
                  onChange={(e) => setForm({
                    ...form,
                    measurements: { ...form.measurements, [field]: e.target.value }
                  })}
                  style={inputStyle}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div style={{
          background: "#fff", border: "1px solid #eee",
          borderRadius: 12, padding: 20, marginBottom: 20
        }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Payment method</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[
              { id: "UPI", label: "UPI / PhonePe", icon: "📱" },
              { id: "CARD", label: "Card", icon: "💳" },
              { id: "COD", label: "Cash on delivery", icon: "💵" },
            ].map((p) => (
              <div
                key={p.id}
                onClick={() => setForm({ ...form, paymentMethod: p.id })}
                style={{
                  border: `1px solid ${form.paymentMethod === p.id ? "#D4537E" : "#eee"}`,
                  background: form.paymentMethod === p.id ? "#fff3f7" : "#fff",
                  borderRadius: 8, padding: "12px 8px",
                  textAlign: "center", cursor: "pointer"
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 4 }}>{p.icon}</div>
                <div style={{ fontSize: 11, color: form.paymentMethod === p.id ? "#D4537E" : "#888" }}>
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            width: "100%", padding: 14,
            background: isPending ? "#e9a0b8" : "#D4537E",
            color: "#fff", border: "none",
            borderRadius: 8, fontSize: 15,
            cursor: isPending ? "not-allowed" : "pointer",
            fontWeight: 500
          }}
        >
          {isPending ? "Placing order..." : `Confirm order — ₹${form.totalAmount}`}
        </button>
      </form>
    </div>
  );
}