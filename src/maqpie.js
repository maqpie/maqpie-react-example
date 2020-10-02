import React from 'react';

const METHODS = [
  'renderLargeView',
  'showLargeView',
  'destroyLargeView',
  'subscribe',
  'unsubscribe',
];

export default function MaqpieWidget({ appId, user, userHash, headerColor, scrollColor, embedded, onMessageCountChange }) {
  React.useEffect(() => {
    if (appId && user) {
      window.MP = { // you can find all fields in setup wizard in admin portal
        data: {
          appId,
          user,
          userHash,
        },
        settings: {
          styles: {
            headerColor, // a primary chat color
            scrollColor, // a color of the chat scroll
          },
          // here we say Maqpie to be embedded
          mode: embedded ? 'embedded' : undefined,
        },
      };

      window.MP._queue = window.MP._queue || [];
      METHODS.forEach((method) => {
        window.MP[method] = (...args) => {
          const data = [method, ...args];
          window.MP._queue.push(data);
        };
      });

      let script = document.querySelector('script[src="https://widget.maqpie.com/widget/v1.0"]');
      if (script) {
        return;
      }

      script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://widget.maqpie.com/widget/v1.0';
      document.body.append(script);

      // subscribe to unread messages count
      if (onMessageCountChange) {
        window.MP.subscribe('unreadMessagesCountChanged', onMessageCountChange);
      }
      
      // initialize embedded chat
      if (embedded) {
        window.MP.renderLargeView('maqpie-chat');
        window.MP.showLargeView();
      }
    }
  }, [appId, user, userHash, headerColor, scrollColor, embedded, onMessageCountChange]);

  // and add root component for our chat
  return (
    <div id="maqpie-chat">
    </div>
  );
}
