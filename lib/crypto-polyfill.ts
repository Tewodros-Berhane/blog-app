// Polyfill for crypto.randomUUID() for environments that don't support it
if (typeof globalThis.crypto === "undefined") {
  // @ts-expect-error - Adding crypto to globalThis
  globalThis.crypto = {};
}

if (typeof globalThis.crypto.randomUUID !== "function") {
  globalThis.crypto.randomUUID =
    function randomUUID(): `${string}-${string}-${string}-${string}-${string}` {
      // Generate a UUID v4
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      ) as `${string}-${string}-${string}-${string}-${string}`;
    };
}
