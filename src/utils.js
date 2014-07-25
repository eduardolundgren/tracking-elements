function importBasicLifecycleMixin(mixin, Tracker) {
  mixin.ready = function() {
    var targets = this.target.split(' ');
    this.tracker = new Tracker(targets);
    this.tracker.on('track', this.fire.bind(this, 'track'));
    this.trackerTask = tracking.track(this, this.tracker, { camera: this.camera });
  };

  // Fires when the element was inserted into the document
  mixin.attached = function() {
    this.run();
  };

  mixin.run = function() {
    if (this.trackerTask) {
      this.trackerTask.run();
    }
  };

  // Fires when the element was removed from the document
  mixin.detached = function() {
    this.stop();
  };

  mixin.stop = function() {
    if (this.trackerTask) {
      this.trackerTask.stop();
    }
  };
}

function importGettersAndSettersMixin(mixin, proto) {
  Object.keys(proto).forEach(function(key) {
    if (key.indexOf('get') === 0) {
      mixin[key] = function() {
        return this.tracker[key]();
      };
    }
    if (key.indexOf('set') === 0) {
      mixin[key] = function(value) {
        var attrValue = this.tracker[key](value);
        this.trackerTask.stop().run();
        return attrValue;
      };
    }
  });
}

function makeColorTrackerMixin() {
  var mixin = {
    // Holds whether the video element should request user camera
    camera: false,

    // Holds the target of the tracking
    target: 'magenta',

    // Fires when an attribute was added, removed, or updated
    attributeChanged: function(attr, oldVal, newVal) {
      if (attr === 'target') {
        this.tracker.setColors(newVal.split(' '));
        this.trackerTask.stop().run();
      }
    }
  };

  // Imports basic lifecycle
  importBasicLifecycleMixin(mixin, tracking.ColorTracker);

  // Imports getters and setters from tracking.ColorTracking
  importGettersAndSettersMixin(mixin, tracking.ColorTracker.prototype);

  return mixin;
}

function makeObjectTrackerMixin() {
  var mixin = {
    // Holds whether the video element should request user camera
    camera: false,

    // Holds the target of the tracking
    target: 'face',

    // Fires when an attribute was added, removed, or updated
    attributeChanged: function(attr, oldVal, newVal) {
      if (attr === 'target') {
        this.setTargetsInternal(newVal.split(' '));
      }
    },

    setTargetsInternal: function(targets) {
      targets.forEach(function(classifier, i) {
        if (typeof classifier === 'string') {
          targets[i] = tracking.ViolaJones.classifiers[classifier];
        }
        if (!targets[i]) {
          throw new Error('Object classifier not valid, try `new tracking.ObjectTracker("face")`.');
        }
      });
      this.setClassifiers(targets);
    }
  };

  // Imports basic lifecycle
  importBasicLifecycleMixin(mixin, tracking.ObjectTracker);

  // Imports getters and setters from tracking.ColorTracking
  importGettersAndSettersMixin(mixin, tracking.ObjectTracker.prototype);

  return mixin;
}
