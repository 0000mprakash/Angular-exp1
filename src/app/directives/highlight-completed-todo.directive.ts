import { Directive, input ,effect, inject, ElementRef} from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]'
})
export class HighlightCompletedTodoDirective {
  iscompleted = input(false);
  el = inject(ElementRef);

  stylesEffect = effect(() => {
    if(this.iscompleted()){
      this.el.nativeElement.style.textDecoration='line-through'
      this.el.nativeElement.style.backgroundColor = 'lightgreen';
      this.el.nativeElement.style.color = 'darkgreen';
      
    }
    else{
      this.el.nativeElement.style.textDecoration = 'none';
      this.el.nativeElement.style.backgroundColor = 'lightcoral';
      this.el.nativeElement.style.color = 'darkred';
      
    }
  })

}
