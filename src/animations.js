// Skip motion if the visitor turned off animations in their device settings
const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const fadeUp = (distance) => [
  { opacity: 0, transform: `translateY(${distance}px)` },
  { opacity: 1, transform: 'translateY(0)' },
]

/* 1. Page-load animation: nav slides down, then hero content rises in one by one */
export function playIntro() {
  if (reduceMotion()) return

  const nav = document.querySelector('.nav')
  const heroParts = document.querySelectorAll('.hero-text > *')

  nav?.animate(
    [
      { opacity: 0, transform: 'translateY(-20px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 600, easing: 'ease-out', fill: 'backwards' }
  )

  heroParts.forEach((el, i) => {
    el.animate(fadeUp(24), {
      duration: 700,
      delay: 200 + i * 90,
      easing: 'cubic-bezier(.2,.7,.2,1)',
      fill: 'backwards',
    })
  })
}

/* 2. Scroll animation: titles, cards, and timeline items fade up as they enter the screen.
      Items that show up together are staggered, so a row of cards plays left to right. */
export function revealOnScroll() {
  if (reduceMotion()) return () => {}

  const targets = document.querySelectorAll(
    '.reveal .eyebrow, .reveal .sec-title, .reveal .card, .reveal .t-item'
  )
  targets.forEach((el) => (el.style.opacity = '0')) // hide them first

  const observer = new IntersectionObserver(
    (entries) => {
      let i = 0
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target
        const anim = el.animate(fadeUp(32), {
          duration: 700,
          delay: Math.min(i, 5) * 110,
          easing: 'cubic-bezier(.2,.7,.2,1)',
          fill: 'forwards',
        })
        // When done, hand control back to CSS so card hover effects still work
        anim.onfinish = () => {
          el.style.opacity = ''
          anim.cancel()
        }
        i++
        observer.unobserve(el) // animate only once
      })
    },
    { threshold: 0.12 }
  )

  targets.forEach((el) => observer.observe(el))
  return () => {
    observer.disconnect()
    targets.forEach((el) => (el.style.opacity = ''))
  }
}

/* 3. Scroll tools:
      - top progress bar (sets --scroll from 0 to 1 on <html>)
      - "back to top" button stays hidden until you scroll down
      - menu link highlights the section you are reading */
export function trackScroll() {
  const root = document.documentElement
  const toTop = document.querySelector('.to-top')
  let ticking = false

  const update = () => {
    const max = root.scrollHeight - window.innerHeight
    const progress = max > 0 ? window.scrollY / max : 0
    root.style.setProperty('--scroll', progress.toFixed(4))
    toTop?.classList.toggle('show', window.scrollY > 400)
    ticking = false
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  update()

  // Highlight the menu link of the section that is in the middle of the screen
  const links = document.querySelectorAll('.links a')
  const sections = document.querySelectorAll('main section[id]')
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        links.forEach((a) =>
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`)
        )
      })
    },
    { rootMargin: '-40% 0px -55% 0px' }
  )
  sections.forEach((s) => spy.observe(s))

  return () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    spy.disconnect()
  }
}