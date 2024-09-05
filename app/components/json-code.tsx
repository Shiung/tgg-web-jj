import React from 'react'

interface JsonCodeBlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  className?: string
}

const JsonCode: React.FC<JsonCodeBlockProps> = ({ data, className = '' }) => {
  return (
    <code
      className={`inline-flex w-full items-center space-x-4 whitespace-pre-wrap break-all rounded-lg bg-gray-800 p-4 pl-6 text-left text-sm text-white sm:text-base ${className}`}
    >
      {JSON.stringify(data, null, 2)}
    </code>
  )
}

export default JsonCode
