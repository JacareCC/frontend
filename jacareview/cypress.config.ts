import admin from 'firebase-admin';
import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    // NOTE: Add "supportFile" setting if separate location is used
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
      return cypressFirebasePlugin(on, config, admin,{
          // Here is where you can pass special options. 
          // If you have not set the GCLOUD_PROJECT environment variable, give the projectId here, like so:
          //    projectId: 'some-project',
          // if your databaseURL is not just your projectId plus ".firebaseio.com", then you _must_ give it here, like so:
          //    databaseURL: 'some-project-default-rtdb.europe-west1.firebasedatabase.app',
      });
    },
  },
});