import { Component, OnInit, Input, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Project } from '../project.service';
import { MatDialog, MatButton } from '@angular/material';
import { SelectableDialogComponent } from './selectable-dialog.component';
import { OptionsService } from '../options.service';
import { environment } from 'frontend/environments/environment';
import { } from 'googlemaps';
import { StateService } from '../state.service';

export interface DialogData {
  dialaogTitle: string;
  selectableKey: string;
  selectables: Map<string, string[]>;
}

const REG_URL = '^(http|https):\/\/(.*)';
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  selectables = new Map<string, string[]>();

  @ViewChild('search') searchElement: ElementRef;
  @Input() initData: Project;
  @Input() adminMode: boolean;
  _editMode: boolean;
  form: FormGroup;
  states: Array<string>;

  latMap = -39;
  lngMap = -64.63;
  zoomMap = 3;
  googleMapApiKey = environment.GOOGLE_MAP_API_KEY;
  minDate: Date = new Date(new Date().getFullYear() - 1, 0, 1);

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private fb: FormBuilder,
    private dialog: MatDialog, private service: OptionsService, private stateService: StateService) {

    this.form = this.fb.group({
      'title': this.fb.control('', [Validators.required]),
      'subject': this.fb.control('', [Validators.required]),
      'purpose': this.fb.control('', [Validators.required]),
      'target_population': this.fb.control(''),
      'university': this.fb.control('', [Validators.required]),
      'link': this.fb.control('', [Validators.pattern(REG_URL)]),
      'from_date': this.fb.control(''),
      'to_date': this.fb.control(''),
      'ref_name': this.fb.control(''),
      'ref_title': this.fb.control(''),
      'ref_phone': this.fb.control(''),
      'ref_mail': this.fb.control('', [Validators.email]),
      'place': this.fb.control(''),
      'state': this.fb.control(''),
      'location': this.fb.group({
        'type': this.fb.control('Point'),
        'coordinates': this.fb.array([null, null], Validators.required)
      })
    });
  }

  get editMode(): boolean {
    return this._editMode;
  }

  @Input()
  set editMode(edit: boolean) {
    this._editMode = edit;
    if (this._editMode) {
      this.form.enable();
      this.initPlaceSearcher();
    } else {
      this.form.disable();
    }
  }

  ngOnInit() {
    this.states = this.stateService.getArgStates();
    this.initSelectables();
    if (!this.initData) {
      this.initData = {} as Project;
    } else {
      this.updateFormData(this.initData);
      this.centerMap(this.initData.location.coordinates[0], this.initData.location.coordinates[1]);
    }
  }

  private initSelectables(): void {
    this.service.getAll().subscribe(res => {
      Object.keys(res.map).forEach(key => {
        this.selectables.set(key, res.map[key]);
      });
    });
  }

  private initPlaceSearcher(): void {

    // Search only in Argentina
    const sw = new google.maps.LatLng(-55.847774, -82.645068);
    const ne = new google.maps.LatLng(-21.836707, -49.234343);
    const bounds = new google.maps.LatLngBounds(sw, ne);

    this.mapsAPILoader.load().then(
      () => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { bounds: bounds, strictBounds: true });

        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.selectState(place);
            this.markPlace(place);
            this.centerMap(place.geometry.location.lat(), place.geometry.location.lng());
          });
        });
      }
    );
  }

  public getFormData(): Project {
    return this.form.value as Project;
  }

  public isValid(): boolean {
    this.markFormGroupTouched(this.form);
    return this.form.valid;
  }

  private markPlace(place: google.maps.places.PlaceResult): void {
    this.updateMarker(place.geometry.location.lat(), place.geometry.location.lng());
  }

  private centerMap(lat: number, lng: number): void {
    this.latMap = lat;
    this.lngMap = lng;
    this.zoomMap = 14;
  }

  private selectState(place: google.maps.places.PlaceResult): void {
    const addrComp = place.address_components.find(ac => ac.types.includes('administrative_area_level_1'));
    this.getFormData().state = addrComp.short_name;
  }

  private updateFormData(updatedProject: Project): void {
    this.form.patchValue(updatedProject);
  }

  public mapClicked(eventData: any): void {
    this.updateMarker(eventData.coords.lat, eventData.coords.lng);
    this.searchElement.nativeElement.value = '';
  }

  public editSelectable(dialaogTitle: MatButton, selectableKey: string): void {
    // I don't like this
    const mattooltip = dialaogTitle._elementRef.nativeElement.attributes['mattooltip'].value;
    this.dialog.open(SelectableDialogComponent, {
      width: '350px',
      data: { dialaogTitle: mattooltip, selectableKey: selectableKey, selectables: this.selectables }
    });
  }

  private updateMarker(lat: number, lng: number): void {
    const proj = this.getFormData();
    proj.location.coordinates[0] = lat;
    proj.location.coordinates[1] = lng;
    this.updateFormData(proj);
  }

  private markFormGroupTouched(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];

      if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
        this.markFormGroupTouched(abstractControl);
      } else {
        abstractControl.markAsTouched();
      }
    });
  }
}
