# Creative Coding Workbench
A small tool centered around the HTML Canvas. The workbench assists you in creating generative art with JavaScript by exposing the drawings settings to the UI.
Play around with a live version on [workbench.generativepieces.com](https://workbench.generativepieces.com).

![browser_Screenshot](https://dev-to-uploads.s3.amazonaws.com/i/u1a8xvkxwwyj4n3yeh7c.png)

## About
Ever wanted to create a digitial art sketch? This workbench is aimed to support you in your creative work on the HTML Canvas. Write a function that draws on the canvas. Use the function template and add your own settings interfaces to make your development easier. Create a settings object wich will automatically be exposed to the UI. Add your coded sketch to the workbench and view a visualisation. Change the settings int the UI and see the result instantly. Tweak it to your liking and download it when you are finished.
## Current Features
 - drawing function tied to the canvas 
 - apply settings automatically from the UI
 - export drawing as png with set resolution
 - export settings as JSON
 - load settings from JSON
 - In-browser code editor in the development environment
 - start/stop canvas animation
 - set animations fps

## Planned Features
 - image library in the workbench connected to a Digital Ocean Space

## Other
This project was done for the Digital Ocean Hackathon. You can read my articles about the hackathon journey on [dev.to](https://dev.to/doener48):

<a href="https://dev.to/doener48/intro-to-the-creative-coding-workbench-1j15">
  <img src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg" alt="Dennis Wueppelmann's DEV Community Profile" height="50" width="50">
</a>

The workbench is deployed with the DO App Platform. And available [here](https://workbench.generativepieces.com). If you want your own hosted version of the workbench on your own domain just hit the button below.

[![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/Doener48/creative-coding-workbench/tree/master&refcode=a9152b5385cf)

PS: This is a referral link. You will get $100 Digital Ocean Credit for free if you use it :)

# How it works
By default all your sketches belong in the folder `src/sketches`. In this folder the `index.ts` bundles all your sketch files to a single array. The `sketches` array is then imported and displayed to the UI. A sketch file is a typescript file which exports a `Sketch` object. This contains a settings object and the actual drawing function:
```typescript
export interface ISketch {
  name: string;
  settings: any;
  drawFunction: DrawFunc;
}

export interface DrawFunc {
  (ctx: CanvasRenderingContext2D, width: number, height: number, settings: any): void;
}

```
The `settings` attribute will be exposed and can be  manipulated from the UI. The function draws the piece of art on the canvas with the passed `ctx` context argument.


An example Sketch looks like this:
```typescript
import { DrawFunc, Sketch } from "./model";

interface ISettings {
  lineWidth: number;
}

let exampleFunction: DrawFunc = (ctx, width, height, settings: ISettings) => {
  ctx.clearRect(0, 0, width, height);
  ctx.moveTo(0, 0);
  ctx.lineWidth = settings.lineWidth;
  ctx.lineTo(width, height);
  ctx.moveTo(width, 0);
  ctx.lineTo(0, height);
  ctx.stroke();
}

export default new Sketch({
  name: "Example",
  settings: { lineWidth: 5 } as ISettings,
  drawFunction: exampleFunction
});
```
# Examples
![gif_different_pieces](https://dev-to-uploads.s3.amazonaws.com/i/1rqzj9v64254lhms0889.gif)
![gif_toggle_code](https://dev-to-uploads.s3.amazonaws.com/i/7d581c9jrlp8v6dzzro7.gif) 