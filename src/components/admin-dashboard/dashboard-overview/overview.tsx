import { formatCurrency, formatNumber } from "@/components/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";

async function getSalesData() {
  const data = await prisma.order.aggregate({
    _sum: { price: true },
    _count: true,
  });

  return {
    amount: (data._sum.price || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    await prisma.order.aggregate({
      _sum: { price: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : (orderData._sum.price || 0) / userCount / 100,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    prisma.product.count({ where: { isAvailable: true } }),
    prisma.product.count({ where: { isAvailable: false } }),
  ]);

  return {
    activeCount,
    inactiveCount,
  };
}

export default async function OverviewPage() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <OverviewCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Sales`}
        body={formatCurrency(salesData.amount)}
      />
      <OverviewCard
        title="Average Order Value"
        subtitle="Per User"
        body={`${formatCurrency(userData.averageValuePerUser)}`}
      />
      <OverviewCard
        title="Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Unavailable`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
}

// This code defines a simple overview page for an admin dashboard using React and Tailwind CSS.
type OverviewCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function OverviewCard({ title, subtitle, body }: OverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
