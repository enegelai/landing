import {
  mdiAlert
} from "./chunk-BY32BOBE.js";
import {
  h
} from "./chunk-G3CMYKT2.js";

// node_modules/mdi-vue/src/props.js
var props = {
  title: [String],
  spin: [Boolean],
  width: [Number, String],
  height: [Number, String],
  ariaLabel: [String],
  staticClass: [String],
  // hides: property access warning for ts with vue 3
  class: [String],
  // hides: property access warning for ts with vue 3
  name: {
    type: String,
    required: true,
    default: "alert"
  },
  size: {
    type: [Number, String],
    default: 24
  },
  viewBox: {
    type: String,
    default: "0 0 24 24"
  },
  xmlns: {
    type: String,
    default: "http://www.w3.org/2000/svg"
  },
  role: {
    type: String,
    default: "img"
  },
  spin: {
    type: Boolean,
    default: false
  }
};

// node_modules/mdi-vue/src/shared.js
import "/home/slavas/WORK/enegel/landing/node_modules/mdi-vue/src/icons.css";
var ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
var toName = (str) => str.split("-").map(ucFirst).join("");
var getAttrs = (mdi, props_, attrs) => {
  const iconPath = mdi[`mdi${toName(props_.name)}`] || mdiAlert;
  const spanAttrs = {
    role: props_.role,
    "aria-label": props_.ariaLabel,
    ...attrs
  };
  const svgAttrs = {
    fill: "currentColor",
    width: props_.width || props_.size,
    height: props_.height || props_.size,
    viewBox: props_.viewBox,
    xmlns: props_.xmlns
  };
  const pathAttrs = {
    d: iconPath
  };
  return {
    spanAttrs,
    svgAttrs,
    pathAttrs
  };
};
var getClass = (props_, data) => ({
  [data.staticClass || ""]: true,
  [data.class || ""]: true,
  [`mdi mdi-${props_.name}`]: true,
  "mdi-spin": props_.spin === true
});
var getInstall = (renderer, versionDependentOpts = {}) => ({
  install(app, { icons }) {
    if (icons === void 0) {
      throw new Error("Icons must be provided separately");
    }
    app.component("mdicon", {
      name: "MDIcon",
      props,
      ...versionDependentOpts,
      render: renderer(icons)
    });
  }
});

// node_modules/mdi-vue/v3.js
var renderV3 = (mdi) => function render() {
  const {
    spanAttrs,
    svgAttrs,
    pathAttrs
  } = getAttrs(mdi, this, this.$attrs);
  return h("span", {
    ...spanAttrs,
    class: getClass(this, this)
  }, [
    h("svg", svgAttrs, [
      ...[this.title ? h("title", [this.title]) : void 0],
      h("path", pathAttrs)
    ])
  ]);
};
var v3_default = getInstall(renderV3);
export {
  v3_default as default
};
//# sourceMappingURL=mdi-vue_v3.js.map
