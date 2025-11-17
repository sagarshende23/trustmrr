 "use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface StartupCardProps {
  id: string;
  rank: number;
  medal: string | null;
  name: string;
  description: string;
  logo: string | null;
  founder: string;
  founderHandle: string;
  revenue: string;
  mrr: string;
}

export default function StartupCard({
  id,
  rank,
  medal,
  name,
  description,
  logo,
  founder,
  founderHandle,
  revenue,
  mrr,
}: StartupCardProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/startup/${id}`);
  };

  return (
    <div
      className="border border-gray-800 rounded-lg p-4 bg-black hover:border-gray-700 hover:bg-gray-900/40 transition-colors cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNavigate();
        }
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-sm font-medium min-w-[1.5rem] text-white">{medal || rank}</span>
        {logo ? (
          <div className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0 bg-gray-900 border border-gray-800">
            <Image
              src={logo}
              alt={name}
              width={24}
              height={24}
              className="invert opacity-80"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0 bg-gray-900 border border-gray-800">
            <span className="text-lg font-semibold text-gray-500">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm mb-1 text-white">{name}</h3>
          <Link
            href={`/founder/${founderHandle}`}
            className="text-xs text-blue-400 hover:underline"
            onClick={(event) => event.stopPropagation()}
          >
            @{founder}
          </Link>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
        {description}
      </p>
      
      <div className="flex gap-6 text-sm pt-3 border-t border-gray-800">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Revenue</p>
          <p className="font-medium text-white">{revenue}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">MRR</p>
          <p className="font-medium text-gray-400">{mrr}</p>
        </div>
      </div>
    </div>
  );
}
