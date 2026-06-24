import React, { useEffect, useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const header = document.querySelector('header.react-header')
    const navLinks = header.querySelectorAll('.nav-links a')
    const sections = document.querySelectorAll('section')

    const onScroll = () => {
      if (window.scrollY > 50) header.classList.add('scrolled')
      else header.classList.remove('scrolled')

      const scrollPos = window.scrollY + 150
      let current = ''
      sections.forEach(section => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id')
        }
      })

      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href').slice(1) === current) link.classList.add('active')
      })
    }

    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when resizing to large screens
    const onResize = () => {
      if (window.innerWidth > 768 && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  useEffect(() => {
    const hamburger = document.querySelector('.react-header .hamburger')
    const navLinksContainer = document.querySelector('.react-header .nav-links')
    if (!hamburger || !navLinksContainer) return
    if (menuOpen) {
      hamburger.classList.add('active')
      navLinksContainer.classList.add('open')
    } else {
      hamburger.classList.remove('active')
      navLinksContainer.classList.remove('open')
    }
  }, [menuOpen])

  return (
    <header className="react-header">
      <div className="container nav-wrapper">
        <a href="#home" className="logo" id="header-logo">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
          </svg>
          <span>AuraCare</span>
        </a>

        <nav aria-label="Main Navigation">
          <ul className="nav-links" id="main-nav-links">
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><button className="btn btn-primary book-apt-btn" id="nav-book-btn">Book Now</button></li>
          </ul>
        </nav>

        <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Toggle mobile menu" aria-controls="main-nav-links" aria-expanded={menuOpen}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  )
}
