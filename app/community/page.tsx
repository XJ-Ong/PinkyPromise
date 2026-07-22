import { deals } from "@/data/deals";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, CheckCircle2, SlidersHorizontal, Tag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CommunityPage() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-10 pb-28 md:pb-10 max-w-5xl relative min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Community Hub</h1>
        
        {/* Add Community Deal Button (web) */}
        <div data-testid="add-deal-button" className="hidden md:block">
          <Button asChild size="lg" className="rounded-full shadow-md font-semibold">
            <Link href="/report">
              <Plus className="w-5 h-5 mr-2" />
              Add Community Deal
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {/* Search Bar & Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <section data-testid="search-bar" className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Search deals..." 
              data-testid="search-input" 
              className="pl-10 h-12 bg-white border-slate-200 rounded-full shadow-sm"
            />
          </section>

          <section data-testid="price-range-filter" className="sm:w-[200px] shrink-0">
            <Select defaultValue="recent">
              <SelectTrigger data-testid="sort-select" className="h-12 bg-white border-slate-200 rounded-full shadow-sm w-full">
                <div className="flex items-center gap-2 text-slate-600">
                  <SlidersHorizontal className="w-4 h-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="savings">Biggest Savings</SelectItem>
              </SelectContent>
            </Select>
          </section>
        </div>

        {/* Category Filter Chips */}
        <section data-testid="category-filters" className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <Button variant="default" className="rounded-full px-5 h-9 bg-slate-800 text-white shadow-sm shrink-0" data-testid="filter-all">
            All
          </Button>
          <Button variant="outline" className="rounded-full px-5 h-9 border-slate-200 bg-white text-slate-600 shrink-0" data-testid="filter-personal-care">
            Personal Care
          </Button>
          <Button variant="outline" className="rounded-full px-5 h-9 border-slate-200 bg-white text-slate-600 shrink-0" data-testid="filter-household">
            Household
          </Button>
          <Button variant="outline" className="rounded-full px-5 h-9 border-slate-200 bg-white text-slate-600 shrink-0" data-testid="filter-clothing">
            Clothing
          </Button>
          <Button variant="outline" className="rounded-full px-5 h-9 border-slate-200 bg-white text-slate-600 shrink-0" data-testid="filter-other">
            Other
          </Button>
        </section>
      </div>

      {/* Deal List */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((deal) => (
            <Card key={deal.id} data-testid={`deal-card-${deal.id}`} className="flex flex-col overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-primary/50 group bg-white rounded-xl">
              <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center group-hover:bg-pink-50/30 transition-colors">
                <Tag className="w-12 h-12 text-slate-300 group-hover:text-pink-300 transition-colors" />
              </div>
              <CardContent className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-1 flex-1 pr-2">{deal.productName}</h3>
                  {deal.verified && (
                    <Badge className="bg-success/10 text-success hover:bg-success/20 border-none shrink-0 px-2 py-0 h-6">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-slate-500 mb-4">{deal.category}</p>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-500 line-through mb-0.5">RM {(deal.price * (1 + deal.discountPercent / 100)).toFixed(2)}</p>
                    <p className="text-xl font-bold text-slate-900">RM {deal.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold text-sm px-3 py-1 mb-1">
                      Save {deal.discountPercent}%
                    </Badge>
                    <p className="text-xs text-slate-400">by {deal.submitterName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Floating Action Button (mobile) */}
      <div data-testid="add-deal-button" className="md:hidden fixed bottom-[84px] right-4 z-40">
        <Button asChild size="icon" className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-pink-600 text-white">
          <Link href="/report">
            <Plus className="w-6 h-6" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
