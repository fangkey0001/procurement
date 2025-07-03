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
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  DollarSign,
  Users,
  Package,
  Clock,
  Filter,
  Search,
  Eye,
  Share,
  Settings,
  Plus
} from "lucide-react";

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days");
  const [selectedReport, setSelectedReport] = useState("spending");

  const reportTemplates = [
    {
      id: 1,
      name: "Spending Analysis",
      description: "Detailed analysis of procurement spending by category",
      type: "spending",
      icon: DollarSign,
      frequency: "Monthly",
      lastGenerated: "2024-01-15",
      downloadCount: 45,
      status: "ready"
    },
    {
      id: 2,
      name: "Supplier Performance",
      description: "Performance metrics and scorecards for all suppliers",
      type: "supplier",
      icon: Users,
      frequency: "Quarterly",
      lastGenerated: "2024-01-10",
      downloadCount: 28,
      status: "ready"
    },
    {
      id: 3,
      name: "Purchase Order Summary",
      description: "Complete summary of all purchase orders and their status",
      type: "orders",
      icon: FileText,
      frequency: "Weekly",
      lastGenerated: "2024-01-14",
      downloadCount: 67,
      status: "generating"
    },
    {
      id: 4,
      name: "Inventory Report",
      description: "Current inventory levels, stock alerts, and valuation",
      type: "inventory",
      icon: Package,
      frequency: "Daily",
      lastGenerated: "2024-01-15",
      downloadCount: 89,
      status: "ready"
    },
    {
      id: 5,
      name: "Budget Utilization",
      description: "Budget allocation vs actual spending across categories",
      type: "budget",
      icon: Target,
      frequency: "Monthly",
      lastGenerated: "2024-01-12",
      downloadCount: 34,
      status: "ready"
    },
    {
      id: 6,
      name: "Cost Savings Analysis",
      description: "Analysis of cost savings initiatives and ROI",
      type: "savings",
      icon: TrendingDown,
      frequency: "Quarterly",
      lastGenerated: "2024-01-08",
      downloadCount: 23,
      status: "ready"
    }
  ];

  const quickStats = [
    {
      title: "Total Reports",
      value: "156",
      change: "+12",
      period: "this month",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Downloads",
      value: "1,234",
      change: "+23%",
      period: "vs last month",
      icon: Download,
      color: "text-green-600"
    },
    {
      title: "Scheduled Reports",
      value: "24",
      change: "+3",
      period: "active",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Custom Reports",
      value: "8",
      change: "+2",
      period: "this quarter",
      icon: Settings,
      color: "text-orange-600"
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: "Q4 Spending Summary",
      type: "Spending Analysis",
      generatedDate: "2024-01-15",
      size: "2.4 MB",
      format: "PDF",
      downloads: 23
    },
    {
      id: 2,
      name: "Supplier Performance Q4",
      type: "Supplier Report",
      generatedDate: "2024-01-14",
      size: "1.8 MB",
      format: "Excel",
      downloads: 18
    },
    {
      id: 3,
      name: "Inventory Snapshot",
      type: "Inventory Report",
      generatedDate: "2024-01-13",
      size: "950 KB",
      format: "PDF",
      downloads: 31
    },
    {
      id: 4,
      name: "Budget Variance Analysis",
      type: "Budget Report",
      generatedDate: "2024-01-12",
      size: "1.2 MB",
      format: "Excel",
      downloads: 15
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-600" />;
      case 'excel': return <BarChart3 className="w-4 h-4 text-green-600" />;
      case 'csv': return <FileText className="w-4 h-4 text-blue-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <ProcurementLayout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Generate and manage procurement reports and analytics</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Report
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Custom Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create Custom Report</DialogTitle>
                  <DialogDescription>Build a custom report with specific parameters and filters.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input id="report-name" placeholder="Enter report name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-type">Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spending">Spending Analysis</SelectItem>
                          <SelectItem value="supplier">Supplier Performance</SelectItem>
                          <SelectItem value="orders">Purchase Orders</SelectItem>
                          <SelectItem value="inventory">Inventory</SelectItem>
                          <SelectItem value="budget">Budget Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="format">Format</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-from">Date From</Label>
                      <Input id="date-from" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-to">Date To</Label>
                      <Input id="date-to" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filters">Additional Filters</Label>
                    <textarea 
                      id="filters" 
                      className="w-full p-2 border rounded-md" 
                      rows={3}
                      placeholder="Specify any additional filters or parameters..."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Generate Report</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600">
                  {stat.change} {stat.period}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="recent">Recent Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filter Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Search report templates..." className="pl-10" />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="spending">Spending</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                      <SelectItem value="orders">Orders</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Frequencies</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Report Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <template.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription className="text-sm">{template.frequency}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(template.status)}>
                        {template.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">{template.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Last Generated:</span>
                          <div className="font-medium">{template.lastGenerated}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Downloads:</span>
                          <div className="font-medium">{template.downloadCount}</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          disabled={template.status === 'generating'}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Generate
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Your recently generated reports and downloads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getFormatIcon(report.format)}
                        </div>
                        <div>
                          <h4 className="font-medium">{report.name}</h4>
                          <p className="text-sm text-gray-600">{report.type}</p>
                          <p className="text-xs text-gray-500">
                            Generated: {report.generatedDate} • Size: {report.size} • Downloads: {report.downloads}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Manage your automated report schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Scheduled Reports</h3>
                  <p className="text-gray-600 mb-4">Set up automated report generation and delivery</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Usage Analytics</CardTitle>
                  <CardDescription>Track report generation and download trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Usage Analytics</h3>
                    <p className="text-gray-600 mb-4">Analyze report usage patterns and trends</p>
                    <Button variant="outline">
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Report generation times and success rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Metrics</h3>
                    <p className="text-gray-600 mb-4">Monitor report system performance and reliability</p>
                    <Button variant="outline">
                      View Metrics
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
