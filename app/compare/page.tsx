"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { scenarios } from "@/data/scenarios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, SearchX, ShieldCheck, Flag, Star } from "lucide-react";

function ComparePageContent() {
  const searchParams = useSearchParams();
  const scenarioId = searchParams.get("scenario") as "A" | "B" | "C" | "D" | "E" | null;
  const scenario = scenarios.find((s) => s.id === scenarioId);
  const [showCommunityConfirmation, setShowCommunityConfirmation] = useState(false);

  if (!scenario) {
    return (
      <main className="container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-xl font-bold text-slate-900 mb-4">See how products compare</h1>
        <p className="text-slate-500 text-center max-w-md mb-6">This is where you&apos;ll see a side-by-side price comparison after checking a product — including whether it&apos;s a fair price or a pink-tax markup.</p>
        <Link href="/upload" className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
          Start a Check
        </Link>
      </main>
    );
  }

  // State A - Pink Tax
  if (scenario.type === "pink_tax" && scenario.alternative && typeof scenario.taxPercent === "number") {
    const savings = scenario.alternative.price - scenario.product.price;
    const percentOff = Math.round((Math.abs(savings) / scenario.product.price) * 100);
    return (
      <main className="container mx-auto px-4 py-6 md:py-10 space-y-6 pb-24 md:pb-10 max-w-4xl">
        {/* Stepper */}
        <div data-testid="stepper" className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-slate-500 px-1">
            <span>1. Upload</span>
            <span>2. Process</span>
            <span className="text-primary font-bold">3. Compare</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        {/* Pink Tax Badge */}
        <div data-testid="pink-tax-badge" className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
          <AlertTriangle className="w-12 h-12 text-destructive mb-3" />
          <h2 className="text-2xl font-bold text-red-900 mb-1">Pink Tax: +{scenario.taxPercent}%</h2>
          <p className="text-red-700">Same function, higher price</p>
        </div>

        {/* Comparison Table */}
        <section data-testid="comparison-table" className="grid md:grid-cols-2 gap-4">
          <Card className="border-red-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-destructive"></div>
            <CardHeader className="pb-2 bg-red-50/50">
              <Badge variant="destructive" className="w-fit mb-2">Pink Tax Product</Badge>
              <CardTitle className="text-lg text-slate-900 line-clamp-1">{scenario.product.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-sm">
              <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                <span className="text-slate-500">Price</span>
                <span className="text-2xl font-bold text-slate-900">RM {scenario.product.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Store</span>
                <span className="font-medium">{scenario.product.store}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Size</span>
                <span className="font-medium">{scenario.product.unitSize}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Rating</span>
                <span className="font-medium flex items-center"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {scenario.product.rating}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-success"></div>
            <CardHeader className="pb-2 bg-green-50/50">
              <Badge className="bg-success hover:bg-success w-fit mb-2 text-white border-none">Fair Price Alternative</Badge>
              <CardTitle className="text-lg text-slate-900 line-clamp-1">{scenario.alternative.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-sm">
              <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                <span className="text-slate-500">Price</span>
                <span className="text-2xl font-bold text-success">RM {scenario.alternative.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Store</span>
                <span className="font-medium">{scenario.alternative.store}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Size</span>
                <span className="font-medium">{scenario.alternative.unitSize}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Rating</span>
                <span className="font-medium flex items-center"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {scenario.alternative.rating}</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Savings Callout */}
        <div data-testid="savings-callout" className="bg-primary/10 rounded-xl p-4 text-center">
          <p className="text-primary font-bold text-lg">
            You Save RM {Math.abs(savings).toFixed(2)} — that&apos;s {percentOff}% off!
          </p>
        </div>

        {/* Price Breakdown Illustration */}
        <div data-testid="price-breakdown" className="flex flex-col items-center py-4">
          <div className="w-full max-w-sm h-6 rounded-full bg-slate-200 overflow-hidden flex relative mb-2">
            <div className="bg-slate-400 h-full transition-all" style={{ width: `${100 - percentOff}%` }}></div>
            <div className="bg-destructive h-full transition-all" style={{ width: `${percentOff}%` }}></div>
          </div>
          <p className="text-xs text-slate-500 font-medium">{100 - percentOff}% base cost / <span className="text-destructive">{percentOff}% pink markup</span></p>
        </div>

        {/* CTA */}
        <Link href={`/report?context=${scenario.id}`} data-testid="report-cta" className="inline-flex items-center justify-center w-full sm:w-auto sm:mx-auto rounded-full h-12 bg-primary text-primary-foreground hover:bg-primary/80 font-semibold transition-colors">
          <Flag className="w-5 h-5 mr-2" />
          Report a Price
        </Link>
      </main>
    );
  }

  // State B - Fair Price
  if (scenario.type === "fair_price") {
    return (
      <main className="container mx-auto px-4 py-6 md:py-10 space-y-6 pb-24 md:pb-10 max-w-4xl">
        {/* Stepper */}
        <div data-testid="stepper" className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-slate-500 px-1">
            <span>1. Upload</span>
            <span>2. Process</span>
            <span className="text-primary font-bold">3. Compare</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        {/* Fair Price Badge */}
        <div data-testid="fair-price-badge" className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-success mb-3" />
          <h2 className="text-2xl font-bold text-green-800 mb-1">No Pink Tax Detected</h2>
          <p className="text-green-700">This product is fairly priced compared to alternatives.</p>
        </div>

        {/* Comparison Table */}
        <section data-testid="comparison-table" className="grid md:grid-cols-2 gap-4">
          <Card className="border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-300"></div>
            <CardHeader className="pb-2 bg-slate-50/50">
              <Badge variant="outline" className="w-fit mb-2 text-slate-600">Product</Badge>
              <CardTitle className="text-lg text-slate-900 line-clamp-1">{scenario.product.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-sm">
              <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                <span className="text-slate-500">Price</span>
                <span className="text-2xl font-bold text-slate-900">RM {scenario.product.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Store</span>
                <span className="font-medium">{scenario.product.store}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Size</span>
                <span className="font-medium">{scenario.product.unitSize}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Rating</span>
                <span className="font-medium flex items-center"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {scenario.product.rating}</span>
              </div>
            </CardContent>
          </Card>

          {scenario.alternative && (
            <Card className="border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-300"></div>
              <CardHeader className="pb-2 bg-slate-50/50">
                <Badge variant="outline" className="w-fit mb-2 text-slate-600">Alternative</Badge>
                <CardTitle className="text-lg text-slate-900 line-clamp-1">{scenario.alternative.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3 text-sm">
                <div className="flex justify-between items-end border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Price</span>
                  <span className="text-2xl font-bold text-slate-900">RM {scenario.alternative.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Store</span>
                  <span className="font-medium">{scenario.alternative.store}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Size</span>
                  <span className="font-medium">{scenario.alternative.unitSize}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Rating</span>
                  <span className="font-medium flex items-center"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {scenario.alternative.rating}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Savings Callout - RM 0.00 difference */}
        <div data-testid="savings-callout" className="bg-slate-100 rounded-xl p-4 text-center">
          <p className="text-slate-600 font-medium">RM 0.00 difference</p>
        </div>

        {/* CTA */}
        {showCommunityConfirmation ? (
          <div data-testid="community-confirmation" className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="font-semibold text-green-800">Added to Community Hub!</p>
            <p className="text-sm text-green-600">Thanks for sharing this fair price find.</p>
          </div>
        ) : (
          <Button 
            data-testid="add-to-community" 
            size="lg" 
            className="w-full sm:w-auto sm:mx-auto flex rounded-full h-12 bg-success hover:bg-green-700 text-white"
            onClick={() => setShowCommunityConfirmation(true)}
          >
            <ShieldCheck className="w-5 h-5 mr-2" />
            Add to Community Hub
          </Button>
        )}
      </main>
    );
  }

  // State C - No Match Found
  if (scenario.type === "no_match") {
    return (
      <main className="container mx-auto px-4 py-6 md:py-10 space-y-6 pb-24 md:pb-10 max-w-2xl">
        {/* Stepper */}
        <div data-testid="stepper" className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-slate-500 px-1">
            <span>1. Upload</span>
            <span>2. Process</span>
            <span className="text-primary font-bold">3. Compare</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        {/* Empty State */}
        <div data-testid="no-match-empty-state" className="flex flex-col items-center justify-center text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
          <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mb-6">
            <SearchX className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3 max-w-md">We couldn&apos;t find a verified alternative for this product yet.</h2>
          <p className="text-slate-500 max-w-md">Help grow our database — report this product or suggest an alternative you know of.</p>
        </div>

        {/* CTA */}
        <Link href={`/report?context=${scenario.id}`} data-testid="report-product-cta" className="inline-flex items-center justify-center w-full sm:w-auto sm:mx-auto rounded-full h-12 bg-primary text-primary-foreground hover:bg-primary/80 font-semibold transition-colors">
          <Flag className="w-5 h-5 mr-2" />
          Report This Product
        </Link>
      </main>
    );
  }

  return null;
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
