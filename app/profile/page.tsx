"use client";

import { mockProfile } from "@/data/profile";
import { myReports } from "@/data/myReports";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, CheckCircle2, Tag, LogOut, Heart, Award, AlertTriangle } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [showAllReports, setShowAllReports] = useState(false);
  const allMyReports = myReports;
  const reportsSubmittedCount = allMyReports.length;

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
              <p className="text-2xl md:text-3xl font-bold mb-1">{mockProfile.productsChecked}</p>
              <p className="text-xs md:text-sm text-slate-300 font-medium">Products Checked</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
                <Award className="w-5 h-5 text-amber-300" />
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-1">{reportsSubmittedCount}</p>
              <p className="text-xs md:text-sm text-slate-300 font-medium">Reports Submitted</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5 text-green-300" />
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-1">{mockProfile.pinkTaxAlertsFound}</p>
              <p className="text-xs md:text-sm text-slate-300 font-medium">Pink Tax Alerts</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* My Reports */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">My Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(showAllReports ? allMyReports : allMyReports.slice(0, 3)).map((deal) => (
            <Card key={deal.id} data-testid={`my-report-${deal.id}`} className="flex flex-row overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all group bg-white rounded-xl">
              <div className="w-24 bg-slate-50 border-r border-slate-100 flex items-center justify-center group-hover:bg-pink-50/30 transition-colors">
                <Tag className="w-8 h-8 text-slate-300 group-hover:text-pink-300 transition-colors" />
              </div>
              <CardContent className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-slate-900 line-clamp-1 flex-1">{deal.productName}</h3>
                    {deal.verified && (
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{deal.category}</p>
                </div>
                
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-500 line-through mb-0.5">RM {(deal.price / (1 - deal.discountPercent / 100)).toFixed(2)}</p>
                    <p className="text-lg font-bold text-slate-900 leading-none">RM {deal.price.toFixed(2)}</p>
                  </div>
                  
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-none font-bold text-xs">
                    Save {deal.discountPercent}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {allMyReports.length > 3 && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowAllReports(!showAllReports)}
              className="text-sm text-slate-600"
            >
              {showAllReports ? "Show less" : `Show all ${allMyReports.length} reports`}
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
