# &lt;tracking-elements&gt;

A set of Web Components made with [Polymer](http://www.polymer-project.org) that uses the [tracking.js](http://trackingjs.com) library to do real-time color tracking, face detection and much more.

* [Official website](http://trackingjs.com)
* [Documentation](http://trackingjs.com/docs.html)
* [API Docs](http://trackingjs.com/api/)

## Demo

* [Color tracker](http://eduardolundgren.github.io/tracking-elements/examples/color.html)
* [Object tracker](http://eduardolundgren.github.io/tracking-elements/examples/object.html)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install tracking-elements --save
```

Or [download as ZIP](https://github.com/eduardolundgren/tracking-elements/archive/master.zip).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/tracking-elements/dist/image-color-tracking.html">
    ```

3. Start using it!

    ```html
    <image-color-tracking></image-color-tracking>
    ```

## Color Trackers

There are three different custom elements to use in three different HTML elements:

* `<img is="image-color-tracking">`
* `<video is="video-color-tracking">`
* `<canvas is="canvas-color-tracking">`

### Options

Attribute | Options                     | Default   | Description
---       | ---                         | ---       | ---
`target`  | `magenta`, `yellow`, `cyan` | `magenta` | Defines the colors to be tracked.
`camera`  | `true`, `false`             | `false`   | Asks for the user's webcam.<br>Only available when extending `<video>` elements.

### Methods

You can find all getters and setters available in the [API Docs](http://trackingjs.com/api/tracking.ColorTracker.html). For example:

```js
var video = document.querySelector('video');
video.stop();
```

### Events

Event         | Description
---           | ---
`track`       | Triggers when the `target` is found.<br>Returns an array of regions (`x`, `y`, `width`, `height`, `color`).

## Object Trackers

There are three different custom elements to use in three different HTML elements:

* `<img is="image-object-tracking">`
* `<video is="video-object-tracking">`
* `<canvas is="canvas-object-tracking">`

### Options

Attribute | Options                     | Default   | Description
---       | ---                         | ---       | ---
`target`  | `face`, `mouth`, `eye`      | `face`    | Defines the objects to be tracked.
`camera`  | `true`, `false`             | `false`   | Asks for the user's webcam.<br>Only available when extending `<video>` elements.

### Methods

You can find all getters and setters available in the [API Docs](http://trackingjs.com/api/tracking.ObjectTracker.html). For example:

```js
var video = document.querySelector('video');
video.stop();
```

### Events

Event         | Description
---           | ---
`track`       | Triggers when the `target` is found.<br>Returns an array of regions (`x`, `y`, `width`, `height`, `total`).

## Development

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

* Install [Bower](http://bower.io/) & [Grunt](http://gruntjs.com/):

    ```sh
    $ [sudo] npm install -g bower grunt-cli
    ```

* Install local dependencies:

    ```sh
    $ bower install && npm install
    ```

* To test your project, start the development server and open `http://localhost:8000`.

    ```sh
    $ grunt server
    ```

* To build the distribution files before releasing a new version.

    ```sh
    $ grunt build
    ```

* To provide a live demo, send everything to `gh-pages` branch.

    ```sh
    $ grunt deploy
    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/eduardolundgren/tracking-elements/releases).

## Team

*tracking.js* is maintained by these people and a bunch of awesome [contributors](https://github.com/eduardolundgren/tracking.js/graphs/contributors).

[![Eduardo Lundgren](https://2.gravatar.com/avatar/42327de520e674a6d1686845b30778d0)](https://github.com/eduardolundgren) | [![Thiago Rocha](https://2.gravatar.com/avatar/09c627c62a26a770200819a41a71a3eb)](https://github.com/thiago-rocha) | [![Zeno Rocha](https://2.gravatar.com/avatar/e190023b66e2b8aa73a842b106920c93)](https://github.com/zenorocha) | [![Pablo Carvalho](https://2.gravatar.com/avatar/ae10d2692a6adbf051c6d4255e222df8)](https://github.com/mairatma) | [![Maira Bello](https://2.gravatar.com/avatar/97e0e62c9c02badba4c321f7613e6acf)](https://github.com/mairatma)
--- | --- | --- | --- | ---
[Eduardo Lundgren](https://github.com/eduardolundgren) | [Thiago Rocha](https://github.com/thiago-rocha) | [Zeno Rocha](https://github.com/zenorocha) | [Pablo Carvalho](https://github.com/pablocp) | [Maira Bello](https://github.com/mairatma)

## License

[BSD License](https://github.com/eduardolundgren/tracking.js/blob/master/LICENSE.md) © Eduardo Lundgren
