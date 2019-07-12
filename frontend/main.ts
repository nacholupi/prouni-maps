import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

document.write('<script src="https://maps.googleapis.com/maps/api/js?libraries=places&' +
  'key=' + environment.GOOGLE_MAP_API_KEY + '" async defer></script>');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
