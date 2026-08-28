// Gerado por scripts/tokens/build.mjs a partir de source/*.tokens.json.
// Nao editar a mao — rode `npm run tokens:build`.

export const primitiveColors = {
  "auxiliary": {
    "blue": {
      "100": "#E9F4FF",
      "200": "#C2E2FF",
      "300": "#ADD6FF",
      "400": "#96CAFF",
      "500": "#6BB5FF",
      "600": "#3399FF",
      "700": "#1D88F3",
      "800": "#1571CD",
      "900": "#0A5FB4",
      "1000": "#094179"
    },
    "green": {
      "100": "#E5FFE1",
      "200": "#BFFFB4",
      "300": "#A4F497",
      "400": "#8BE37C",
      "500": "#72D761",
      "600": "#5EC34D",
      "700": "#4BB639",
      "800": "#399929",
      "900": "#297A1B",
      "1000": "#1B5B10"
    },
    "orange": {
      "100": "#FFF3E0",
      "200": "#FFE2B7",
      "300": "#FFD493",
      "400": "#FFC46B",
      "500": "#FFAF36",
      "600": "#FF9900",
      "700": "#D88100",
      "800": "#BA7002",
      "900": "#9C5E00",
      "1000": "#774700"
    },
    "pink": {
      "100": "#FFE5F9",
      "200": "#FFBCEE",
      "300": "#FFA0E7",
      "400": "#FF8AE1",
      "500": "#FF68D9",
      "600": "#FF3FCE",
      "700": "#DF32B3",
      "800": "#C22199",
      "900": "#A61381",
      "1000": "#79005B"
    },
    "red": {
      "100": "#FFF3F3",
      "200": "#FFD7D7",
      "300": "#FFB8B8",
      "400": "#FF9797",
      "500": "#FE5F5F",
      "600": "#FF2E2E",
      "700": "#CA1515",
      "800": "#9E0B0B",
      "900": "#750000",
      "1000": "#4E0000"
    },
    "yellow": {
      "100": "#FFF9DE",
      "200": "#FFF3B5",
      "300": "#FFED8C",
      "400": "#FFE871",
      "500": "#FFE24D",
      "600": "#FFD600",
      "700": "#DEBB00",
      "800": "#B99C03",
      "900": "#A18803",
      "1000": "#7D6A00"
    }
  },
  "brand": {
    "primary": {
      "100": "#F4F0FF",
      "200": "#E2D7FE",
      "300": "#C5AFFD",
      "400": "#A786FD",
      "500": "#8A5EFC",
      "600": "#6D36FB",
      "700": "#572BC9",
      "800": "#412097",
      "900": "#2C1664",
      "1000": "#160B32"
    },
    "secondary": {
      "100": "#F5FFEB",
      "200": "#EBFFD6",
      "300": "#D6FFAD",
      "400": "#C2FF85",
      "500": "#ADFF5C",
      "600": "#99FF33",
      "700": "#7ACC29",
      "800": "#5C991F",
      "900": "#3D6614",
      "1000": "#1F330A"
    }
  },
  "neutral": {
    "dark": {
      "0": "#0B0B0E",
      "100": "#0D0D12",
      "200": "#19191E",
      "300": "#252529",
      "400": "#343438",
      "500": "#414146",
      "600": "#505057",
      "700": "#5B5B61",
      "800": "#6D6D76",
      "900": "#797983",
      "1000": "#8B8B98",
      "1100": "#9D9DAB"
    },
    "light": {
      "0": "#FFFFFF",
      "100": "#F7F7FC",
      "200": "#EBEBF8",
      "300": "#DCDCF0",
      "400": "#BEBEDD",
      "500": "#A9A9CC",
      "600": "#9494B8",
      "700": "#8383A4",
      "800": "#777799",
      "900": "#626284",
      "1000": "#434360",
      "1100": "#28283B"
    }
  }
} as const

export const staticColor = {
  "aux": {
    "blue": {
      "icons": {
        "ghost": "#3399FF52",
        "on-surface": "#FFFFFF",
        "primary": "#3399FF"
      },
      "stroke": {
        "ghost": "#3399FF3D",
        "primary": "#3399FF",
        "secundary": "#ADD6FF",
        "tertiary": "#E9F4FF"
      },
      "surface": {
        "primary": "#3399FF"
      },
      "text": {
        "on-surface": "#FFFFFF"
      }
    },
    "green": {
      "icons": {
        "ghost": "#5EC34D52",
        "on-surface": "#FFFFFF",
        "primary": "#5EC34D"
      },
      "stroke": {
        "ghost": "#5EC34D3D",
        "primary": "#5EC34D",
        "secundary": "#A4F497",
        "tertiary": "#E5FFE1"
      },
      "surface": {
        "ghost": "#5EC34D14",
        "primary": "#5EC34D"
      },
      "text": {
        "on-surface": "#FFFFFF"
      }
    },
    "grey": {
      "icons": {
        "ghost": "#9494B852",
        "on-surface": "#FFFFFF",
        "secundary": "#A9A9CC"
      },
      "states": {
        "disable": "#9494B852"
      },
      "stroke": {
        "ghost": "#9494B83D"
      },
      "text": {
        "on-surface": "#FFFFFF",
        "secundary": "#A9A9CC"
      }
    },
    "orange": {
      "icons": {
        "ghost": "#FF990052",
        "on-surface": "#FFFFFF",
        "primary": "#FF9900"
      },
      "stroke": {
        "ghost": "#FF99003D",
        "primary": "#FF9900",
        "secundary": "#FFD493",
        "tertiary": "#FFF3E0"
      },
      "surface": {
        "primary": "#FF9900"
      },
      "text": {
        "on-surface": "#FFFFFF",
        "primary": "#FF9900"
      }
    },
    "pink": {
      "icons": {
        "ghost": "#FF3FCE52",
        "on-surface": "#FFFFFF",
        "primary": "#FF3FCE"
      },
      "states": {
        "disable": "#FF3FCE52"
      },
      "stroke": {
        "ghost": "#FF3FCE3D",
        "primary": "#FF3FCE",
        "secundary": "#FFA0E7",
        "tertiary": "#FFE5F9"
      },
      "surface": {
        "primary": "#FF3FCE"
      },
      "text": {
        "on-surface": "#FFFFFF"
      }
    },
    "red": {
      "icons": {
        "ghost": "#FF2E2E52",
        "on-surface": "#FFFFFF",
        "primary": "#FF2E2E"
      },
      "stroke": {
        "ghost": "#FF2E2E3D",
        "primary": "#FF2E2E",
        "secundary": "#FFB8B8",
        "tertiary": "#FFF3F3"
      },
      "surface": {
        "ghost": "#FF2E2E14",
        "primary": "#FF2E2E"
      },
      "text": {
        "on-surface": "#FFFFFF",
        "primary": "#FF2E2E"
      }
    },
    "yellow": {
      "icons": {
        "ghost": "#FFD60052",
        "on-surface": "#FFFFFF",
        "primary": "#FFD600"
      },
      "stroke": {
        "ghost": "#FFD6003D",
        "primary": "#FFD600",
        "secundary": "#FFED8C",
        "tertiary": "#FFF9DE"
      },
      "surface": {
        "primary": "#FFD600"
      },
      "text": {
        "on-surface": "#FFFFFF",
        "primary": "#FFD600"
      }
    }
  },
  "brand": {
    "accent": {
      "icons": {
        "ghost": "#99FF3652",
        "on-surface": "#19191E",
        "primary": "#99FF33"
      },
      "stroke": {
        "ghost": "#99FF363D",
        "primary": "#99FF33",
        "secundary": "#D6FFAD",
        "tertiary": "#F5FFEB"
      },
      "surface": {
        "ghost": "#99FF3614",
        "primary": "#99FF33"
      },
      "text": {
        "on-surface": "#19191E",
        "primary": "#99FF33"
      }
    },
    "core": {
      "icons": {
        "ghost": "#6D36FB52",
        "on-surface": "#FFFFFF",
        "primary": "#6D36FB"
      },
      "stroke": {
        "ghost": "#6D36FB3D",
        "primary": "#6D36FB",
        "secundary": "#C5AFFD",
        "tertiary": "#F4F0FF"
      },
      "surface": {
        "ghost": "#6D36FB14",
        "primary": "#6D36FB"
      },
      "text": {
        "on-surface": "#FFFFFF",
        "primary": "#6D36FB"
      }
    },
    "logo": {
      "shape": {
        "white": "#FFFFFF"
      }
    }
  },
  "effect": {
    "purple": {
      "20": "#6D36FB33",
      "40": "#6D36FB66",
      "60": "#6D36FB99",
      "80": "#6D36FBCC"
    }
  },
  "global": {
    "base": {
      "white": "#FFFFFF"
    },
    "bg": {
      "brand-primary": "#6D36FB",
      "brand-tertiary": "#FFFFFF"
    },
    "icons": {
      "brand-primary": "#6D36FB",
      "brand-tertiary": "#FFFFFF"
    },
    "surfaces": {
      "bg": {
        "aside": "#FFFFFF",
        "brand-primary": "#6D36FB",
        "primary": "#F7F7FC",
        "secondary": "#EBEBF8",
        "tertiary": "#626284"
      },
      "text": {
        "brand-primary": "#6D36FB",
        "brand-secondary": "#C5AFFD",
        "brand-tertiary": "#FFFFFF"
      }
    },
    "text": {
      "brand-primary": "#6D36FB",
      "brand-secondary": "#C5AFFD",
      "brand-tertiary": "#FFFFFF"
    }
  },
  "state": {
    "blue": {
      "quaternary": "#1571CD"
    },
    "green": {
      "quaternary": "#297A1B"
    },
    "orange": {
      "quaternary": "#BA7002"
    },
    "pink": {
      "quaternary": "#C22199"
    },
    "purple": {
      "quaternary": "#412097"
    },
    "red": {
      "quaternary": "#9E0B0B"
    },
    "yellow": {
      "quaternary": "#B99C03"
    }
  }
} as const

export const staticAlias = {
  "bg": {
    "branding-primary": "#6D36FB",
    "surface-aside": "#FFFFFF",
    "surface-primary": "#F7F7FC",
    "surface-secondary": "#EBEBF8",
    "surface-tertiary": "#626284"
  },
  "blue": {
    "quaternary": "#1571CD",
    "static": "#3399FF"
  },
  "brand": {
    "accent": {
      "primary": "#99FF33",
      "static": "#99FF33"
    },
    "core": {
      "primary": "#6D36FB",
      "static": "#6D36FB"
    }
  },
  "green": {
    "quaternary": "#297A1B",
    "static": "#5EC34D"
  },
  "on-active": "#FFFFFF",
  "orange": {
    "quaternary": "#BA7002",
    "static": "#FF9900"
  },
  "pink": {
    "quaternary": "#C22199",
    "static": "#FF3FCE"
  },
  "purple": {
    "quaternary": "#412097"
  },
  "red": {
    "quaternary": "#9E0B0B",
    "static": "#FF2E2E"
  },
  "surface": {
    "brand-core": {
      "default": "#6D36FB"
    }
  },
  "yellow": {
    "quaternary": "#B99C03",
    "static": "#FFD600"
  }
} as const
