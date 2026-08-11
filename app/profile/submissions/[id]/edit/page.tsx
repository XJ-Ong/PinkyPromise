"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getMyAddedDeals,
  updateMyAddedDeal,
  deleteMyAddedDeal,
  EditableCommunityDealFields,
} from "@/lib/communityStore";
import { CommunityDeal } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductImage from "@/components/ui/ProductImage";
import StorageWarningBanner from "@/components/ui/StorageWarningBanner";
import { ArrowLeft, CheckCircle2, Save, Trash2 } from "lucide-react";

type SaveFailureReason = "not_found" | "duplicate" | "invalid";

export default function EditSubmissionPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [deal, setDeal] = useState<CommunityDeal | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [productName, setProductName] = useState("");
  const [material, setMaterial] = useState("");
  const [submissionNote, setSubmissionNote] = useState("");
  const [storeName, setStoreName] = useState("");
  const [price, setPrice] = useState("");

  const [saved, setSaved] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    const found = getMyAddedDeals().find((d) => d.id === id) ?? null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe: localStorage unavailable during SSR
    setDeal(found);
    setLoaded(true);
    if (found) {
      setProductName(found.productName);
      setMaterial(found.material);
      setSubmissionNote(found.submissionNote ?? "");
      setStoreName(found.storeName);
      setPrice(found.price.toFixed(2));
    }
  }, [id]);

  if (!loaded) {
    return (
      <main className="container mx-auto px-4 py-10 max-w-2xl flex justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!deal) {
    return (
      <main className="container mx-auto px-4 py-10 max-w-2xl flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-xl font-bold text-slate-900 mb-4">Submission not found</h1>
        <p className="text-slate-500 max-w-md mb-6">
          This submission does not exist or was made by another browser. Only locally added
          submissions can be edited.
        </p>
        <Link
          href="/profile"
          className="inline-flex items-center justify-center rounded-full px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/80 font-semibold transition-colors"
        >
          Back to Profile
        </Link>
      </main>
    );
  }

  if (saved) {
    return (
      <main className="container mx-auto px-4 py-6 md:py-10 space-y-6 pb-24 md:pb-10 max-w-2xl">
        {storageWarning && (
          <StorageWarningBanner onDismiss={() => setStorageWarning(false)} />
        )}
        <Card data-testid="edit-success" className="border-green-200 bg-green-50 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-800 mb-2">Changes saved!</h2>
            <p className="text-green-700 mb-6">Your submission has been updated in the Community Hub.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-full px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/80 font-semibold transition-colors"
              >
                Back to Profile
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center justify-center rounded-full px-6 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold transition-colors"
              >
                View Community Hub
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price);

    if (!productName.trim() || !material.trim() || !storeName.trim()) {
      setError("Product name, material, and store name are required.");
      return;
    }
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setError("Please enter a valid price greater than 0.");
      return;
    }

    const changes: EditableCommunityDealFields = {
      productName,
      material,
      submissionNote,
      storeName,
      price: parsedPrice,
    };

    const result = updateMyAddedDeal(id, changes);
    if (result.ok) {
      if (!result.persisted) setStorageWarning(true);
      setSaved(true);
      return;
    }

    const messages: Record<SaveFailureReason, string> = {
      not_found: "This submission no longer exists.",
      duplicate: `Another submission already exists for ${result.existing?.productName} at ${result.existing?.storeName}.`,
      invalid: "Please check all required fields and try again.",
    };
    setError(messages[result.reason]);
  };

  const handleDelete = () => {
    const result = deleteMyAddedDeal(id);
    if (result.ok) {
      if (!result.persisted) setStorageWarning(true);
      router.push("/profile");
    }
  };

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 space-y-6 pb-24 md:pb-10 max-w-2xl">
      {storageWarning && (
        <StorageWarningBanner onDismiss={() => setStorageWarning(false)} />
      )}
      <Link
        href="/profile"
        data-testid="back-button"
        className="inline-flex items-center text-slate-600 hover:text-primary hover:bg-pink-50 rounded-lg px-2 py-1 -ml-4 mb-2 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Profile
      </Link>

      <div className="space-y-2">
        <h1 className="hidden text-3xl font-bold tracking-tight text-slate-900 md:block">Edit Submission</h1>
        <p className="text-slate-500">Update your community submission. Size, functionality, and design are fixed product facts and cannot be changed here.</p>
      </div>

      <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
              <ProductImage
                src={deal.image}
                alt={deal.productName}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <dl className="flex-1 space-y-1 text-sm min-w-0">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500 shrink-0">Size</dt>
                <dd className="font-medium text-slate-900 text-right break-words">{deal.unitSize}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500 shrink-0">Functionality</dt>
                <dd className="font-medium text-slate-900 text-right break-words">{deal.functionality}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500 shrink-0">Design</dt>
                <dd className="font-medium text-slate-900 text-right break-words">{deal.design}</dd>
              </div>
            </dl>
          </div>

          <form data-testid="edit-form" className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                data-testid="edit-error"
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="productName" className="text-sm font-semibold text-slate-900">Product Name</label>
              <Input
                type="text"
                id="productName"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                data-testid="product-name-input"
                className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="material" className="text-sm font-semibold text-slate-900">Material</label>
              <Input
                type="text"
                id="material"
                name="material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                required
                data-testid="material-input"
                className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="submissionNote" className="text-sm font-semibold text-slate-900">
                Note <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="submissionNote"
                name="submissionNote"
                value={submissionNote}
                onChange={(e) => setSubmissionNote(e.target.value)}
                rows={4}
                placeholder="Share why this price difference matters to the community..."
                data-testid="submission-note-input"
                className="w-full rounded-lg bg-slate-50 border border-slate-200 focus:border-primary focus:ring-primary px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="storeName" className="text-sm font-semibold text-slate-900">Store Name</label>
              <Input
                type="text"
                id="storeName"
                name="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
                data-testid="store-name-input"
                className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-semibold text-slate-900">Price (RM)</label>
              <Input
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                data-testid="price-input"
                className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary h-12"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button type="submit" size="lg" data-testid="save-changes" className="rounded-full h-12 px-6 font-semibold shadow-md">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              {confirmingDelete ? (
                <div className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2">
                  <span className="text-sm text-red-700 font-medium">Delete this submission?</span>
                  <Button size="sm" variant="destructive" onClick={handleDelete} data-testid="confirm-delete">
                    Delete product
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setConfirmingDelete(false)}>
                    Keep product
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={() => setConfirmingDelete(true)}
                  data-testid="start-delete"
                  className="rounded-full h-12 px-6 font-semibold border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
