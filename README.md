# &lt;tracking&gt;

Web Component wrapper for [getUserMedia API](http://dev.w3.org/2011/webrtc/editor/getusermedia.html) using Polymer.

## Demo

![Camera Element](http://f.cl.ly/items/410f1q0C363n2o2C3f1m/screenshot-tracking.gif)

> [Check it live](http://eduardolundgren.github.io/video-tracking-element).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/polymer/0.0.20130816/polymer.min.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="src/tracking.html">
    ```

3. Start using it!

    ```html
    <video is="tracking"></video>
    ```

## Options

Attribute  | Options                        | Default        | Description
---        | ---                            | ---            | ---
`type`     | `human`, `color`               | `human`        | Type of the video tracking
`part`     | `frontal_face`, `eye`, `mouth` | `frontal_face` | Human body part to track
`color`    | `magenta`, `cyan`, `magenta`   | None           | Color to track

> See [getUserMedia API spec](http://dev.w3.org/2011/webrtc/editor/getusermedia.html).

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

* [v0.1.1](https://github.com/eduardolundgren/video-tracking-element/releases/tag/0.1.1) September 18, 2013
	* Rename element from `<tracking>` to `<video-tracking>`
* [v0.1.0](https://github.com/eduardolundgren/video-tracking-element/releases/tag/0.1.0) August 22, 2013
    * Initial development release
* v0.0.1 August 19, 2013
    * Started project using [boilerplate-element](https://github.com/customelements/boilerplate-element)

## License

[MIT License](http://opensource.org/licenses/MIT)