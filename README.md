# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


Description: My app is a breathing app with custom themes for certain emotions. It includes mulitple breathing options and animation, sounds and haptics to help guide the user through the practice. 

Screen shot of my outline of my project

![Outline](assets/images/wireframe.png)


2-3 Paragraphs explaining how you implemented Human Interface Guidelines in your application.

For the accessiblility in the adaptable section, I added light/dark mode based on the users prefreneces. I used useColorScheme to do this. 

In the dark mode best practices apple suggestion that you avoid offering an app-specific appearance settings. I understand this but still wanted my users the ability to choose if they wanted to. So in my settings I give the options of light/dark/prefrence. So that in genral it will jsut use the users prefrences but if the users want to choose a specific theme they have the ability to. Best of both world. 


In the haptics section it suggest using haptics to enhance or complement the sound of the app and thats what I did in my braething section. I incluided custom haptics to help enhace the breathing experiance. 

