import SMSMAdminForm from "@/components/SMSMAdminForm";

export default async function Page() {
  return (
    <main className="flex-1 space-y-8">
        <h1 className="px-4 py-2 text-lg md:text-3xl text-center font-bold tracking-wider rounded border-2 border-[#153B50] text-[#153B50]">SMS CREDIT MANAGEMENT SYSTEM</h1>
        <div className="grid md:grid-cols-1">
          <SMSMAdminForm />
        </div>
            
    </main>
  )
}
