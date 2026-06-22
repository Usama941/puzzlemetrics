import { ServiceForm } from "@/components/admin/services/ServiceForm";

export const dynamic = 'force-dynamic';
export default function NewServicePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">New Service</h1>
      <ServiceForm />
    </div>
  );
}
