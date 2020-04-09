// Angular
import { Injectable } from '@angular/core';
// Angular in memory
import { InMemoryDbService } from 'angular-in-memory-web-api';
// RxJS
import { Observable } from 'rxjs';
import { AuthDataContext } from 'src/app/core/auth/server/auth.data-context';
// Auth

@Injectable()
export class FakeApiService implements InMemoryDbService {
	/**
	 * Service Constructore
	 */
  constructor() { }

	/**
	 * Create Fake DB and API
	 */
  createDb(): {} | Observable<{}> {
    // tslint:disable-next-line:class-name
    const db = {
      // auth module
      users: AuthDataContext.users,
      roles: AuthDataContext.roles,
      permissions: AuthDataContext.permissions
    };
    return db;
  }
}
