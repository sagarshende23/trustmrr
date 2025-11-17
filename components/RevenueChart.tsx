"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type MetricType = "Revenue" | "MRR" | "GMV";
type TimeRange = "Last 24 hours" | "Last 7 days" | "Last 4 weeks" | "Last 3 months" | "Last 6 months" | "Last 12 months" | "All time";

interface RevenueChartProps {
  chartData: { month: string; value: number }[];
}

// Filter data based on time range
const filterDataByTimeRange = (
  data: { month: string; value: number }[],
  timeRange: TimeRange
): { month: string; value: number }[] => {
  if (timeRange === "All time") {
    return data;
  }

  let pointsToShow: number;
  
  switch (timeRange) {
    case "Last 24 hours":
    case "Last 7 days":
    case "Last 4 weeks":
      pointsToShow = 1;
      break;
    case "Last 3 months":
      pointsToShow = 3;
      break;
    case "Last 6 months":
      pointsToShow = 6;
      break;
    case "Last 12 months":
      pointsToShow = 12;
      break;
    default:
      return data;
  }

  const filtered = data.slice(-Math.min(pointsToShow, data.length));
  return filtered.length > 0 ? filtered : data.slice(-1);
};

// Transform data based on metric
const transformDataByMetric = (
  data: { month: string; value: number }[],
  metric: MetricType
): { month: string; value: number }[] => {
  if (metric === "Revenue") {
    return data.map((point) => ({
      ...point,
      value: point.value * 1_000_000,
    }));
  } else if (metric === "MRR") {
    return data.map((point) => ({
      ...point,
      value: point.value * 1_000_000 * 0.25,
    }));
  } else if (metric === "GMV") {
    return data.map((point) => ({
      ...point,
      value: point.value * 1_000_000 * 2.0,
    }));
  }
  return data;
};

const formatYAxisLabel = (value: number) => {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}k`;
  }
  return `$${value.toFixed(0)}`;
};

const formatTooltipValue = (value: number) => {
  return formatYAxisLabel(value);
};

export default function RevenueChart({ chartData }: RevenueChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("Revenue");
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("All time");

  const filteredData = useMemo(() => {
    const timeFiltered = filterDataByTimeRange(chartData, selectedTimeRange);
    const metricTransformed = transformDataByMetric(timeFiltered, selectedMetric);
    return metricTransformed.map((point) => ({
      name: point.month,
      value: point.value,
    }));
  }, [chartData, selectedTimeRange, selectedMetric]);

  const metrics: MetricType[] = ["Revenue", "MRR", "GMV"];
  const timeRanges: TimeRange[] = [
    "Last 24 hours",
    "Last 7 days",
    "Last 4 weeks",
    "Last 3 months",
    "Last 6 months",
    "Last 12 months",
    "All time",
  ];

  return (
    <Card className="bg-[#111111] border-[#2a2a2a]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Select value={selectedMetric} onValueChange={(value) => setSelectedMetric(value as MetricType)}>
              <SelectTrigger className="w-[140px] bg-[#0a0a0a] border-[#2a2a2a] text-white hover:border-[#3a3a3a]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0a] border-[#2a2a2a]">
                {metrics.map((metric) => (
                  <SelectItem key={metric} value={metric} className="text-white focus:bg-[#1a1a1a]">
                    {metric}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTimeRange} onValueChange={(value) => setSelectedTimeRange(value as TimeRange)}>
              <SelectTrigger className="w-[160px] bg-[#0a0a0a] border-[#2a2a2a] text-white hover:border-[#3a3a3a]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0a] border-[#2a2a2a]">
                {timeRanges.map((range) => (
                  <SelectItem key={range} value={range} className="text-white focus:bg-[#1a1a1a]">
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-80 text-gray-500">
            <p className="text-sm">No data available for the selected time range</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} />
                  <stop offset="50%" stopColor="#4f46e5" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3730a3" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#2a2a2a" 
                opacity={0.5}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={formatYAxisLabel}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a0a0a",
                  border: "1px solid #2a2a2a",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#9ca3af" }}
                formatter={(value: number) => [formatTooltipValue(value), selectedMetric]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#colorRevenue)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
