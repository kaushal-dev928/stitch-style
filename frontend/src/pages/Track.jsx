import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrderByIdAPI } from "../api/orderAPI";

const STATUS_STEPS = [
  { key: "CONFIRMED", label: "Order confirmed", desc: "Payment received" },
  { key: "MEASURE_VERIFIED", label: "Measurements verified", desc: "Tailor checked your measurements" },
  { key: "STITCHING", label: "Stitching in progress", desc: "Your cloth is being handcrafted" },
  { key: "QUALITY_CHECK", label: "Quality check", desc: "Final fitting review" },
  { key: "OUT_FOR_DELIVERY", label: "Out for delivery", desc: "On the way to you" },
  { key: "DELIVERED", label: "Delivered", desc: "Enjoy your new clothes!" },
];

export default function Track() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderByIdAPI(id),
    refetchInterval: 30000,
  });

  if (isLoading) return (
    <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
      Loading order...
    </div>
  );

  if (error) return (
    <div style={{ padding: 40, textAlign: "center", color: "#e24b4a" }}>
      Order not found
    </div>
  );

  const order = data?.data;
  const completedStatuses = order?.timeline?.map((t) => t.status) || [];

  const getStepStatus = (key) => {
    if (completedStatuses.includes(key)) return "done";
    if (order?.status === key) return "current";
    return "pending";
  };

  return (
    <div style={{ maxWidth: 560, margin: "32px auto", padding: "0 24px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>Track your order</h2>

      {/* Order info card */}
      <div style={{
        background: "#fff", border: "1px solid #eee",
        borderRadius: 12, padding: "14px 18px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 24, marginTop: 16
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>
            Order #{order?._id?.slice(-6).toUpperCase()}
          </div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>
            {order?.clothType} · {order?.fabric}
          </div>
        </div>
        <div style={{
          fontSize: 11, background: "#E1F5EE",
          color: "#085041", padding: "5px 12px",
          borderRadius: 20, fontWeight: 500
        }}>
          {order?.status?.replace(/_/g, " ")}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {STATUS_STEPS.map((step, i) => {
          const status = getStepStatus(step.key);
          const isLast = i === STATUS_STEPS.length - 1;

          return (
            <div key={step.key} style={{ display: "flex", gap: 14 }}>
              {/* Left — dot + line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 14, height: 14, borderRadius: "50%", marginTop: 3, flexShrink: 0,
                  background: status === "done" ? "#1D9E75" : status === "current" ? "#EF9F27" : "#e0e0e0",
                  border: status === "current" ? "2px solid #BA7517" : "none"
                }} />
                {!isLast && (
                  <div style={{
                    width: 1, flex: 1, minHeight: 30,
                    background: status === "done" ? "#1D9E75" : "#eee",
                    margin: "3px 0"
                  }} />
                )}
              </div>

              {/* Right — content */}
              <div style={{ paddingBottom: 22 }}>
                <div style={{
                  fontSize: 13, fontWeight: 500,
                  color: status === "pending" ? "#bbb" : "#1a1a1a"
                }}>
                  {step.label}
                </div>
                <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>
                  {step.desc}
                </div>
                {status === "done" && order?.timeline?.find(t => t.status === step.key) && (
                  <div style={{ fontSize: 11, color: "#1D9E75", marginTop: 3 }}>
                    {new Date(order.timeline.find(t => t.status === step.key).date).toLocaleString("en-IN")}
                  </div>
                )}
                {status === "current" && (
                  <div style={{
                    fontSize: 10, background: "#FAEEDA",
                    color: "#633806", padding: "3px 10px",
                    borderRadius: 20, display: "inline-block", marginTop: 5
                  }}>
                    In progress
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp button */}
      <button
        onClick={() => window.open(`https://wa.me/919999999999?text=Hi! Order update chahiye: #${order?._id?.slice(-6).toUpperCase()}`, "_blank")}
        style={{
          width: "100%", padding: 12, marginTop: 8,
          background: "#25D366", color: "#fff",
          border: "none", borderRadius: 8,
          fontSize: 14, cursor: "pointer"
        }}
      >
        Get update on WhatsApp
      </button>
    </div>
  );
}