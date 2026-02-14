"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Droplets, Home, ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"

interface TrailDot {
  id: number
  x: number
  y: number
}

const NotFound = () => {
  const [trailDots, setTrailDots] = useState<TrailDot[]>([])
  const [dotId, setDotId] = useState(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newDot: TrailDot = {
      id: dotId,
      x: e.clientX,
      y: e.clientY,
    }
    setDotId(prev => prev + 1)
    setTrailDots(prev => [...prev, newDot])

    setTimeout(() => {
      setTrailDots(prev => prev.filter(dot => dot.id !== newDot.id))
    }, 900)
  }, [dotId])

  useEffect(() => {
    let lastTime = 0
    const throttledHandler = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime >= 50) {
        lastTime = now
        handleMouseMove(e)
      }
    }
    
    window.addEventListener("mousemove", throttledHandler)
    return () => window.removeEventListener("mousemove", throttledHandler)
  }, [handleMouseMove])

  const [bubbles] = useState(() => {
    return [...Array(20)].map(() => ({
      width: Math.random() * 60 + 20,
      height: Math.random() * 60 + 20,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      x: [0, Math.random() * 20 - 10, 0],
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden relative">
      {/* Mouse Trail Dots */}
      <AnimatePresence>
        {trailDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="fixed pointer-events-none z-50"
            style={{ left: dot.x, top: dot.y }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-primary/50 shadow-lg shadow-primary/30" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: bubble.width,
              height: bubble.height,
              left: bubble.left,
              top: bubble.top,
            }}
            animate={{
              y: [0, -30, 0],
              x: bubble.x,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Sparkle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-primary/40" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        {/* Animated Water Drop with Ripple */}
        <motion.div
          className="relative mx-auto mb-8 w-40 h-40"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Multiple Ripple Rings */}
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              animate={{ 
                scale: [1, 2, 2.5], 
                opacity: [0.6, 0.2, 0] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                delay: ring * 0.8,
                ease: "easeOut" 
              }}
            />
          ))}
          
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Droplets className="w-20 h-20 text-primary drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 404 Text with Glow */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        >
          <motion.h1
            className="text-9xl font-bold text-foreground mb-4 relative"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(var(--primary), 0.3)",
                "0 0 40px rgba(var(--primary), 0.5)",
                "0 0 20px rgba(var(--primary), 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="inline-block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            >
              4
            </motion.span>
            <motion.span
              className="inline-block text-primary"
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              0
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            >
              4
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Pagina no encontrada
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Parece que esta pagina se fue con el agua. No te preocupes, te ayudamos a volver.
          </p>
        </motion.div>

        {/* Action Buttons with Hover Effects */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/25">
              <Link href="/">
                <Home className="w-4 h-4" />
                Ir al inicio
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
