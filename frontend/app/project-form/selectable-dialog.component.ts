import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { DialogData } from './project-form.component';
import { OptionsService } from '../options.service';

@Component({
    selector: 'app-selectable-dialog',
    templateUrl: 'selectable-dialog.component.html',
    styleUrls: ['./selectable-dialog.component.css']
})
export class SelectableDialogComponent implements AfterViewInit {
    dsList: MatTableDataSource<string>;
    @ViewChild(MatTable) table: MatTable<string>;
    @ViewChild(MatPaginator) pag: MatPaginator;

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private service: OptionsService) {
        const origArray = this.data.selectables.get(this.data.selectableKey);
        const list = Object.assign([], origArray);
        this.dsList = new MatTableDataSource(list);
    }

    ngAfterViewInit() {
        this.dsList.paginator = this.pag;
    }

    public addItem(item: string): void {
        this.dsList.data.push(item);
        this.table.renderRows();
        this.dsList.paginator = this.pag;
    }

    public deleteItem(idx: number, n: number): void {
        console.log(n);
        const ok = confirm('¿Seguro que desea borrar el item?');
        if (ok) {
            this.dsList.data.splice(idx, 1);
            this.dsList.paginator.pageIndex = 0;
            this.dsList._updateChangeSubscription();

















            // this.table.renderRows();
        }
    }

    public save() {
        this.service.save(this.data.selectableKey, this.dsList.data).subscribe(() => {
            this.data.selectables.set(this.data.selectableKey, this.dsList.data);
        }, (err) => {
            console.log(err);
        });
    }
}
