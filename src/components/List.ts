import gsap from 'gsap'

export class List {
  private profileText = document.querySelector<HTMLElement>('.lists .profile')!

  constructor() {
    this.addWorksClickEvent()
    this.addProfileClickEvent()
  }

  private addWorksClickEvent() {
    const titleList = document.querySelectorAll<HTMLElement>('.list li')
    titleList[0].classList.add('active')

    const card = document.querySelector<HTMLElement>('.card')!
    let currentImageContainer = document.querySelector<HTMLElement>(`#kv-${titleList[0].dataset.id}`)!
    let currentText = document.querySelector<HTMLElement>(`#text-${titleList[0].dataset.id}`)!

    let tl: gsap.core.Timeline | null = null

    titleList.forEach((titleItem) => {
      const targetImageContainer = document.querySelector<HTMLElement>(`#kv-${titleItem.dataset.id}`)!
      const targetText = document.querySelector<HTMLElement>(`#text-${titleItem.dataset.id}`)!

      titleItem.addEventListener('click', () => {
        if (tl?.isActive()) return

        let timescale = 1

        if (this.profileText.classList.contains('active')) {
          this.profile_works()
          titleItem.classList.add('active')
          timescale = 1000
        }

        if (currentImageContainer === targetImageContainer) return

        // 作品リスト
        document.querySelector<HTMLElement>('.list li.active')?.classList.remove('active')
        titleItem.classList.add('active')
        // 画像
        targetImageContainer.classList.add('next')
        const targetImage = targetImageContainer.querySelector<HTMLElement>('img')!
        const currentImage = currentImageContainer.querySelector<HTMLElement>('img')!
        // タイトル、日付
        targetText.classList.add('next')

        tl = gsap.timeline()
        tl.fromTo(card, { '--image-progress': 0 }, { '--image-progress': 1, duration: 0.8, ease: 'power1.inOut' })
        tl.fromTo(targetImage, { scale: 1.05, x: '15%', opacity: -0.3 }, { scale: 1, x: '0%', opacity: 1, duration: 1, ease: 'power1.out' }, '<')
        tl.fromTo(currentImage, { x: '0%', opacity: 1 }, { x: '-20%', opacity: 0, duration: 1.2, ease: 'power1.out' }, '<')
        tl.fromTo(currentText, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, '<')
        tl.fromTo(targetText, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.inOut' }, '<100%')

        tl.eventCallback('onComplete', () => {
          targetImageContainer.classList.remove('next')
          targetImageContainer.classList.add('current')
          currentImageContainer.classList.remove('current')
          card.style.removeProperty('--image-progress')
          currentImage.style.removeProperty('opacity')
          currentImageContainer = targetImageContainer

          targetText.classList.remove('next')
          targetText.classList.add('current')
          currentText.classList.remove('current')
          currentText.style.removeProperty('opacity')
          currentText = targetText
        })

        tl.timeScale(timescale)
      })
    })
  }

  private addProfileClickEvent() {
    this.profileText.addEventListener('click', () => {
      if (this.profileText.classList.contains('active')) return
      this.works_profile()
    })
  }

  private works_profile() {
    const card = document.querySelector<HTMLElement>('.card')!
    const profile = document.querySelector<HTMLElement>('.card-container .profile')!

    document.querySelector<HTMLElement>('.list li.active')?.classList.remove('active')
    this.profileText.classList.add('active')

    const tl = gsap.timeline()
    tl.to(card, { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: '-3%', duration: 1, ease: 'power3.inOut' })
    tl.fromTo(profile, { opacity: 0, y: '8%' }, { opacity: 1, duration: 1.2, y: '0%', ease: 'power2.out' }, '<60%')
    tl.call(() => profile.classList.add('active'))
  }

  private profile_works() {
    const card = document.querySelector<HTMLElement>('.card')!
    const profile = document.querySelector<HTMLElement>('.card-container .profile')!

    const tl = gsap.timeline()
    tl.call(() => {
      profile.classList.remove('active')
      this.profileText.classList.remove('active')
    })
    tl.to(profile, { opacity: 0, duration: 0.5, y: '-8%', ease: 'power2.in' })
    tl.fromTo(
      card,
      { clipPath: 'inset(100% 0 0 0)', opacity: 0, y: '3%' },
      { clipPath: 'inset(0% 0 0 0)', opacity: 1, y: '0%', duration: 1.2, ease: 'power3.inOut' },
      '<10%',
    )
  }
}
