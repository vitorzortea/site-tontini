import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, AfterViewInit, Renderer2, ChangeDetectorRef, HostListener, Inject } from '@angular/core';

@Directive({
  selector: '[setanimation]',
  standalone: true,
})
export class SetAnimateDirective implements AfterViewInit {
  animations = [
    'fade-in',
    'fade-out',
    'slide-up',
    'slide-down',
    'slide-left',
    'slide-right',
    'zoom-in',
    'zoom-out',
    'rotate',
    'grow-up'
  ];
  elementos:{e:Element, c:string}[] = [];
  private lastScrollTop = 0;
  

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr:ChangeDetectorRef,
    @Inject(DOCUMENT) private document:Document,
  ) {}

  @HostListener('window:scroll', ['$event']) onWindowScroll() {
    /*
    const scroll = this.document.documentElement.scrollTop;
    const tela = this.document.defaultView?.innerHeight || 1;
    const [top, bottom] = (scroll > this.lastScrollTop)
      ?[0, tela-20]
      :[20-tela, 0];
    console.log(scroll, this.lastScrollTop, scroll > this.lastScrollTop);
    this.isAnimation(top, bottom, tela);
    this.lastScrollTop = scroll;
    */
  }

  ngAfterViewInit(): void {
    /*
    console.log('ngAfterViewInit');
    const tela = this.document.defaultView?.innerHeight || 1;
    this.lastScrollTop = this.document.documentElement.scrollTop;
    const parentElement = this.el.nativeElement as HTMLElement;
    this.setElementos(parentElement);
    this.isAnimation(-(tela/2), tela, tela);
    */
  }

  setElementos(parentElement:HTMLElement){
    console.log('setElementos');
    this.animations.forEach((animeClass: string) => {
      const _elementos = Array.from(parentElement.querySelectorAll('.'+animeClass));
      _elementos.forEach(elemento=>{
        this.elementos.push({e:elemento,c:animeClass});
      })
    });
  }
  
  isAnimation(top:number,bottom:number, tela:number){
    console.log('isAnimation');
    this.animations.forEach((c:string)=>{
      this.el.nativeElement.querySelectorAll(`.${c}:not(.${c}-animated)`)
        .forEach((e:Element)=>{
          const posY = e.getBoundingClientRect().y;
          console.log({
            e,tela,scroll,top,bottom,posY,
            isTop:posY>=top,
            isBottom:posY<=bottom,
            isAnd:posY>=top && posY<=bottom,
          })
          console.log(posY>=top && posY<=bottom)
          if(posY>=top && posY<=bottom){
            console.log('entrou')
            this.acionarAnimacao(e, c);
          }
      });
    })
  }

  acionarAnimacao(e:Element, c:string){
    console.log('acionarAnimacao');
    Array(5).fill(50).forEach((time,i)=>{
      setTimeout(()=>{
        console.log('Animou: ', {e, element:this.elementos, time, i});
        this.renderer.addClass(e, `${c}-animated`);
        this.cdr.detectChanges();
      }, time*i)
    });
  }
}