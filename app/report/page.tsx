"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getScenarioById } from "@/data/scenarios";
import { mockProfile } from "@/data/profile";
import { addDeal } from "@/lib/communityStore";
import { getComparisonSummary } from "@/lib/comparisonSummary";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/ui/ProductImage";
import { ArrowLeft, ShieldCheck, CheckCircle2, UploadCloud } from "lucide-react";

interface ComparisonContext {
  productName: string;
  image: string;
  unitSize: string;
  material: string;
  functionality: string;
  design: string;
  rating: number;
}

function ReportPageContent() {
  const searchParams = useSearchParams();
  const targetId = searchParams.get("target");
  const compareId = searchParams.get("compare");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [duplicate, setDuplicate] = useState<{ productName: string; storeName: string } | null>(null);
  const [formData, setFormData] = useState({
    productName: "",
    material: "",
    submissionNote: "",
    storeName: "",
    price: "",
  });
  const [seededKey, setSeededKey] = useState<string | null>(null);

  const compare = compareId ? getScenarioById(compareId) : undefined;
  const target = targetId ? getScenarioById(targetId) : undefined;

  const comparisonKey = targetId && compareId ? `${targetId}:${compareId}` : null;

  if (!target || !compare) {
    return (
      <main className="container mx-auto px-4 py-6 md:py-10 space-y-6 pb-24 md:pb-10 max-w-2xl">
        <Card data-testid="invalid-flow" className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-6 text-center">
            <UploadCloud className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Add to Community Hub</h1>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              You can only publish to the Community Hub after completing a product comparison.
              Nothing has been filled in yet — there is nothing to publish.
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center justify-center rounded-full px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/80 font-semibold transition-colors"
            >
              Run a Check
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  const autoFilled: ComparisonContext = {
    productName: compare.product.name,
    image: compare.product.image,
    unitSize: compare.product.unitSize,
    material: compare.product.material,
    functionality: compare.product.functionality,
    design: compare.product.design,
    rating: compare.product.rating,
  };

  // Store information from previous renders: seed the editable fields only
  // when the comparison changes, never overwriting user edits on re-render.
  if (comparisonKey && seededKey !== comparisonKey) {
    setSeededKey(comparisonKey);
    setFormData({
      productName: autoFilled.productName,
      material: autoFilled.material,
      submissionNote: getComparisonSummary(
        target.product,
        compare.product,
        target.type,
        target.taxPercent ?? 0
      ),
      storeName: "",
      price: compare.product.price.toFixed(2),
    });
  }

  const discountPercent =
    target.product.price > 0
      ? Math.round(((target.product.price - compare.product.price) / target.product.price) * 100)
      : 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDuplicate(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(formData.price);
    if (!formData.productName.trim() || !formData.material.trim() || !formData.storeName.trim()) {
      return;
    }
    if (Number.isNaN(price) || price < 0) {
      return;
    }

    const result = addDeal({
      productName: formData.productName.trim(),
      // TODO: scenarios.ts does not currently have a category field — defaulting to "Other"
      category: "Other",
      price,
      storeName: formData.storeName.trim(),
      image: autoFilled.image,
      unitSize: autoFilled.unitSize,
      material: formData.material.trim(),
      functionality: autoFilled.functionality,
      design: autoFilled.design,
      rating: autoFilled.rating,
      submissionNote: formData.submissionNote.trim() || undefined,
      submitterName: mockProfile.name,
      discountPercent,
      baselinePrice: target.product.price,
    });

    if (!result.ok) {
      setDuplicate({ productName: result.existing.productName, storeName: result.existing.storeName });
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 space-y-6 pb-24 md:pb-10 max-w-2xl">
      <Link
        href={targetId && compareId ? `/compare?target=${targetId}&compare=${compareId}` : "/upload"}
        data-testid="back-button"
        className="inline-flex items-center text-slate-600 hover:text-primary hover:bg-pink-50 rounded-lg px-2 py-1 -ml-4 mb-2 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Add to Community Hub</h1>
        <p className="text-slate-500">Save this comparison to the Community Hub so others can benefit from what you found.</p>
      </div>

      {isSubmitted ? (
        <Card data-testid="success-message" className="border-green-200 bg-green-50 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-800 mb-2">Added to Community Hub!</h2>
            <p className="text-green-700 mb-6">
              Thanks for sharing this comparison. It&apos;s now visible in the Community Hub.
            </p>
            <Link href="/community" className="inline-flex items-center justify-center rounded-full px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/80 font-semibold transition-colors">
              View Community Hub
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-lg bg-pink-100 overflow-hidden flex-shrink-0 border border-slate-200">
                  <ProductImage
                    src={autoFilled.image}
                    alt={autoFilled.productName}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <Badge variant="secondary" className="bg-pink-100 text-primary border-transparent">
                    Auto-detected
                  </Badge>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight break-words">{autoFilled.productName}</h2>
                </div>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500 shrink-0">Size</dt>
                  <dd className="font-medium text-slate-900 text-right break-words">{autoFilled.unitSize}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500 shrink-0">Functionality</dt>
                  <dd className="font-medium text-slate-900 text-right break-words">{autoFilled.functionality}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500 shrink-0">Design</dt>
                  <dd className="font-medium text-slate-900 text-right break-words">{autoFilled.design}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500 shrink-0">Rating</dt>
                  <dd className="font-medium text-slate-900 text-right">{autoFilled.rating.toFixed(1)} / 5</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <form data-testid="report-form" className="space-y-6" onSubmit={handleSubmit}>
                {duplicate && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800" data-testid="duplicate-message">
                    <p>
                      You&apos;ve already added <strong>{duplicate.productName}</strong> from{" "}
                      <strong>{duplicate.storeName}</strong> to the Community Hub.
                    </p>
                    <Link href="/community" className="mt-2 inline-flex items-center font-semibold text-primary underline underline-offset-2 hover:text-primary/80">
                      View existing entry in Community Hub
                    </Link>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="productName" className="text-sm font-semibold text-slate-900">Product Name</label>
                  <Input
                    type="text"
                    id="productName"
                    name="productName"
                    required
                    data-testid="product-name-input"
                    value={formData.productName}
                    onChange={handleChange}
                    className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="material" className="text-sm font-semibold text-slate-900">Material</label>
                  <Input
                    type="text"
                    id="material"
                    name="material"
                    required
                    data-testid="material-input"
                    value={formData.material}
                    onChange={handleChange}
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
                    rows={4}
                    value={formData.submissionNote}
                    onChange={handleChange}
                    placeholder="This note is your message to the community about this comparison."
                    data-testid="submission-note-input"
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 focus:border-primary focus:ring-primary px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                  />
                  <p className="text-xs text-slate-400">Optional — prefilled with an auto-generated summary of this comparison.</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="storeName" className="text-sm font-semibold text-slate-900">Store Name</label>
                  <Input
                    type="text"
                    id="storeName"
                    name="storeName"
                    placeholder="Where did you find this?"
                    required
                    data-testid="store-name-input"
                    value={formData.storeName}
                    onChange={handleChange}
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
                    placeholder="0.00"
                    required
                    data-testid="price-input"
                    value={formData.price}
                    onChange={handleChange}
                    className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary h-12"
                  />
                </div>

                <Button type="submit" data-testid="submit-report" size="lg" className="w-full rounded-full h-12 text-base font-semibold shadow-md">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Add to Community Hub
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </main>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <main className="container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <ReportPageContent />
    </Suspense>
  );
}
