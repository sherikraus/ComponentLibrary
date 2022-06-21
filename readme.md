# Auro Experiences / Alaska Air Component Hangar

[Our website](https://components.alaskaair.com)

A mono-repo for building components to be consumed across e-commerce.

## Consuming Components

### NPM Approach

1. Authenticate with Azure Devops ```as.com-npm``` npm repository using the following instructions: [npm azure devops](https://itsals.visualstudio.com/AlaskaAirCom/_packaging?_a=connect&feed=as.com-npm). Make sure to follow the directions appropriate to your operating system.

1. Install Component Hangar package

    ```bash
    npm install --save @alaskaair/component-hangar
    ```

1. Import desired component

    ```javascript
    import '@alaskaair/component-hangar/components/merchandising/covid-message-banner'
    ```

1. Use component in your html

    ```html
    <covid-message-banner></covid-message-banner>
    ```

  >Components that use Auro primitives will need to also install Auro Design Tokens. Follow instructions [here](http://auro.alaskaair.com/getting-started/developers/design-tokens/install) and make sure to import the design token styles in your css/sass

### CDN Approach

#### Urls

* Test: https://p2pcontent-fd-test.azurefd.net/components/
* QA: https://p2pcontent-fd-qa.azurefd.net/components/
* Prod: https://p2pcontent-fd-prod.azurefd.net/components/
* PR: https://componentlibrary-[PR-ID].w2.ecomm-test-aks.alaskaair.com/components/

#### Instructions

1. Import the component base javascript and css files from the appropriate urls for the environment

    ```html
    <link rel="stylesheet" href="https://p2pcontent-fd-prod.azurefd.net/components/shared/component-base.css">
    <script src="https://p2pcontent-fd-prod.azurefd.net/components/shared/component-base.js"></script>
    ```

1. Import the desired component javascript

    ```html
    <script src="https://p2pcontent-fd-prod.azurefd.net/components/covid-message-banner/main.js"></script>
    ```

1. Use your component

    ```html
    <covid-message-banner></covid-message-banner>
    ```

> Notice how the CDN approach does not use area folders (seats, merchandising, etc.)

## Run Local Development

### Developer dependencies

### Install necessary developer tools:  
Mac: `xcode-select --install`  

### Install Component Hanger dependencies  
`npm i`

### Build files

`npm run build`

### Start webserver and bundler (in watch mode)

`npm start`

## Create A New Component
### Typescript Component

Component name must be camel case

`npm run add -- componentName --typescript`

### Javascript

Component name must be camel case

`npm run add -- componentName`

## Addition of component-level scss styles

If you elect to use SCSS for your component styles, add a `styles.scss` file to your component folder. Running `npm start` will render the scss down to a `styles-css.js` file that you can then import in your component like so:
```
import {styles} from './styles-css';
...

  static get styles() {
    return css`
      ${styles}
    `;
  }
```
Your styles will be bundled into the JS distributable.
## Hooks

Hooks are compile-time javascript files that render static data into js files to use in your components.
This is useful for people that depend on external services that provide metadata and want the metadata updated each time the component hanger is built and deployed.

In summary, hooks do the following:

1. A hook file is created that exports a default function which returns a javascript object
1. The function is called each time the component hanger is **built**
1. The result of the hook is then serialized into json and a new "*-data.js" file is created
1. Components will reference the js file in order to use its data

### Writing a hook

1. Duplicate the hooks/demo.js file and give it a new name (demo2.js as an example)
1. Change the getData method to return the data you need (usually a fetch call is made here)
1. Run ```npm run build``` and you should see a new file gets generated in the hooks folder (demo2-data.js in our example)

### Using a hook

Import your hook's js file as follows

```js
import lounges from '../../../hooks/lounges-data.js';
```

## Run Local Tests

Run Tests Once
`npm test`

Run Tests in `watch` mode for incremental changes
`npm run test:watch`

## Creating Tests

All tests can be found in the `tests` folder at the root of the repo.

The code base requires a minimum code coverage of 80% for code to be merged to master.

### Debug Tests

Karma is executing our tests, to debug the tests locally just go the url http://localhost:9876/debug.html, open your console and start debuggin as though you would with normal javascript.

When Instanbul, our code coverage analyzer runs, it generates a folder at the root of this project called `coverage`. Open the file `index.html` in your browser to see the detailed code coverage results.

## Why a mono repo?

Consistant distribution tactic, code styling, unit tests ect ect... across all components created by the P2P team.

Instead of having each component be it's own self contained repo all the listed components are distributed seperatedly but built in the same codebase.

## Implementation in MOW

Inside of MOWShopping there is a [`PathToPurchaseContentService`](https://dev.azure.com/itsals/CustomerMobile/_git/MobileWebShopping/pullrequest/30570?_a=files) that provides an environment-appropriate way of building URLs to the P2P CDN. To implement a component from this library in MOW, add the following to your cshtml view:

```
<!-- These two are required -->
<link rel="stylesheet" href="@PathToPurchaseContentService.BuildURL("/components/shared/component-base.css")" />
<script src="@PathToPurchaseContentService.BuildURL("/components/shared/component-base.js")" type="text/javascript"></script>

<!-- Use your component's path here -->
<script src="@PathToPurchaseContentService.BuildURL("/components/saver-to-main-minimal-success/main.js")" type="text/javascript"></script>

<!-- Default to display: none; as it will be dynamically removed as appropriate -->
<saver-to-main-minimal-success style="display:none"></saver-to-main-minimal-success>
```

## Reverse proxy with AlaskaAirCom

For development and testing, some components have functionality that only works when hosted within \*.alaskaair.com. For example, the `<cms-partial>` component can personalize responses but may require cookies set on the \*.alaskaair.com domain.

1. Make the following change to your AlaskaAirCom `nginx.conf` file and restart nginx:

   ```
   http {
     ...
     server {
       listen 443 default_server ssl;
       server_name www.alaskaair.com;
       ...
       location /catelog/ {
         proxy_pass http://localhost:3000/;
       }
     }
   }
   ```

1. Edit SwitchHosts! to use LocalHost or edit your `hosts` file to resolve www.alaskaair.com to home (127.0.0.1).
1. `npm start` to run the local web server on localhost:3000.
1. Go to www.alaskaair.com/catelog.

## Tools

If you're using vscode, downloading these two extensions so that you get highlighting for html and css string literals.

[es6-string-css](https://marketplace.visualstudio.com/items?itemName=bashmish.es6-string-css)

[lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)

<h2 align="center">Core Maintainers</h2>
<h3 align="center"> Feel free to ask us questions, have us review your pull requests or just buy us beer 🍻</h3>

<table width="100%">
  <tbody width="100%">
    <tr width="100%">
      <td align="center" valign="top">
        <center>
          <img width="150" height="150" src="https://github.com/janabimustafa.png?s=150" />
          <br>
          <a href="https://github.com/janabimustafa">Mustafa Taleb</a>
        </center>
      </td>
      <td align="center" valign="top">
        <center>
          <img width="150" height="150" src="https://github.com/kiricon.png?s=150" />
          <br>
          <a href="https://github.com/kiricon">Dominic Valenciana</a>
        </center>
      </td>
      <td align="center" width="33%" valign="top">
        <center>
          <img width="150" height="150" src="https://github.com/gusnaughton.png?s=150"/>
          <br>
          <a href="https://github.com/gusnaughton">Gus Naughton</a>
        </center>
      </td>
    </tr>
  </tbody>
</table>
