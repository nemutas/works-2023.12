import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OverlayScrollbars } from 'overlayscrollbars'

gsap.registerPlugin(ScrollTrigger)

class Scroller {
  readonly lenis: Lenis

  constructor() {
    this.lenis = this.createLenis()
    this.createOverlayScrollbars()
  }

  private createLenis() {
    const lenis = new Lenis({
      duration: 1.8,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return lenis
  }

  private createOverlayScrollbars() {
    OverlayScrollbars(document.body, {
      overflow: { x: 'hidden' },
      scrollbars: { theme: 'os-theme-light', autoHide: 'scroll', autoHideDelay: 500, dragScroll: true },
    })
  }
}

export const scroller = new Scroller()
