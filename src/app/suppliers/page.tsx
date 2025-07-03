"use client";

import { useState } from "react";
import ProcurementLayout from "@/components/procurement/ProcurementLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
  Package,
  CheckCircle,
  AlertTriangle,
  Building2
} from "lucide-react";

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const suppliers = [
    {
      id: 1,
      name: "TechCorp Solutions",
      contact: "John Smith",
      email: "john.smith@techcorp.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Street, Silicon Valley, CA 94025",
      category: "Technology",
      rating: 4.8,
      totalOrders: 23,
      totalValue: 245000,
      lastOrder: "2024-01-15",
      status: "Active",
      paymentTerms: "Net 30",
      deliveryTime: "5-7 days",
      certifications: ["ISO 9001", "ISO 14001"],
      performance: {
        onTimeDelivery: 95,
        qualityScore: 92,
        responsiveness: 88
      }
    },
    {
      id: 2,
      name: "Office Supplies Inc",
      contact: "Sarah Johnson",
      email: "sarah.johnson@officesupplies.com",
      phone: "+1 (555) 234-5678",
      address: "456 Office Ave, Business District, NY 10001",
      category: "Office Supplies",
      rating: 4.5,
      totalOrders: 45,
      totalValue: 89000,
      lastOrder: "2024-01-14",
      status: "Active",
      paymentTerms: "Net 15",
      deliveryTime: "2-3 days",
      certifications: ["ISO 9001"],
      performance: {
        onTimeDelivery: 89,
        qualityScore: 85,
        responsiveness: 92
      }
    },
    {
      id: 3,
      name: "Industrial Equipment Co",
      contact: "Mike Wilson",
      email: "mike.wilson@industrial.com",
      phone: "+1 (555) 345-6789",
      address: "789 Industrial Blvd, Manufacturing Hub, TX 75001",
      category: "Industrial",
      rating: 4.9,
      totalOrders: 12,
      totalValue: 678000,
      lastOrder: "2024-01-13",
      status: "Active",
      paymentTerms: "Net 45",
      deliveryTime: "14-21 days",
      certifications: ["ISO 9001", "ISO 14001", "OHSAS 18001"],
      performance: {
        onTimeDelivery: 98,
        qualityScore: 96,
        responsiveness: 85
      }
    },
    {
      id: 4,
      name: "Software Solutions Ltd",
      contact: "Emily Brown",
      email: "emily.brown@software.com",
      phone: "+1 (555) 456-7890",
      address: "321 Software Park, Tech City, WA 98001",
      category: "Software",
      rating: 4.6,
      totalOrders: 18,
      totalValue: 156000,
      lastOrder: "2024-01-12",
      status: "Active",
      paymentTerms: "Net 30",
      deliveryTime: "1-2 days",
      certifications: ["ISO 27001"],
      performance: {
        onTimeDelivery: 87,
        qualityScore: 94,
        responsiveness: 96
      }
    },
    {
      id: 5,
      name: "Green Energy Corp",
      contact: "Robert Taylor",
      email: "robert.taylor@greenenergy.com",
      phone: "+1 (555) 567-8901",
      address: "654 Renewable Way, Eco City, CO 80001",
      category: "Energy",
      rating: 4.7,
      totalOrders: 8,
      totalValue: 432000,
      lastOrder: "2024-01-10",
      status: "Active",
      paymentTerms: "Net 60",
      deliveryTime: "30-45 days",
      certifications: ["ISO 14001", "LEED Certified"],
      performance: {
        onTimeDelivery: 92,
        qualityScore: 89,
        responsiveness: 78
      }
    },
    {
      id: 6,
      name: "Maintenance Services",
      contact: "Lisa Garcia",
      email: "lisa.garcia@maintenance.com",
      phone: "+1 (555) 678-9012",
      address: "987 Service Street, Facility Town, FL 33001",
      category: "Services",
      rating: 3.8,
      totalOrders: 34,
      totalValue: 67000,
      lastOrder: "2024-01-08",
      status: "Under Review",
      paymentTerms: "Net 15",
      deliveryTime: "Same day",
      certifications: ["OSHA Certified"],
      performance: {
        onTimeDelivery: 76,
        qualityScore: 72,
        responsiveness: 84
      }
    }
  ];

  const categories = ["Technology", "Office Supplies", "Industrial", "Software", "Energy", "Services"];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'under review': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || supplier.category === categoryFilter;
    const matchesRating = ratingFilter === "all" || 
                         (ratingFilter === "high" && supplier.rating >= 4.5) ||
                         (ratingFilter === "medium" && supplier.rating >= 3.5 && supplier.rating < 4.5) ||
                         (ratingFilter === "low" && supplier.rating < 3.5);
    return matchesSearch && matchesCategory && matchesRating;
  });

  const supplierStats = {
    total: suppliers.length,
    active: suppliers.filter(s => s.status === 'Active').length,
    underReview: suppliers.filter(s => s.status === 'Under Review').length,
    avgRating: suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length,
    totalValue: suppliers.reduce((sum, s) => sum + s.totalValue, 0)
  };

  return (
    <ProcurementLayout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
            <p className="text-gray-600">Manage your supplier relationships and partnerships</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Building2 className="w-4 h-4 mr-2" />
              Import Suppliers
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Supplier
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Supplier</DialogTitle>
                  <DialogDescription>Enter supplier information to add them to your network.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="supplier-name">Company Name</Label>
                      <Input id="supplier-name" placeholder="Supplier company name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-person">Contact Person</Label>
                      <Input id="contact-person" placeholder="Primary contact name" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="contact@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Complete business address" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-terms">Payment Terms</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="net-15">Net 15</SelectItem>
                          <SelectItem value="net-30">Net 30</SelectItem>
                          <SelectItem value="net-45">Net 45</SelectItem>
                          <SelectItem value="net-60">Net 60</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Add Supplier</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplierStats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplierStats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplierStats.underReview}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplierStats.avgRating.toFixed(1)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(supplierStats.totalValue / 1000).toFixed(0)}K</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search suppliers by name, contact, or email..."
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
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="high">High (4.5+)</SelectItem>
                  <SelectItem value="medium">Medium (3.5-4.5)</SelectItem>
                  <SelectItem value="low">Low (&lt; 3.5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Users className="w-4 h-4" />
                      {supplier.contact}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(supplier.status)}>
                      {supplier.status}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{supplier.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{supplier.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{supplier.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{supplier.address}</span>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Performance</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className={`font-semibold ${getPerformanceColor(supplier.performance.onTimeDelivery)}`}>
                          {supplier.performance.onTimeDelivery}%
                        </div>
                        <div className="text-gray-500">On Time</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold ${getPerformanceColor(supplier.performance.qualityScore)}`}>
                          {supplier.performance.qualityScore}%
                        </div>
                        <div className="text-gray-500">Quality</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold ${getPerformanceColor(supplier.performance.responsiveness)}`}>
                          {supplier.performance.responsiveness}%
                        </div>
                        <div className="text-gray-500">Response</div>
                      </div>
                    </div>
                  </div>

                  {/* Order Stats */}
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium">{supplier.totalOrders}</span>
                      <span className="text-gray-500"> orders</span>
                    </div>
                    <div>
                      <span className="font-medium">${supplier.totalValue.toLocaleString()}</span>
                      <span className="text-gray-500"> total</span>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-1">
                    {supplier.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProcurementLayout>
  );
} 