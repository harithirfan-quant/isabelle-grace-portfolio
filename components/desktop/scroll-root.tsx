"use client";

import * as React from "react";

/**
 * True when rendering inside the desktop window on the homepage.
 *
 * Why this exists: the desktop is a fixed viewport whose contents scroll inside
 * the window, and the dock can jump straight to any section. IntersectionObserver
 * based scroll reveals are unreliable in that setup (measured: 103 wrappers
 * stayed at opacity 0, and even a plain observer rooted on the window body
 * reported isIntersecting false). Anything gated behind "became visible on
 * scroll" therefore renders as a blank section.
 *
 * So inside the window, content is rendered plainly and always visible, and the
 * entrance is handled by one CSS animation on the window itself (see
 * globals.css). Normal routes keep the scroll-reveal behaviour, where it works.
 */
export const InDeskWindowContext = React.createContext(false);

export function useInDeskWindow() {
  return React.useContext(InDeskWindowContext);
}
