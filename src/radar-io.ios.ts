import {
    RadarIOChain,
    RadarIOEvent,
    RadarIOEventConfidence,
    RadarIOEventType,
    RadarIOEventVerification,
    RadarIOGeofence,
    RadarIOInsights,
    RadarIOInsightsConfidence,
    RadarIOInsightsLocation,
    RadarIOLocation,
    RadarIOPermissionStatus,
    RadarIOPlace,
    RadarIORegion,
    RadarIOResult,
    RadarIOTrackingOptions,
    RadarIOUser
} from './radar-io.common';
import * as types from 'tns-core-modules/utils/types';
import { fromObject, Observable } from 'tns-core-modules/data/observable';

export {
    RadarIOResult,
    RadarIOUser,
    RadarIOEvent,
    RadarIOLocation,
    RadarIOPlace,
    RadarIOEventConfidence,
    RadarIOEventType,
    RadarIOChain,
    RadarIOEventVerification,
    RadarIOGeofence,
    RadarIOInsights,
    RadarIOInsightsConfidence,
    RadarIOInsightsLocation,
    RadarIOPermissionStatus,
    RadarIORegion,
    RadarIOTrackingOptions
};

const managers = {};
const managerDelegates = {};

export class RadarIO {
    static events = new Observable();
    private static delegate: RadarDelegateImpl;

    public static isTracking(): boolean {
        return Radar.isTracking();
    }

    public static initialize(publishableKey: string): void {
        Radar.initializeWithPublishableKey(publishableKey);
         if (!RadarIO.delegate) {
             RadarIO.delegate = RadarDelegateImpl.new() as any;
         }
         Radar.setDelegate(RadarIO.delegate);
    }

    public static setUserId(id: string) {
        Radar.setUserId(id);
    }

    public static setMetadata(meta: any) {
        if (types.isNullOrUndefined(meta)) {
            return;
        }
        if (types.isObject(meta)) {
            Radar.setMetadata(NSDictionary.dictionaryWithDictionary(meta));
        }
    }

    public static setDescription(description: string) {
        Radar.setDescription(description);
    }

    public static setPlacesProvider(provider: string) {
        if (provider === 'facebook') {
            Radar.setPlacesProvider(RadarPlacesProvider.Facebook);
        } else {
            Radar.setPlacesProvider(RadarPlacesProvider.None);
        }
    }

    public static async getPermissionsStatus(): Promise<RadarIOPermissionStatus> {
        switch (CLLocationManager.authorizationStatus()) {
            case CLAuthorizationStatus.kCLAuthorizationStatusAuthorized:
            case CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedWhenInUse:
            case CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedAlways:
                return Promise.resolve(RadarIOPermissionStatus.GRANTED);
            case CLAuthorizationStatus.kCLAuthorizationStatusDenied:
            case CLAuthorizationStatus.kCLAuthorizationStatusRestricted:
                return Promise.resolve(RadarIOPermissionStatus.DENIED);
            default:
                return Promise.resolve(RadarIOPermissionStatus.UNKNOWN);
        }
    }

    public static requestPermissions(background: boolean) {
        return new Promise((resolve, reject) => {
            const manager = CLLocationManager.new();
            const delegate = CLLocationManagerDelegateImpl.initWithResolveReject(
                resolve,
                reject
            );
            managers[delegate.id] = manager;
            managerDelegates[delegate.id] = delegate;
            manager.delegate = delegate;
            if (background) {
                manager.requestAlwaysAuthorization();
            } else {
                manager.requestWhenInUseAuthorization();
            }
        });
    }

    static getStatus(status: any): string {
        switch (status) {
            case RadarStatus.Success:
                return 'SUCCESS';
            case RadarStatus.ErrorNetwork:
                return 'ERROR_NETWORK';
            case RadarStatus.ErrorPermissions:
                return 'ERROR_PERMISSIONS';
            case RadarStatus.ErrorPublishableKey:
                return 'ERROR_PUBLISHABLE_KEY';
            case RadarStatus.ErrorRateLimit:
                return 'ERROR_RATE_LIMIT';
            case RadarStatus.ErrorServer:
                return 'ERROR_SERVER';
            case RadarStatus.ErrorUnauthorized:
                return 'ERROR_UNAUTHORIZED';
            case RadarStatus.ErrorLocation:
                return 'ERROR_LOCATION';
            default:
                return 'ERROR_UNKNOWN'
        }
    }

    static getType(type: RadarEventType): RadarIOEventType {
        switch (type) {
            case RadarEventType.UserEnteredGeofence:
                return 'user.entered_geofence';
            case RadarEventType.UserExitedGeofence:
                return 'user.exited_geofence';
            case RadarEventType.UserEnteredHome:
                return 'user.entered_home';
            case RadarEventType.UserExitedHome:
                return 'user.exited_home';
            case RadarEventType.UserEnteredOffice:
                return 'user.entered_office';
            case RadarEventType.UserExitedOffice:
                return 'user.exited_office';
            case RadarEventType.UserStartedTraveling:
                return 'user.started_traveling';
            case RadarEventType.UserStoppedTraveling:
                return 'user.stopped_traveling';
            case RadarEventType.UserEnteredPlace:
                return 'user.entered_place';
            case RadarEventType.UserExitedPlace:
                return 'user.exited_place';
            case RadarEventType.UserNearbyPlaceChain:
                return 'user.nearby_place_chain';
            case RadarEventType.UserEnteredRegionCountry:
                return 'user.entered_region_country';
            case RadarEventType.UserExitedRegionCountry:
                return 'user.exited_region_country';
            case RadarEventType.UserEnteredRegionState:
                return 'user.entered_region_state';
            case RadarEventType.UserExitedRegionState:
                return 'user.exited_region_state';
            case RadarEventType.UserEnteredRegionDMA:
                return 'user.entered_region_dma';
            case RadarEventType.UserExitedRegionDMA:
                return 'user.exited_region_dma';
            default:
                return null;
        }
    }

    static getConfidence(confidence: RadarEventConfidence): RadarIOEventConfidence {
        switch (confidence) {
            case RadarEventConfidence.High:
                return RadarIOEventConfidence.high;
            case RadarEventConfidence.Medium:
                return RadarIOEventConfidence.medium;
            case RadarEventConfidence.Low:
                return RadarIOEventConfidence.low;
            default:
                return RadarIOEventConfidence.none;
        }
    }

    static getLocation(location: CLLocation): RadarIOLocation {
        if (location) {
            return {
                latitude: location.coordinate.latitude,
                longitude: location.coordinate.longitude,
                accuracy: location.horizontalAccuracy
            }
        }
        return undefined;
    }

    static getEvents(events: NSArray<RadarEvent>): RadarIOEvent[] {
        if (events) {
            const count = events.count;
            const _events: RadarIOEvent[] = [];
            for (let a = 0; a < count; a++) {
                const _event = events.objectAtIndex(a);
                const event: RadarIOEvent = {
                    _id: _event._id,
                    type: RadarIO.getType(_event.type),
                    live: _event.live,
                    confidence: RadarIO.getConfidence(_event.confidence)
                };
                const _alternativePlaces = _event.alternatePlaces;
                let alternativePlaces: RadarIOPlace[];
                if (_alternativePlaces) {
                    alternativePlaces = [];
                    const alternativePlacesCount = _alternativePlaces.count;
                    for (let b = 0; b < alternativePlacesCount; b++) {
                        const alternativePlace = _alternativePlaces.objectAtIndex(b);
                        alternativePlaces.push({
                            _id: alternativePlace._id,
                            name: alternativePlace.name,
                            categories: alternativePlace.categories as any
                        })
                    }
                    event.alternatePlaces = alternativePlaces;
                }

                const place = _event.place;
                if (place) {
                    event.place = {
                        _id: place._id,
                        name: place.name,
                        categories: place.categories as any
                    }
                }

                const geofence = _event.geofence;
                if (geofence) {
                    event.geofence = {
                        _id: geofence._id,
                        description: geofence._description,
                        externalId: geofence.externalId,
                        tag: geofence.tag
                    }
                }

                const region = _event.region;
                if (region) {
                    event.region = {
                        _id: region._id,
                        type: region.type,
                        name: region.name,
                        code: region.code
                    }
                }

            }
            return _events;
        }
        return undefined;
    }

    static getUser(user: RadarUser): RadarIOUser {
        if (user) {
            const _user: RadarIOUser = {
                _id: user._id,
                userId: user.userId,
                description: user._description,
                deviceId: user.deviceId
            };

            const country = user.country;
            if (country) {
                _user.country = {
                    _id: country._id,
                    code: country.code,
                    name: country.name,
                    type: country.type
                }
            }
            const dma = user.dma;

            if (dma) {
                _user.dma = {
                    _id: dma._id,
                    code: dma.code,
                    name: dma.name,
                    type: dma.type
                }
            }

            const state = user.state;
            if (state) {
                _user.state = {
                    _id: state._id,
                    code: state.code,
                    name: state.name,
                    type: state.type
                }
            }
            return _user;
        }
        return undefined;
    }

    public static trackOnce(): Promise<RadarIOResult> {
        return new Promise((resolve, reject) => {
            Radar.trackOnceWithCompletionHandler(
                (
                    status: RadarStatus,
                    location: CLLocation,
                    events: NSArray<RadarEvent>,
                    user: RadarUser
                ) => {
                    if (status === RadarStatus.Success) {
                        resolve({
                            status: RadarIO.getStatus(status),
                            user: RadarIO.getUser(user),
                            location: RadarIO.getLocation(location),
                            events: RadarIO.getEvents(events)
                        });
                    } else {
                        reject({
                            status: RadarIO.getStatus(status)
                        });
                    }
                }
            );
        })
    }

    public static stopTracking() {
        Radar.stopTracking();
    }

    public static startTracking(options?: RadarIOTrackingOptions) {
        if (options) {
            const opts = RadarTrackingOptions.new();
            if (options.sync) {
                if (options.sync === 'all') {
                    opts.sync = RadarTrackingSync.All;
                }

                if (options.sync === 'possibleStateChanges') {
                    opts.sync = RadarTrackingSync.PossibleStateChanges;
                }
            }

            if (options.offline) {
                if (options.offline === 'replayOff') {
                    opts.offline = RadarTrackingOffline.ReplayOff;
                }

                if (options.offline === 'replayStopped') {
                    opts.offline = RadarTrackingOffline.ReplayStopped;
                }
            }
            Radar.startTrackingWithOptions(opts);
        } else {
            Radar.startTracking();
        }
    }

    public static on(event: string, callback: (event) => void) {
        RadarIO.events.on(event, callback);
    }

    public static off(event: string, callback?: (event) => void) {
        RadarIO.events.off(event, callback);
    }

    public static updateLocation(location: RadarIOLocation): Promise<RadarIOResult> {
        return new Promise((resolve, reject) => {
            const nativeLocation = CLLocation.alloc().initWithCoordinateAltitudeHorizontalAccuracyVerticalAccuracyTimestamp(
                CLLocationCoordinate2DMake(location.latitude, location.longitude), -1, location.accuracy, -1, new Date()
            );
            Radar.updateLocationWithCompletionHandler(nativeLocation, (status: RadarStatus, location: CLLocation, events: NSArray<RadarEvent>, user: RadarUser) => {
                if (status === RadarStatus.Success) {
                    resolve({
                        status: RadarIO.getStatus(status),
                        location: RadarIO.getLocation(location),
                        events: RadarIO.getEvents(events),
                        user: RadarIO.getUser(user)
                    })
                } else {
                    reject({
                        status: RadarIO.getStatus(status)
                    });
                }
            });
        });
    }

    public static acceptEvent(eventId: string, verifiedPlaceId?: string) {
        if (verifiedPlaceId) {
            Radar.acceptEventIdWithVerifiedPlaceId(eventId, verifiedPlaceId)
        } else {
            Radar.acceptEventIdWithVerifiedPlaceId(eventId, null);
        }
    }

    public static rejectEvent(eventId: string) {
        Radar.rejectEventId(eventId);
    }
}

@ObjCClass(CLLocationManagerDelegate)
class CLLocationManagerDelegateImpl extends NSObject
    implements CLLocationManagerDelegate {
    _resolve: any;
    _reject: any;
    id: string;

    public static initWithResolveReject(
        resolve,
        reject
    ): CLLocationManagerDelegateImpl {
        const delegate = CLLocationManagerDelegateImpl.new() as CLLocationManagerDelegateImpl;
        delegate._resolve = resolve;
        delegate._reject = reject;
        delegate.id = NSUUID.UUID().UUIDString;
        return delegate;
    }

    locationManagerDidChangeAuthorizationStatus(
        manager: CLLocationManager,
        status: CLAuthorizationStatus
    ) {
        const cleanUp = () => {
            const id = (manager as any).delegate.id;
            managers[id].delegate = null;
            delete managers[id];
            delete managerDelegates[id];
        };
        switch (status) {
            case CLAuthorizationStatus.kCLAuthorizationStatusAuthorized:
            case CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedWhenInUse:
            case CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedAlways:
                this._resolve(RadarIOPermissionStatus.GRANTED);
                cleanUp();
                break;
            case CLAuthorizationStatus.kCLAuthorizationStatusDenied:
            case CLAuthorizationStatus.kCLAuthorizationStatusRestricted:
                this._resolve(RadarIOPermissionStatus.DENIED);
                cleanUp();
                break;
            case CLAuthorizationStatus.kCLAuthorizationStatusNotDetermined:
                this._resolve(RadarIOPermissionStatus.UNKNOWN);
                break;
        }
    }
}

@ObjCClass(RadarDelegate)
class RadarDelegateImpl extends NSObject implements RadarDelegate {

    didFailWithStatus(status: RadarStatus): void {
        RadarIO.events.notify({
            eventName: 'error',
            object: fromObject({
                error: RadarIO.getStatus(status)
            })
        })
    }

    didReceiveEventsUser(
        events: NSArray<RadarEvent>,
        user: RadarUser
    ): void {
        RadarIO.events.notify({
            eventName: 'events',
            object: fromObject({
                events: RadarIO.getEvents(events),
                user: RadarIO.getUser(user)
            })
        })
    }

    didUpdateClientLocationStopped(
        location: CLLocation,
        stopped: boolean
    ): void {

    }

    didUpdateLocationUser(location: CLLocation, user: RadarUser): void {
        RadarIO.events.notify({
            eventName: 'location',
            object: fromObject({
                location: RadarIO.getLocation(location),
                user: RadarIO.getUser(user)
            })
        })
    }
}
