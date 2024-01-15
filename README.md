# jQuery.Directional
jQuery Plugin for page navigation using directional buttons. Functional for Web-Apps on Smart TV's

## Usage
```javascript
// Include the plugin in your HTML file
<script src="path/to/jquery.directional.min.js"></script>
```

## Overview

The jQuery.Directional plugin enhances webpage accessibility through directional button navigation. To integrate the plugin, use the following syntax:

```javascript
$.fn.Directional();
```

## Parameters

### RewriteIndexes
#### Rewrites all "tabindex" values on the page that are greater than or equal to zero, placing them in ascending order. A note is included, highlighting the potential advantages of this feature in future updates.
```javascript
$.fn.Directional({
  rewriteindexes: true
});
```

### SelectElement
#### Selects an initial element, serving as a starting point for directional navigation.
```javascript
$.fn.Directional({
  selectelement: $(".element")
});
```

### ClickOnEnter
#### Simulates mouse click when the Enter key is pressed.
```javascript
$.fn.Directional({
  clickonenter: true
});
```

### CheckIsTv
#### Activate the plugin only in TV Devices. (Need the plugin [IsSmartTV.js](https://github.com/jeankassio/IsSmartTv.js).)



```javascript
$.fn.Directional({
  checkistv: true
});
```

## Note
### Feel free to explore and customize the jQuery.Directional plugin to enhance your webpage's navigation experience.
