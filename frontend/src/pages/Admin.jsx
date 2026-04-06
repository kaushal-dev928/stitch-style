import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getAllProductsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "../api/productAPI";
import { getAllOrdersAPI } from "../api/orderAPI";
import {
  getAllReviewsAdminAPI,
  approveReviewAPI,
  deleteReviewAPI,
} from "../api/reviewAPI";
import toast from "react-hot-toast";

const EMPTY_FORM = {
  name: "",
  category: "ethnic",
  fabric: [],
  price: "",
  description: "",
};

const FABRICS = ["Cotton", "Silk", "Georgette", "Linen", "Rayon"];
const CATEGORIES = ["ethnic", "party", "daily"];
const STATUS_OPTIONS = [
  "CONFIRMED", "MEASURE_VERIFIED", "STITCHING",
  "QUALITY_CHECK", "OUT_FOR_DELIVERY", "DELIVERED"
];

const STATUS_COLOR = {
  DELIVERED: { bg: "#E1F5EE", color: "#085041" },
  CONFIRMED: { bg: "#E6F1FB", color: "#0C447C" },
  STITCHING: { bg: "#FAEEDA", color: "#633806" },
  CANCELLED: { bg: "#FCEBEB", color: "#A32D2D" },
  MEASURE_VERIFIED: { bg: "#EEEDFE", color: "#3C3489" },
  QUALITY_CHECK: { bg: "#FAEEDA", color: "#633806" },
  OUT_FOR_DELIVERY: { bg: "#E1F5EE", color: "#085041" },
};

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState("products");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  // ✅ Products
  const { data: productsData, isLoading: loadingProducts } = useQuery({
    queryKey: ["products", ""],
    queryFn: () => getAllProductsAPI({}),
  });

  // ✅ Orders
  const { data: ordersData, isLoading: loadingOrders } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrdersAPI,
  });

  // ✅ Reviews
  const { data: reviewsData } = useQuery({
    queryKey: ["allReviews"],
    queryFn: getAllReviewsAdminAPI,
  });

  // ✅ Product mutations
  const { mutate: createProduct, isPending: creating } = useMutation({
    mutationFn: createProductAPI,
    onSuccess: () => {
      toast.success("Product added!");
      queryClient.invalidateQueries(["products"]);
      setShowForm(false);
      setForm(EMPTY_FORM);
    },
    onError: (err) => toast.error(err.response?.data?.msg || "Failed"),
  });

  const { mutate: updateProduct, isPending: updating } = useMutation({
    mutationFn: ({ id, data }) => updateProductAPI(id, data),
    onSuccess: () => {
      toast.success("Product updated!");
      queryClient.invalidateQueries(["products"]);
      setShowForm(false);
      setEditId(null);
      setForm(EMPTY_FORM);
    },
    onError: (err) => toast.error(err.response?.data?.msg || "Failed"),
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: () => {
      toast.success("Product deleted!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => toast.error("Delete failed"),
  });

  // ✅ Review mutations
  const { mutate: approveReview } = useMutation({
    mutationFn: approveReviewAPI,
    onSuccess: () => {
      toast.success("Review approved!");
      queryClient.invalidateQueries(["allReviews"]);
    },
    onError: () => toast.error("Approve failed"),
  });

  const { mutate: deleteReview } = useMutation({
    mutationFn: deleteReviewAPI,
    onSuccess: () => {
      toast.success("Review deleted!");
      queryClient.invalidateQueries(["allReviews"]);
    },
    onError: () => toast.error("Delete failed"),
  });

  // ✅ Admin check — hooks ke BAAD
  if (user?.role !== "admin") {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>Admin only</div>
        <div style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>
          Aapke paas admin access nahi hai
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#D4537E", color: "#fff",
            border: "none", padding: "10px 20px",
            borderRadius: 8, cursor: "pointer"
          }}
        >
          Go home
        </button>
      </div>
    );
  }

  const products = productsData?.data || [];
  const orders = ordersData?.data || [];
  const allReviews = reviewsData?.data || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.fabric.length === 0) {
      toast.error("Kam se kam ek fabric select karo");
      return;
    }
    if (editId) {
      updateProduct({ id: editId, data: form });
    } else {
      createProduct(form);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      fabric: product.fabric,
      price: product.price,
      description: product.description || "",
    });
    setEditId(product._id);
    setShowForm(true);
  };

  const handleFabricToggle = (f) => {
    setForm((prev) => ({
      ...prev,
      fabric: prev.fabric.includes(f)
        ? prev.fabric.filter((x) => x !== f)
        : [...prev.fabric, f],
    }));
  };

  const inputStyle = {
    width: "100%", padding: "9px 13px",
    border: "1px solid #eee", borderRadius: 8,
    fontSize: 13, marginTop: 4,
    background: "#fafafa", outline: "none"
  };

  const labelStyle = {
    fontSize: 11, fontWeight: 500,
    color: "#888", textTransform: "uppercase",
    letterSpacing: "0.04em"
  };

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #eee",
        padding: "16px 28px", display: "flex",
        justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 500 }}>Admin dashboard</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
            Welcome, {user?.name}
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none", border: "1px solid #eee",
            padding: "7px 16px", borderRadius: 8,
            fontSize: 13, cursor: "pointer", color: "#666"
          }}
        >
          View site
        </button>
      </div>

      {/* ── STATS ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        gap: 12, padding: "20px 28px"
      }}>
        {[
          { num: products.length, label: "Total products", color: "#D4537E" },
          { num: orders.length, label: "Total orders", color: "#1D9E75" },
          { num: orders.filter(o => o.status !== "DELIVERED").length, label: "Active orders", color: "#EF9F27" },
          { num: allReviews.filter(r => !r.isApproved).length, label: "Pending reviews", color: "#378ADD" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "#fff", border: "1px solid #eee",
            borderRadius: 12, padding: 16, textAlign: "center"
          }}>
            <div style={{ fontSize: 28, fontWeight: 500, color: s.color }}>{s.num}</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── TABS ── */}
      <div style={{ padding: "0 28px", marginBottom: 20 }}>
        <div style={{
          display: "flex", border: "1px solid #eee",
          borderRadius: 10, overflow: "hidden",
          background: "#fff", width: "fit-content"
        }}>
          {["products", "orders", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 24px", border: "none",
                background: activeTab === tab ? "#D4537E" : "none",
                color: activeTab === tab ? "#fff" : "#666",
                fontSize: 13, cursor: "pointer",
                fontWeight: activeTab === tab ? 500 : 400,
                textTransform: "capitalize"
              }}
            >
              {tab === "products"
                ? `Products (${products.length})`
                : tab === "orders"
                ? `Orders (${orders.length})`
                : `Reviews (${allReviews.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS TAB ── */}
      {activeTab === "products" && (
        <div style={{ padding: "0 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 500 }}>All products</div>
            <button
              onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); }}
              style={{
                background: "#D4537E", color: "#fff",
                border: "none", padding: "9px 18px",
                borderRadius: 8, fontSize: 13, cursor: "pointer"
              }}
            >
              + Add new product
            </button>
          </div>

          {showForm && (
            <div style={{
              background: "#fff", border: "1px solid #eee",
              borderRadius: 12, padding: 22, marginBottom: 20
            }}>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>
                {editId ? "Edit product" : "Add new product"}
              </div>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={labelStyle}>Product name</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. Kurti"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Price (₹)</label>
                    <input
                      style={inputStyle}
                      type="number"
                      placeholder="e.g. 599"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Category</label>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    {CATEGORIES.map((c) => (
                      <button
                        key={c} type="button"
                        onClick={() => setForm({ ...form, category: c })}
                        style={{
                          padding: "7px 16px", borderRadius: 20,
                          border: `1px solid ${form.category === c ? "#D4537E" : "#eee"}`,
                          background: form.category === c ? "#FBEAF0" : "#fff",
                          color: form.category === c ? "#72243E" : "#666",
                          fontSize: 13, cursor: "pointer",
                          textTransform: "capitalize"
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Fabric options</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                    {FABRICS.map((f) => (
                      <button
                        key={f} type="button"
                        onClick={() => handleFabricToggle(f)}
                        style={{
                          padding: "6px 14px", borderRadius: 20,
                          border: `1px solid ${form.fabric.includes(f) ? "#D4537E" : "#eee"}`,
                          background: form.fabric.includes(f) ? "#FBEAF0" : "#fff",
                          color: form.fabric.includes(f) ? "#72243E" : "#666",
                          fontSize: 12, cursor: "pointer"
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Description (optional)</label>
                  <textarea
                    style={{ ...inputStyle, resize: "none" }}
                    rows={2}
                    placeholder="Short description..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    type="submit"
                    disabled={creating || updating}
                    style={{
                      flex: 1, padding: 11,
                      background: "#D4537E", color: "#fff",
                      border: "none", borderRadius: 8,
                      fontSize: 14, cursor: "pointer"
                    }}
                  >
                    {creating || updating ? "Saving..." : editId ? "Update product" : "Add product"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}
                    style={{
                      padding: "11px 20px", background: "none",
                      border: "1px solid #eee", borderRadius: 8,
                      fontSize: 14, cursor: "pointer", color: "#666"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {loadingProducts ? (
            <div style={{ color: "#888", padding: 20 }}>Loading...</div>
          ) : products.length === 0 ? (
            <div style={{
              background: "#fff", border: "1px solid #eee",
              borderRadius: 12, padding: "40px",
              textAlign: "center", color: "#aaa"
            }}>
              Koi product nahi hai — add karo!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {products.map((product) => (
                <div key={product._id} style={{
                  background: "#fff", border: "1px solid #eee",
                  borderRadius: 12, padding: "14px 18px",
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: "#FAEEDA", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: 20
                    }}>
                      👗
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{product.name}</div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                        ₹{product.price} · {product.category} · {product.fabric?.join(", ")}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => handleEdit(product)}
                      style={{
                        padding: "7px 14px", border: "1px solid #eee",
                        borderRadius: 8, background: "#fff",
                        fontSize: 12, cursor: "pointer", color: "#444"
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`"${product.name}" delete karna chahte ho?`)) {
                          deleteProduct(product._id);
                        }
                      }}
                      style={{
                        padding: "7px 14px", border: "1px solid #F09595",
                        borderRadius: 8, background: "#FCEBEB",
                        fontSize: 12, cursor: "pointer", color: "#A32D2D"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── ORDERS TAB ── */}
      {activeTab === "orders" && (
        <div style={{ padding: "0 28px" }}>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>All orders</div>

          {loadingOrders ? (
            <div style={{ color: "#888", padding: 20 }}>Loading...</div>
          ) : orders.length === 0 ? (
            <div style={{
              background: "#fff", border: "1px solid #eee",
              borderRadius: 12, padding: "40px",
              textAlign: "center", color: "#aaa"
            }}>
              Koi order nahi hai abhi
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {orders.map((order) => {
                const sc = STATUS_COLOR[order.status] || { bg: "#f5f5f5", color: "#666" };
                return (
                  <div key={order._id} style={{
                    background: "#fff", border: "1px solid #eee",
                    borderRadius: 12, padding: "16px 18px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>
                          #{order._id.slice(-6).toUpperCase()} — {order.clothType}
                        </div>
                        <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                          {order.userId?.name || "Customer"} · {order.userId?.phone || ""} · ₹{order.totalAmount}
                        </div>
                        <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </div>
                      </div>
                      <div style={{
                        fontSize: 11, background: sc.bg,
                        color: sc.color, padding: "4px 12px",
                        borderRadius: 20, fontWeight: 500
                      }}>
                        {order.status?.replace(/_/g, " ")}
                      </div>
                    </div>

                    <div style={{
                      display: "flex", gap: 16, fontSize: 12,
                      color: "#888", background: "#fafafa",
                      borderRadius: 8, padding: "8px 12px", marginBottom: 12
                    }}>
                      {Object.entries(order.measurements || {}).map(([k, v]) => (
                        <span key={k} style={{ textTransform: "capitalize" }}>
                          {k}: <strong style={{ color: "#444" }}>{v}"</strong>
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={async () => {
                            try {
                              const { default: axiosInstance } = await import("../api/axiosInstance");
                              await axiosInstance.put(`/orders/${order._id}/status`, { status: s });
                              toast.success(`Status updated: ${s.replace(/_/g, " ")}`);
                              queryClient.invalidateQueries(["allOrders"]);
                            } catch {
                              toast.error("Update failed");
                            }
                          }}
                          style={{
                            padding: "5px 12px", borderRadius: 20,
                            border: `1px solid ${order.status === s ? "#D4537E" : "#eee"}`,
                            background: order.status === s ? "#FBEAF0" : "#fff",
                            color: order.status === s ? "#72243E" : "#666",
                            fontSize: 11, cursor: "pointer"
                          }}
                        >
                          {s.replace(/_/g, " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── REVIEWS TAB ── */}
      {activeTab === "reviews" && (
        <div style={{ padding: "0 28px" }}>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>All reviews</div>

          {allReviews.length === 0 ? (
            <div style={{
              background: "#fff", border: "1px solid #eee",
              borderRadius: 12, padding: "40px",
              textAlign: "center", color: "#aaa"
            }}>
              Koi review nahi hai abhi
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {allReviews.map((rev) => (
                <div key={rev._id} style={{
                  background: "#fff", border: "1px solid #eee",
                  borderRadius: 12, padding: "16px 18px"
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", marginBottom: 8
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>
                        {rev.userId?.name || "User"} — {rev.clothType}
                      </div>
                      <div style={{ color: "#e8a87c", fontSize: 14, marginTop: 3, letterSpacing: 2 }}>
                        {"★".repeat(rev.rating)}
                        <span style={{ color: "#eee" }}>{"★".repeat(5 - rev.rating)}</span>
                      </div>
                    </div>
                    <div style={{
                      fontSize: 11, padding: "4px 12px", borderRadius: 20,
                      background: rev.isApproved ? "#E1F5EE" : "#FAEEDA",
                      color: rev.isApproved ? "#085041" : "#633806",
                      fontWeight: 500
                    }}>
                      {rev.isApproved ? "Approved" : "Pending"}
                    </div>
                  </div>

                  <div style={{
                    fontSize: 13, color: "#666", lineHeight: 1.6,
                    background: "#fafafa", borderRadius: 8,
                    padding: "10px 12px", marginBottom: 10
                  }}>
                    "{rev.review}"
                  </div>

                  <div style={{ fontSize: 11, color: "#aaa", marginBottom: 10 }}>
                    {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    {!rev.isApproved && (
                      <button
                        onClick={() => approveReview(rev._id)}
                        style={{
                          padding: "6px 16px", background: "#E1F5EE",
                          color: "#085041", border: "1px solid #9FE1CB",
                          borderRadius: 20, fontSize: 12, cursor: "pointer"
                        }}
                      >
                        Approve ✓
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (window.confirm("Review delete karna chahte ho?")) {
                          deleteReview(rev._id);
                        }
                      }}
                      style={{
                        padding: "6px 16px", background: "#FCEBEB",
                        color: "#A32D2D", border: "1px solid #F09595",
                        borderRadius: 20, fontSize: 12, cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ height: 40 }} />
    </div>
  );
}