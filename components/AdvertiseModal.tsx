"use client";

interface AdvertiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvertiseModal({ isOpen, onClose }: AdvertiseModalProps) {
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
        <div className="sticky top-0 bg-[#1a1a1a] z-10 pt-4 pb-2 border-b border-gray-800">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-1.5 bg-gray-700 rounded-full" />
          </div>

          {/* Header */}
          <div className="relative flex items-center justify-between px-6 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Advertise on TrustMRR</h2>
            <p className="text-sm text-gray-400">
              Reach thousands of entrepreneurs and founders daily
            </p>
          </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
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
          <div className="px-6 py-6 space-y-6">
          {/* How it works */}
          <div>
            <h3 className="text-base font-semibold text-white mb-3">How it works</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your startup appears in rotating sponsor slots on desktop sidebars and mobile banners 
              across all TrustMRR pages. Sponsors rotate every 10 seconds to ensure fair visibility.
            </p>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-base font-semibold text-white mb-3">Availability</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="text-gray-300">Maximum spots:</span> 20
              </p>
              <p className="text-gray-400">
                <span className="text-gray-300">Current status:</span>{" "}
                <span className="text-yellow-500 font-medium">All spots filled</span>
              </p>
              <p className="text-gray-400">
                <span className="text-gray-300">Next available:</span> 1 spot for December
              </p>
            </div>
          </div>

          {/* Lock in your spot */}
          <div>
            <h3 className="text-base font-semibold text-white mb-3">Lock in your spot</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                Pay a{" "}
                <span className="text-white font-semibold">$999 one-time advance</span>{" "}
                to lock your spot for December. This advance is applied toward your monthly payment.
              </p>
              <p className="text-gray-400">
                <span className="text-gray-300">Monthly rate:</span>{" "}
                <span className="text-white font-semibold">$1,499/month</span>{" "}
                <span className="text-gray-500">(adjusted based on traffic)</span>
              </p>
            </div>
          </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                window.open("https://trustmrr.com/advertise", "_blank");
              }}
              className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <span>Lock spot for December</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

