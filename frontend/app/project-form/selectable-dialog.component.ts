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

    public deleteItem(idx: number): void {
        this.list.splice(idx, 1);
        console.log(this.list);
    }
}

