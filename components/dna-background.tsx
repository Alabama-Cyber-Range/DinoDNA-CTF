"use client"

import { useEffect, useRef } from 'react'

export function DNABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationId: number
    let time = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw multiple DNA helices
      const helixCount = 3
      for (let h = 0; h < helixCount; h++) {
        const xOffset = (canvas.width / (helixCount + 1)) * (h + 1)
        const phaseOffset = (h * Math.PI * 2) / helixCount
        
        drawHelix(ctx, xOffset, canvas.height / 2, time + phaseOffset, 0.3 + h * 0.1)
      }

      time += 0.02
      animationId = requestAnimationFrame(draw)
    }

    const drawHelix = (
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      phase: number, 
      opacity: number
    ) => {
      const height = 600
      const width = 60
      const segments = 40
      const segmentHeight = height / segments

      for (let i = 0; i < segments; i++) {
        const yPos = y - height / 2 + i * segmentHeight
        const angle = (i / segments) * Math.PI * 4 + phase
        
        const x1 = x + Math.sin(angle) * width
        const x2 = x + Math.sin(angle + Math.PI) * width
        
        // Draw strand 1 (emerald)
        ctx.beginPath()
        ctx.arc(x1, yPos, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`
        ctx.fill()
        
        // Draw strand 2 (teal)
        ctx.beginPath()
        ctx.arc(x2, yPos, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(20, 184, 166, ${opacity})`
        ctx.fill()
        
        // Draw connecting base pairs
        if (i % 3 === 0) {
          ctx.beginPath()
          ctx.moveTo(x1, yPos)
          ctx.lineTo(x2, yPos)
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.5})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
    />
  )
}
