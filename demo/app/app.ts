import * as app from 'tns-core-modules/application';
import { RadarIO } from 'nativescript-radar-io';
import { isIOS } from 'tns-core-modules/platform';
app.on(app.launchEvent, async (args) => {
    RadarIO.initialize("prj_test_pk_b38b9b97c5ea101516d494c9c688afb32db27ba2");
    RadarIO.setUserId('triniwiz');
    RadarIO.setDescription('TNS Demo ' + (isIOS ? 'iOS': 'Android') );
    RadarIO.setMetadata({
        name: 'Osei Fortune'
    });
});

app.run({moduleName: 'app-root'});
