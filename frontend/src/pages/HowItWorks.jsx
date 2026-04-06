export default function HowItWorks() {
  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #eee",
        padding: "28px 24px 20px"
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#D4537E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            Process
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>How it works</div>
          <div style={{ fontSize: 14, color: "#888" }}>
            From order to doorstep in 4 simple steps
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>

        {/* 4 Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40 }}>
          {[
            { num: 1, title: "Browse & pick", desc: "Choose your cloth type and fabric from our catalogue. Kurti, Salwar suit, Lehenga — sab available hai.", icon: "👗" },
            { num: 2, title: "Share measurements", desc: "Enter chest, waist, hip, and length. Hum aapko step by step guide karenge WhatsApp pe.", icon: "📏" },
            { num: 3, title: "We stitch", desc: "Our expert tailor aapka kapda 2-3 din mein care ke saath stitch karta hai.", icon: "🪡" },
            { num: 4, title: "Delivered to you", desc: "Aapke ghar pe deliver kar dete hain. Agar fit nahi hua toh free alteration bhi karte hain.", icon: "🚚" },
          ].map((step) => (
            <div key={step.num} style={{
              background: "#fff", border: "1px solid #eee",
              borderRadius: 12, padding: 20
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "#FBEAF0", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 500, color: "#72243E", flexShrink: 0
                }}>
                  {step.num}
                </div>
                <div style={{ fontSize: 20 }}>{step.icon}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{step.desc}</div>
            </div>
          ))}
        </div>

        {/* Measurement Guide */}
        <div style={{
          background: "#fff", border: "1px solid #eee",
          borderRadius: 12, padding: 24, marginBottom: 24
        }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#D4537E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            Measurement guide
          </div>
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}>
            Khud se measurement kaise lein
          </div>
          <div style={{ fontSize: 13, color: "#888", background: "#fff3f7", borderLeft: "3px solid #D4537E", borderRadius: "0 8px 8px 0", padding: "10px 14px", marginBottom: 20, lineHeight: 1.6 }}>
            Soft measuring tape use karo. Fitted kapde pehno. Inches mein measure karo.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { part: "Chest", how: "Seene ke sabse bhari jagah ke around tape lagao. Floor ke parallel raho.", icon: "👆" },
              { part: "Waist", how: "Apni natural waistline ke around — torso ki sabse narrow jagah.", icon: "➡️" },
              { part: "Hip", how: "Hips ki sabse bhari jagah ke around — waist se lagbhag 8 inch neeche.", icon: "👇" },
              { part: "Length", how: "Shoulder se lekar jahan kapda khatam karna chahte ho wahan tak.", icon: "↕️" },
            ].map((m) => (
              <div key={m.part} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                padding: "14px 16px", background: "#fafafa",
                borderRadius: 10, border: "1px solid #eee"
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "#FBEAF0", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 18, flexShrink: 0
                }}>
                  {m.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{m.part}</div>
                  <div style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{m.how}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{
          background: "#fff", border: "1px solid #eee",
          borderRadius: 12, padding: 24, marginBottom: 24
        }}>
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}>
            Aksar pooche jaane wale sawaal
          </div>
          {[
            { q: "Delivery kitne din mein hoti hai?", a: "3-5 working days mein deliver ho jaata hai order confirm hone ke baad." },
            { q: "Agar kapda fit nahi hua toh?", a: "Free alteration milti hai delivery ke 7 din ke andar — bas WhatsApp karo!" },
            { q: "Fabric aap dete ho ya hum laayein?", a: "Hum apna fabric stock dete hain — Cotton, Silk, Georgette, Linen, Rayon. Aap apna bhi la sakte ho." },
            { q: "Payment kaise hoti hai?", a: "UPI (PhonePe, GPay), Card, aur Cash on Delivery — sab available hai." },
            { q: "Order cancel kar sakte hain?", a: "Haan — 12 ghante ke andar full refund milta hai. Stitching shuru hone ke baad cancel nahi hoga." },
          ].map((faq, i) => (
            <div key={i} style={{
              padding: "14px 0",
              borderBottom: i < 4 ? "1px solid #f5f5f5" : "none"
            }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "#1a1a1a" }}>
                {faq.q}
              </div>
              <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          background: "#D4537E", borderRadius: 12,
          padding: "28px 24px", textAlign: "center"
        }}>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#fff", marginBottom: 8 }}>
            Ready to order?
          </div>
          <div style={{ fontSize: 14, color: "#fce4ec", marginBottom: 20 }}>
            Apna perfect fit abhi order karo
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => window.location.href = "/catalogue"}
              style={{
                background: "#fff", color: "#D4537E",
                border: "none", padding: "11px 22px",
                borderRadius: 8, fontSize: 14,
                cursor: "pointer", fontWeight: 500
              }}
            >
              Browse catalogue
            </button>
            <button
              onClick={() => window.open("https://wa.me/919999999999", "_blank")}
              style={{
                background: "none", color: "#fff",
                border: "1px solid rgba(255,255,255,0.5)",
                padding: "11px 22px", borderRadius: 8,
                fontSize: 14, cursor: "pointer"
              }}
            >
              WhatsApp us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}