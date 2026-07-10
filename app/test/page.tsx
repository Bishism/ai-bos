import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase.from("health_check").select("*");

  return (
    <main style={{ padding: 40, fontFamily: "monospace" }}>
      <h1>Supabase Connection Test</h1>
      <p>Error: {error ? error.message : "none"}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}