
    var spector;
    var captureOnLoad = false;
    var captureOffScreen = false;
    window.__SPECTOR_Canvases = [];

    (function() {
        var __SPECTOR_Origin_EXTENSION_GetContext = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.__SPECTOR_Origin_EXTENSION_GetContext = __SPECTOR_Origin_EXTENSION_GetContext;

        HTMLCanvasElement.prototype.getContext = function () {
            var context = null;
            if (!arguments.length) {
                return context;
            }

            if (arguments.length === 1) {
                context = this.__SPECTOR_Origin_EXTENSION_GetContext(arguments[0]);
                if (context === null) {
                    return context;
                }
            }
            else if (arguments.length === 2) {
                context = this.__SPECTOR_Origin_EXTENSION_GetContext(arguments[0], arguments[1]);
                if (context === null) {
                    return context;
                }
            }

            var contextNames = ["webgl", "experimental-webgl", "webgl2", "experimental-webgl2"];
            if (contextNames.indexOf(arguments[0]) !== -1) {
                context.canvas.setAttribute("__spector_context_type", arguments[0]);
                // Notify the page a canvas is available.
                var myEvent = new CustomEvent("SpectorWebGLCanvasAvailableEvent");
                document.dispatchEvent(myEvent);

                if (captureOffScreen) {
                    var found = false;
                    for (var i = 0; i < window.__SPECTOR_Canvases.length; i++) {
                        if (window.__SPECTOR_Canvases[i] === this) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        window.__SPECTOR_Canvases.push(this);
                    }
                }

                if (captureOnLoad) {
                    // Ensures canvas is in the dom to capture the one we are currently tracking.
                    if (this.parentElement || false) {
                        spector.captureContext(context, 500, false);
                        captureOnLoad = false;
                    }
                }
            }

            return context;
        }
    })()