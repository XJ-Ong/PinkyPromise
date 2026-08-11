"use client";

import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getScenarioById, getValidComparison } from "@/data/scenarios";
import { recordCompletedCheck } from "@/lib/checkHistoryStore";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StorageWarningBanner from "@/components/ui/StorageWarningBanner";
import { CheckCircle2, Loader2, X } from "lucide-react";
import Stepper from "@/components/checker/Stepper";
import Link from "next/link";

const PROCESSING_MESSAGES = [
  { threshold: 0, text: "Scanning product label..." },
  { threshold: 30, text: "Identifying comparable products..." },
  { threshold: 60, text: "Comparing size, material, and functionality..." },
  { threshold: 90, text: "Calculating price difference..." },
];

function UploadProcessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetId = searchParams.get("target");
  const compareId = searchParams.get("compare");
  const comparison = getValidComparison(targetId, compareId);
  const target = comparison?.target;
  const compare = comparison?.compare;
  // Cancel only needs a valid target-role scenario to exist (no compare
  // picked yet, so no validated pair) — deliberately NOT getValidComparison.
  const cancelTarget = getScenarioById(targetId);

  const [progress, setProgress] = useState(0);
  const [storageWarning, setStorageWarning] = useState(false);
  const recordedRef = useRef(false);

  useEffect(() => {
    if (!target || !compare) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [target, compare]);

  const handleSeeComparison = useCallback(() => {
    if (!target || !compare) return;
    if (recordedRef.current) return;
    recordedRef.current = true;
    const result = recordCompletedCheck({
      targetScenarioId: target.id,
      compareScenarioId: compare.id,
      result: target.type,
      taxPercent: target.taxPercent ?? 0,
    });
    if (!result.persisted) setStorageWarning(true);
    router.push(`/compare?target=${target.id}&compare=${compare.id}`);
  }, [router, target, compare]);

  const handleCancel = useCallback(() => {
    router.push(cancelTarget ? `/upload/compare?target=${cancelTarget.id}` : "/upload");
  }, [router, cancelTarget]);

  if (!target || !compare) {
    return (
      <main className="container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-xl font-bold text-slate-900 mb-4">Missing product selection</h1>
        <Link
          href="/upload"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          Start Over
        </Link>
      </main>
    );
  }

  const currentMessage = [...PROCESSING_MESSAGES].reverse().find((m) => progress >= m.threshold)?.text
    ?? PROCESSING_MESSAGES[0].text;
  const isDone = progress >= 100;

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 space-y-8 pb-24 md:pb-10 max-w-2xl">
      {storageWarning && (
        <StorageWarningBanner onDismiss={() => setStorageWarning(false)} />
      )}
      <Stepper currentStep={3} />

      <section data-testid="processing-state" className="space-y-6">
        <div className="flex flex-col items-center text-center py-8">
          <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mb-4">
            {isDone ? (
              <CheckCircle2 className="w-10 h-10 text-success" data-testid="processing-complete-icon" />
            ) : (
              <Loader2 className="w-10 h-10 text-primary animate-spin" data-testid="processing-spinner" />
            )}
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            {isDone ? "Comparison ready!" : "Processing your product..."}
          </h2>
          <p className="text-sm text-slate-500" data-testid="processing-message">
            {isDone ? "We've compared your products across price, size, material, and functionality." : currentMessage}
          </p>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-3" data-testid="processing-progress" />
          <p className="text-sm text-slate-500 text-right">{progress}%</p>
        </div>

        <div className="flex justify-center gap-3">
          {!isDone && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              data-testid="cancel-processing"
              className="text-slate-500 hover:text-red-500"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          )}
          {isDone && (
            <Button
              size="lg"
              onClick={handleSeeComparison}
              data-testid="see-comparison"
              className="rounded-full h-12 px-8 font-semibold shadow-md"
            >
              See Comparison
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}

export default function UploadProcessPage() {
  return (
    <Suspense fallback={
      <main className="container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <UploadProcessPageContent />
    </Suspense>
  );
}
