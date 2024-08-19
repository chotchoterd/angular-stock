import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiURL = environment.dotnet_api_url;
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  token = this.cookieService.get('LoggedInToken') || '';
}
