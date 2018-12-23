/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  @ViewChild('search') searchElement: ElementRef;
  @Input() initData: any;
  _editMode: boolean;

  form: FormGroup;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private fb: FormBuilder) {
    this.form = this.fb.group({
      'title': this.fb.control('', [Validators.required]),
      'subject': this.fb.control('', [Validators.required]),
      'ref_name': this.fb.control(''),
      'ref_phone': this.fb.control(''),
      'ref_mail': this.fb.control('', [Validators.email]),
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
      this.initSearcher();
    } else {
      this.form.disable();
    }
  }

  ngOnInit() {
    if (!this.initData) {
      this.initData = {};
    }
    this.form.patchValue(this.initData);
  }

  initSearcher() {
    this.mapsAPILoader.load().then(
      () => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });

        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.form.get('location').get('coordinates').get('0').setValue(place.geometry.location.lat());
            this.form.get('location').get('coordinates').get('1').setValue(place.geometry.location.lng());
          });
        });
      }
    );
  }

  getFormData() {
    return this.form.value;
  }

  isValid(): boolean {
    this.markFormGroupTouched(this.form);
    return this.form.valid;
  }

  placeMarker(eventData) {
    this.form.get('location').get('coordinates').get('0').setValue(eventData.coords.lat);
    this.form.get('location').get('coordinates').get('1').setValue(eventData.coords.lng);
  }

  public markFormGroupTouched(group: FormGroup | FormArray): void {
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

