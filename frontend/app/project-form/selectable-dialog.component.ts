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
        this.dsList._updateChangeSubscription();
    }

    public deleteItem(idx: number): void {
        const ok = confirm('¿Seguro que desea borrar el item?');
        if (ok) {
            const ind = idx + (this.pag.pageIndex * this.pag.pageSize);
            this.dsList.data.splice(ind, 1);
            this.solvePaginatorIdx(idx);
            this.dsList._updateChangeSubscription();
        }
    }

    private solvePaginatorIdx(idx: number): void {
        if (idx === 0 && !this.pag.hasNextPage() && (this.pag.length - 1) / this.pag.pageSize === 1) {
            this.pag.previousPage();
        }
    }

    public save(): void {
        this.service.save(this.data.selectableKey, this.dsList.data).subscribe(() => {
            this.data.selectables.set(this.data.selectableKey, this.dsList.data);
        }, (err) => {
            console.log(err);
        });
    }
}
