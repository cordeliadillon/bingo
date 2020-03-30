# Bingo

An accessible bingo web app using React and Firebase.

[See it in action](https://backlog-bingo.com/), [read about its accessibility](https://www.24a11y.com/2019/building-an-accessible-bingo-web-app/), or build your own version using the instructions below:

## Getting started

### Database setup

You could use any underlying database for this, but [Firebase](https://firebase.google.com/) is easy and has nice realtime update support.

1. Create a new Firebase project at https://firebase.google.com/.
2. In the Firebase console for your project, create a new Realtime Database.
3. In the Data tab of your Realtime Database, click Import JSON and upload the [sample schema](sample_schema.json).

### Local setup

1. Clone this repo.
2. Run `npm install`.
3. Run `firebase init`. Follow the setup steps, making sure to:
    - choose Firebase CLI features **Database** & **Hosting**
    - choose the Firebase project you just created
    - not overwrite `database.rules.json`
    - choose `build` as your public directory
    - configure as single-page app
4. Create an `.env` file with the following data from your Firebase project's settings:
    ```
    REACT_APP_FIREBASE_API_KEY={your_data}
    REACT_APP_FIREBASE_AUTH_DOMAIN={your_data}
    REACT_APP_FIREBASE_DATABASE_URL={your_data}
    REACT_APP_FIREBASE_PROJECT_ID={your_data}
    REACT_APP_FIREBASE_STORAGE_BUCKET={your_data}
    REACT_APP_FIREBASE_MESSAGEING_SENDER_ID={your_data}
    ```

### Check that it's all working

If you've followed the steps above, you should be able to run the app locally.

1. Call `npm start`.
2. App should automatically load showing the "Ready to join a game?" screen.
3. If you uploaded the sample schema, type "a11y" into the Board Name field and click "Play!"

If the app hangs at this point, go into your Firebase Console and make sure your database's rules are the same as those in [database.rules.json](database.rules.json).


## Creating new games

Right now this is a manual process as I've yet to build the authenticated UI for doing this within the bingo app itself. Whoops!

The easiest way to add a new game board is to create a JSON file containing a lexicon of phrases, a numerical size (how many squares across the bingo grid will be), and optionally a set of instructions for your users. Like so:

```
{
  "instructions" : "### Write anything here using basic **markdown**...",
  "lexicon" : [
    "Put all the phrases you want to use here",
    "You can even include emojis!",
    "🍕"
   ],
  "size" : 5
}

```

In your Firebase Console, create a new entry in the "games" array and import your JSON into that object. Whatever name you choose for that entry will be the "Board Name" players will use to access your game.


## Deploying

Should be as simple as:

```
> npm run build
> firebase deploy
```

## Disclaimers

This is a prototype for which I have yet to build any tests. Use at your own risk.

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).