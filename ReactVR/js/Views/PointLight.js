/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * RCTPointLight: runtime implementation of the <PointLight >
 * https://threejs.org/docs/index.html#api/lights/PointLight
 * @class RCTPointLight
 * @extends RCTBaseLight
 */

import RCTBaseLight from './BaseLight';
import merge from '../Utils/merge';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';

export default class RCTPointLight extends RCTBaseLight {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys) {
    super();

    this.light = new THREE.PointLight();
    this.view = new OVRUI.UIView(guiSys);
    this.view.add(this.light);

    // If non-zero, light will attenuate linearly from maximum intensity at
    // light position down to zero at distance.
    Object.defineProperty(this.props, 'distance', {
      set: value => {
        this.light.distance = value;
      },
    });
    // The amount the light dims along the distance of the light
    // In "physically correct" mode, decay = 2 leads to physically realistic light falloff.
    Object.defineProperty(this.props, 'decay', {
      set: value => {
        this.light.decay = value;
      },
    });
    // Color of the light.
    Object.defineProperty(this.style, 'color', {
      set: value => {
        this.light.color.set(value);
      },
    });

    // defaults that match three.js
    this.props.intensity = 1;
    this.props.distance = 0;
    this.props.decay = 1;
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {
        distance: 'number',
        decay: 'number',
      },
    });
  }
}
