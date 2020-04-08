// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { QueryParamsModel } from '../../_base/crud/models/query_models/query-params.model';
// Models

export enum BookActionTypes {
    AllOrgsRequested = '[Orgs Module] All Orgs Requested',
    AllOrgsLoaded = '[Orgs API] All Orgs Loaded',
    OrgOnServerCreated = '[Edit Organization Component] Organization On Server Created',
    OrgCreated = '[Edit Organization Dialog] Organization Created',
    OrgUpdated = '[Edit Organization Dialog] Organization Updated',
    OrgDeleted = '[Orgs List Page] Organization Deleted',
    OrgsPageRequested = '[Orgs List Page] Orgs Page Requested',
    OrgsPageLoaded = '[Orgs API] Orgs Page Loaded',
    OrgsListFiltered = '[Orgs] Filter Org list',
    OrgsPageCancelled = '[Orgs API] Orgs Page Cancelled',
    OrgsPageToggleLoading = '[Orgs] Orgs Page Toggle Loading',
    OrgsActionToggleLoading = '[Orgs] Orgs Action Toggle Loading'
}

export class OrgOnServerCreated implements Action {
    readonly type = BookActionTypes.OrgOnServerCreated;
    constructor(public payload: { organization: any }) { }
}

export class OrgCreated implements Action {
    readonly type = BookActionTypes.OrgCreated;
    constructor(public payload: { organization: any }) { }
}


export class OrgUpdated implements Action {
    readonly type = BookActionTypes.OrgUpdated;
    constructor(public payload: {
        partialOrg: Update<any>,
        organization: any
    }) { }
}

export class OrgDeleted implements Action {
    readonly type = BookActionTypes.OrgDeleted;
    constructor(public payload: { id: number }) { }
}

export class OrgsPageRequested implements Action {
    readonly type = BookActionTypes.OrgsPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class OrgsPageLoaded implements Action {
    readonly type = BookActionTypes.OrgsPageLoaded;
    constructor(public payload:
        {
            organizations: any[],
            totalCount: number,
            page: QueryParamsModel
        }) { }
}

export class OrgsListFiltered implements Action {
    readonly type = BookActionTypes.OrgsListFiltered;
    constructor(public payload:
        {
            organizations: any[],
            page: QueryParamsModel
        }) { }
}


export class OrgsPageCancelled implements Action {
    readonly type = BookActionTypes.OrgsPageCancelled;
}

export class OrgsPageToggleLoading implements Action {
    readonly type = BookActionTypes.OrgsPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class OrgsActionToggleLoading implements Action {
    readonly type = BookActionTypes.OrgsActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type OrgActions = OrgCreated
    | OrgUpdated
    | OrgDeleted
    | OrgOnServerCreated
    | OrgsPageLoaded
    | OrgsPageCancelled
    | OrgsPageToggleLoading
    | OrgsPageRequested
    | OrgsActionToggleLoading
    | OrgsListFiltered;
