import { RadarIO } from '.';
import { fromObject, Observable } from 'tns-core-modules/data/observable';

@JavaProxy('com.github.triniwiz.radario.Receiver')
export class Receiver extends io.radar.sdk.RadarReceiver {
    onClientLocationUpdated(param0: android.content.Context, param1: android.location.Location, param2: boolean): void {
    }


    onEventsReceived(param0: android.content.Context, events: any, user: any): void {
        if (!(RadarIO as any).events) return;
        ((RadarIO as any).events as Observable).notify({
            eventName: 'events',
            object: fromObject({
                events: (RadarIO as any).getEvents(events),
                user: (RadarIO as any).getUser(user)
            })
        });
    }


    onLocationUpdated(param0: android.content.Context, location: android.location.Location, user: io.radar.sdk.model.RadarUser): void {
        if (!(RadarIO as any).events) return;
        ((RadarIO as any).events as Observable).notify({
            eventName: 'location',
            object: fromObject({
                location: (RadarIO as any).getLocation(location),
                user: (RadarIO as any).getUser(user)
            })
        });
    }


    onError(param0: android.content.Context, status: io.radar.sdk.Radar.RadarStatus): void {
        if (!(RadarIO as any).events) return;
        ((RadarIO as any).events as Observable).notify({
            eventName: 'error',
            object: fromObject({
                error: (RadarIO as any).getStatus(status)
            })
        });
    }
}
