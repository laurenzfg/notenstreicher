# [Notenstreicher](https://notenstreicher.laurenzfg.com)

This is a Web GUI for the same-named Go CLI app saved in the folder [GoKernel](GoKernel/README.md). It is hosted online at [notenstreicher.laurenzfg.com](https://notenstreicher.laurenzfg.com).

It invokes the Go App by means of [WebAssembly](https://webassembly.org/).

The app has the following purpose:

> Notenstreicher is a utility to decide which grades to cancel from your final GPA in the context of the *Streichregel*
of the Computer Science B.Sc. programme of RWTH Aachen university.
>
> In this degree programme, you may cancel at most one course in every focus area from the final GPA.
You may cancel courses to a maximum of 30 ECTS.
>
> Just give this program your full transcript and it will tell you the optimal cancellation decision.
Although the algorithm should be correct, *I do not accept responsibility if the program returns you a non-optimal recommendation*.

## How to work with the code?

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This repo as fully configured (JS and Go part) continous deployment.
So any change is immediately reflected in *production*.

### Available Scripts

In the project directory, you can run:

#### `npm start`

**In order to compile the WASM blob with the Go App, run `build.sh` at least once and after every change to the Go App. You need to have a Golang compiler on your machine to do that. Without the blob, the app will crash when you press 'Calculate'.** 

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

**In order to compile the WASM blob with the Go App, run `build.sh` at least once and after every change to the Go App. You need to have a Golang compiler on your machine to do that. Without the blob, the app will crash when you press 'Calculate'.**

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
