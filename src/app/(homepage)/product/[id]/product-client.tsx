"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Share2, Check, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IProduct } from "@/models/Product";
import { IReview } from "@/models/Review";
import { useDashStore } from "@/lib/store";
import ProductImageSlider from "./product-images-slider";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function ProductClient({ product }: { product: IProduct }) {
  const [isFavorite, setIsFavorite] = useState(product.isFeatured);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviewMessage, setReviewMessage] = useState<{ type: 'success' | 'error' | 'warning', text: string } | null>(null);
  const { setCart } = useDashStore();

  // ⭐ Rating States
  const [userRating, setUserRating] = useState(product.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const finalRating = hoverRating || userRating;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // ⭐ Reviews
  const [reviews, setReviews] = useState([]);
  const [reviewComment, setReviewComment] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/admin/products/reviews/${product._id}`);
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched reviews:", data);

          setReviews(data);
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    fetchReviews();
  }, [product._id]);

  // ⭐ SEND RATING
  const handleRate = async (value: number) => {
    setUserRating(value);

    try {
      await fetch(`/api/users/products/${product._id}/rate`, {
        method: "POST",
        body: JSON.stringify({ rating: value }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Rating failed:", err);
    }
  };

  // ⭐ SUBMIT REVIEW
  const handleSubmitReview = async () => {
  if (!reviewComment.trim()) return;

  setIsSubmittingReview(true);

  try {
    const res = await fetch(`/api/admin/products/reviews/${product._id}`, {
      method: "POST",
      body: JSON.stringify({ rating: userRating, comment: reviewComment }),
      headers: { "Content-Type": "application/json" },
    });

     if (res.status === 409) {
      setReviewMessage({ type: 'warning', text: 'You have already reviewed this product!. Product can only be reviewed once in a year' });
      return;
    }
    if (res.ok) {
      const newReview = await res.json();
      console.log("New review submitted:", newReview);
      setReviews([newReview, ...reviews]);
      setReviewComment("");

      // SWEET ALERT TOAST
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Review submitted successfully!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  } catch (err) {
    setReviewMessage({ type: 'error', text: 'Failed to submit review. Please try again.' });
    console.error("Submit review failed", err);
  } finally {
    setIsSubmittingReview(false);
  }
};

  // ⭐ HANDLE ADD TO CART
  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/users/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id, quantity }),
      });

      if (!res.ok) return;

      setCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      console.error("Cart request failed:", err);
    }
  };

  // ⭐ HANDLE WISHLIST
  const handleWishlist = async () => {
    try {
      const res = await fetch("/api/users/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!res.ok) return;

      const data = await res.json();
      setIsFavorite(data.isFavorite);
    } catch (err) {
      console.error("Wishlist failed:", err);
    }
  };

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.category.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <div className="bg-secondary rounded-lg overflow-hidden h-full flex items-center justify-center">
              
<ProductImageSlider images={product.images} />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
                {product.category.name}
              </p>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                {product.name}
              </h1>

              {/* ⭐ RATING */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-primary font-semibold text-lg">
                    {userRating.toFixed(1)}
                  </span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        className={`cursor-pointer text-xl ${
                          value <= product.rating ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-muted-foreground text-sm">
                  {product.reviewsCount} reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-4 border-t border-border">
                <span className="text-3xl font-bold text-primary">
                  ₵{product.price.toLocaleString()}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    product.inStock ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity + Actions */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-l border-r border-border">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">{product.stock} available</span>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg"
              >
                {addedToCart ? (
                  <span className="flex items-center gap-2">
                    <Check size={20} />
                    Added To Cart
                  </span>
                ) : (
                  "Add To Cart"
                )}
              </Button>

              <div className="flex gap-3">
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Heart size={18} className={isFavorite ? "fill-primary text-primary" : ""} />
                  Wishlist
                </Button>

                <Button variant="outline" size="icon" className="flex-1 bg-transparent">
                  <Share2 size={18} />
                </Button>
              </div>
            </div>

            <Card className="bg-secondary border-border p-4">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">SKU:</span> RC-{product._id.toString().slice(-3)}
                </p>
                <p>
                  <span className="font-semibold">Availability:</span> Ships within 2–3 business days
                </p>
                <p>
                  <span className="font-semibold">Returns:</span> 30-day money-back guarantee
                </p>
              </div>
            </Card>

            {/* ⭐ Reviews Section */}
            <Card className="bg-secondary border-border p-4 mt-8">
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>


              {/* Review Form */}
<div className="mb-6 space-y-2">
  <h4 className="font-semibold">Leave a Review</h4>

  {/* Rating stars + number */}
  <div className="flex items-center gap-2 mb-2">
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={22}
          onClick={() => setUserRating(value)}
          onMouseEnter={() => setHoverRating(value)}
          onMouseLeave={() => setHoverRating(0)}
          className={`cursor-pointer transition
            ${
              value <= finalRating
                ? "fill-primary text-primary"
                : "text-muted-foreground"
            }`}
        />
      ))}
    </div>

    {/* Display selected rating number */}
    <span className="text-sm font-medium text-primary">
      {finalRating}/5
    </span>
  </div>

  <Textarea
    placeholder="Write your review..."
    value={reviewComment}
    onChange={(e) => setReviewComment(e.target.value)}
    className="w-full"
  />

  {/* Review message */}
  {reviewMessage && (
    <p
      className={`mt-2 text-sm ${
        reviewMessage.type === "success"
          ? "text-green-500"
          : reviewMessage.type === "warning"
          ? "text-primary"
          : "text-red-500"
      }`}
    >
      {reviewMessage.text}
    </p>
  )}

  <Button
    onClick={handleSubmitReview}
    className="mt-2"
    disabled={isSubmittingReview}
  >
    {isSubmittingReview ? "Submitting Review..." : "Submit Review"}
  </Button>
</div>



              {/* Existing Reviews */}
              <div className="space-y-4">
                {!reviews.length && (
                  <p className="text-sm text-muted-foreground">No reviews yet.</p>
                )}
              </div>
            </Card>
          </div>
          <div className="col-span-1 md:col-span-2 space-y-6 mt-6">
            <h1>Reviews</h1>
  {
reviews?.map((r) => (
      <div
        key={r._id}
        className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-secondary border-border shadow-sm"
      >
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <img
            src={r.user.profile || `https://ui-avatars.com/api/?name=${r.user.name}&background=random`}
            alt={r.user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        {/* Review Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm md:text-base">{r.user.name}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(r.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((v) => (
              <span
                key={v}
                className={`text-sm md:text-base ${
                  v <= r.rating ? "text-primary" : "text-muted-foreground"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Comment */}
          {r.comment && (
            <p className="text-sm md:text-base text-muted-foreground mt-1 leading-relaxed">
              {r.comment}
            </p>
          )}
        </div>
      </div>
    ))
  }
</div>

        </div>
      </section>
    </main>
  );
}
