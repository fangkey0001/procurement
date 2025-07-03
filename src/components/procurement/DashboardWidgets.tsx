"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";

export function QuickStats() {
  const stats = [
    {
      title: "Total Orders",
      value: "234",
      change: "+12.5%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Active Suppliers",
      value: "45",
      change: "+3.2%",
      trend: "up",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Pending Approvals",
      value: "18",
      change: "-5.1%",
      trend: "down",
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Budget Utilized",
      value: "75%",
      change: "+2.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className={`text-xs flex items-center mt-1 ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {stat.change} from last month
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function BudgetOverview() {
  const budgetData = [
    { category: "Office Supplies", allocated: 50000, spent: 35000, color: "bg-blue-500" },
    { category: "Equipment", allocated: 150000, spent: 125000, color: "bg-green-500" },
    { category: "Software", allocated: 75000, spent: 45000, color: "bg-purple-500" },
    { category: "Services", allocated: 100000, spent: 85000, color: "bg-orange-500" },
    { category: "Maintenance", allocated: 25000, spent: 18000, color: "bg-pink-500" }
  ];

  const totalAllocated = budgetData.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const utilizationRate = Math.round((totalSpent / totalAllocated) * 100);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Budget Overview
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
  );
}

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "order_created",
      message: "New purchase order PO-2024-001 created",
      user: "John Smith",
      time: "2 hours ago",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      id: 2,
      type: "order_approved",
      message: "Purchase order PO-2024-002 approved",
      user: "Sarah Johnson",
      time: "4 hours ago",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      id: 3,
      type: "supplier_added",
      message: "New supplier TechCorp Solutions added",
      user: "Mike Wilson",
      time: "6 hours ago",
      icon: Users,
      color: "text-purple-600"
    },
    {
      id: 4,
      type: "budget_alert",
      message: "Budget threshold reached for Office Supplies",
      user: "System",
      time: "8 hours ago",
      icon: AlertTriangle,
      color: "text-yellow-600"
    },
    {
      id: 5,
      type: "order_delivered",
      message: "Order PO-2024-003 delivered successfully",
      user: "Emily Brown",
      time: "10 hours ago",
      icon: Package,
      color: "text-green-600"
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest procurement system activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">
                  by {activity.user} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PendingActions() {
  const pendingActions = [
    {
      id: 1,
      title: "Approve Purchase Order",
      description: "PO-2024-001 from TechCorp Solutions",
      priority: "high",
      dueDate: "Today",
      amount: "$12,500"
    },
    {
      id: 2,
      title: "Review Supplier Contract",
      description: "Annual contract renewal for Office Supplies Inc",
      priority: "medium",
      dueDate: "Tomorrow",
      amount: "$45,000"
    },
    {
      id: 3,
      title: "Budget Approval",
      description: "Q2 budget allocation for IT Equipment",
      priority: "high",
      dueDate: "This Week",
      amount: "$85,000"
    },
    {
      id: 4,
      title: "Supplier Evaluation",
      description: "Quarterly performance review for Industrial Co",
      priority: "low",
      dueDate: "Next Week",
      amount: null
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Pending Actions</CardTitle>
        <CardDescription>Items requiring your attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingActions.map((action) => (
            <div key={action.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <Badge className={getPriorityColor(action.priority)}>
                      {action.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Due: {action.dueDate}</span>
                    {action.amount && (
                      <span className="text-sm font-medium text-gray-900">{action.amount}</span>
                    )}
                  </div>
                </div>
                <Button size="sm" variant="outline" className="ml-4">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 