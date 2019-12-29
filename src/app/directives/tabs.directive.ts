import { Directive, Renderer2, ElementRef, Input } from '@angular/core';

import { Router } from "@angular/router";


@Directive({
  selector: '[appTabs]'
})
export class TabsDirective {

  constructor(private eleref: ElementRef, private rend2: Renderer2) { }

  @Input() set appSidebar(val: string) {
    if (val='') {
      debugger
      this.rend2.addClass(this.eleref.nativeElement, 'active');
    }
    else
      this.rend2.removeClass(this.eleref.nativeElement, 'active');
  }

}
