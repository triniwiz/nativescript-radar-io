
declare class Radar extends NSObject {

	static acceptEventIdWithVerifiedPlaceId(eventId: string, verifiedPlaceId: string): void;

	static alloc(): Radar; // inherited from NSObject

	static initializeWithPublishableKey(publishableKey: string): void;

	static isTracking(): boolean;

	static new(): Radar; // inherited from NSObject

	static performFetchWithCompletionHandler(completionHandler: (p1: UIBackgroundFetchResult) => void): void;

	static rejectEventId(eventId: string): void;

	static setDelegate(delegate: RadarDelegate): void;

	static setDescription(description: string): void;

	static setMetadata(metadata: NSDictionary<any, any>): void;

	static setPlacesProvider(provider: RadarPlacesProvider): void;

	static setUserId(userId: string): void;

	static startTracking(): void;

	static startTrackingWithOptions(trackingOptions: RadarTrackingOptions): void;

	static stopTracking(): void;

	static trackOnceWithCompletionHandler(completionHandler: (p1: RadarStatus, p2: CLLocation, p3: NSArray<RadarEvent>, p4: RadarUser) => void): void;

	static updateLocationWithCompletionHandler(location: CLLocation, completionHandler: (p1: RadarStatus, p2: CLLocation, p3: NSArray<RadarEvent>, p4: RadarUser) => void): void;
}

declare class RadarChain extends NSObject {

	static alloc(): RadarChain; // inherited from NSObject

	static new(): RadarChain; // inherited from NSObject

	readonly externalId: string;

	readonly metadata: NSDictionary<any, any>;

	readonly name: string;

	readonly slug: string;
}

declare class RadarCircleGeometry extends RadarGeofenceGeometry {

	static alloc(): RadarCircleGeometry; // inherited from NSObject

	static new(): RadarCircleGeometry; // inherited from NSObject

	readonly center: RadarCoordinate;

	readonly radius: number;
}

declare class RadarCoordinate extends NSObject {

	static alloc(): RadarCoordinate; // inherited from NSObject

	static new(): RadarCoordinate; // inherited from NSObject

	readonly coordinate: CLLocationCoordinate2D;
}

interface RadarDelegate extends NSObjectProtocol {

	didFailWithStatus?(status: RadarStatus): void;

	didReceiveEventsUser(events: NSArray<RadarEvent> | RadarEvent[], user: RadarUser): void;

	didUpdateClientLocationStopped?(location: CLLocation, stopped: boolean): void;

	didUpdateLocationUser?(location: CLLocation, user: RadarUser): void;
}
declare var RadarDelegate: {

	prototype: RadarDelegate;
};

declare class RadarEvent extends NSObject {

	static alloc(): RadarEvent; // inherited from NSObject

	static new(): RadarEvent; // inherited from NSObject

	readonly _id: string;

	readonly actualCreatedAt: Date;

	readonly alternatePlaces: NSArray<RadarPlace>;

	readonly confidence: RadarEventConfidence;

	readonly createdAt: Date;

	readonly duration: number;

	readonly geofence: RadarGeofence;

	readonly live: boolean;

	readonly location: CLLocation;

	readonly place: RadarPlace;

	readonly region: RadarRegion;

	readonly type: RadarEventType;

	readonly verification: RadarEventVerification;

	readonly verifiedPlace: RadarPlace;
}

declare const enum RadarEventConfidence {

	None = 0,

	Low = 1,

	Medium = 2,

	High = 3
}

declare const enum RadarEventType {

	Unknown = 0,

	UserEnteredGeofence = 1,

	UserExitedGeofence = 2,

	UserEnteredHome = 3,

	UserExitedHome = 4,

	UserEnteredOffice = 5,

	UserExitedOffice = 6,

	UserStartedTraveling = 7,

	UserStoppedTraveling = 8,

	UserEnteredPlace = 9,

	UserExitedPlace = 10,

	UserNearbyPlaceChain = 11,

	UserEnteredRegionCountry = 12,

	UserExitedRegionCountry = 13,

	UserEnteredRegionState = 14,

	UserExitedRegionState = 15,

	UserEnteredRegionDMA = 16,

	UserExitedRegionDMA = 17
}

declare const enum RadarEventVerification {

	Accept = 1,

	Unverify = 0,

	Reject = -1
}

declare class RadarGeofence extends NSObject {

	static alloc(): RadarGeofence; // inherited from NSObject

	static new(): RadarGeofence; // inherited from NSObject

	readonly _description: string;

	readonly _id: string;

	readonly externalId: string;

	readonly geometry: RadarGeofenceGeometry;

	readonly metadata: NSDictionary<any, any>;

	readonly tag: string;
}

declare class RadarGeofenceGeometry extends NSObject {

	static alloc(): RadarGeofenceGeometry; // inherited from NSObject

	static new(): RadarGeofenceGeometry; // inherited from NSObject
}

declare class RadarPlace extends NSObject {

	static alloc(): RadarPlace; // inherited from NSObject

	static new(): RadarPlace; // inherited from NSObject

	readonly _id: string;

	readonly categories: NSArray<string>;

	readonly chain: RadarChain;

	readonly facebookId: string;

	readonly facebookPlaceId: string;

	readonly group: string;

	readonly location: RadarCoordinate;

	readonly metadata: NSDictionary<any, any>;

	readonly name: string;

	hasCategory(category: string): boolean;

	isChain(slug: string): boolean;
}

declare const enum RadarPlacesProvider {

	None = 0,

	Facebook = 1
}

declare class RadarPolygonGeometry extends RadarGeofenceGeometry {

	static alloc(): RadarPolygonGeometry; // inherited from NSObject

	static new(): RadarPolygonGeometry; // inherited from NSObject

	readonly coordinates: NSArray<RadarCoordinate>;
}

declare class RadarRegion extends NSObject {

	static alloc(): RadarRegion; // inherited from NSObject

	static new(): RadarRegion; // inherited from NSObject

	readonly _id: string;

	readonly code: string;

	readonly name: string;

	readonly type: string;
}

declare const enum RadarStatus {

	Success = 0,

	ErrorPublishableKey = 1,

	ErrorPermissions = 2,

	ErrorLocation = 3,

	ErrorNetwork = 4,

	ErrorUnauthorized = 5,

	ErrorRateLimit = 6,

	ErrorServer = 7,

	ErrorUnknown = 8
}

declare const enum RadarTrackingOffline {

	ReplayOff = -1,

	ReplayStopped = 1
}

declare class RadarTrackingOptions extends NSObject {

	static alloc(): RadarTrackingOptions; // inherited from NSObject

	static makeWithBlock(updateBlock: (p1: RadarTrackingOptions) => void): RadarTrackingOptions;

	static new(): RadarTrackingOptions; // inherited from NSObject

	offline: RadarTrackingOffline;

	sync: RadarTrackingSync;
}

declare const enum RadarTrackingSync {

	All = -1,

	PossibleStateChanges = 1
}

declare class RadarUser extends NSObject {

	static alloc(): RadarUser; // inherited from NSObject

	static new(): RadarUser; // inherited from NSObject

	readonly _description: string;

	readonly _id: string;

	readonly country: RadarRegion;

	readonly deviceId: string;

	readonly dma: RadarRegion;

	readonly foreground: boolean;

	readonly geofences: NSArray<RadarGeofence>;

	readonly insights: RadarUserInsights;

	readonly location: CLLocation;

	readonly metadata: NSDictionary<any, any>;

	readonly nearbyPlaceChains: NSArray<RadarChain>;

	readonly place: RadarPlace;

	readonly postalCode: RadarRegion;

	readonly state: RadarRegion;

	readonly stopped: boolean;

	readonly userId: string;
}

declare class RadarUserInsights extends NSObject {

	static alloc(): RadarUserInsights; // inherited from NSObject

	static new(): RadarUserInsights; // inherited from NSObject

	readonly homeLocation: RadarUserInsightsLocation;

	readonly officeLocation: RadarUserInsightsLocation;

	readonly state: RadarUserInsightsState;
}

declare class RadarUserInsightsLocation extends NSObject {

	static alloc(): RadarUserInsightsLocation; // inherited from NSObject

	static new(): RadarUserInsightsLocation; // inherited from NSObject

	readonly confidence: RadarUserInsightsLocationConfidence;

	readonly country: RadarRegion;

	readonly dma: RadarRegion;

	readonly location: CLLocation;

	readonly postalCode: RadarRegion;

	readonly state: RadarRegion;

	readonly type: RadarUserInsightsLocationType;

	readonly updatedAt: Date;
}

declare const enum RadarUserInsightsLocationConfidence {

	None = 0,

	Low = 1,

	Medium = 2,

	High = 3
}

declare const enum RadarUserInsightsLocationType {

	Unknown = 0,

	Home = 1,

	Office = 2
}

declare class RadarUserInsightsState extends NSObject {

	static alloc(): RadarUserInsightsState; // inherited from NSObject

	static new(): RadarUserInsightsState; // inherited from NSObject

	readonly home: boolean;

	readonly office: boolean;

	readonly traveling: boolean;
}
