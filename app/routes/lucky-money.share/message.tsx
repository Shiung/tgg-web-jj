import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedMessageProps {
  children: ReactNode
  isVisible: boolean
  className?: string
}

const Message: React.FC<AnimatedMessageProps> = ({ children, isVisible, className }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Message
