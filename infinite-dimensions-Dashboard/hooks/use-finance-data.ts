"use client"

import { useState, useEffect } from "react"

// Cache for storing fetched data
const dataCache = new Map<string, any>()

// Mock data for shop section
const mockShopData = {
  shop: {
    bestSellingCategories: [
      { name: "Electronics", value: 45 },
      { name: "Clothing", value: 32 },
      { name: "Home Decor", value: 28 },
      { name: "Books", value: 22 },
      { name: "Toys", value: 15 },
    ],
    shopProfit: [
      { month: "Jan", "2021": 12000, "2022": 15000, "2023": 18000 },
      { month: "Feb", "2021": 13500, "2022": 16200, "2023": 19500 },
      { month: "Mar", "2021": 15000, "2022": 17500, "2023": 21000 },
      { month: "Apr", "2021": 14200, "2022": 16800, "2023": 20200 },
      { month: "May", "2021": 16000, "2022": 18500, "2023": 22000 },
      { month: "Jun", "2021": 17500, "2022": 20000, "2023": 24000 },
      { month: "Jul", "2021": 18200, "2022": 21000, "2023": 25000 },
      { month: "Aug", "2021": 17800, "2022": 20500, "2023": 24500 },
      { month: "Sep", "2021": 16500, "2022": 19200, "2023": 23000 },
      { month: "Oct", "2021": 15800, "2022": 18500, "2023": 22200 },
      { month: "Nov", "2021": 17000, "2022": 19800, "2023": 23800 },
      { month: "Dec", "2021": 19000, "2022": 22000, "2023": 26500 },
    ],
    categoryProfit: [
      { month: "Jan", profit: 3500 },
      { month: "Feb", profit: 4200 },
      { month: "Mar", profit: 4800 },
      { month: "Apr", profit: 4500 },
      { month: "May", profit: 5200 },
      { month: "Jun", profit: 5800 },
      { month: "Jul", profit: 6000 },
      { month: "Aug", profit: 5900 },
      { month: "Sep", profit: 5500 },
      { month: "Oct", profit: 5200 },
      { month: "Nov", profit: 5600 },
      { month: "Dec", profit: 6200 },
    ],
    categoriesProfit: [
      { category: "Electronics", profit: 45000 },
      { category: "Clothing", profit: 32000 },
      { category: "Home Decor", profit: 28000 },
      { category: "Books", profit: 22000 },
      { category: "Toys", profit: 15000 },
    ],
  },
  profitLoss: {
    yearlyRevenue: [
      { month: "Jan", revenue: 25000 },
      { month: "Feb", revenue: 28000 },
      { month: "Mar", revenue: 32000 },
      { month: "Apr", revenue: 30000 },
      { month: "May", revenue: 35000 },
      { month: "Jun", revenue: 38000 },
      { month: "Jul", revenue: 40000 },
      { month: "Aug", revenue: 39000 },
      { month: "Sep", revenue: 36000 },
      { month: "Oct", revenue: 34000 },
      { month: "Nov", revenue: 37000 },
      { month: "Dec", revenue: 42000 },
    ],
  },
}

// Mock data for printers section
const mockPrintersData = {
  printers: {
    productionsYear: [
      {
        quarter: "Q1",
        multicolor: 45,
        singleColor: 32,
        multicolor2023: 25,
        singleColor2023: 20,
        multicolor2024: 35,
        singleColor2024: 28,
      },
      {
        quarter: "Q2",
        multicolor: 50,
        singleColor: 35,
        multicolor2023: 28,
        singleColor2023: 22,
        multicolor2024: 38,
        singleColor2024: 30,
      },
      {
        quarter: "Q3",
        multicolor: 58,
        singleColor: 40,
        multicolor2023: 30,
        singleColor2023: 25,
        multicolor2024: 42,
        singleColor2024: 32,
      },
      {
        quarter: "Q4",
        multicolor: 62,
        singleColor: 45,
        multicolor2023: 32,
        singleColor2023: 28,
        multicolor2024: 45,
        singleColor2024: 35,
      },
    ],
    productionsMonth: [
      { month: "January", multicolor: 45, singleColor: 32 },
      { month: "February", multicolor: 42, singleColor: 30 },
      { month: "March", multicolor: 48, singleColor: 35 },
      { month: "April", multicolor: 40, singleColor: 28 },
      { month: "May", multicolor: 44, singleColor: 32 },
      { month: "June", multicolor: 46, singleColor: 34 },
      { month: "July", multicolor: 43, singleColor: 31 },
      { month: "August", multicolor: 41, singleColor: 29 },
      { month: "September", multicolor: 39, singleColor: 27 },
      { month: "October", multicolor: 38, singleColor: 26 },
      { month: "November", multicolor: 37, singleColor: 25 },
      { month: "December", multicolor: 36, singleColor: 24 },
    ],
    netProfitProduction: [
      { month: "Jan", profit2023: 10, profit2024: 20, profit2025: 30 },
      { month: "Feb", profit2023: 15, profit2024: 25, profit2025: 35 },
      { month: "Mar", profit2023: 20, profit2024: 30, profit2025: 40 },
      { month: "Apr", profit2023: 25, profit2024: 35, profit2025: 45 },
      { month: "May", profit2023: 30, profit2024: 40, profit2025: 50 },
      { month: "Jun", profit2023: 25, profit2024: 35, profit2025: 45 },
      { month: "Jul", profit2023: 20, profit2024: 30, profit2025: 40 },
      { month: "Aug", profit2023: 25, profit2024: 35, profit2025: 45 },
      { month: "Sep", profit2023: 30, profit2024: 40, profit2025: 50 },
      { month: "Oct", profit2023: 35, profit2024: 45, profit2025: 55 },
      { month: "Nov", profit2023: 30, profit2024: 40, profit2025: 50 },
      { month: "Dec", profit2023: 25, profit2024: 35, profit2025: 45 },
    ],
    sumProfitProduction: [
      { month: "Jan", profit2023: 15, profit2024: 25, profit2025: 35 },
      { month: "Feb", profit2023: 20, profit2024: 30, profit2025: 40 },
      { month: "Mar", profit2023: 25, profit2024: 35, profit2025: 45 },
      { month: "Apr", profit2023: 30, profit2024: 40, profit2025: 50 },
      { month: "May", profit2023: 35, profit2024: 45, profit2025: 55 },
      { month: "Jun", profit2023: 30, profit2024: 40, profit2025: 50 },
      { month: "Jul", profit2023: 25, profit2024: 35, profit2025: 45 },
      { month: "Aug", profit2023: 30, profit2024: 40, profit2025: 50 },
      { month: "Sep", profit2023: 35, profit2024: 45, profit2025: 55 },
      { month: "Oct", profit2023: 40, profit2024: 50, profit2025: 60 },
      { month: "Nov", profit2023: 35, profit2024: 45, profit2025: 55 },
      { month: "Dec", profit2023: 30, profit2024: 40, profit2025: 50 },
    ],
  },
}

// Mock data for customers section
const mockCustomersData = {
  customers: {
    salesProfitScatter: {
      positive: [
        { x: 1000, y: 200, z: 20 },
        { x: 2000, y: 400, z: 20 },
        { x: 3000, y: 600, z: 20 },
        { x: 4000, y: 800, z: 20 },
        { x: 5000, y: 1000, z: 20 },
        { x: 6000, y: 1200, z: 20 },
        { x: 7000, y: 1400, z: 20 },
        { x: 8000, y: 1600, z: 20 },
        { x: 9000, y: 1800, z: 20 },
        { x: 10000, y: 2000, z: 20 },
        { x: 1500, y: 500, z: 20 },
        { x: 2500, y: 700, z: 20 },
        { x: 3500, y: 900, z: 20 },
        { x: 4500, y: 1100, z: 20 },
        { x: 5500, y: 1300, z: 20 },
        { x: 6500, y: 1500, z: 20 },
        { x: 7500, y: 1700, z: 20 },
        { x: 8500, y: 1900, z: 20 },
        { x: 9500, y: 2100, z: 20 },
        { x: 1200, y: 300, z: 20 },
        { x: 2200, y: 500, z: 20 },
        { x: 3200, y: 700, z: 20 },
        { x: 4200, y: 900, z: 20 },
        { x: 5200, y: 1100, z: 20 },
        { x: 6200, y: 1300, z: 20 },
        { x: 7200, y: 1500, z: 20 },
        { x: 8200, y: 1700, z: 20 },
        { x: 9200, y: 1900, z: 20 },
      ],
      negative: [
        { x: 1000, y: -200, z: 20 },
        { x: 2000, y: -400, z: 20 },
        { x: 3000, y: -600, z: 20 },
        { x: 4000, y: -800, z: 20 },
        { x: 5000, y: -1000, z: 20 },
        { x: 6000, y: -1200, z: 20 },
        { x: 7000, y: -1400, z: 20 },
        { x: 8000, y: -1600, z: 20 },
        { x: 9000, y: -1800, z: 20 },
        { x: 10000, y: -2000, z: 20 },
        { x: 1500, y: -500, z: 20 },
        { x: 2500, y: -700, z: 20 },
        { x: 3500, y: -900, z: 20 },
        { x: 4500, y: -1100, z: 20 },
        { x: 5500, y: -1300, z: 20 },
        { x: 6500, y: -1500, z: 20 },
        { x: 7500, y: -1700, z: 20 },
        { x: 8500, y: -1900, z: 20 },
        { x: 9500, y: -2100, z: 20 },
        { x: 1200, y: -300, z: 20 },
        { x: 2200, y: -500, z: 20 },
        { x: 3200, y: -700, z: 20 },
        { x: 4200, y: -900, z: 20 },
        { x: 5200, y: -1100, z: 20 },
        { x: 6200, y: -1300, z: 20 },
        { x: 7200, y: -1500, z: 20 },
        { x: 8200, y: -1700, z: 20 },
        { x: 9200, y: -1900, z: 20 },
      ],
    },
    profitableCategories: [
      { name: "Category 1", value: 80 },
      { name: "Category 2", value: 70 },
      { name: "Category 3", value: 10 },
      { name: "Category 4", value: 65 },
      { name: "Category 5", value: 55 },
      { name: "Category 6", value: 45 },
      { name: "Category 7", value: 15 },
    ],
    profitByPrinterOrders: [
      { month: "Jan", profit: 30 },
      { month: "Feb", profit: 25 },
      { month: "Mar", profit: 35 },
      { month: "Apr", profit: 28 },
      { month: "May", profit: 32 },
      { month: "Jun", profit: 38 },
      { month: "Jul", profit: 42 },
      { month: "Aug", profit: 30 },
      { month: "Sep", profit: 35 },
      { month: "Oct", profit: 28 },
      { month: "Nov", profit: 32 },
      { month: "Dec", profit: 30 },
    ],
  },
}

// Merge all mock data
const mockData = {
  ...mockShopData,
  ...mockPrintersData,
  ...mockCustomersData,
}

export function useFinanceData<T>(
  dataKey?: string,
  period = "monthly",
  year = "2024",
): { data: T | null; isLoading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const cacheKey = `${dataKey || "all"}-${period}-${year}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is in cache
        if (dataCache.has(cacheKey)) {
          setData(dataCache.get(cacheKey))
          setIsLoading(false)
          return
        }

        setIsLoading(true)

        // Simulate network delay for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 300))

        // In a real app, this would be a fetch call to your API
        // For this example, we'll generate some fake data based on the parameters
        let result: any

        if (!dataKey || dataKey === "all") {
          // Return all mock data if no specific key is provided
          result = mockData
        } else {
          switch (dataKey) {
            case "salesAndProfit":
              result = generateSalesAndProfitData(period)
              break
            case "revenueFrequency":
              result = generateRevenueFrequencyData(period)
              break
            case "customerRevenue":
              result = generateCustomerRevenueData(period)
              break
            case "customerAcquisition":
              result = generateCustomerAcquisitionData(period)
              break
            case "customerTypes":
              result = generateCustomerTypesData()
              break
            case "shop":
              result = mockShopData.shop
              break
            case "printers":
              result = mockPrintersData.printers
              break
            case "customers":
              result = mockCustomersData.customers
              break
            default:
              result = mockData
          }
        }

        // Store in cache
        dataCache.set(cacheKey, result)

        setData(result as T)
        setIsLoading(false)
      } catch (err) {
        setError(err as Error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dataKey, period, year, cacheKey])

  return { data, isLoading, error }
}

// Helper functions to generate fake data
function generateSalesAndProfitData(period: string) {
  const periodCount = getPeriodCount(period)
  return Array.from({ length: periodCount }, (_, i) => {
    const periodName = getPeriodName(period, i)
    return {
      period: periodName,
      sales: Math.floor(Math.random() * 50000) + 10000,
      profit: Math.floor(Math.random() * 30000) + 5000,
    }
  })
}

function generateRevenueFrequencyData(period: string) {
  const ranges = [
    "[100, 500]",
    "[500, 800]",
    "[800, 900]",
    "[900, 1200]",
    "[1200, 1500]",
    "[1500, 1800]",
    "[1800, 2100]",
  ]
  return ranges.map((range) => ({
    range,
    "2023": Math.floor(Math.random() * 50) + 1,
    "2024": Math.floor(Math.random() * 50) + 1,
  }))
}

function generateCustomerRevenueData(period: string) {
  const periodCount = getPeriodCount(period)
  return Array.from({ length: periodCount }, (_, i) => {
    const periodName = getPeriodName(period, i)
    return {
      name: periodName,
      value: Math.floor(Math.random() * 5000) + 1000,
    }
  })
}

function generateCustomerAcquisitionData(period: string) {
  const periodCount = getPeriodCount(period)
  return Array.from({ length: periodCount }, (_, i) => {
    const periodName = getPeriodName(period, i)
    return {
      name: periodName,
      new: Math.floor(Math.random() * 100) + 20,
      returning: Math.floor(Math.random() * 80) + 10,
    }
  })
}

function generateCustomerTypesData() {
  return [
    { name: "Regular", value: 400 },
    { name: "Premium", value: 300 },
    { name: "VIP", value: 200 },
    { name: "Corporate", value: 150 },
    { name: "One-time", value: 100 },
  ]
}

function getPeriodCount(period: string): number {
  switch (period) {
    case "weekly":
      return 12
    case "monthly":
      return 12
    case "quarterly":
      return 4
    case "yearly":
      return 5
    default:
      return 12
  }
}

function getPeriodName(period: string, index: number): string {
  switch (period) {
    case "weekly":
      return `Week ${index + 1}`
    case "monthly":
      return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]
    case "quarterly":
      return `Q${index + 1}`
    case "yearly":
      return `${2020 + index}`
    default:
      return `Period ${index + 1}`
  }
}
