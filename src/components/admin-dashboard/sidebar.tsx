import { Package, BarChart3, ShoppingCart, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Overview",
    icon: Home,
    href: "/admin",
  },
  {
    title: "Products",
    icon: Package,
    href: "/admin/products",
  },
  {
    title: "Sales & Payments",
    icon: BarChart3,
    href: "/admin/sales",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "/admin/orders",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Sidebar className="w-64 h-full fixed top-0 left-0">
      <SidebarHeader className="border-b p-4 my-1">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm mb-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.href)}
                    isActive={pathname === item.href}
                    className="w-full justify-start h-12 font-medium text-sm gap-3"
                  >
                    <item.icon className="h-12 w-12" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
