# Chrome DevTools Cheat Sheet
## [Network](./network.md)
- **Request blocking** simulates a network failure - the request gets no response and `fetch` rejects.
- **HTTP error status** is different - the request receives a response, and `fetch` resolves, so check `response.ok` / `response.status`.
- Blocked requests can be filtered with `More filters` → `Blocked requests`.
- **Throttling** simulates slow network conditions. Use built-in presets like `Fast 3G` / `Slow 3G`, or custom profiles.
- **Request conditions** can target URL patterns with wildcards (`*`), but not regex.
- **Local overrides** can replace response bodies from DevTools: Network request → right click → `Override content`, then edit in `Sources` → `Overrides`.
- DevTools does not natively simulate "wait, then return 500". Use a custom service worker or an extension for delayed error responses.
- Custom **service worker** notes:
  - requires HTTP, not `file://`
  - register with `navigator.serviceWorker.register('/path/to/workers/script.js')`
  - hard reload bypasses the worker
  - after unregistering, reload the page
  - filter intercepted requests with `is:service-worker-intercepted`

## [Performance](./performance.md)
- Record in incognito when possible; browser extensions can affect traces.
- Use CPU throttling to simulate slower devices.
- Performance traces can be saved and shared.
- Flame chart basics:
  - width / x-axis = time
  - depth / y-axis = call stack
  - focus on wide leaf functions when looking for expensive self time
- **Self time** = time spent in the function itself.
- **Total time** = time spent in the function plus functions it called.

## [Memory](./memory.md)
- Chrome Task Manager:
  - enable `JavaScript memory`
  - watch the `live` number in parentheses
  - growing live memory means reachable JS objects are increasing or growing
- Performance panel with `Memory` checked:
  - stairs-like memory graph suggests retained memory / possible leak
  - `Collect garbage` can force cleanup during debugging
- Memory panel:
  - heap snapshots show retained objects and reference paths
  - they usually do not point directly to the source line that created the object
- **Shallow size** = memory used by the object itself.
- **Retained size** = memory that could be freed if that object became unreachable, including objects only reachable through it.
