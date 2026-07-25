import Link from "next/link";
import { insights } from "@/data/insights";
import { deals } from "@/data/deals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, UploadCloud, CheckCircle2, ChevronRight, Tag, Info, Calculator, Users, type LucideIcon } from "lucide-react";
import RequireLogin from "@/components/auth/RequireLogin";

const ICONS: Record<string, LucideIcon> = { info: Info, calculator: Calculator, users: Users };

export default function Home() {
  return (
    <RequireLogin>
    <main className="container mx-auto px-4 py-6 md:py-10 space-y-8 pb-24 md:pb-10 max-w-5xl">
      {/* Header (visible on mobile only) */}
      <header className="flex items-center justify-between md:hidden mb-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PinkyPromise</h1>
        <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm border border-slate-100 text-slate-600 hover:text-primary" aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </Button>
      </header>

      {/* Hero Card */}
      <section>
        <Card className="bg-gradient-to-br from-pink-500 to-primary text-white border-none shadow-lg overflow-hidden relative rounded-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <CardContent className="p-6 sm:p-10 relative z-10 flex flex-col items-start gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-md leading-tight">Fair prices for everyone.</h2>
            <p className="text-pink-50 text-base sm:text-lg mb-2 max-w-sm">Check if you&apos;re paying the pink tax on everyday products.</p>
            <Link href="/upload" data-testid="hero-cta" className="inline-flex items-center justify-center bg-white text-primary hover:bg-slate-50 font-semibold shadow-md rounded-full px-6 sm:px-8 h-12 mt-2 transition-colors">
              <UploadCloud className="w-5 h-5 mr-2" />
              Upload Product to Check
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Latest Pink Tax Insights */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Latest Pink Tax Insights</h2>
        </div>
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 gap-4 snap-x snap-mandatory hide-scrollbar">
          {insights.map((insight) => (
            <Card key={insight.id} data-testid={`insight-${insight.id}`} className="w-[70%] max-w-[220px] md:w-auto md:max-w-none md:min-w-0 snap-center shrink-0 border-slate-200 hover:border-primary/30 transition-colors shadow-sm rounded-xl">
              <CardHeader className="pb-2">
                {(() => { const Icon = ICONS[insight.icon]; return Icon ? <Icon className="w-5 h-5 text-primary mb-2" /> : null; })()}
                <CardTitle className="text-base text-slate-900 line-clamp-1">{insight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 line-clamp-2">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recently Added Community Deals */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Community Price Reports</h2>
          <Link href="/community" data-testid="see-all-deals" className="inline-flex items-center text-primary hover:text-pink-600 hover:bg-pink-50 p-0 h-auto font-medium transition-colors">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deals.slice(0, 4).map((deal) => (
            <Card key={deal.id} data-testid={`deal-${deal.id}`} className="flex flex-row overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-xl bg-white">
              <div className="w-24 sm:w-28 bg-slate-50 flex-shrink-0 flex items-center justify-center border-r border-slate-100">
                 <Tag className="w-8 h-8 text-slate-300" />
              </div>
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-slate-900 line-clamp-1 flex-1">{deal.productName}</h3>
                    {deal.verified && (
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{deal.category}</p>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-slate-900">RM {deal.price.toFixed(2)}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-semibold">
                    Save {deal.discountPercent}%
                  </Badge>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  by {deal.submitterName}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
    </RequireLogin>
  );
}
