import React, { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  CreditCard,
  Plus,
  Calendar,
  Filter
} from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  // Mock data
  const stats = {
    totalBalance: 5420.50,
    monthlyIncome: 3200.00,
    monthlyExpenses: 2180.75,
    savingsGoal: 75.2 // percentage
  }

  const recentTransactions = [
    { id: 1, description: 'Starbucks Coffee', amount: -5.99, category: 'Food', date: new Date(), type: 'expense' },
    { id: 2, description: 'Salary Deposit', amount: 3200.00, category: 'Income', date: subDays(new Date(), 1), type: 'income' },
    { id: 3, description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: subDays(new Date(), 2), type: 'expense' },
    { id: 4, description: 'Grocery Store', amount: -89.45, category: 'Food', date: subDays(new Date(), 3), type: 'expense' },
    { id: 5, description: 'Gas Station', amount: -45.20, category: 'Transportation', date: subDays(new Date(), 4), type: 'expense' },
  ]

  const expensesByCategory = {
    labels: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'],
    datasets: [{
      data: [450, 320, 180, 250, 680, 150],
      backgroundColor: [
        '#ef4444',
        '#f59e0b',
        '#10b981',
        '#3b82f6',
        '#8b5cf6',
        '#6b7280'
      ],
      borderWidth: 0
    }]
  }

  const monthlyTrend = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [3000, 3200, 3100, 3300, 3200, 3200],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: [2200, 2400, 2100, 2300, 2500, 2180],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      }
    ]
  }

  const StatCard: React.FC<{
    title: string
    value: string
    change?: string
    changeType?: 'positive' | 'negative'
    icon: React.ReactNode
  }> = ({ title, value, change, changeType, icon }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
            {value}
          </p>
          {change && (
            <p className={`text-sm mt-1 flex items-center space-x-1 ${
              changeType === 'positive' 
                ? 'text-success-600 dark:text-success-400' 
                : 'text-danger-600 dark:text-danger-400'
            }`}>
              {changeType === 'positive' ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{change}</span>
            </p>
          )}
        </div>
        <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Good morning! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your money today.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="input-field text-sm w-auto"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Balance"
          value={`$${stats.totalBalance.toLocaleString()}`}
          change="+8.2%"
          changeType="positive"
          icon={<DollarSign className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
        />
        
        <StatCard
          title="Monthly Income"
          value={`$${stats.monthlyIncome.toLocaleString()}`}
          change="+2.1%"
          changeType="positive"
          icon={<TrendingUp className="h-6 w-6 text-success-600 dark:text-success-400" />}
        />
        
        <StatCard
          title="Monthly Expenses"
          value={`$${stats.monthlyExpenses.toLocaleString()}`}
          change="-12.3%"
          changeType="positive"
          icon={<CreditCard className="h-6 w-6 text-danger-600 dark:text-danger-400" />}
        />
        
        <StatCard
          title="Savings Goal"
          value={`${stats.savingsGoal}%`}
          change="+5.2%"
          changeType="positive"
          icon={<Target className="h-6 w-6 text-warning-600 dark:text-warning-400" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Income vs Expenses
            </h3>
            <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
          </div>
          <div className="h-80">
            <Line
              data={monthlyTrend}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return '$' + value;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Expense Categories */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Spending by Category
          </h3>
          <div className="h-80">
            <Doughnut
              data={expensesByCategory}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Transactions
          </h3>
          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'income' 
                    ? 'bg-success-100 dark:bg-success-900/20' 
                    : 'bg-danger-100 dark:bg-danger-900/20'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="h-5 w-5 text-success-600 dark:text-success-400" />
                  ) : (
                    <CreditCard className="h-5 w-5 text-danger-600 dark:text-danger-400" />
                  )}
                </div>
                
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.category} • {format(transaction.date, 'MMM d')}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.amount > 0 
                    ? 'text-success-600 dark:text-success-400' 
                    : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Progress */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Savings Goals
        </h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Emergency Fund</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">$3,760 of $5,000</p>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">75.2%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75.2%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Vacation Fund</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">$890 of $2,500</p>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">35.6%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-success-500 h-2 rounded-full" style={{ width: '35.6%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">New Laptop</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">$450 of $1,200</p>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">37.5%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-warning-500 h-2 rounded-full" style={{ width: '37.5%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard