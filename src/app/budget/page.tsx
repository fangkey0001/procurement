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
import { Separator } from "@/components/ui/separator";
import { 
  DollarSign, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Target,
  PieChart,
  BarChart3,
  Download,
  Upload,
  Settings,
  Edit
} from "lucide-react";

export default function BudgetPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("fy2024");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const budgetData = [
    { 
      category: "Office Supplies", 
      allocated: 50000, 
      spent: 35000, 
      remaining: 15000,
      color: "bg-blue-500",
      quarterly: [8000, 9500, 10000, 7500],
      lastUpdated: "2024-01-15"
    },
    { 
      category: "Equipment", 
      allocated: 150000, 
      spent: 125000, 
      remaining: 25000,
      color: "bg-green-500",
      quarterly: [30000, 35000, 40000, 20000],
      lastUpdated: "2024-01-14"
    },
    { 
      category: "Software", 
      allocated: 75000, 
      spent: 45000, 
      remaining: 30000,
      color: "bg-purple-500",
      quarterly: [12000, 15000, 8000, 10000],
      lastUpdated: "2024-01-13"
    },
    { 
      category: "Services", 
      allocated: 100000, 
      spent: 85000, 
      remaining: 15000,
      color: "bg-orange-500",
      quarterly: [20000, 22000, 25000, 18000],
      lastUpdated: "2024-01-12"
    },
    { 
      category: "Maintenance", 
      allocated: 25000, 
      spent: 18000, 
      remaining: 7000,
      color: "bg-pink-500",
      quarterly: [4000, 5000, 6000, 3000],
      lastUpdated: "2024-01-11"
    }
  ];

  const approvals = [
    {
      id: 1,
      category: "Equipment",
      description: "New server infrastructure",
      amount: 45000,
      requestedBy: "IT Department",
      requestDate: "2024-01-15",
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      category: "Office Supplies",
      description: "Q2 office furniture",
      amount: 12000,
      requestedBy: "HR Department",
      requestDate: "2024-01-14",
      status: "approved",
      priority: "medium"
    },
    {
      id: 3,
      category: "Software",
      description: "Annual software licenses",
      amount: 8500,
      requestedBy: "Development Team",
      requestDate: "2024-01-13",
      status: "pending",
      priority: "high"
    },
    {
      id: 4,
      category: "Services",
      description: "Marketing campaign",
      amount: 25000,
      requestedBy: "Marketing Department",
      requestDate: "2024-01-12",
      status: "rejected",
      priority: "low"
    }
  ];

  const totalAllocated = budgetData.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = budgetData.reduce((sum, item) => sum + item.remaining, 0);
  const utilizationRate = Math.round((totalSpent / totalAllocated) * 100);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationStatus = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage >= 90) return { status: 'critical', color: 'text-red-600' };
    if (percentage >= 75) return { status: 'warning', color: 'text-yellow-600' };
    return { status: 'healthy', color: 'text-green-600' };
  };

  return (
    <ProcurementLayout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
            <p className="text-gray-600">Track and manage procurement budgets and approvals</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Request Budget
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Request Budget Allocation</DialogTitle>
                  <DialogDescription>Submit a new budget request for approval.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office-supplies">Office Supplies</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                          <SelectItem value="software">Software</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount ($)</Label>
                      <Input id="amount" type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Budget request description" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input id="deadline" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="justification">Justification</Label>
                    <textarea 
                      id="justification" 
                      className="w-full p-2 border rounded-md" 
                      rows={3}
                      placeholder="Provide justification for this budget request..."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit Request</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <Target className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalAllocated.toLocaleString()}</div>
              <p className="text-xs text-gray-600">FY 2024 Allocation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Spent</CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
              <p className="text-xs text-gray-600">{utilizationRate}% utilized</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRemaining.toLocaleString()}</div>
              <p className="text-xs text-gray-600">{100 - utilizationRate}% available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
              <BarChart3 className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{utilizationRate}%</div>
              <Progress value={utilizationRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Budget Breakdown */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Budget Breakdown
                    <Badge variant="outline" className="text-sm">
                      {utilizationRate}% utilized
                    </Badge>
                  </CardTitle>
                  <CardDescription>Current fiscal year budget allocation and spending</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        ${totalSpent.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        of ${totalAllocated.toLocaleString()} allocated
                      </div>
                      <Progress value={utilizationRate} className="mt-2" />
                    </div>
                    
                    <div className="space-y-4">
                      {budgetData.map((item, index) => {
                        const utilization = Math.round((item.spent / item.allocated) * 100);
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{item.category}</span>
                              <span className="text-gray-600">
                                ${item.spent.toLocaleString()} / ${item.allocated.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${item.color}`}
                                style={{ width: `${utilization}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 text-right">
                              {utilization}% utilized
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recent Budget Activity</CardTitle>
                  <CardDescription>Latest budget transactions and approvals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Office furniture approved</p>
                        <p className="text-xs text-gray-500">$12,000 • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Server infrastructure pending</p>
                        <p className="text-xs text-gray-500">$45,000 • 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Software licenses purchased</p>
                        <p className="text-xs text-gray-500">$8,500 • 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Marketing campaign rejected</p>
                        <p className="text-xs text-gray-500">$25,000 • 2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {budgetData.map((category, index) => {
                const utilization = Math.round((category.spent / category.allocated) * 100);
                const status = getUtilizationStatus(category.spent, category.allocated);
                
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{category.category}</CardTitle>
                          <CardDescription>Budget Category</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${status.color}`}>
                            {utilization}%
                          </div>
                          <div className="text-xs text-gray-500">utilized</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Allocated</span>
                            <span className="font-medium">${category.allocated.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Spent</span>
                            <span className="font-medium">${category.spent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Remaining</span>
                            <span className="font-medium">${category.remaining.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <Progress value={utilization} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            Updated: {category.lastUpdated}
                          </span>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Target className="w-4 h-4 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Approvals</CardTitle>
                <CardDescription>Manage budget requests and approvals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvals.map((approval) => (
                    <div key={approval.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium">{approval.description}</h4>
                            <Badge className={getPriorityColor(approval.priority)}>
                              {approval.priority}
                            </Badge>
                            <Badge className={getStatusColor(approval.status)}>
                              {approval.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            Category: {approval.category} • Amount: ${approval.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Requested by: {approval.requestedBy} • Date: {approval.requestDate}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {approval.status === 'pending' && (
                            <>
                              <Button variant="outline" size="sm" className="text-green-600">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                Reject
                              </Button>
                            </>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
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
                  <CardTitle>Budget Trends</CardTitle>
                  <CardDescription>Analyze spending patterns and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Spending Analytics</h3>
                    <p className="text-gray-600 mb-4">Detailed budget analysis and forecasting</p>
                    <Button variant="outline">
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Forecast</CardTitle>
                  <CardDescription>Budget forecasting and projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Budget Forecast</h3>
                    <p className="text-gray-600 mb-4">Predict future spending and budget needs</p>
                    <Button variant="outline">
                      Generate Forecast
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
