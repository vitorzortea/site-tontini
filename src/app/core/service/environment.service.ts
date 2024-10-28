import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

type keysEnvironment = keyof typeof environment;
    
    
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  environment = new Subject<typeof environment>();

  constructor() {}

  setEnviroment(){ this.environment.next(environment) }
}
