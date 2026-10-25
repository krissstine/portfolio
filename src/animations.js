// Skip all animations if the visitor turned off motion in their device settings
const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* 1. Page-load animation: nav slides down, hero card fades up */
export function playIntro() {
  if (reduceMotion()) return

  const nav = document.querySelector('.nav')
  const hero = document.querySelector('.hero-text')

  nav?.animate(
    [
      { opacity: 0, transform: 'translateY(-20px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 600, easing: 'ease-out', fill: 'backwards' }
  )

  hero?.animate(
    [
      { opacity: 0, transform: 'translateY(30px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 800, delay: 150, easing: 'ease-out', fill: 'backwards' }
  )
}

/* 2. Scroll animation: elements with class "reveal" fade in when scrolled into view */
export function revealOnScroll() {
  if (reduceMotion()) return () => {}

  const els = document.querySelectorAll('.reveal')
  els.forEach((el) => (el.style.opacity = '0')) // hide them first

  const observer = new IntersectionObserver(
    (entries) => {
      let i = 0
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.animate(
          [
            { opacity: 0, transform: 'translateY(30px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 700, delay: i * 100, easing: 'ease-out', fill: 'forwards' }
        )
        i++
        observer.unobserve(entry.target) // animate only once
      })
    },
    { threshold: 0.15 }
  )

  els.forEach((el) => observer.observe(el))
  return () => observer.disconnect() // cleanup
}