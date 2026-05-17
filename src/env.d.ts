/// <reference path="../.astro/types.d.ts" />

declare module '*.yml?raw' {
  const content: string;
  export default content;
}
