import Link from "next/link";
import { scenarios } from "@/data/scenarios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, AlertCircle, Camera, CheckCircle2 } from "lucide-react";

export default function UploadPage() {
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

      {/* Scenario Selector */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Select a Sample Product</h2>
        <div className="grid gap-3">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.id}
              href={`/compare?scenario=${scenario.id}`}
              data-testid={`scenario-${scenario.id}`}
              className="block"
            >
              <Card className="hover:border-primary hover:shadow-md transition-all rounded-xl cursor-pointer bg-white group">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{scenario.label}</p>
                      <p className="text-sm text-slate-500">View comparison result</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
