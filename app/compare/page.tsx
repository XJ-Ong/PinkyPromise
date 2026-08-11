"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getValidComparison } from "@/data/scenarios";
import { getComparisonSummary } from "@/lib/comparisonSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, ShieldCheck, Star, ArrowLeft } from "lucide-react";
import Stepper from "@/components/checker/Stepper";

function ComparePageContent() {
  const searchParams = useSearchParams();
  const targetId = searchParams.get("target");
  const compareId = searchParams.get("compare");
  const from = searchParams.get("from");
  const comparison = getValidComparison(targetId, compareId);
  const target = comparison?.target;
  const compare = comparison?.compare;

  if (!target || !compare) {
    return (
      <main className="container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-xl font-bold text-slate-900 mb-4">See how products compare</h1>
        <p className="text-slate-500 text-center max-w-md mb-6">
          The comparison pair is incomplete or the link is invalid — start a new
          check to see a side-by-side price comparison.
        </p>
        <Link
          href="/upload"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          Start a Check
        </Link>
      </main>
    );
  }

  const isPinkTax = target.type === "pink_tax" && typeof target.taxPercent === "number";
  const savings = compare.product.price - target.product.price;
  const percentOff = target.product.price > 0
    ? Math.round((Math.abs(savings) / target.product.price) * 100)
    : 0;

  const addToCommunityHref = `/report?target=${target.id}&compare=${compare.id}`;
  const backHref = from === "profile" ? "/profile" : "/upload";
  const backLabel = from === "profile" ? "Back to Profile" : "Back to Start";
  const summary = getComparisonSummary(
    target.product,
    compare.product,
    target.type,
    target.taxPercent ?? 0
  );

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 space-y-6 pb-24 md:pb-10 max-w-4xl">
      <Stepper currentStep={4} />

      {isPinkTax ? (
        <div data-testid="pink-tax-badge" className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
          <AlertTriangle className="w-12 h-12 text-destructive mb-3" />
          <h2 className="text-2xl font-bold text-red-900 mb-1">Pink Tax: +{target.taxPercent}%</h2>
          <p className="text-red-700">Same function, higher price</p>
        </div>
      ) : (
        <div data-testid="fair-price-badge" className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-success mb-3" />
          <h2 className="text-2xl font-bold text-green-800 mb-1">No Pink Tax Detected</h2>
          <p className="text-green-700">This product is fairly priced compared to your compare product.</p>
        </div>
      )}

      <section data-testid="comparison-table" className="grid md:grid-cols-2 gap-4">
        <Card className={isPinkTax ? "border-red-200 shadow-sm relative overflow-hidden" : "border-slate-200 shadow-sm relative overflow-hidden"}>
          <div className={`absolute top-0 left-0 w-full h-1 ${isPinkTax ? "bg-destructive" : "bg-slate-300"}`}></div>
          <CardHeader className={isPinkTax ? "pb-2 bg-red-50/50" : "pb-2 bg-slate-50/50"}>
            <Badge variant={isPinkTax ? "destructive" : "outline"} className="w-fit mb-2">
              {isPinkTax ? "Pink Tax Product" : "Your Product"}
            </Badge>
            <CardTitle className="text-lg text-slate-900 line-clamp-1">{target.product.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3 text-sm">
            <div className="flex justify-between items-end border-b border-slate-100 pb-3">
              <span className="text-slate-500">Price</span>
              <span className="text-2xl font-bold text-slate-900">RM {target.product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Size</span>
              <span className="font-medium">{target.product.unitSize}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Material</span>
              <span className="font-medium text-right max-w-[60%] break-words">{target.product.material}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Functionality</span>
              <span className="font-medium text-right max-w-[60%]">{target.product.functionality}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Design</span>
              <span className="font-medium text-right max-w-[60%]">{target.product.design}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Rating</span>
              <span className="font-medium flex items-center"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {target.product.rating}</span>
            </div>
          </CardContent>
        </Card>

        <Card className={isPinkTax ? "border-green-200 shadow-sm relative overflow-hidden" : "border-slate-200 shadow-sm relative overflow-hidden"}>
          <div className={`absolute top-0 left-0 w-full h-1 ${isPinkTax ? "bg-success" : "bg-slate-300"}`}></div>
          <CardHeader className={isPinkTax ? "pb-2 bg-green-50/50" : "pb-2 bg-slate-50/50"}>
            <Badge className={isPinkTax ? "bg-success hover:bg-success w-fit mb-2 text-white border-none" : "w-fit mb-2 text-slate-600"} variant={isPinkTax ? undefined : "outline"}>
              {isPinkTax ? "Your Compare Product" : "Compare Product"}
            </Badge>
            <CardTitle className="text-lg text-slate-900 line-clamp-1">{compare.product.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3 text-sm">
            <div className="flex justify-between items-end border-b border-slate-100 pb-3">
              <span className="text-slate-500">Price</span>
              <span className={`text-2xl font-bold ${isPinkTax ? "text-success" : "text-slate-900"}`}>RM {compare.product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Size</span>
              <span className="font-medium">{compare.product.unitSize}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Material</span>
              <span className="font-medium text-right max-w-[60%] break-words">{compare.product.material}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Functionality</span>
              <span className="font-medium text-right max-w-[60%]">{compare.product.functionality}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Design</span>
              <span className="font-medium text-right max-w-[60%]">{compare.product.design}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Rating</span>
              <span className="font-medium flex items-center"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {compare.product.rating}</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <section data-testid="comparison-summary" className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-1">Comparison summary</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
      </section>

      {isPinkTax ? (
        <>
          <div data-testid="savings-callout" className="bg-primary/10 rounded-xl p-4 text-center">
            <p className="text-primary font-bold text-lg">
              You Save RM {Math.abs(savings).toFixed(2)} — that&apos;s {percentOff}% off!
            </p>
          </div>
          <div data-testid="price-breakdown" className="flex flex-col items-center py-4">
            <div className="w-full max-w-sm h-6 rounded-full bg-slate-200 overflow-hidden flex relative mb-2">
              <div className="bg-slate-400 h-full transition-all" style={{ width: `${100 - percentOff}%` }}></div>
              <div className="bg-destructive h-full transition-all" style={{ width: `${percentOff}%` }}></div>
            </div>
            <p className="text-xs text-slate-500 font-medium">{100 - percentOff}% base cost / <span className="text-destructive">{percentOff}% pink markup</span></p>
          </div>
        </>
      ) : (
        <div data-testid="savings-callout" className="bg-slate-100 rounded-xl p-4 text-center">
          <p className="text-slate-600 font-medium">RM {Math.abs(savings).toFixed(2)} difference</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
        <Link
          href={addToCommunityHref}
          data-testid="add-to-community"
          className="inline-flex items-center justify-center w-full sm:w-auto rounded-full h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/80 font-semibold transition-colors"
        >
          <ShieldCheck className="w-5 h-5 mr-2" />
          Add to Community Hub
        </Link>
        <Link
          href={backHref}
          data-testid="back-to-start"
          className="inline-flex items-center justify-center w-full sm:w-auto rounded-full h-12 px-6 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {backLabel}
        </Link>
      </div>
    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <main className="container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <ComparePageContent />
    </Suspense>
  );
}
