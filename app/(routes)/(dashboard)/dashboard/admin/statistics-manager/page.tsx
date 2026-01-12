"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { toast } from "sonner"
import type { OrderWithDetails } from "../buys-manager/types"

const cityChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const productChartConfig = {
  quantity: {
    label: "Quantity",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const statusChartConfig = {
  PAID: { label: "Paid", color: "hsl(var(--chart-1))" },
  DELIVERED: { label: "Delivered", color: "hsl(var(--chart-2))" },
  PREPARING: { label: "Preparing", color: "hsl(var(--chart-3))" },
  PENDING: { label: "Pending", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig

const PIE_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export default function StatisticsPage() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([])
  const [loading, setLoading] = useState(false)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get<OrderWithDetails[]>("/api/orders")
      setOrders(data)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load statistics")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])


  const salesByProductData: { product: string; quantity: number }[] = []
  const productMap: Record<string, number> = {}
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const name = item.product.name
      productMap[name] = (productMap[name] || 0) + Number(item.quantity)
    })
  })
  Object.entries(productMap).forEach(([product, quantity]) => {
    salesByProductData.push({ product, quantity })
  })

  const statusData = [
    { status: "PAID", count: orders.filter((o) => o.status === "PAID").length },
    { status: "DELIVERED", count: orders.filter((o) => o.status === "DELIVERED").length },
    { status: "PREPARING", count: orders.filter((o) => o.status === "PREPARING").length },
    { status: "PENDING", count: orders.filter((o) => o.status === "PENDING").length },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Statistics</h2>

      {/* Products Most Sold */}
      <Card>
        <CardHeader>
          <CardTitle>Most Sold Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={productChartConfig} className="h-64 w-full">
            <BarChart data={salesByProductData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="product" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="quantity" fill="var(--color-quantity)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pie example: Order Status */}
      <Card>
        <CardHeader>
          <CardTitle>Orders by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={statusChartConfig} className="h-64 w-full">
            <PieChart accessibilityLayer>
              <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
              <Pie
                data={statusData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="status" />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
