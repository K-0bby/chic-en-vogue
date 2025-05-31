import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import DashboardOverview from "@/components/admin-dashboard/dashboard-overview/overview";


export default function Dashboard() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage your store, products, and orders
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            size="lg"
            className="flex items-center gap-2 bg-[#ff7f50] text-white px-4 py-2 rounded-full hover:bg-[#ff7f50]/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Website</span>
          </Button>
        </div>
      </div>
      
      {/* Body */}
      <div className="mt-6">
        <DashboardOverview />
        {/* Uncomment the components below when they are ready */}
        {/* <ProductManagement /> */}
        {/* <SalesTracker /> */}
        {/* <OrderManagement /> */}
      </div>
    </div>
  );
}
