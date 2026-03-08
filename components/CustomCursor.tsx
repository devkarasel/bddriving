'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only enable custom cursor on pointer (non-touch) devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const wheel = wheelRef.current
    if (!dot || !wheel) return

    let mouseX = 0, mouseY = 0
    let dotX = 0, dotY = 0
    let raf: number

    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      dotX += (mouseX - dotX) * 0.15
      dotY += (mouseY - dotY) * 0.15
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
      wheel.style.left = dotX + 'px'
      wheel.style.top = dotY + 'px'
      raf = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      dot.classList.add('hovering')
      wheel.classList.add('hovering')
    }
    const onLeave = () => {
      dot.classList.remove('hovering')
      wheel.classList.remove('hovering')
    }

    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(animate)

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, label').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div id="custom-cursor" ref={dotRef} />
      <div id="cursor-wheel" ref={wheelRef}>
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="16" stroke="#F59E0B" strokeWidth="2"/>
          <circle cx="18" cy="18" r="5" stroke="#F59E0B" strokeWidth="1.5"/>
          <line x1="18" y1="2" x2="18" y2="13" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="18" y1="23" x2="18" y2="34" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2" y1="18" x2="13" y2="18" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="23" y1="18" x2="34" y2="18" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="5.5" y1="5.5" x2="13.5" y2="13.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="22.5" y1="22.5" x2="30.5" y2="30.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="30.5" y1="5.5" x2="22.5" y2="13.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="13.5" y1="22.5" x2="5.5" y2="30.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </>
  )
}
