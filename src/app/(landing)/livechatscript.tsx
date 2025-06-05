/* eslint-disable */
import { useEffect } from "react";

// Extending the Window interface to add LiveChat properties
declare global {
  interface Window {
    __lc: any;
    LiveChatWidget: any;
  }
}

const LiveChatScript = () => {
  useEffect(() => {
    // Initialize the LiveChat configuration
    window.__lc = window.__lc || {};
    window.__lc.license = 17967450; // Your LiveChat license ID
    window.__lc.integration_name = "manual_channels";
    window.__lc.product_name = "livechat";

    // LiveChat widget setup
    (function (window, document, slice) {
      function handleEvent(args: any) {
        // @ts-ignore
        return widget._h ? widget._h.apply(null, args) : widget._q.push(args);
      }

      const widget = {
        _q: [], // Event queue
        _h: null, // Handler
        _v: "2.0", // Version
        on: function () {
          handleEvent(["on", slice.call(arguments)]);
        },
        once: function () {
          handleEvent(["once", slice.call(arguments)]);
        },
        off: function () {
          handleEvent(["off", slice.call(arguments)]);
        },
        get: function () {
          if (!widget._h) {
            throw new Error(
              "[LiveChatWidget] You can't use getters before load.",
            );
          }
          return handleEvent(["get", slice.call(arguments)]);
        },
        call: function () {
          handleEvent(["call", slice.call(arguments)]);
        },
        init: function () {
          const script = document.createElement("script");
          script.async = true;
          script.defer = true;
          script.type = "text/javascript";
          script.src = "https://cdn.livechatinc.com/tracking.js";
          document.head.appendChild(script);
        },
      };

      // Initialize the widget if not async
      if (!window.__lc.asyncInit) {
        widget.init();
      }

      // Assign the widget to the global object
      window.LiveChatWidget = window.LiveChatWidget || widget;
    })(window, document, [].slice);
  }, []); // Run only once when the component is mounted

  return null; // This component does not render anything
};

export default LiveChatScript;
