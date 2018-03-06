"use strict";

var PropTypes = require('prop-types');

/* todo: I want this to actually be an array of Function | string but that causes errors */
Object.defineProperty(module.exports, "babelPluginFlowReactPropTypes_proptype_GlamorRule", {
  value: PropTypes.shape({
    cssText: PropTypes.string.isRequired
  })
});

/* eslint-disable no-undef */
