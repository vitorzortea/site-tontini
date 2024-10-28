import { Directive, ElementRef, OnDestroy, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '.fade-in, .fade-out, .slide-up, .slide-down, .slide-left, .slide-right, .zoom-in, .zoom-out, .rotate, .grow-up',
  standalone: true
})
export class AnimationDirective implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {}
  teste!:IntersectionObserverEntry;

  ngAfterViewInit(): void {
    this.el.nativeElement.setAttribute('viewAnimate', '');
    if (isPlatformBrowser(this.platformId)) { // Verifica se é um navegador
      if ('IntersectionObserver' in window) {//Quando Inicia o inicialmente o window
        this.observer = new IntersectionObserver(//Observer para tela visivel
          (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
              this.el.nativeElement.removeAttribute('viewAnimate');
              this.el.nativeElement.setAttribute('animated', '');
              this.observer.unobserve(this.el.nativeElement);
            }
          },
          { threshold: 0.1 }//visível quando 10%
        );
        this.observer.observe(this.el.nativeElement); //Obsever com o proprio elemento e parametro
      }
    }
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }
}
