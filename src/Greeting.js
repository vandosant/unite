// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE
'use strict';

var React = require("react");
var Js_option = require("bs-platform/lib/js/js_option.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var component = ReasonReact.statelessComponent("Header");

var defaultText = "Welcome to my blog post!";

function make(message, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      var text = Js_option.getWithDefault(defaultText, message);
      return React.createElement("h3", undefined, text);
    });
  return newrecord;
}

function fromJsProps(props) {
  return make(/* Some */[props.message], /* array */[]);
}

var $$default = ReasonReact.wrapReasonForJs(component, fromJsProps);

var getWithDefault = Js_option.getWithDefault;

exports.getWithDefault = getWithDefault;
exports.component = component;
exports.defaultText = defaultText;
exports.make = make;
exports.fromJsProps = fromJsProps;
exports.$$default = $$default;
exports.default = $$default;
exports.__esModule = true;
/* component Not a pure module */
