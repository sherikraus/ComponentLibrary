# Contributing to the Auro Experiences / Component Library

### Reach out to Mustafa Taleb, Gus Naughton or Dominic Valenciana for help, or pull request reviews.

We'll try our best to review all pull requests within 24 hours. 

--- 
## Creating Tests

All tests can be found in the `tests` folder at the root of the repo. 

The code base requires a minimum code coverage of 80% for code to be merged to master.

## Creating interactive component demos
Some components may have behaviors triggered upon render, which may require UI controls in our component catalog to trigger for closer inspection. Inside your demo file you may put any valid HTML you'd like. If you need to introduce script tags inside your demo, do so at the bottom of the file to avoid race conditions with your selectors and LitElement. See [SaverToMainBottomUpsell](https://dev.azure.com/itsals/E_Sell_PathtoPurchase/_git/ComponentLibrary?path=%2Fcomponents%2Fsaver-to-main-upsell-bottom%2Fdemo.html&version=GBmaster&line=42&lineEnd=43&lineStartColumn=1&lineEndColumn=1&lineStyle=plain) for an example of an catalog interaction with buttons that trigger a javascript function.

## Pushing a component
After your component is merged into Master, our lower environments will rebuild and promote your component as latest, but for production there is a manual approval step that must be fired by someone other than the component author in our [release pipeline](https://itsals.visualstudio.com/E_Sell_PathtoPurchase/_release?definitionId=2&view=mine&_a=releases) which will automatically update our lower environments with your component. On your local, validate that the deployed version of your component behaves correctly and then ask a teammate to approve your production release.

## Lazyloading approach
The best way we have identified of performing asset lazyloading is by leveraging the [firstUpdated](https://lit-element.polymer-project.org/guide/lifecycle#firstupdated) lifecycle method LitElement provides and setting a property on the element.

### Icons
To implement lazyloading icons in your upsell, import the following:
```
import assignIconFromProperty from '../shared/buildIcon';

```

Add as many icon properties as you have unique spots for an icon:
```
  static get properties() {
    return {
      ...snip...
      warningStrokeIcon: {type: String},
    };
  }
```

In your firstUpdated lifecycle call, call ```assignIconFromProperty``` in the context of the property you wish to assign an icon with a default fallback value:
```
async firstUpdated() {
  this.warningStrokeIcon = await assignIconFromProperty(this.warningStrokeIcon, 'warning-stroke');
}
```
To access the icon from within your render function use the following syntax:

```
<slot name="slot-name">${typeof this.warningStrokeIcon === Object ? this.warningStrokeIcon : html`<Fallback />`}</slot>
```

#### Under the hood
```assignIconFromProperty``` performs the following operations for us

 Checks to see if an icon name override has been provided by the consumer

* Pulls the icon name out of the P2P static asset CDN which copies the svgs out of the latest version of Auro Icons

* Renders the returned DOM string inside an inner-scoped DOMParser instance

* Returns a reference to the rendered ```<svg>``` element from within that DOMParser instance

Setting the property to equal that returned value will either yield ```undefined``` or an HTMLObject. Since HTMLObjects are supported by LitElement's html template parser, we do not need to unsafely add the reference from our template.

Keep in mind that firstUpdated() is called _after_ the first render cycle completes, so you'll need to evaluate if a fallback component is necessary while the browser pulls in the icon SVG data and renders it.

#### Updating iconography

New OrionIcons releases do not get automatically pushed to our environments. [Trigger a pipeline](https://itsals.visualstudio.com/E_Sell_PathtoPurchase/_release?_a=releases&view=mine&definitionId=7).

## Further reading
The [LitElement](https://lit-element.polymer-project.org/guide/start) docs are a great resource for understanding the LitElement lifecycle. 
