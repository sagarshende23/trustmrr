import Link from "next/link";

interface AdvertisementCardProps {
  name: string;
  description: string;
  icon: string;
  url: string;
  color?: string;
  compact?: boolean;
}

export default function AdvertisementCard({ 
  name, 
  description, 
  icon, 
  url,
  color = "from-gray-800 to-gray-900",
  compact = false
}: AdvertisementCardProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-gradient-to-br ${color} rounded-lg border border-gray-800 hover:border-gray-700 transition-colors ${
        compact ? 'p-3.5' : 'p-4'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`mb-2 ${compact ? 'text-3xl' : 'text-4xl'}`}>
          {icon}
        </div>
        <h3 className={`font-bold text-white mb-1.5 ${compact ? 'text-sm' : 'text-base'}`}>
          {name}
        </h3>
        <p className={`text-gray-400 leading-snug line-clamp-2 ${compact ? 'text-[11px]' : 'text-xs'}`}>
          {description}
        </p>
      </div>
    </Link>
  );
}
