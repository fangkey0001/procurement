"use client";

import { useState } from "react";
import ProcurementLayout from "@/components/procurement/ProcurementLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  Plus, 
  Search, 
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Download,
  Upload,
  QrCode,
  Scan,
  RefreshCw
} from "lucide-react";

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const inventoryItems = [
    {
      id: "INV-001",
      name: "Dell Latitude 7520 Laptop",
      category: "Electronics",
      sku: "DL7520-001",
      currentStock: 25,
      minStock: 10,
      maxStock: 50,
      unitPrice: 1200,
      totalValue: 30000,
      status: "in_stock",
      location: "Warehouse A-1",
      lastUpdated: "2024-01-15",
      supplier: "TechCorp Solutions",
      description: "Business laptop with Intel i7 processor"
    },
    {
      id: "INV-002",
      name: "Ergonomic Office Chair",
      category: "Furniture",
      sku: "EOC-2024-001",
      currentStock: 5,
      minStock: 8,
      maxStock: 25,
      unitPrice: 350,
      totalValue: 1750,
      status: "low_stock",
      location: "Warehouse B-2",
      lastUpdated: "2024-01-14",
      supplier: "Office Supplies Inc",
      description: "Adjustable height office chair with lumbar support"
    },
    {
      id: "INV-003",
      name: "HP LaserJet Pro Printer",
      category: "Electronics",
      sku: "HP-LJ-PRO-001",
      currentStock: 0,
      minStock: 3,
      maxStock: 15,
      unitPrice: 450,
      totalValue: 0,
      status: "out_of_stock",
      location: "Warehouse A-3",
      lastUpdated: "2024-01-10",
      supplier: "TechCorp Solutions",
      description: "High-speed monochrome laser printer"
    },
    {
      id: "INV-004",
      name: "A4 Paper Reams",
      category: "Office Supplies",
      sku: "A4-PAPER-001",
      currentStock: 150,
      minStock: 50,
      maxStock: 200,
      unitPrice: 8,
      totalValue: 1200,
      status: "in_stock",
      location: "Warehouse C-1",
      lastUpdated: "2024-01-13",
      supplier: "Office Supplies Inc",
      description: "White A4 copy paper, 500 sheets per ream"
    },
    {
      id: "INV-005",
      name: "LED Desk Lamp",
      category: "Furniture",
      sku: "LED-LAMP-001",
      currentStock: 12,
      minStock: 15,
      maxStock: 40,
      unitPrice: 85,
      totalValue: 1020,
      status: "low_stock",
      location: "Warehouse B-1",
      lastUpdated: "2024-01-12",
      supplier: "Office Supplies Inc",
      description: "Adjustable LED desk lamp with USB charging port"
    }
  ];

  const categories = ["Electronics", "Furniture", "Office Supplies", "Industrial"];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const inventoryStats = {
    totalItems: inventoryItems.length,
    totalValue: inventoryItems.reduce((sum, item) => sum + item.totalValue, 0),
    inStock: inventoryItems.filter(item => item.status === 'in_stock').length,
    lowStock: inventoryItems.filter(item => item.status === 'low_stock').length,
    outOfStock: inventoryItems.filter(item => item.status === 'out_of_stock').length
  };

  return (
    <ProcurementLayout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600">Track and manage your inventory levels and stock</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <QrCode className="w-4 h-4 mr-2" />
              Scan
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryStats.totalItems}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${inventoryStats.totalValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Stock</CardTitle>
              <Package className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryStats.inStock}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryStats.lowStock}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryStats.outOfStock}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">Inventory Items</TabsTrigger>
            <TabsTrigger value="alerts">Stock Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filter Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search items by name or SKU..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="in_stock">In Stock</SelectItem>
                      <SelectItem value="low_stock">Low Stock</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Table */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Inventory Items</CardTitle>
                  <Badge variant="outline">{filteredItems.length} items</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock Level</TableHead>
                        <TableHead>Current/Min/Max</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total Value</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500 max-w-xs truncate">{item.description}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <div className="w-24">
                              <div className="flex justify-between text-sm mb-1">
                                <span>{getStockLevel(item.currentStock, item.minStock, item.maxStock)}%</span>
                              </div>
                              <Progress 
                                value={getStockLevel(item.currentStock, item.minStock, item.maxStock)} 
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            <div>{item.currentStock} / {item.minStock} / {item.maxStock}</div>
                          </TableCell>
                          <TableCell>${item.unitPrice.toLocaleString()}</TableCell>
                          <TableCell className="font-semibold">${item.totalValue.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" title="View Details">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" title="Edit Item">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" title="Delete Item">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stock Alerts</CardTitle>
                <CardDescription>Items that need immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryItems.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock').map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${item.status === 'out_of_stock' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                          <AlertTriangle className={`w-5 h-5 ${item.status === 'out_of_stock' ? 'text-red-600' : 'text-yellow-600'}`} />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                          <p className="text-sm text-gray-600">Current: {item.currentStock} | Min: {item.minStock}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                        <Button variant="outline" size="sm">
                          Update Stock
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stock Movement</CardTitle>
                  <CardDescription>Track inventory changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Inventory Analytics</h3>
                    <p className="text-gray-600 mb-4">Stock movement and trend analysis</p>
                    <Button variant="outline">
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>ABC Analysis</CardTitle>
                  <CardDescription>Categorize items by value and importance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">ABC Classification</h3>
                    <p className="text-gray-600 mb-4">Analyze item importance and value</p>
                    <Button variant="outline">
                      Run Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProcurementLayout>
  );
}
