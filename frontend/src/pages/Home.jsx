import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const features = [
  { icon: "📐", title: "Perfect fit", desc: "Stitched exactly to your measurements — every time." },
  { icon: "🚚", title: "Fast delivery", desc: "Delivered to your door in 3–5 days anywhere in Pune." },
  { icon: "💬", title: "WhatsApp support", desc: "Get order updates directly on WhatsApp." },
  { icon: "♻️", title: "Free alteration", desc: "Not fitting right? We fix it free within 7 days." },
];

const reviews = [
  { name: "Priya Sharma", loc: "Kothrud, Pune", text: "Finally a place that gets my size right! The kurti fits perfectly.", item: "Kurti · Cotton" },
  { name: "Sunita Desai", loc: "Hadapsar, Pune", text: "The lehenga was absolutely gorgeous. Measurement process was so easy!", item: "Lehenga · Silk" },
  { name: "Meena Joshi", loc: "Shivajinagar, Pune", text: "Very fast delivery and the blouse fit me like a dream!", item: "Blouse · Georgette" },
];

const catalogue = [
  { name: "Kurti", price: 599, bg: "#FAEEDA", icon: "👗", tag: "Best seller" },
  { name: "Salwar suit", price: 899, bg: "#E1F5EE", icon: "👘", tag: "Popular" },
  { name: "Lehenga", price: 1499, bg: "#EEEDFE", icon: "🎀", tag: "Festival pick" },
];

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const openWA = () => {
    window.open("https://wa.me/919999999999?text=Hi! I want to order a custom stitch cloth.", "_blank");
  };

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #eee",
        padding: "56px 24px 44px", textAlign: "center"
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#FBEAF0", color: "#72243E",
          fontSize: 11, padding: "5px 14px", borderRadius: 20,
          marginBottom: 20
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4537E" }} />
          100+ happy customers in Pune
        </div>

        <h1 style={{
          fontSize: 32, fontWeight: 500, lineHeight: 1.25,
          marginBottom: 14, maxWidth: 480, margin: "0 auto 14px"
        }}>
          Clothes stitched{" "}
          <span style={{ color: "#D4537E" }}>perfectly</span>
          {" "}for your body
        </h1>

        <p style={{
          fontSize: 15, color: "#888", lineHeight: 1.7,
          maxWidth: 400, margin: "0 auto 28px"
        }}>
          Order online. Share your measurements. Receive a custom fit — delivered in 3–5 days.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
          <button
            onClick={() => navigate("/catalogue")}
            style={{
              background: "#D4537E", color: "#fff", border: "none",
              padding: "12px 24px", borderRadius: 8, fontSize: 14, cursor: "pointer"
            }}
          >
            Browse catalogue
          </button>
          <button
            onClick={openWA}
            style={{
              background: "#25D366", color: "#fff", border: "none",
              padding: "12px 24px", borderRadius: 8, fontSize: 14, cursor: "pointer"
            }}
          >
            Chat on WhatsApp
          </button>
          {!user && (
            <button
              onClick={() => navigate("/register")}
              style={{
                background: "none", border: "1px solid #ddd",
                color: "#444", padding: "12px 24px",
                borderRadius: 8, fontSize: 14, cursor: "pointer"
              }}
            >
              Register free
            </button>
          )}
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", maxWidth: 420, margin: "0 auto",
          background: "#fafafa", border: "1px solid #eee",
          borderRadius: 12, overflow: "hidden"
        }}>
          {[
            { num: "100+", label: "Customers" },
            { num: "4.9★", label: "Rating" },
            { num: "3–5", label: "Day delivery" },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: "16px 8px", textAlign: "center",
              borderRight: i < 2 ? "1px solid #eee" : "none"
            }}>
              <div style={{ fontSize: 20, fontWeight: 500, color: "#D4537E" }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATALOGUE PREVIEW ── */}
      <div style={{ padding: "32px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: "#D4537E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
          Collection
        </div>
        <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 6 }}>Popular picks</div>
        <div style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>
          All stitched to your exact measurements
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {catalogue.map((item) => (
            <div
              key={item.name}
              onClick={() => navigate("/catalogue")}
              style={{
                background: "#fff", border: "1px solid #eee",
                borderRadius: 12, overflow: "hidden", cursor: "pointer",
                transition: "border-color 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#D4537E"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#eee"}
            >
              <div style={{
                height: 90, background: item.bg,
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 32
              }}>
                {item.icon}
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>From ₹{item.price}</div>
                <div style={{
                  fontSize: 10, background: "#FBEAF0", color: "#72243E",
                  padding: "2px 8px", borderRadius: 20,
                  display: "inline-block", marginTop: 6
                }}>
                  {item.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/catalogue")}
          style={{
            width: "100%", marginTop: 14, padding: 11,
            background: "none", border: "1px solid #ddd",
            borderRadius: 8, fontSize: 14, cursor: "pointer", color: "#444"
          }}
        >
          View full catalogue →
        </button>
      </div>

      {/* ── FEATURES ── */}
      <div style={{
        background: "#fff", borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee", padding: "32px 24px"
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#D4537E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            Why us
          </div>
          <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 20 }}>The Stitch & Style promise</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: "#fafafa", border: "1px solid #eee",
                borderRadius: 12, padding: 18
              }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 5 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <div style={{ padding: "32px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: "#D4537E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
          Reviews
        </div>
        <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 20 }}>What customers say</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {reviews.map((r) => (
            <div key={r.name} style={{
              background: "#fff", border: "1px solid #eee",
              borderRadius: 12, padding: 18
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "#FBEAF0", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 500, color: "#72243E", flexShrink: 0
                }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>{r.loc}</div>
                </div>
              </div>
              <div style={{ color: "#EF9F27", fontSize: 13, marginBottom: 6 }}>★★★★★</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{r.text}</div>
              <div style={{ fontSize: 11, color: "#D4537E", marginTop: 8, fontWeight: 500 }}>
                Ordered: {r.item}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div style={{
        background: "#D4537E", padding: "36px 24px",
        textAlign: "center", marginTop: 8
      }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: "#fff", marginBottom: 8 }}>
          Ready for a perfect fit?
        </div>
        <div style={{ fontSize: 14, color: "#fce4ec", marginBottom: 22 }}>
          Join 100+ happy customers in Pune
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate(user ? "/order" : "/register")}
            style={{
              background: "#fff", color: "#D4537E",
              border: "none", padding: "12px 24px",
              borderRadius: 8, fontSize: 14,
              cursor: "pointer", fontWeight: 500
            }}
          >
            {user ? "Place an order" : "Get started — free"}
          </button>
          <button
            onClick={openWA}
            style={{
              background: "none", color: "#fff",
              border: "1px solid rgba(255,255,255,0.5)",
              padding: "12px 24px", borderRadius: 8,
              fontSize: 14, cursor: "pointer"
            }}
          >
            WhatsApp us
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        background: "#1a1a1a", padding: "24px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#fff", marginBottom: 8 }}>
          Stitch <span style={{ color: "#D4537E" }}>&</span> Style
        </div>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
          Custom clothing · Pune, Maharashtra
        </div>
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          {["📞 +91 99999 99999", "📧 hello@customstitch.in", "🕐 9 AM – 8 PM"].map((item) => (
            <span key={item} style={{ fontSize: 11, color: "#888" }}>{item}</span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#555", marginTop: 16 }}>
          © 2024 Stitch & Style. All rights reserved.
        </div>
      </div>

    </div>
  );
}