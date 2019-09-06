<template>
  <Page>
    <ActionBar title="Welcome to NativeScript-Vue!"/>
    <GridLayout columns="*" rows="*, *, *, *, *, *">
      <Label class="message" :text="`isTracking: ${isTracking}`" col="0" row="0"/>
      <StackLayout col="0" row="1">
        <Label class="message" :text="`latitude: ${location.latitude}`" />
        <Label class="message" :text="`longitude: ${location.longitude}`" />
        <Label class="message" :text="`accuracy: ${location.accuracy}`" />
      </StackLayout>

      <Label v-for="(error, index) in errorLog" :key="index" class="message" :text="`error: ${error}`" col="0" row="2"/>
      <Label v-for="(event, index) in events" :key="index" class="message" :text="`event: ${event}`" col="0" row="3"/>
      <Label class="message" :text="`trackonce status: ${trackonce}`" col="0" row="4"/>
      <StackLayout col="0" row="5" v-if="computedLocation.location">
        <Label class="message" :text="`currentLocation latitude: ${computedLocation.location.latitude}`" />
        <Label class="message" :text="`currentLocation longitude: ${computedLocation.location.longitude}`" />
        <Label class="message" :text="`currentLocation accuracy: ${computedLocation.location.accuracy}`" /> 
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { RadarIO } from 'nativescript-radar-io';
  import * as geolocation from "nativescript-geolocation";
  import { Accuracy } from "tns-core-modules/ui/enums";

  export default {
    data() {
      return {
        isTracking: true,
        location: '',
        errorLog: '',
        events: '',
        trackonce: '',
        currentLocation: {}
      }
    },
    async created() {
      await RadarIO.requestPermissions(true);

      RadarIO.startTracking({
        offline: 'replayOff',
        sync: 'all',
        priority: 'responsiveness'
      });

      if (!RadarIO.isTracking()) {
        this.isTracking = false;
      } else {
        this.isTracking = true;
      }

      RadarIO.on('location', (event) => {
        console.log('location');
        console.dir({
          location: event.object.get('location'),
          user: event.object.get('user')
        });
        this.location = event.object.get('location');
      });

      RadarIO.on('error', error => {
        console.log('error');
        console.dir({
          error: error.object.get('error')
        });
        this.errorLog = error.object.get('error');
      });

      RadarIO.on('events', events => {
        console.log('events');
        console.dir({
          events: events.object.get('events'),
          user: events.object.get('user')
        })
        this.events = events.object.get('events');
      });
      
      RadarIO.trackOnce().then(result => {
        console.log('trackonce');
        console.dir(result);
        this.trackonce = result.status;
      });

      this.updateCurrentLocation();
    },
    methods: {
      updateCurrentLocation() {
        return geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 5000 }).then(location => {
          return RadarIO.updateLocation({
            accuracy: location.horizontalAccuracy,
            longitude: location.longitude,
            latitude: location.latitude
          })
        }).then(result => {
            this.currentLocation = result;
        })
      }
    },
    computed: {
      computedLocation() {
        console.log('computedLocation - ', this.currentLocation)
        return this.currentLocation;
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: left;
        font-size: 13;
        color: #333333;
    }
</style>
