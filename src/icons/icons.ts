export const ICONS = {
    check:          "bi:patch-check-fill",
    mapPin:         "bi:pin-map-fill",
    clock:          "bi:clock-fill",
    arrowDown:      "bi:chevron-down",
    arrowUpRight:   "bi:arrow-up-right-square-fill",
    personGear:     "bi:person-fill-gear",
    settings:       "bi:gear-fill",
    tool:           "bi:tools"
} as const;

export type IconName = keyof typeof ICONS;