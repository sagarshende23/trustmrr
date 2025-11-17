const baseStartups = [
  {
    name: "Gumroad",
    description: "Go from 0 to $1",
    logo: "/next.svg",
    founder: "shl",
    category: "Software",
    founded: "November 2011",
    note: "Account creation date",
    baseGMV: 878_595_861,
    baseLast30Days: 7_143_938,
    baseMRR: 0,
    mrrNote: "No active subscriptions",
  },
  {
    name: "MaidsnBlack",
    description: "Home Cleaning Tech Driven Platform",
    logo: null,
    founder: "rohangilkes",
    category: "Services",
    founded: "May 2014",
    note: "United States",
    baseGMV: 18_750_000,
    baseLast30Days: 612_300,
    baseMRR: 225_000,
    mrrNote: "930 active subscriptions",
  },
  {
    name: "Stack Influence",
    description: "Micro Creator marketing platform for eComm brands",
    logo: "/next.svg",
    founder: "laurent_vinc",
    category: "Advertising",
    founded: "January 2020",
    note: "United States",
    baseGMV: 19_489_331,
    baseLast30Days: 948_779,
    baseMRR: 40_881,
    mrrNote: "73 active subscriptions",
  },
  {
    name: "TrimRx",
    description: "Telehealth company that specializes in personalized weight loss programs",
    logo: "/next.svg",
    founder: "hawktrim",
    category: "Healthcare",
    founded: "July 2021",
    note: "United States",
    baseGMV: 10_121_420,
    baseLast30Days: 510_112,
    baseMRR: 92_330,
    mrrNote: "311 active subscriptions",
  },
  {
    name: "Arcads AI",
    description: "Create winning AI Video Ads",
    logo: "/next.svg",
    founder: "rom1trs",
    category: "Subscriptions",
    founded: "June 2019",
    note: "France",
    baseGMV: 9_182_138,
    baseLast30Days: 1_016_847,
    baseMRR: 852_766,
    mrrNote: "5,088 active subscriptions",
  },
  {
    name: "HypeProxies",
    description: "The fastest proxy infrastructure with unlimited bandwidth",
    logo: "/next.svg",
    founder: "basedgunnar",
    category: "Infrastructure",
    founded: "March 2022",
    note: "Global customers",
    baseGMV: 4_885_000,
    baseLast30Days: 362_440,
    baseMRR: 120_110,
    mrrNote: "1,204 active subscriptions",
  },
  {
    name: "Cometly",
    description: "Marketing attribution and analytics for SaaS companies",
    logo: "/next.svg",
    founder: "heygrantcooper",
    category: "Analytics",
    founded: "August 2019",
    note: "Canada",
    baseGMV: 6_224_000,
    baseLast30Days: 402_330,
    baseMRR: 210_440,
    mrrNote: "1,488 active subscriptions",
  },
  {
    name: "Rezi LLC",
    description: "Digital products",
    logo: "/next.svg",
    founder: "jacob_jacquet",
    category: "Digital",
    founded: "April 2018",
    note: "United States",
    baseGMV: 2_388_550,
    baseLast30Days: 142_000,
    baseMRR: 15_900,
    mrrNote: "610 active subscriptions",
  },
  {
    name: "StartGlobal",
    description: "Launch your US Business from anywhere",
    logo: "/next.svg",
    founder: "sanjaynediyara",
    category: "Finance",
    founded: "October 2020",
    note: "India",
    baseGMV: 7_555_000,
    baseLast30Days: 280_400,
    baseMRR: 68_300,
    mrrNote: "1,145 active subscriptions",
  },
  {
    name: "DataExpert / TechCreator",
    description: "Data engineering education company",
    logo: "/next.svg",
    founder: "EcZachly",
    category: "Education",
    founded: "February 2017",
    note: "Remote",
    baseGMV: 3_540_000,
    baseLast30Days: 198_400,
    baseMRR: 45_600,
    mrrNote: "540 active subscriptions",
  },
];

export type StartupRecord = {
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
  category: string;
  stats: {
    gmv: { value: string; label: string };
    last30Days: { value: string };
    mrr: { value: string; note: string };
    founded: { date: string; note: string };
  };
  chartData: { month: string; value: number }[];
};

const chartTimeline = [
  "Dec 2012",
  "Mar 2014",
  "Jun 2015",
  "Sep 2016",
  "Dec 2017",
  "Mar 2019",
  "Jun 2020",
  "Sep 2021",
  "Dec 2022",
  "Mar 2024",
  "Oct 2025",
];

const formatCurrency = (value: number) =>
  `$${Math.round(value).toLocaleString("en-US")}`;

const buildChartData = (seed: number, base: typeof baseStartups[number]) => {
  const scaleBase = Math.max(base.baseLast30Days, base.baseMRR || base.baseLast30Days);
  const scale = Math.max(scaleBase / 1_000_000, 0.5);

  return chartTimeline.map((month, idx) => {
    const wave = Math.sin((idx + seed / 3) * 0.85) * 0.4;
    const baseline = 0.4 + idx * 0.15;
    const value = (baseline + wave + 0.8) * scale * 2.4;
    return {
      month,
      value: Number(value.toFixed(2)),
    };
  });
};

const TOTAL_STARTUPS = 100;

export const mockStartups: StartupRecord[] = Array.from({ length: TOTAL_STARTUPS }, (_, index) => {
  const base = baseStartups[index % baseStartups.length];
  const rank = index + 1;
  const multiplier = 1 + Math.floor(index / baseStartups.length) * 0.08 + (index % 5) * 0.01;
  const gmv = base.baseGMV * multiplier;
  const last30Days = base.baseLast30Days * (1 + ((index % 7) - 3) * 0.03);
  const mrrValue = base.baseMRR ? base.baseMRR * (1 + (index % 4) * 0.05) : 0;

  return {
    id: `${rank}`,
    rank,
    medal: rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null,
    name: rank <= baseStartups.length ? base.name : `${base.name} ${rank}`,
    description: base.description,
    logo: base.logo,
    founder: base.founder,
    founderHandle: base.founder,
    revenue: formatCurrency(gmv),
    mrr: mrrValue > 0 ? formatCurrency(mrrValue) : "-",
    category: base.category,
    stats: {
      gmv: { value: formatCurrency(gmv), label: "All-time" },
      last30Days: { value: formatCurrency(last30Days) },
      mrr: { value: mrrValue > 0 ? formatCurrency(mrrValue) : "-", note: base.mrrNote },
      founded: { date: base.founded, note: base.note },
    },
    chartData: buildChartData(rank, base),
  };
});

export const getStartupById = (id: string) =>
  mockStartups.find((startup) => startup.id === id);

