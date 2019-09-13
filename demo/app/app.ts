import * as app from 'tns-core-modules/application';
import { RadarIO } from 'nativescript-radar-io';
import { isIOS } from 'tns-core-modules/platform';

RadarIO.initialize('prj_test_pk_b38b9b97c5ea101516d494c9c688afb32db27ba2');
app.on(app.launchEvent, async (args) => {
    console.log('done');
    RadarIO.setUserId('triniwiz');
    RadarIO.setDescription('TNS Demo ' + (isIOS ? 'iOS' : 'Android'));
    RadarIO.setMetadata({
        name: 'Osei Fortune'
    });
    RadarIO.trackOnce().then(result => {
        console.log('trackonce');
        console.dir(result);
    });

});

app.run({moduleName: 'app-root'});
