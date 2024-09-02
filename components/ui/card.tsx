import React from 'react'

export function Card({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>{children}</div>
}

export function CardHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

export function CardTitle({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`text-lg font-semibold text-gray-800 dark:text-gray-100 ${className}`}>{children}</h3>
}

export function CardContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}