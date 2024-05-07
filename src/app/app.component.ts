import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  textos = ["Restaurante", "Padaria","Serviços Médicos ou Outros Serviços?"];
  textoIndex = 0;
  textoDigitado = "";
  isElementVisible: boolean = false;
  isScrolledLeft: boolean = false;
  isScrolledRight: boolean = false;
  isPrincServicoVisible: boolean = false;
  hasPlayedAnimations: boolean = false;
  isSobreMimVisible: boolean = false;
  hasPlayedAnimations2: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.digitarTexto();
    this.checkScroll();
    this.observePrincServicoVisibility();
    this.animacaoSobreMimFechamento();
  }
  title = 'dm-landing-page';
  @HostListener('window:scroll',  ['$event'])

  checkScroll() {
    const element = this.elementRef.nativeElement.querySelector('.import-lista');
    if (element) {
      if (this.isInViewport(element)) {
        this.isElementVisible = true;
      }
    }
  }

  onWindowScroll() {
    if (window.scrollY > 100) {
      this.isScrolledLeft = true;
      this.isScrolledRight = true;
    }
  }
  isInViewport(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  observePrincServicoVisibility() {
    const princServico = document.querySelector('.princ-servico');
    if (princServico) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasPlayedAnimations) { // Verifique se as animações já foram reproduzidas
            this.isPrincServicoVisible = true;
            this.playAnimations();
            this.hasPlayedAnimations = true; // Marque como reproduzido
          }
        });
      });

      observer.observe(princServico);
    }
  }
  animacaoSobreMimFechamento(){
    const sobreFechamento = document.querySelector('.mais-sobre-mim');
    if(sobreFechamento){
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasPlayedAnimations2) { // Verifique se as animações já foram reproduzidas
            this.isSobreMimVisible = true;
            this.playAnimations2();
            this.hasPlayedAnimations2 = true; // Marque como reproduzido
          }
        });
      });

      observer.observe(sobreFechamento);
    }
  }

  playAnimations() {
    gsap.fromTo('#h2-import-servico', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('.princ-servico1', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    gsap.fromTo('.princ-servico2', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.5 });
  }
  playAnimations2() {
    gsap.fromTo('.texto-sobre-mim', { x: -100, opacity: 0 }, { x: 10, opacity: 1, duration: 1 });
    gsap.to('.img-sobre', { x: -20, opacity: 1, duration: 0.3, delay: 0.5, repeat: 3, yoyo: true, startAt: {x: 25} });
    gsap.to('.img-fechamento', { x: 10, opacity: 1, duration: 0.3, delay: 0.5, repeat: 3, yoyo: true, startAt: {x: -50} });
    gsap.fromTo('.texto-fechamento', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.5 });
  }
  digitarTexto() {
    let index = 0;
    const intervalo = setInterval(() => {
      this.textoDigitado += this.textos[this.textoIndex][index];
      index++;
      if (index === this.textos[this.textoIndex].length) {
        clearInterval(intervalo);
        setTimeout(() => {
          this.apagarTexto();
        }, 1000);
      }
    }, 60);
  }

  apagarTexto() {
    let index = this.textos[this.textoIndex].length - 1;
    const intervalo = setInterval(() => {
      this.textoDigitado = this.textoDigitado.slice(0, index);
      index--;
      if (index < 0) {
        clearInterval(intervalo);
        this.textoIndex = (this.textoIndex + 1) % this.textos.length;
        setTimeout(() => {
          this.digitarTexto();
        }, 1000);
      }
    }, 40);
  }
}
