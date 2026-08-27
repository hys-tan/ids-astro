export const ICONS = {
    check:          "bi:patch-check-fill",
    mapPin:         "bi:pin-map-fill",
    clock:          "bi:clock-fill",
    arrowDown:      "bi:chevron-down",
    arrowRight:     "bi:arrow-right-short",
    arrowUpRight:   "bi:arrow-up-right-square-fill",
    personGear:     "bi:person-fill-gear",
    settings:       "bi:gear-fill",
    tool:           "bi:tools",
    mail:           "bi:envelope-fill",
    phone:          "bi:telephone-fill",

    //logos redes sociales
    facebook:       "bxl:facebook",
    instagram:      "bxl:instagram",
    linkedIn:       "bxl:linkedin"
} as const;

export type IconName = keyof typeof ICONS;