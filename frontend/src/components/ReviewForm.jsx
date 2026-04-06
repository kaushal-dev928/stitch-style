import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitReviewAPI } from "../api/reviewAPI";
import toast from "react-hot-toast";

export default function ReviewForm({ orderId, clothType, onClose }) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: submitReviewAPI,
    onSuccess: () => {
      toast.success("Review submit hua! Approval ke baad dikhega.");
      queryClient.invalidateQueries(["myReviews"]);
      if (onClose) onClose();
    },
    onError: (err) => {
      toast.error(err.response?.data?.msg || "Review submit nahi hua");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) { toast.error("Rating do!"); return; }
    if (review.trim().length < 10) { toast.error("Thoda zyada likho!"); return; }
    mutate({ orderId, rating, review });
  };

  return (
    <div style={{
      background: "#fff", border: "0.5px solid #f0e0e5",
      borderRadius: 16, padding: 24
    }}>
      <div style={{ fontSize: 16, fontWeight: 500, color: "#2d1a1a", marginBottom: 4 }}>
        Share your experience
      </div>
      <div style={{ fontSize: 13, color: "#b0909a", marginBottom: 20 }}>
        {clothType} — aapka feedback dusron ki help karega
      </div>

      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 8, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Rating
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                style={{
                  fontSize: 32, cursor: "pointer",
                  color: star <= (hover || rating) ? "#e8a87c" : "#eee",
                  transition: "color 0.1s"
                }}
              >
                ★
              </div>
            ))}
          </div>
          {rating > 0 && (
            <div style={{ fontSize: 12, color: "#c9687e", marginTop: 6 }}>
              {["", "Poor", "Fair", "Good", "Very good", "Excellent!"][rating]}
            </div>
          )}
        </div>

        {/* Review Text */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Your review
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Fitting kaisi thi? Delivery kaisi lagi? Fabric quality?"
            rows={4}
            style={{
              width: "100%", padding: "10px 14px",
              border: "0.5px solid #f0e0e5", borderRadius: 10,
              fontSize: 13, color: "#2d1a1a", resize: "none",
              outline: "none", background: "#fdf7f8",
              fontFamily: "inherit", lineHeight: 1.6
            }}
          />
          <div style={{ fontSize: 11, color: "#b0909a", marginTop: 4 }}>
            {review.length}/500 characters
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="submit"
            disabled={isPending}
            style={{
              flex: 1, padding: 12,
              background: "#c9687e", color: "#fff",
              border: "none", borderRadius: 30,
              fontSize: 14, cursor: "pointer",
              fontWeight: 500
            }}
          >
            {isPending ? "Submitting..." : "Submit review"}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "12px 20px", background: "none",
                border: "0.5px solid #f0e0e5", borderRadius: 30,
                fontSize: 14, cursor: "pointer", color: "#888"
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}