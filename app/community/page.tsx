"use client";

import { useState, useMemo, useEffect } from "react";
import { getAllDeals } from "@/lib/communityStore";
import { CommunityDeal } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/ui/ProductImage";
import DealDetailModal from "@/components/community/DealDetailModal";
import { Search, CheckCircle2, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["All", "Personal Care", "Household", "Clothing", "Other"] as const;
type Category = (typeof categories)[number];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<"recent" | "savings">("recent");
  const [dealsList, setDealsList] = useState<CommunityDeal[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<CommunityDeal | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe: localStorage unavailable during SSR
    setDealsList(getAllDeals());
  }, []);

  const filteredAndSortedDeals = useMemo(() => {
    let result = [...dealsList];

    if (selectedCategory !== "All") {
      result = result.filter((deal) => deal.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (deal) =>
          deal.productName.toLowerCase().includes(query) ||
          deal.submitterName.toLowerCase().includes(query)
      );
    }

    if (sortBy === "savings") {
      result.sort((a, b) => b.discountPercent - a.discountPercent);
    } else {
      result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, dealsList]);

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 pb-28 md:pb-10 max-w-5xl relative min-h-screen">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Community Hub</h1>
        </div>
        <p className="text-slate-500 text-sm md:text-base mt-2 max-w-2xl">Browse price reports shared by the community — real people flagging where a product is fairly priced or where they found a cheaper, equivalent alternative.</p>
      </div>

      <div className="space-y-4 mb-8">
        {/* Search Bar & Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <section data-testid="search-bar" className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Search price reports..." 
              data-testid="search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white border-slate-200 rounded-full shadow-sm"
            />
          </section>

          <section data-testid="sort-filter" className="sm:w-[200px] shrink-0">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as "recent" | "savings")}>
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
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full px-5 h-9 shrink-0 ${
                selectedCategory === category
                  ? "bg-slate-800 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
              data-testid={`filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </section>
      </div>

      {/* Price Report List */}
      <section>
        {filteredAndSortedDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No price reports found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedDeals.map((deal) => (
              <Card key={deal.id} data-testid={`deal-card-${deal.id}`} onClick={() => setSelectedDeal(deal)} className="flex flex-col overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-primary/50 group bg-white rounded-xl cursor-pointer">
                <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-center justify-center group-hover:bg-pink-50/30 transition-colors">
                  <ProductImage src={deal.image} alt={deal.productName} width={400} height={128} className="w-full h-32 object-cover" />
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
                  
                  <p className="text-sm text-slate-500 mb-1">{deal.category}</p>
                  <p className="text-xs text-slate-400 mb-4" data-testid={`deal-store-${deal.id}`}>{deal.storeName}</p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-500 line-through mb-0.5">RM {(deal.price / (1 - deal.discountPercent / 100)).toFixed(2)}</p>
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
        )}
      </section>

      {selectedDeal && (
        <DealDetailModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}
    </main>
  );
}
