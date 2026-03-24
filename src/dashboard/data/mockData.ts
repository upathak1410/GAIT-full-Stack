export interface EntryLog {
  id: string;
  name: string | null;
  recognized: boolean;
  confidence: number;
  detectedAt: Date;
}

function rndDate(hoursAgo: number, minutesOffset = 0): Date {
  const d = new Date();
  d.setHours(d.getHours() - hoursAgo);
  d.setMinutes(d.getMinutes() - minutesOffset);
  return d;
}

export const MOCK_LOGS: EntryLog[] = [
  {
    id: "1",
    name: "John Doe",
    recognized: true,
    confidence: 93.2,
    detectedAt: rndDate(0, 2),
  },
  {
    id: "2",
    name: null,
    recognized: false,
    confidence: 38.7,
    detectedAt: rndDate(0, 5),
  },
  {
    id: "3",
    name: "Sarah Kim",
    recognized: true,
    confidence: 96.1,
    detectedAt: rndDate(0, 9),
  },
  {
    id: "4",
    name: "Alex Turner",
    recognized: true,
    confidence: 91.4,
    detectedAt: rndDate(0, 14),
  },
  {
    id: "5",
    name: null,
    recognized: false,
    confidence: 27.3,
    detectedAt: rndDate(0, 18),
  },
  {
    id: "6",
    name: "Maria Lopez",
    recognized: true,
    confidence: 88.9,
    detectedAt: rndDate(0, 23),
  },
  {
    id: "7",
    name: "David Chen",
    recognized: true,
    confidence: 94.5,
    detectedAt: rndDate(0, 31),
  },
  {
    id: "8",
    name: null,
    recognized: false,
    confidence: 44.1,
    detectedAt: rndDate(0, 38),
  },
  {
    id: "9",
    name: "Emma Wilson",
    recognized: true,
    confidence: 89.3,
    detectedAt: rndDate(0, 45),
  },
  {
    id: "10",
    name: "Ryan Park",
    recognized: true,
    confidence: 92.0,
    detectedAt: rndDate(1, 2),
  },
  {
    id: "11",
    name: null,
    recognized: false,
    confidence: 22.8,
    detectedAt: rndDate(1, 15),
  },
  {
    id: "12",
    name: "Lisa Huang",
    recognized: true,
    confidence: 97.4,
    detectedAt: rndDate(1, 28),
  },
  {
    id: "13",
    name: "Tom Bradley",
    recognized: true,
    confidence: 86.2,
    detectedAt: rndDate(1, 41),
  },
  {
    id: "14",
    name: null,
    recognized: false,
    confidence: 31.5,
    detectedAt: rndDate(2, 5),
  },
  {
    id: "15",
    name: "Nina Patel",
    recognized: true,
    confidence: 90.7,
    detectedAt: rndDate(2, 19),
  },
  {
    id: "16",
    name: "Carlos Ruiz",
    recognized: true,
    confidence: 83.1,
    detectedAt: rndDate(2, 33),
  },
  {
    id: "17",
    name: null,
    recognized: false,
    confidence: 29.4,
    detectedAt: rndDate(3, 7),
  },
  {
    id: "18",
    name: "Jane Doe",
    recognized: true,
    confidence: 88.0,
    detectedAt: rndDate(3, 22),
  },
  {
    id: "19",
    name: null,
    recognized: false,
    confidence: 41.2,
    detectedAt: rndDate(4, 10),
  },
  {
    id: "20",
    name: "Michael Scott",
    recognized: true,
    confidence: 95.6,
    detectedAt: rndDate(4, 45),
  },
  {
    id: "21",
    name: null,
    recognized: false,
    confidence: 33.9,
    detectedAt: rndDate(5, 12),
  },
  {
    id: "22",
    name: "Priya Sharma",
    recognized: true,
    confidence: 91.8,
    detectedAt: rndDate(5, 30),
  },
  {
    id: "23",
    name: "Kevin Lee",
    recognized: true,
    confidence: 87.3,
    detectedAt: rndDate(6, 5),
  },
  {
    id: "24",
    name: null,
    recognized: false,
    confidence: 36.6,
    detectedAt: rndDate(6, 50),
  },
  {
    id: "25",
    name: "Aisha Johnson",
    recognized: true,
    confidence: 93.9,
    detectedAt: rndDate(7, 15),
  },
];

export function getStats(logs: EntryLog[]) {
  const total = logs.length;
  const recognized = logs.filter((l) => l.recognized).length;
  const unrecognized = total - recognized;
  const avgConf = logs.reduce((s, l) => s + l.confidence, 0) / total;
  return {
    total,
    recognized,
    unrecognized,
    avgConf: Math.round(avgConf * 10) / 10,
  };
}

export function getHourlyData(logs: EntryLog[]) {
  const buckets: Record<
    string,
    { hour: string; total: number; recognized: number; unrecognized: number }
  > = {};
  for (let h = 7; h >= 0; h--) {
    const d = new Date();
    d.setHours(d.getHours() - h);
    const key = d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      hour12: false,
    });
    buckets[key] = { hour: key, total: 0, recognized: 0, unrecognized: 0 };
  }
  logs.forEach((l) => {
    const key = l.detectedAt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      hour12: false,
    });
    if (buckets[key]) {
      buckets[key].total++;
      if (l.recognized) buckets[key].recognized++;
      else buckets[key].unrecognized++;
    }
  });
  return Object.values(buckets);
}

export function getConfidenceBuckets(logs: EntryLog[]) {
  const buckets = [
    { range: "0–25", count: 0 },
    { range: "25–50", count: 0 },
    { range: "50–75", count: 0 },
    { range: "75–90", count: 0 },
    { range: "90–100", count: 0 },
  ];
  logs.forEach((l) => {
    if (l.confidence < 25) buckets[0].count++;
    else if (l.confidence < 50) buckets[1].count++;
    else if (l.confidence < 75) buckets[2].count++;
    else if (l.confidence < 90) buckets[3].count++;
    else buckets[4].count++;
  });
  return buckets;
}
