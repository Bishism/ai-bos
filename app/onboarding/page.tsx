import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!business) {
    redirect("/onboarding");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            {business.name}
          </h1>
          <LogoutButton />
        </div>
        <p className="text-gray-600">
          {business.industry && (
            <span className="capitalize">{business.industry} · </span>
          )}
          Signed in as <span className="font-medium">{user.email}</span>
        </p>
      </div>
    </main>
  );
}