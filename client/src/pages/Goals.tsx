import React, { useState } from 'react'
import { 
  Plus, 
  Target, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { format, differenceInDays, addDays } from 'date-fns'

interface Goal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  targetDate: Date
  category: 'emergency' | 'travel' | 'purchase' | 'investment' | 'other'
  priority: 'high' | 'medium' | 'low'
  autoContribute: boolean
  monthlyContribution?: number
}

const Goals: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'overdue'>('all')

  // Mock goals data
  const [goals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      description: '6 months of expenses for financial security',
      targetAmount: 5000,
      currentAmount: 3760,
      targetDate: addDays(new Date(), 90),
      category: 'emergency',
      priority: 'high',
      autoContribute: true,
      monthlyContribution: 400
    },
    {
      id: '2',
      title: 'Europe Vacation',
      description: 'Two-week trip to Europe next summer',
      targetAmount: 2500,
      currentAmount: 890,
      targetDate: addDays(new Date(), 180),
      category: 'travel',
      priority: 'medium',
      autoContribute: true,
      monthlyContribution: 200
    },
    {
      id: '3',
      title: 'New Laptop',
      description: 'MacBook Pro for work and studies',
      targetAmount: 1200,
      currentAmount: 450,
      targetDate: addDays(new Date(), 60),
      category: 'purchase',
      priority: 'medium',
      autoContribute: false
    },
    {
      id: '4',
      title: 'Investment Portfolio',
      description: 'Start building long-term wealth',
      targetAmount: 10000,
      currentAmount: 2100,
      targetDate: addDays(new Date(), 365),
      category: 'investment',
      priority: 'low',
      autoContribute: true,
      monthlyContribution: 300
    }
  ])

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getGoalStatus = (goal: Goal) => {
    const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount)
    const daysLeft = differenceInDays(goal.targetDate, new Date())
    
    if (progress >= 100) return 'completed'
    if (daysLeft < 0) return 'overdue'
    return 'active'
  }

  const getCategoryColor = (category: Goal['category']) => {
    const colors = {
      emergency: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      travel: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      purchase: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      investment: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
    return colors[category]
  }

  const getPriorityColor = (priority: Goal['priority']) => {
    const colors = {
      high: 'text-red-600 dark:text-red-400',
      medium: 'text-yellow-600 dark:text-yellow-400',
      low: 'text-green-600 dark:text-green-400'
    }
    return colors[priority]
  }

  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true
    return getGoalStatus(goal) === filter
  })

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const completedGoals = goals.filter(goal => getGoalStatus(goal) === 'completed').length

  const GoalCard: React.FC<{ goal: Goal }> = ({ goal }) => {
    const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount)
    const status = getGoalStatus(goal)
    const daysLeft = differenceInDays(goal.targetDate, new Date())

    return (
      <div className="card hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              status === 'completed' ? 'bg-green-100 dark:bg-green-900/20' :
              status === 'overdue' ? 'bg-red-100 dark:bg-red-900/20' :
              'bg-primary-100 dark:bg-primary-900/20'
            }`}>
              {status === 'completed' ? (
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : status === 'overdue' ? (
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              ) : (
                <Target className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {goal.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {goal.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
              {goal.category}
            </span>
            <span className={`text-xs font-medium capitalize ${getPriorityColor(goal.priority)}`}>
              {goal.priority}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {progress.toFixed(1)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                status === 'completed' ? 'bg-green-500' :
                status === 'overdue' ? 'bg-red-500' :
                'bg-primary-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ${(goal.targetAmount - goal.currentAmount).toLocaleString()} left
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>
                {status === 'overdue' 
                  ? `${Math.abs(daysLeft)} days overdue`
                  : status === 'completed' 
                    ? 'Completed!'
                    : `${daysLeft} days left`
                }
              </span>
            </div>
            
            {goal.autoContribute && goal.monthlyContribution && (
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>${goal.monthlyContribution}/month</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700 transition-colors">
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="btn-primary flex-1 text-sm py-2">
            Add Money
          </button>
          {status !== 'completed' && (
            <button className="btn-secondary text-sm py-2 px-4">
              {goal.autoContribute ? 'Pause Auto' : 'Enable Auto'}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Financial Goals
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your progress towards financial milestones
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Goal</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Saved
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                ${totalSaved.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Target
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                ${totalTarget.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <Target className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Completed Goals
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {completedGoals}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Overall Progress
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="card">
        <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {[
            { key: 'all', label: 'All Goals' },
            { key: 'active', label: 'Active' },
            { key: 'completed', label: 'Completed' },
            { key: 'overdue', label: 'Overdue' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                filter === tab.key
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGoals.length > 0 ? (
          filteredGoals.map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))
        ) : (
          <div className="lg:col-span-2">
            <div className="card text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No goals found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {filter === 'all' 
                  ? 'Start your financial journey by creating your first goal.'
                  : `No ${filter} goals at the moment.`}
              </p>
              {filter === 'all' && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn-primary"
                >
                  Create Your First Goal
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          💡 Goal Setting Tips
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Be Specific</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Set clear, measurable goals with specific target amounts and deadlines.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Start Small</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Begin with achievable goals to build momentum and confidence.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Automate Savings</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Set up automatic contributions to reach your goals consistently.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Track Progress</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Regular check-ins help you stay motivated and adjust as needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Goals