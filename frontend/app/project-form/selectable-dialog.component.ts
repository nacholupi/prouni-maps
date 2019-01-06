import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from './project-form.component';

@Component({
    selector: 'app-selectable-dialog',
    templateUrl: 'selectable-dialog.component.html',
})
export class SelectableDialogComponent {

    list: string[];

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
        const origArray = this.data.selectables.get(this.data.selectableKey);
        this.list = Object.assign([], origArray);
    }

    public addItem(item: string): void {
        this.list.push(item);
        console.log(this.list);
    }

    public deleteItem(idx: number): void {
        const ok = confirm('¿Seguro que desea borrar el item?');
        if (ok) {
            this.list.splice(idx, 1);
            console.log(this.list);
        }
    }
}
