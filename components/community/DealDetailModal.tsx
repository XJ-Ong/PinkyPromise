"use client";

import { useEffect } from "react";
import { CommunityDeal } from "@/lib/types";
import ProductImage from "@/components/ui/ProductImage";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageSquare, Star, X } from "lucide-react";

export default function DealDetailModal({
  deal,
  onClose,
}: {
  deal: CommunityDeal;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
      data-testid="deal-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deal-detail-title"
      aria-describedby="deal-detail-description"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
        data-testid="deal-detail-modal"
      >
        <div className="relative">
          <ProductImage
            src={deal.image}
            alt={deal.productName}
            width={600}
            height={240}
            className="w-full h-56 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            aria-label="Close deal details"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md"
            data-testid="close-deal-detail"
          >
            <X className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        <div className="p-6 space-y-4 min-w-0">
          <div className="flex justify-between items-start gap-3">
            <h2 id="deal-detail-title" className="text-xl font-bold text-slate-900 break-words">{deal.productName}</h2>
            {deal.verified && (
              <Badge className="bg-success/10 text-success border-none shrink-0">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="text-sm font-medium text-slate-700">{deal.rating}</span>
          </div>

          <div id="deal-detail-description" className="grid grid-cols-2 gap-4 text-sm border-t border-slate-100 pt-4">
            <div>
              <p className="text-slate-500">Price</p>
              <p className="font-semibold text-slate-900">RM {deal.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-500">Store</p>
              <p className="font-semibold text-slate-900 break-words">{deal.storeName}</p>
            </div>
            <div>
              <p className="text-slate-500">Size</p>
              <p className="font-semibold text-slate-900">{deal.unitSize}</p>
            </div>
            <div>
              <p className="text-slate-500">Category</p>
              <p className="font-semibold text-slate-900">{deal.category}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3 text-sm">
            <div>
              <p className="text-slate-500 mb-1">Material</p>
              <p className="text-slate-800 break-words">{deal.material}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Functionality</p>
              <p className="text-slate-800 break-words">{deal.functionality}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Design</p>
              <p className="text-slate-800 break-words">{deal.design}</p>
            </div>
            {deal.submissionNote && (
              <div>
                <p className="text-slate-500 mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Community note
                </p>
                <p className="text-slate-800 break-words [overflow-wrap:anywhere]">{deal.submissionNote}</p>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">
            Added by {deal.submitterName}
          </p>
        </div>
      </div>
    </div>
  );
}