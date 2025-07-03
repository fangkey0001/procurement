"use client";

import { useState } from "react";
import ProcurementLayout from "@/components/procurement/ProcurementLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertTriangle,
  Package,
  Users,
  FileText,
  Bell,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  const [filterType, setFilterType] = useState("all");

  const events = [
    {
      id: 1,
      title: "Server Equipment Delivery",
      type: "delivery",
      date: "2024-01-20",
      time: "10:00 AM",
      description: "Dell server infrastructure delivery from TechCorp Solutions",
      supplier: "TechCorp Solutions",
      amount: 45000,
      priority: "high",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Quarterly Supplier Review",
      type: "meeting",
      date: "2024-01-22",
      time: "2:00 PM",
      description: "Performance review meeting with top suppliers",
      supplier: "Multiple Suppliers",
      duration: "2 hours",
      priority: "medium",
      status: "scheduled"
    },
    {
      id: 3,
      title: "Budget Approval Deadline",
      type: "deadline",
      date: "2024-01-25",
      time: "5:00 PM",
      description: "Q2 budget proposals must be submitted",
      department: "Finance",
      priority: "high",
      status: "pending"
    },
    {
      id: 4,
      title: "Office Furniture Installation",
      type: "delivery",
      date: "2024-01-28",
      time: "9:00 AM",
      description: "New office furniture delivery and installation",
      supplier: "Office Supplies Inc",
      amount: 12000,
      priority: "medium",
      status: "confirmed"
    },
    {
      id: 5,
      title: "Contract Renewal Discussion",
      type: "meeting",
      date: "2024-01-30",
      time: "11:00 AM",
      description: "Annual contract renewal with Industrial Equipment Co",
      supplier: "Industrial Equipment Co",
      duration: "1.5 hours",
      priority: "high",
      status: "scheduled"
    },
    {
      id: 6,
      title: "Software License Expiry",
      type: "deadline",
      date: "2024-02-01",
      time: "11:59 PM",
      description: "Annual software licenses expire - renewal required",
      vendor: "Software Solutions Ltd",
      priority: "critical",
      status: "action_required"
    },
    {
      id: 7,
      title: "Maintenance Service Visit",
      type: "service",
      date: "2024-02-05",
      time: "1:00 PM",
      description: "Routine maintenance for HVAC systems",
      supplier: "Maintenance Services",
      amount: 2500,
      priority: "low",
      status: "scheduled"
    },
    {
      id: 8,
      title: "Inventory Audit",
      type: "audit",
      date: "2024-02-10",
      time: "9:00 AM",
      description: "Quarterly physical inventory count",
      department: "Operations",
      duration: "Full day",
      priority: "medium",
      status: "scheduled"
    }
  ];

  const eventTypes = [
    { value: "delivery", label: "Delivery", color: "bg-blue-100 text-blue-800", icon: Package },
    { value: "meeting", label: "Meeting", color: "bg-green-100 text-green-800", icon: Users },
    { value: "deadline", label: "Deadline", color: "bg-red-100 text-red-800", icon: AlertTriangle },
    { value: "service", label: "Service", color: "bg-purple-100 text-purple-800", icon: Clock },
    { value: "audit", label: "Audit", color: "bg-orange-100 text-orange-800", icon: FileText }
  ];

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const getEventTypeConfig = (type: string) => {
    return eventTypes.find(et => et.value === type) || eventTypes[0];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-red-400';
      case 'medium': return 'bg-yellow-400';
      case 'low': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'action_required': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDateObj = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === currentDateObj.toDateString();
      });
      
      days.push({
        date: new Date(currentDateObj),
        isCurrentMonth: currentDateObj.getMonth() === month,
        isToday: currentDateObj.toDateString() === new Date().toDateString(),
        events: dayEvents
      });
      
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <ProcurementLayout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Procurement Calendar</h1>
            <p className="text-gray-600">Track deliveries, meetings, deadlines, and important events</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>Schedule a new procurement-related event or reminder.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input id="event-title" placeholder="Enter event title" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-type">Event Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Date</Label>
                      <Input id="event-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-time">Time</Label>
                      <Input id="event-time" type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea 
                      id="description" 
                      className="w-full p-2 border rounded-md" 
                      rows={3}
                      placeholder="Event description..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier/Vendor (Optional)</Label>
                    <Input id="supplier" placeholder="Enter supplier name" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Add Event</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Calendar Controls */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="delivery">Deliveries</SelectItem>
                        <SelectItem value="meeting">Meetings</SelectItem>
                        <SelectItem value="deadline">Deadlines</SelectItem>
                        <SelectItem value="service">Services</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={viewMode} onValueChange={setViewMode}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">Month</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="day">Day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Header */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar Days */}
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[80px] p-1 border border-gray-200 ${
                        !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                      } ${day.isToday ? 'bg-blue-50 border-blue-300' : ''}`}
                    >
                      <div className={`text-sm ${day.isToday ? 'font-bold text-blue-600' : ''}`}>
                        {day.date.getDate()}
                      </div>
                      <div className="space-y-1 mt-1">
                        {day.events.slice(0, 2).map(event => {
                          const typeConfig = getEventTypeConfig(event.type);
                          return (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded ${typeConfig.color} truncate cursor-pointer hover:opacity-80`}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          );
                        })}
                        {day.events.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{day.events.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>Next 5 upcoming events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map(event => {
                    const typeConfig = getEventTypeConfig(event.type);
                    return (
                      <div key={event.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`} />
                            <typeConfig.icon className="w-4 h-4 text-gray-500" />
                          </div>
                          <Badge className={getStatusColor(event.status)} variant="outline">
                            {event.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-sm mt-2">{event.title}</h4>
                        <p className="text-xs text-gray-600">{formatDate(event.date)} at {event.time}</p>
                        {event.supplier && (
                          <p className="text-xs text-gray-500">Supplier: {event.supplier}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Event Types Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {eventTypes.map(type => (
                    <div key={type.value} className="flex items-center space-x-3">
                      <type.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{type.label}</span>
                      <div className={`w-3 h-3 rounded ${type.color}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Schedule Delivery
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Supplier Meeting
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Set Deadline
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Add Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>All Events</CardTitle>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search events..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events.map(event => {
                const typeConfig = getEventTypeConfig(event.type);
                return (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`} />
                        <typeConfig.icon className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{formatDate(event.date)} at {event.time}</span>
                          {event.supplier && <span>Supplier: {event.supplier}</span>}
                          {event.amount && <span>Amount: ${event.amount.toLocaleString()}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status.replace('_', ' ')}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProcurementLayout>
  );
}
