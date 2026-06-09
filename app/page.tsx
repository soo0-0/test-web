"use client";

import { useState, useMemo } from "react";
import { vendors, PRODUCT_CATEGORIES, Vendor } from "@/lib/data";
import VendorCard from "@/components/VendorCard";

function searchVendors(query: string, category: string): Vendor[] {
  const q = query.trim().toLowerCase();

  return vendors.filter((v) => {
    const matchCategory =
      category === "전체" ||
      v.productTypes.some((p) => p.includes(category));

    if (!matchCategory) return false;
    if (!q) return true;

    return (
      v.name.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.productTypes.some((p) => p.toLowerCase().includes(q)) ||
      v.tags.some((t) => t.toLowerCase().includes(q)) ||
      v.references.some(
        (r) =>
          r.eventName.toLowerCase().includes(q) ||
          r.studio.toLowerCase().includes(q) ||
          r.item.toLowerCase().includes(q) ||
          (r.description ?? "").toLowerCase().includes(q)
      )
    );
  });
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [sortBy, setSortBy] = useState<"price" | "minQty" | "refs" | "popular">("refs");

  const results = useMemo(() => {
    const filtered = searchVendors(query, category);
    return [...filtered].sort((a, b) => {
      if (sortBy === "price") return a.unitPriceRange.min - b.unitPriceRange.min;
      if (sortBy === "minQty") return a.minOrderQty - b.minOrderQty;
      if (sortBy === "popular") return b.reorderCount - a.reorderCount;
      return b.references.length - a.references.length;
    });
  }, [query, category, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">발주처 파인더</h1>
              <p className="text-xs text-gray-400">국내 굿즈 제작 업체 디렉토리</p>
            </div>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">업체 수 {vendors.length}개</span>
        </div>
      </header>

      {/* Hero / Search */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            어떤 굿즈를 제작하려 하시나요?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            품목, 행사명, 디자인 스튜디오 이름으로 검색해보세요.
          </p>

          {/* Search input */}
          <div className="relative max-w-2xl">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="예) 짐색, Noname Press, 전주국제영화제…"
              className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-indigo-400 transition-colors bg-gray-50 focus:bg-white"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">{results.length}개</span> 업체 검색됨
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">정렬</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-400 bg-white"
            >
              <option value="refs">래퍼런스 많은 순</option>
              <option value="popular">재주문 많은 순 (인기)</option>
              <option value="price">단가 낮은 순</option>
              <option value="minQty">최소수량 적은 순</option>
            </select>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">검색 결과가 없습니다.</p>
            <button
              onClick={() => { setQuery(""); setCategory("전체"); }}
              className="mt-3 text-indigo-500 text-sm hover:underline"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        발주처 파인더 · 대한민국 굿즈 제작 업체 디렉토리
      </footer>
    </div>
  );
}
