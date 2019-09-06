import { NavigatedData, Page } from 'tns-core-modules/ui/page';

import { HomeViewModel } from './home-view-model';
import { RadarIO } from 'nativescript-radar-io';
import { error } from 'tns-core-modules/trace';

export async function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new HomeViewModel();
    await RadarIO.requestPermissions(true);
    RadarIO.startTracking({
        offline: 'replayOff',
        sync: 'all',
        priority: 'responsiveness'
    });
    if (!RadarIO.isTracking()) {

    }
    RadarIO.on('location', (event) => {
        console.log('location');
        console.dir({
            location: event.object.get('location'),
            user: event.object.get('user')
        });
    });
    RadarIO.on('error', error => {
        console.log('error');
        console.dir({
            error: error.object.get('error')
        });
    });
    RadarIO.on('events', events => {
        console.log('events');
        console.dir({
            events: events.object.get('events'),
            user: events.object.get('user')
        })
    });
    RadarIO.trackOnce().then(result => {
        console.log('trackonce');
        console.dir(result);
    });
    /* getCurrentLocation({timeout: 10000}).then(location => {
         return RadarIO.updateLocation({
             accuracy: location.horizontalAccuracy,
             longitude: location.longitude,
             latitude: location.latitude
         })
     }).then(result => {
         console.log('updateLocation');
         console.dir(result);
     })*/
}
