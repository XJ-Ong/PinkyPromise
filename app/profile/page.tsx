"use client";

import { mockProfile } from "@/data/profile";
import { getScenarioById } from "@/data/scenarios";
import { getCheckHistory } from "@/lib/checkHistoryStore";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductImage from "@/components/ui/ProductImage";
import { getMyAddedDeals } from "@/lib/communityStore";
import { CommunityDeal, ComparisonRecord } from "@/lib/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Settings, LogOut, Heart, Award, AlertTriangle, ChevronRight, Edit, MessageSquare } from "lucide-react";

const PREVIEW_COUNT = 3;

function formatCompletedAt(completedAt: string): string {
  const date = new Date(completedAt);
  if (Number.isNaN(date.getTime())) return completedAt;
  return date.toLocaleDateString("en-MY", { year: "numeric", month: "short", day: "numeric" });
}

function ResultBadge({ record }: { record: ComparisonRecord }) {
  if (record.result === "pink_tax") {
    return (
      <Badge variant="destructive" className="border-none font-bold text-xs">
        Pink tax +{record.taxPercent}%
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="bg-green-100 text-green-700 border-none font-bold text-xs">
      No pink tax detected
    </Badge>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [showAllChecks, setShowAllChecks] = useState(false);
  const [checkHistory, setCheckHistory] = useState<ComparisonRecord[]>([]);
  const [myDeals, setMyDeals] = useState<CommunityDeal[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe: localStorage unavailable during SSR
    setCheckHistory(getCheckHistory());
    setMyDeals(getMyAddedDeals());
  }, []);

  const productsChecked = checkHistory.length;
  const pinkTaxAlerts = checkHistory.filter((record) => record.result === "pink_tax").length;
  const communitySubmissions = myDeals.length;

  const previewRecords = showAllChecks ? checkHistory : checkHistory.slice(0, PREVIEW_COUNT);

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 pb-28 md:pb-10 max-w-4xl space-y-8">
      {/* Profile Header & Settings */}
      <div className="flex justify-between items-start">
        <section data-testid="profile-header" className="flex items-center gap-4">
          <Avatar data-testid="avatar" className="w-20 h-20 border-4 border-white shadow-sm">
            <AvatarImage src="/images/profile/avatar.png" alt={mockProfile.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {mockProfile.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{mockProfile.name}</h1>
            <p className="text-sm text-slate-500 font-medium">Member since {new Date(mockProfile.memberSince).toLocaleDateString("en-MY", { year: "numeric", month: "long" })}</p>
          </div>
        </section>

        <section data-testid="settings" className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full text-slate-600" onClick={() => alert("Settings coming soon!")}>
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full text-slate-600 hidden sm:flex" onClick={() => { localStorage.removeItem("pp_logged_in"); router.push("/login"); }}>
            <LogOut className="w-5 h-5" />
          </Button>
        </section>
      </div>

      {/* Stats */}
      <section data-testid="profile-stats">
        <Card className="border-none shadow-md bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl overflow-hidden relative">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-20 -mt-20"></div>
          <CardContent className="p-6 md:p-8 grid grid-cols-3 divide-x divide-white/20 relative z-10">
            <div className="flex flex-col items-center justify-center text-center px-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 text-pink-300" />
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-1">{productsChecked}</p>
              <p className="text-xs md:text-sm text-slate-300 font-medium">Products Checked</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5 text-green-300" />
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-1">{pinkTaxAlerts}</p>
              <p className="text-xs md:text-sm text-slate-300 font-medium">Pink-tax Alerts</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
                <Award className="w-5 h-5 text-amber-300" />
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-1">{communitySubmissions}</p>
              <p className="text-xs md:text-sm text-slate-300 font-medium">Community Submissions</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recent Checks */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Recent Checks</h2>
        {checkHistory.length === 0 ? (
          <Card className="border-slate-200 shadow-sm bg-white rounded-xl">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-slate-500 mb-3">No checks yet. Run a product comparison to see it here.</p>
              <Button size="sm" variant="outline" onClick={() => router.push("/upload")} className="text-sm text-slate-600">
                Run a check
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {previewRecords.map((record) => {
                const target = getScenarioById(record.targetScenarioId);
                const compare = getScenarioById(record.compareScenarioId);
                if (!target || !compare) return null;
                return (
                  <Link
                    key={record.id}
                    href={`/compare?target=${record.targetScenarioId}&compare=${record.compareScenarioId}&from=profile`}
                    data-testid={`check-record-${record.id}`}
                    className="block focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                  >
                    <Card className="flex flex-row overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all group bg-white rounded-xl hover:border-primary/50 h-full">
                      <div className="w-24 bg-slate-50 border-r border-slate-100 flex items-center justify-center group-hover:bg-pink-50/30 transition-colors overflow-hidden">
                        <ProductImage
                          src={target.product.image}
                          alt={target.product.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4 flex-1 flex flex-col justify-between min-w-0">
                        <div className="min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 line-clamp-1 flex-1">{target.product.name}</h3>
                            <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                          </div>
                          <p className="text-xs text-slate-500 mb-2">vs {compare.product.name}</p>
                          <ResultBadge record={record} />
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-end justify-between gap-2">
                          <div className="text-xs text-slate-500">
                            <p>RM {target.product.price.toFixed(2)} vs RM {compare.product.price.toFixed(2)}</p>
                            <p className="mt-0.5">Checked {formatCompletedAt(record.completedAt)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
            {checkHistory.length > PREVIEW_COUNT && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAllChecks((prev) => !prev)}
                  className="text-sm text-slate-600"
                >
                  {showAllChecks ? "Show less" : `Show all ${checkHistory.length} checks`}
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* My Community Submissions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">My Community Submissions</h2>
        {myDeals.length === 0 ? (
          <Card className="border-slate-200 shadow-sm bg-white rounded-xl">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-slate-500 mb-3">You haven&apos;t published anything to the Community Hub yet. Run a comparison, then publish your finding to share it with the community.</p>
              <Button variant="outline" size="sm" onClick={() => router.push("/upload")} className="text-sm text-slate-600">
                Run a check
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myDeals.map((deal) => (
              <Card key={deal.id} data-testid={`my-submission-${deal.id}`} className="border-slate-200 shadow-sm bg-white rounded-xl">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg bg-slate-50 overflow-hidden flex-shrink-0 border border-slate-100">
                      <ProductImage
                        src={deal.image}
                        alt={deal.productName}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 line-clamp-1">{deal.productName}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{deal.storeName}</p>
                      <p className="text-lg font-bold text-slate-900 leading-tight mt-1">RM {deal.price.toFixed(2)}</p>
                    </div>
                  </div>
                  {deal.submissionNote && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-xs font-medium text-slate-600 flex items-center gap-1 mb-1">
                        <MessageSquare className="w-3 h-3" />
                        Community note
                      </p>
                      <p className="text-sm text-slate-600 break-words">{deal.submissionNote}</p>
                    </div>
                  )}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                    <Link
                      href={`/profile/submissions/${deal.id}/edit`}
                      data-testid={`edit-deal-${deal.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-pink-600 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}