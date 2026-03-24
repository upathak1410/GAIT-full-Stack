import { supabase } from "../../lib/supabase";

export async function createResult(data: {
  name: string | null;
  recognized: boolean;
  confidence: number;
}) {
  let personId: string | null = null;

  if (data.recognized && data.name) {
    const { data: existing } = await supabase
      .from("persons")
      .select("*")
      .eq("name", data.name)
      .maybeSingle();

    let person = existing;

    if (!person) {
      const { data: newPerson } = await supabase
        .from("persons")
        .insert({ name: data.name })
        .select()
        .single();

      person = newPerson;
    }

    personId = person.id;
  }

  const { data: result } = await supabase
    .from("results")
    .insert({
      status: data.recognized ? "recognized" : "unrecognized",
      confidence: data.confidence,
      person_id: personId,
    })
    .select("*, persons(*)") // include relation
    .single();

  return result;
}
export async function getStats() {
  const { count: total } = await supabase
    .from("results")
    .select("*", { count: "exact", head: true });

  const { count: recognized } = await supabase
    .from("results")
    .select("*", { count: "exact", head: true })
    .eq("status", "recognized");

  const { data: avgData } = await supabase.from("results").select("confidence");

  const avg =
    avgData && avgData.length > 0
      ? avgData.reduce((sum, r) => sum + r.confidence, 0) / avgData.length
      : 0;

  return {
    total: total ?? 0,
    recognized: recognized ?? 0,
    unrecognized: (total ?? 0) - (recognized ?? 0),
    avgConf: Math.round(avg * 10) / 10,
  };
}
export async function getHourlyData() {
  const { data: results } = await supabase
    .from("results")
    .select("*")
    .gte("created_at", new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString());

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

  results?.forEach((r) => {
    const key = new Date(r.created_at).toLocaleTimeString("en-US", {
      hour: "2-digit",
      hour12: false,
    });

    if (buckets[key]) {
      buckets[key].total++;
      if (r.status === "recognized") buckets[key].recognized++;
      else buckets[key].unrecognized++;
    }
  });

  return Object.values(buckets);
}
export async function getConfidenceBuckets() {
  const { data: results } = await supabase.from("results").select("confidence");

  const buckets = [
    { range: "0–25", count: 0 },
    { range: "25–50", count: 0 },
    { range: "50–75", count: 0 },
    { range: "75–90", count: 0 },
    { range: "90–100", count: 0 },
  ];

  results?.forEach((r) => {
    const c = r.confidence;

    if (c < 25) buckets[0].count++;
    else if (c < 50) buckets[1].count++;
    else if (c < 75) buckets[2].count++;
    else if (c < 90) buckets[3].count++;
    else buckets[4].count++;
  });

  return buckets;
}
