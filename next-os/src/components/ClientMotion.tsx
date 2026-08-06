"use client"
import React from 'react'
import { motion, MotionProps } from 'framer-motion'

type Props = React.PropsWithChildren<MotionProps>

export default function ClientMotion({ children, ...props }: Props) {
  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  )
}
