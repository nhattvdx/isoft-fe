import { NgModule } from '@angular/core';
import { AutofocusDirective } from './autofocus.directive';
import { IsTemplateDirective } from './is-template.directive';

@NgModule({
    declarations: [IsTemplateDirective, AutofocusDirective],
    providers: [IsTemplateDirective, AutofocusDirective],
    exports: [IsTemplateDirective, AutofocusDirective],
})
export class DirectivesModule {}
