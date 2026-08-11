"use client";

import { useRouter } from "next/navigation";
import { getTargetScenarios } from "@/data/scenarios";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, AlertCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductImage from "@/components/ui/ProductImage";
import Stepper from "@/components/checker/Stepper";

export default function UploadTargetPage() {
  const router = useRouter();
  const targets = getTargetScenarios();

  const handleSelect = (targetId: string) => {
    router.push(`/upload/compare?target=${targetId}`);
  };

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 space-y-8 pb-24 md:pb-10 max-w-3xl">
      <Stepper currentStep={1} />

      <section data-testid="upload-dropzone">
        <Card className="border-2 border-dashed border-slate-300 hover:border-primary hover:bg-pink-50/50 transition-colors cursor-pointer rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Take a photo or upload</h2>
            <p className="text-sm text-slate-500 mb-6">Take a clear picture of the product you want to check.</p>
            <Button variant="outline" className="rounded-full border-slate-300 hover:bg-slate-100 px-6">
              <UploadCloud className="w-4 h-4 mr-2" />
              Choose File
            </Button>
            <p className="text-xs text-slate-400 mt-4">JPG or PNG, Max 10 MB</p>
          </CardContent>
        </Card>
      </section>

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

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Choose a Sample Product (Target)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {targets.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => handleSelect(scenario.id)}
              data-testid={`scenario-${scenario.id}`}
              className="block w-full text-left touch-manipulation select-none active:scale-[0.98] transition-transform focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
            >
              <Card className="hover:border-primary hover:shadow-md transition-all rounded-xl cursor-pointer bg-white group">
                <CardContent className="p-3 flex flex-col items-center gap-2">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-pink-100 overflow-hidden flex-shrink-0 border border-slate-200">
                    <ProductImage
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
    </main>
  );
}
