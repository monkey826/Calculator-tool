

import * as wjcCore from 'wijmo/wijmo';



import { Directive, forwardRef, Provider, ElementRef, Inject, Renderer} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const NUMBER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberInputAccessor),
    multi: true
};

@Directive({
    selector: 'input[number-input]',
    host: { '(input)': 'doOnChange($event.target)' },
    providers: [NUMBER_VALUE_ACCESSOR]
})
export class NumberInputAccessor implements ControlValueAccessor {
    onChange = (_) => { };
    onTouched = () => { };
    constructor( @Inject(ElementRef) public elRef: ElementRef, @Inject(Renderer) public renderer: Renderer) {

    }
    writeValue(value: any): void {
        if (value != null) {
            this.renderer.setElementProperty(this.elRef.nativeElement, 'value', value);
        }
    }

    doOnChange(elt) {
        var val = elt.value;
        var num = wjcCore.Globalize.parseInt(val, '');
        if (isNaN(num)) {
            num = 0;
        }
        elt.value = num;
        this.onChange(num);
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
