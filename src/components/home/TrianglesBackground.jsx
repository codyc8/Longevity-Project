import { useEffect, useRef, useState } from 'react'

/**
 * Interactive triangles background with parallax and ambient drift
 * - Responds to cursor position on desktop
 * - Falls back to ambient drift on mobile/touch devices
 */
export default function TrianglesBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const trianglesRef = useRef([])
  const animationRef = useRef(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detect touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Generate triangles
    const generateTriangles = () => {
      const triangles = []
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000))

      for (let i = 0; i < count; i++) {
        triangles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 40 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.002,
          driftX: (Math.random() - 0.5) * 0.3,
          driftY: (Math.random() - 0.5) * 0.3,
          parallaxFactor: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.096 + 0.036,
          filled: Math.random() > 0.5,
        })
      }
      trianglesRef.current = triangles
    }
    generateTriangles()

    // Mouse move handler (throttled)
    let lastMouseUpdate = 0
    const handleMouseMove = (e) => {
      const now = Date.now()
      if (now - lastMouseUpdate < 16) return // ~60fps throttle
      lastMouseUpdate = now

      mouseRef.current = {
        x: e.clientX / canvas.width,
        y: e.clientY / canvas.height,
      }
    }

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    // Animation loop
    let time = 0
    const animate = () => {
      time += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = mouseRef.current.x - 0.5
      const centerY = mouseRef.current.y - 0.5

      trianglesRef.current.forEach((triangle) => {
        // Ambient drift
        triangle.x += triangle.driftX
        triangle.y += triangle.driftY
        triangle.rotation += triangle.rotationSpeed

        // Add wave motion
        const waveX = Math.sin(time + triangle.x * 0.01) * 0.5
        const waveY = Math.cos(time + triangle.y * 0.01) * 0.5
        triangle.x += waveX
        triangle.y += waveY

        // Wrap around edges
        if (triangle.x < -50) triangle.x = canvas.width + 50
        if (triangle.x > canvas.width + 50) triangle.x = -50
        if (triangle.y < -50) triangle.y = canvas.height + 50
        if (triangle.y > canvas.height + 50) triangle.y = -50

        // Calculate parallax offset
        const offsetX = centerX * triangle.parallaxFactor * 50
        const offsetY = centerY * triangle.parallaxFactor * 50

        // Draw triangle
        ctx.save()
        ctx.translate(triangle.x + offsetX, triangle.y + offsetY)
        ctx.rotate(triangle.rotation)

        ctx.beginPath()
        ctx.moveTo(0, -triangle.size / 2)
        ctx.lineTo(triangle.size / 2, triangle.size / 2)
        ctx.lineTo(-triangle.size / 2, triangle.size / 2)
        ctx.closePath()

        if (triangle.filled) {
          ctx.fillStyle = `rgba(176, 137, 104, ${triangle.opacity})`
          ctx.fill()
        } else {
          ctx.strokeStyle = `rgba(127, 85, 57, ${triangle.opacity})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isTouchDevice])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
