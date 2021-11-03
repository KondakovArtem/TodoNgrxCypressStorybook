import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Вспомогательная директива для storybook, которая позволяет задать изначальное состояние хранилища store
 * перед отображением stories
 */

@Directive({
  selector: "[routerInit]",
})
export class RouterInitDirective implements OnChanges {
  constructor(private router: Router) {}

  @Input() routerInit: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.routerInit && changes.routerInit.currentValue) {
      this.router.navigateByUrl(changes.routerInit.currentValue);
    }
  }
}
