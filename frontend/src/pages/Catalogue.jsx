import { useQuery } from "@tanstack/react-query";
import { getAllProductsAPI } from "../api/productAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FILTERS = [
  { id: "", label: "All" },
  { id: "ethnic", label: "Ethnic wear" },
  { id: "party", label: "Party wear" },
  { id: "daily", label: "Daily wear" },
];

const FALLBACK = [
  { _id: "1", name: "Kurti", price: 599, category: "ethnic", fabric: ["Cotton"], bg: "#FAEEDA", icon: "👗", tag: "Best seller" },
  { _id: "2", name: "Salwar suit", price: 899, category: "ethnic", fabric: ["Cotton"], bg: "#E1F5EE", icon: "👘", tag: "Popular" },
  { _id: "3", name: "Blouse", price: 399, category: "party", fabric: ["Silk"], bg: "#FBEAF0", icon: "🪡", tag: "Quick stitch" },
  { _id: "4", name: "Lehenga", price: 1499, category: "party", fabric: ["Silk"], bg: "#EEEDFE", icon: "🎀", tag: "Festival pick" },
  { _id: "5", name: "Palazzo set", price: 749, category: "daily", fabric: ["Cotton"], bg: "#E1F5EE", icon: "👚", tag: "Trending" },
  { _id: "6", name: "Anarkali suit", price: 1199, category: "ethnic", fabric: ["Georgette"], bg: "#FAEEDA", icon: "🌸", tag: "New arrival" },
];

const ICONS = { "Kurti": "👗", "Salwar suit": "👘", "Blouse": "🪡", "Lehenga": "🎀", "Palazzo set": "👚", "Anarkali suit": "🌸" };
const BGS = { "ethnic": "#FAEEDA", "party": "#FBEAF0", "daily": "#E1F5EE" };

export default function Catalogue() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getAllProductsAPI({ category }),
    retry: 1,
  });

  // Backend se data aaya toh use karo, warna fallback
  const products = data?.data?.length > 0 ? data.data : FALLBACK;
  const filtered = category
    ? products.filter(p => p.category === category)
    : products;

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #eee",
        padding: "28px 24px 20px"
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#D4537E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            Shop
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>Our catalogue</div>
          <div style={{ fontSize: 14, color: "#888" }}>
            Every item custom stitched to your measurements
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px" }}>

        {/* Filter tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setCategory(f.id)}
              style={{
                padding: "7px 16px", borderRadius: 20,
                border: `1px solid ${category === f.id ? "#D4537E" : "#ddd"}`,
                background: category === f.id ? "#FBEAF0" : "#fff",
                color: category === f.id ? "#72243E" : "#666",
                fontSize: 13, cursor: "pointer"
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Backend status */}
        {isError && (
          <div style={{
            background: "#FAEEDA", border: "1px solid #FAC775",
            borderRadius: 8, padding: "10px 14px",
            fontSize: 12, color: "#633806", marginBottom: 16
          }}>
            Backend connect nahi hua — showing default catalogue
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14
          }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{
                background: "#fff", border: "1px solid #eee",
                borderRadius: 12, overflow: "hidden"
              }}>
                <div style={{ height: 90, background: "#f5f5f5" }} />
                <div style={{ padding: 12 }}>
                  <div style={{ height: 14, background: "#f0f0f0", borderRadius: 4, marginBottom: 6 }} />
                  <div style={{ height: 12, background: "#f5f5f5", borderRadius: 4, width: "60%" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products grid */}
        {!isLoading && (
          <>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14
            }}>
              {filtered.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate("/order", { state: { product } })}
                  style={{
                    background: "#fff", border: "1px solid #eee",
                    borderRadius: 12, overflow: "hidden", cursor: "pointer"
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#D4537E"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#eee"}
                >
                  <div style={{
                    height: 90,
                    background: product.bg || BGS[product.category] || "#FAEEDA",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 32
                  }}>
                    {product.icon || ICONS[product.name] || "👗"}
                  </div>
                  <div style={{ padding: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{product.name}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                      From ₹{product.price}
                    </div>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 6 }}>
                      {(product.fabric || []).map(f => (
                        <span key={f} style={{
                          fontSize: 10, background: "#f5f5f5",
                          color: "#666", padding: "2px 7px", borderRadius: 20
                        }}>
                          {f}
                        </span>
                      ))}
                    </div>
                    <div style={{
                      fontSize: 10, background: "#FBEAF0", color: "#72243E",
                      padding: "2px 8px", borderRadius: 20,
                      display: "inline-block", marginTop: 6
                    }}>
                      {product.tag || "Custom stitch"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>
                Is category mein koi product nahi hai
              </div>
            )}
          </>
        )}

        {/* Bottom CTA */}
        <div style={{
          background: "#fff", border: "1px solid #eee",
          borderRadius: 12, padding: "20px",
          textAlign: "center", marginTop: 24
        }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
            Apna design hai?
          </div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>
            Koi bhi design — hum banayenge aapke naap pe
          </div>
          <button
            onClick={() => window.open("https://wa.me/919999999999?text=Hi! Mujhe custom design chahiye.", "_blank")}
            style={{
              background: "#25D366", color: "#fff",
              border: "none", padding: "10px 22px",
              borderRadius: 8, fontSize: 13, cursor: "pointer"
            }}
          >
            WhatsApp pe batao
          </button>
        </div>
      </div>
    </div>
  );
}