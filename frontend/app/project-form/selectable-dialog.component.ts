import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from './project-form.component';

@Component({
    selector: 'app-selectable-dialog',
    templateUrl: 'selectable-dialog.component.html',
})
export class SelectableDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
        console.log(this.data.dialaogTitle);
        console.log(this.data.selectableKey);
        console.log(this.data.selectables);
    }
}

