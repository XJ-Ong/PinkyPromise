"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { scenarios } from "@/data/scenarios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, AlertCircle, Camera, CheckCircle2, X } from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleScenarioSelect = useCallback((scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setIsProcessing(true);
    setProgress(0);
  }, []);

  const handleCancel = useCallback(() => {
    setSelectedScenario(null);
    setIsProcessing(false);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!isProcessing) return;

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
  }, [isProcessing]);

  useEffect(() => {
    if (progress >= 100 && selectedScenario) {
      const timeout = setTimeout(() => {
        router.push(`/compare?scenario=${selectedScenario}`);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress, selectedScenario, router]);

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 space-y-8 pb-24 md:pb-10 max-w-3xl">
      {/* Stepper Indicator */}
      <div data-testid="stepper" className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-slate-500 px-1">
          <span className="text-primary font-bold">1. Upload</span>
          <span>2. Process</span>
          <span>3. Compare</span>
        </div>
        <Progress value={33} className="h-2" />
      </div>

      {/* Upload Drop Zone */}
      <section data-testid="upload-dropzone">
        <Card className="border-2 border-dashed border-slate-300 hover:border-primary hover:bg-pink-50/50 transition-colors cursor-pointer rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Take a photo or upload</h2>
            <p className="text-sm text-slate-500 mb-6">Take a clear picture of the product and its price tag.</p>
            <Button variant="outline" className="rounded-full border-slate-300 hover:bg-slate-100 px-6">
              <UploadCloud className="w-4 h-4 mr-2" />
              Choose File
            </Button>
            <p className="text-xs text-slate-400 mt-4">JPG or PNG, Max 10 MB</p>
          </CardContent>
        </Card>
      </section>

      {/* Disclaimer Box */}
      <section data-testid="disclaimer-box" className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 shadow-sm">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-amber-800 font-bold text-sm mb-1">Demo Mode Active</h3>
          <p className="text-amber-700 text-sm leading-relaxed">
            Our AI-powered image recognition is still under development. 
            To preview how Pink Tax Checker works, please select one of the sample products below 
            instead of uploading your own photo.
          </p>
        </div>
      </section>

      {/* Processing State */}
      {isProcessing && (
        <section data-testid="processing-state" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Processing your product...</h2>
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
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="h-3" data-testid="processing-progress" />
            <p className="text-sm text-slate-500 text-right">{progress}%</p>
          </div>
          <p className="text-sm text-slate-500">
            Analyzing product pricing and comparing with alternatives...
          </p>
        </section>
      )}

      {/* Scenario Selector */}
      {!isProcessing && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Choose a Sample Photo</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleScenarioSelect(scenario.id)}
                data-testid={`scenario-${scenario.id}`}
                className="block w-full text-left touch-manipulation select-none active:scale-[0.98] transition-transform focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
              >
                <Card className="hover:border-primary hover:shadow-md transition-all rounded-xl cursor-pointer bg-white group">
                  <CardContent className="p-3 flex flex-col items-center gap-2">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-pink-100 overflow-hidden flex-shrink-0 border border-slate-200">
                      <Image
                        src={scenario.thumbnail}
                        alt={scenario.label}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm text-center leading-tight">{scenario.label}</p>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
