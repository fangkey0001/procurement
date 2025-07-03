# ProcureFlow - Procurement Management System

A modern, responsive procurement management system built with Next.js, Tailwind CSS, and Shadcn/UI components.

## 🚀 Features

### Dashboard Overview
- **Real-time Metrics**: Track total orders, active suppliers, pending approvals, and budget utilization
- **Interactive Charts**: Visual representation of spending patterns and trends
- **Quick Actions**: Fast access to common procurement tasks

### Purchase Order Management
- **Order Creation**: Simple form-based order creation with supplier selection
- **Order Tracking**: Real-time status updates (Pending, Approved, Delivered, Rejected)
- **Bulk Operations**: Filter, search, and manage multiple orders
- **Approval Workflow**: Built-in approval process with status indicators

### Supplier Management
- **Supplier Database**: Comprehensive supplier information with ratings and performance metrics
- **Contact Management**: Store and manage supplier contact details
- **Performance Tracking**: Monitor supplier delivery times and quality scores
- **Relationship Management**: Track order history and communications

### Inventory Management
- **Stock Tracking**: Monitor current stock levels and minimum thresholds
- **Low Stock Alerts**: Automatic notifications for items requiring reorder
- **Category Management**: Organize inventory by categories (Electronics, Furniture, Supplies)
- **Stock Status**: Visual indicators for in-stock, low-stock, and out-of-stock items

### Budget Management
- **Budget Allocation**: Track spending across different categories
- **Utilization Monitoring**: Real-time budget usage with progress indicators
- **Spending Analytics**: Detailed breakdown of expenditures by category
- **Budget Alerts**: Notifications when approaching budget limits

### Analytics & Reporting
- **Spending Trends**: Visual analytics of procurement patterns
- **Supplier Performance**: Metrics on supplier reliability and quality
- **Custom Reports**: Generate detailed reports for stakeholders
- **Export Capabilities**: Download reports in various formats

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Language**: TypeScript
- **Responsive Design**: Mobile-first approach

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd procurement
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎨 UI Components

### Dashboard Widgets
- **QuickStats**: Key performance indicators with trend analysis
- **BudgetOverview**: Visual budget allocation and spending tracking
- **RecentActivity**: Activity feed with user actions and timestamps
- **PendingActions**: Priority-based action items requiring attention

### Layout Components
- **ProcurementLayout**: Main application layout with responsive sidebar
- **Navigation**: Multi-level navigation with active state indicators
- **Header**: Search functionality and user profile management

## 📱 Responsive Design

The system is fully responsive and optimized for:
- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Collapsed sidebar with touch-friendly interactions
- **Mobile**: Slide-out navigation with optimized touch targets

## 🔧 Customization

### Color Scheme
The system uses a professional blue and gray color palette:
- Primary: Blue (#3B82F6)
- Secondary: Gray (#6B7280)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

### Custom CSS Classes
- `.procurement-gradient`: Gradient backgrounds
- `.procurement-card`: Consistent card styling
- `.procurement-badge`: Status indicators
- `.procurement-button`: Button variations

## 🚦 Status Indicators

### Purchase Orders
- **Pending**: Yellow badge with clock icon
- **Approved**: Blue badge with check icon
- **Delivered**: Green badge with check icon
- **Rejected**: Red badge with X icon

### Inventory
- **In Stock**: Green badge
- **Low Stock**: Yellow badge
- **Out of Stock**: Red badge

## 🔐 Security Features

- Input validation and sanitization
- CSRF protection
- Role-based access control (framework ready)
- Secure authentication (framework ready)

## 📊 Sample Data

The system includes realistic sample data for:
- 5 recent purchase orders
- 4 supplier profiles
- 5 inventory items
- Budget categories and allocations
- Activity logs and notifications

## 🎯 Future Enhancements

- **API Integration**: Connect to real backend services
- **User Authentication**: Complete user management system
- **Email Notifications**: Automated email alerts and reminders
- **Document Management**: File upload and document storage
- **Advanced Analytics**: Charts and graphs with Chart.js/D3.js
- **Workflow Automation**: Automated approval processes
- **Multi-language Support**: Internationalization
- **Dark Mode**: Theme switching capability

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**ProcureFlow** - Streamline your procurement process with modern technology.
