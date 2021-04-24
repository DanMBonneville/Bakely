This is an application to help local bakers make their signature homemade good and share their love with the communnity while being properly compensated for their art.

To run the project:
1. Add files from git ignore
  Bakely-React/.env.local -> follow patters from .env.local.sample
  Bakely-React/functions/keys/bakely-server.json

2. Setting up Firebase functions:
    1. Ensure you have the firebase CLI installed on your laptop
    2. Run firebase login from a powershell prompt
    3. Run firebase use bakely
    4. Get the hidden bakely-server function keys (bakely-server.json file)
    5. Run set GOOGLE_APPLICATION_CREDENTIALS="keys/bakely-server.json" (export == set in unix)

3. To deploy functions:
    1. Run firebase deploy --only functions
    2. If firebase fails on all functions for no reason, trying to deploying functions individually with
    firebase deploy --only functions:authorizeStripe

4. To debug functions:
    1. Run firebase emulators:start --only functions, and remove everything out of the config secrets to the file
