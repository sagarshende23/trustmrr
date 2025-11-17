"use client";

import { useState } from "react";

interface AddStartupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStartupModal({ isOpen, onClose }: AddStartupModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [xHandle, setXHandle] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="relative bg-[#1a1a1a] w-full max-w-2xl max-h-[85vh] rounded-t-2xl border-t border-gray-800 flex flex-col shadow-2xl mx-auto">
        {/* Sticky Header with Drag Handle */}
        <div className="sticky top-0 bg-[#1a1a1a] z-10 pt-3 pb-2 border-b border-gray-800/50">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-1.5 bg-gray-700 rounded-full" />
          </div>
          
          <div className="relative px-6 pb-2">
            <h2 className="text-2xl font-bold text-white pr-10">Add your startup</h2>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-0 right-6 text-gray-400 hover:text-white transition-colors z-10 p-1"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <div className="px-6 py-4 pb-6">
            {/* Description */}
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Get a dedicated page on TrustMRR to showcase your startup's verified revenue. And nice dofollow backlink 😁
            </p>

            {/* Form */}
            <div className="space-y-5">
              {/* Stripe API Key */}
              <div>
                <label className="block text-white font-medium mb-2.5 text-base">
                  1. Stripe restricted API key
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="rk_live_..."
                  className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition-all"
                />
                
                {/* Instructions */}
                <div className="mt-3 bg-black/60 rounded-lg p-3.5 border border-gray-800/80">
                  <a
                    href="https://dashboard.stripe.com/apikeys/create?name=TrustMRR&permissions[]=rak_charge_read"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 transition-colors flex items-center justify-between group mb-3"
                  >
                    <span className="font-medium text-sm">Click here to create a read-only API key.</span>
                    <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <ul className="space-y-1.5 text-gray-400 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 mt-0.5">•</span>
                      <span>Scroll down and click "Create key"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 mt-0.5">•</span>
                      <span>Don't change the permissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 mt-0.5">•</span>
                      <span>Don't delete the key or we can't refresh revenue</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* X Handle */}
              <div>
                <label className="block text-white font-medium mb-2.5 text-base">
                  2. X handle (optional)
                </label>
                <input
                  type="text"
                  value={xHandle}
                  onChange={(e) => setXHandle(e.target.value)}
                  placeholder="username"
                  className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button className="px-6 py-2.5 bg-gray-300 hover:bg-gray-200 text-black rounded-lg font-semibold text-sm transition-colors">
                  Add startup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

