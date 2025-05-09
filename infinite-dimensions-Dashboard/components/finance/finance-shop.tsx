"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BestSellingCategoriesChart } from "./charts/best-selling-categories-chart"
import { ProductSalesChart } from "./charts/product-sales-chart"
import { ProductSalesYearlyComparisonChart } from "./charts/product-sales-yearly-comparison-chart"
import { SumProfitShopChart } from "./charts/sum-profit-shop-chart"
import { YearlySumProfitShopChart } from "./charts/yearly-sum-profit-shop-chart"
import { CategoriesHighestProfitChart } from "./charts/categories-highest-profit-chart"
import { YearlyProfitCategoryChart } from "./charts/yearly-profit-category-chart"

interface FinanceShopProps {
  year: string
  month: string
}

export function FinanceShop({ year, month }: FinanceShopProps) {
  const [selectedCategory, setSelectedCategory] = useState("Category 1")
  const [selectedYear, setSelectedYear] = useState("2023")

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">DT 21,190</div>
            <p className="text-xs text-muted-foreground">Total Sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Gross Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">DT 18,300</div>
            <p className="text-xs text-muted-foreground">Gross Profit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">EBITDA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">DT 17,432</div>
            <p className="text-xs text-muted-foreground">EBITDA</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Operating Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">DT 117,432</div>
            <p className="text-xs text-muted-foreground">Operating Profit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Profit Before Interest Tax</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">DT 80,432</div>
            <p className="text-xs text-muted-foreground">Profit Before Interest Tax</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">DT 116,432</div>
            <p className="text-xs text-muted-foreground">Net Profit</p>
          </CardContent>
        </Card>
      </div>

      {/* First Row of Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Best Selling Categories per Year</CardTitle>
            <Select defaultValue="2023" onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pt-0">
            <BestSellingCategoriesChart year={selectedYear} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Products Sales per Year</CardTitle>
            <Select defaultValue="2023" onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pt-0">
            <ProductSalesChart year={selectedYear} />
          </CardContent>
        </Card>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Product Sales Yearly Comparison</CardTitle>
            <Select defaultValue="2023" onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pt-0">
            <ProductSalesYearlyComparisonChart year={selectedYear} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Yearly Sum of Profit from Shop</CardTitle>
            <Select defaultValue="2023" onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pt-0">
            <YearlySumProfitShopChart year={selectedYear} />
          </CardContent>
        </Card>
      </div>

      {/* Third Row of Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Sum of Profit from Shop Per Year</CardTitle>
            <Select defaultValue="2023" onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pt-0">
            <SumProfitShopChart year={selectedYear} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Categories with Highest Profit per Year</CardTitle>
            <Select defaultValue="2023" onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pt-0">
            <CategoriesHighestProfitChart year={selectedYear} />
          </CardContent>
        </Card>
      </div>

      {/* Fourth Row of Charts */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Yearly Sum of Profit from Category</CardTitle>
          <div className="flex space-x-2">
            <Select defaultValue="Category 1" onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Category 1">Category 1</SelectItem>
                <SelectItem value="Category 2">Category 2</SelectItem>
                <SelectItem value="Category 3">Category 3</SelectItem>
                <SelectItem value="Category 4">Category 4</SelectItem>
                <SelectItem value="Category 5">Category 5</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="2023" onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <YearlyProfitCategoryChart year={selectedYear} category={selectedCategory} />
        </CardContent>
      </Card>
    </div>
  )
}
