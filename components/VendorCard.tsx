"use client";

import { useState } from "react";
import { Vendor } from "@/lib/data";

function formatPrice(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{vendor.name}</h3>
            <span className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {vendor.location}
            </span>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-400 mb-0.5">단가 범위</p>
            <p className="text-sm font-semibold text-indigo-600">
              {formatPrice(vendor.unitPriceRange.min)} ~ {formatPrice(vendor.unitPriceRange.max)}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{vendor.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {vendor.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-gray-400">최소 수량</p>
          <p className="text-sm font-bold text-gray-800 mt-0.5">{vendor.minOrderQty.toLocaleString()}개~</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">재주문 횟수</p>
          <p className="text-sm font-bold text-amber-600 mt-0.5 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {vendor.reorderCount}회
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">제작 품목</p>
          <p className="text-sm font-bold text-gray-800 mt-0.5 truncate">{vendor.productTypes[0]}{vendor.productTypes.length > 1 ? ` 외 ${vendor.productTypes.length - 1}` : ""}</p>
        </div>
      </div>

      {/* Order button */}
      <div className="px-5 pb-3">
        <a
          href={vendor.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          바로 주문하기
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* References */}
      <div className="px-5 pt-1 pb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors w-full text-left"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          납품 래퍼런스 {vendor.references.length}건
        </button>

        {expanded && (
          <ul className="mt-3 space-y-3">
            {vendor.references.map((ref, i) => (
              <li key={i} className="bg-indigo-50 rounded-xl p-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                    {ref.item}
                  </span>
                  <span className="text-xs text-gray-400">{ref.year}</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 mt-1.5">{ref.eventName}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  디자인 스튜디오: <span className="text-gray-700 font-medium">{ref.studio}</span>
                </p>
                {ref.description && (
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ref.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
