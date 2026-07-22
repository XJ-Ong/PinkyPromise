import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";

export default function ReportPage({
  searchParams,
}: {
  searchParams: { context?: string };
}) {
  const context = searchParams.context;

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 space-y-6 pb-24 md:pb-10 max-w-2xl">
      {/* Back Arrow */}
      <Button asChild variant="ghost" className="mb-2 -ml-4 text-slate-600 hover:text-primary hover:bg-pink-50">
        <Link href={context ? `/compare?scenario=${context}` : "/"} data-testid="back-button">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Link>
      </Button>

      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Report a Better Price</h1>
        <p className="text-slate-500">Help the community by sharing fair-priced alternatives you&apos;ve found.</p>
      </div>

      {/* Form */}
      <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <form data-testid="report-form" className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="productName" className="text-sm font-semibold text-slate-900">Product/Alternative Name</label>
              <Input
                type="text"
                id="productName"
                name="productName"
                placeholder="e.g. Basic Cotton Tee (Unisex)"
                required
                data-testid="product-name-input"
                className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary h-12"
              />
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
                className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="photo" className="text-sm font-semibold text-slate-900">Photo (optional)</label>
              <Input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                disabled
                data-testid="photo-upload"
                className="bg-slate-50 border-slate-200 cursor-not-allowed text-slate-400 file:text-slate-400 file:bg-slate-100 file:border-0 file:mr-4 file:py-2 file:px-4 file:rounded-full file:text-sm file:font-semibold h-12 pt-1.5"
              />
              <p className="text-xs text-slate-500">Photo upload is disabled in this demo.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="note" className="text-sm font-semibold text-slate-900">Note (optional)</label>
              <textarea
                id="note"
                name="note"
                placeholder="Any other details to help others find this?"
                data-testid="note-input"
                className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <Button type="submit" data-testid="submit-report" size="lg" className="w-full rounded-full h-12 text-base font-semibold shadow-md">
              <Send className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
