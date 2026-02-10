"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"
import { CheckCircle, X, Bell, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  timestamp: number
  isRead: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
  getUnreadCount: () => number
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now(),
      isRead: false
    }
    setNotifications(prev => [...prev, newNotification])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const getUnreadCount = () => {
    return notifications.filter(n => !n.isRead).length
  }

  const value: NotificationContextType = {
    notifications,
    addNotification,
    markAsRead,
    clearNotifications,
    getUnreadCount
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 max-w-sm">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="relative p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {isVisible && (
          <div className="absolute top-12 right-0 bg-white rounded-lg shadow-2xl w-96 max-h-96 overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => value.clearNotifications()}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ×
                </Button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                    notification.isRead ? 'opacity-50' : ''
                  }`}
                  onClick={() => {
                    if (notification.action) {
                      notification.action.onClick()
                    }
                    value.markAsRead(notification.id)
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.type === 'success' ? 'bg-green-100' :
                      notification.type === 'error' ? 'bg-red-100' :
                      notification.type === 'warning' ? 'bg-yellow-100' :
                      notification.type === 'info' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}
                    >
                      {notification.type === 'success' && <CheckCircle className="h-6 w-6 text-green-600" />}
                      {notification.type === 'error' && <X className="h-6 w-6 text-red-600" />}
                      {notification.type === 'warning' && <AlertCircle className="h-6 w-6 text-yellow-600" />}
                      {notification.type === 'info' && <Info className="h-6 w-6 text-blue-600" />}
                    </div>

                    <div className="flex-1">
                      <div>
                        <div className="font-medium text-sm">{notification.title}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                      
                      {notification.action && (
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={notification.action.onClick}
                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                          >
                            {notification.action.label}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Success Toast */}
      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-transform duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}>
        <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-white" />
          <div>
            <div className="font-medium">Payment Successful!</div>
            <div className="text-sm">Enrollment completed</div>
          </div>
        </div>
      </div>
    </NotificationContext.Provider>
  )
}