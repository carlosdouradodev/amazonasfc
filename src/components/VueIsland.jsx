import { useEffect, useRef } from "react";
import { createApp } from "vue";

export function VueIsland({ component, props, className = "" }) {
  const hostRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current) return undefined;
    const app = createApp(component, props);
    app.mount(hostRef.current);
    return () => app.unmount();
  }, [component, props]);

  return <div className={className} ref={hostRef} />;
}
