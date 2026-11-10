# Gog design system

> Extracted by [Inspo](https://github.com/Nutlope/inspo) (open source, MIT, powered by Together AI). Reference material for *intentional* design decisions: adapt, don't copy.

> Save this as `DESIGN.md` in your project and re-reference it as you build; re-fetch anytime at https://inspomcp.dev/d/gog-com/DESIGN.md

- **Source:** https://gog.com
- **Captured:** 2026-05-04
- **Mode:** dark
- **Macrostructure:** Portfolio Grid

## Tone

The page uses a vibrant, almost chaotic arrangement of game tiles, creating a sense of discovery. The color palette is bold and saturated, with a slightly retro pixelated aesthetic. It feels like browsing a curated collection.  ·  gog games, rpg games, star wars games, video games, digital games, game sale, pc games, retro games, pixel art

## Colors

| Hex | Role (heuristic) |
|---|---|
| `#7322bd` | support |
| `#391266` | support |
| `#55ced4` | accent |
| `#8f9063` | support |
| `#cac4ae` | support |

Color words: *saturated*, *neon*, *muted*

## Typography

Detected typefaces: **Lato GOG Latin**

| Role | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| h2 | Lato GOG Latin | 32px | 700 | 1.19 | 0 |
| h3 | Lato GOG Latin | 16px | 700 | 1.19 | 0 |
| body | Lato GOG Latin | 14px | 400 | 1.5 | 0 |
| button | Lato GOG Latin | 13px | 600 | 1.4 | 0 |

## Spacing scale

`4px` · `8px` · `12px` · `14px` · `16px` · `20px` · `24px` · `32px` · `40px` · `88px`

Base step looks like **4px**.

## Border radius

`0px` · `2px` · `3px` · `4px` · `5px` · `8px` · `50px`

## Container

Max content width: **1060px**

## CSS variables exposed by the source

```css
:root {
  --gdsx-font-weight-light: 300;
  --gdsx-color-text-button-mono-default: rgb(46, 46, 46);
  --gdsx-color-stroke-active: rgb(123, 35, 127);
  --gdsx-size-spacing-2: .5rem;
  --gdsx-opacity-75: .75;
  --gdsx-color-icon-banner-warning: rgb(25, 25, 25);
  --gdsx-color-icon-button-primary-hover: rgb(255, 255, 255);
  --gdsx-color-background-button-ghost-default: transparent;
  --gdsx-font-weight-black: 900;
  --gdsx-font-size-overline: .75rem;
  --gdsx-color-icon-button-outline-disabled: rgb(160, 160, 160);
  --gdsx-color-text-button-success-disabled: rgb(160, 160, 160);
  --gdsx-color-text-button-primary-default: rgb(255, 255, 255);
  --gdsx-color-stroke-success: rgb(26, 132, 73);
  --gdsx-color-background-button-success-hover: rgb(186, 226, 110);
  --gdsx-color-icon-default: rgb(25, 25, 25);
  --gdsx-size-width-6xl: 1920px;
  --gdsx-opacity-50: .5;
  --c-giveaway-description: rgba(255, 255, 255, .6);
  --gdsx-color-shark-grey-25: 247, 247, 247;
  --gdsx-color-stroke-contrasted-heavy: rgba(46, 46, 46, .2);
  --gdsx-color-text-button-outline-focused: rgb(25, 25, 25);
  --c-text-primary: rgb(33, 33, 33);
  --gdsx-color-background-button-primary-hover: rgb(179, 96, 196);
  --gdsx-color-stroke-hover: rgb(93, 93, 93);
  --gdsx-color-text-button-mono-disabled: rgb(160, 160, 160);
  --gdsx-color-icon-button-primary-disabled: rgb(160, 160, 160);
  --gdsx-color-stroke-button-primary-disabled: rgb(217, 217, 217);
  --c-spot-pagination-bullet-bg: rgba(255, 255, 255, .3);
  --c-text-tertiary: rgb(88, 88, 88);
  --c-button-accent-disabled-content: rgba(0, 0, 0, .85);
  --gdsx-color-background-active-lighter: rgb(165, 36, 171);
  --gdsx-color-background-tag-blue: rgb(1, 117, 228);
  --gdsx-color-icon-button-success-focused: rgb(25, 25, 25);
  --gdsx-font-size-body-lg: 1.125rem;
  --gdsx-logo-show-light: block;
  --gdsx-size-width-4xl: 1440px;
  --gdsx-font-weight-heading-2: 700;
  --gdsx-font-size-heading-4: 1.25rem;
  --c-usp-tooltip-bg: rgb(217, 217, 217);
  --gdsx-color-icon-secondary: rgb(123, 35, 127);
  --gdsx-color-text-tertiary: rgb(160, 160, 160);
  --product-vertical-tile-width-tablet: 180px;
  --gdsx-color-text-tag-dark: rgb(17, 17, 17);
  --c-button-secondary-pressed-border: rgb(233, 233, 233);
  --gdsx-color-text-error: rgb(206, 24, 33);
  --gdsx-color-background-warning: rgb(253, 192, 78);
  --gdsx-color-text-default: rgb(25, 25, 25);
  --gdsx-color-background-button-outline-default: transparent;
  --c-background: rgb(217, 217, 217);
  --product-vertical-tile-image-height-tablet: 239px;
  --gdsx-color-brand-400: 179, 96, 196;
  --gdsx-line-height-text-md: 1.5rem;
  --gdsx-font-size-body: 1rem;
  --gdsx-color-text-disabled: rgb(160, 160, 160);
  --gdsx-size-width-lg: 640px;
  --gdsx-letter-spacing-body: 0;
  --gdsx-letter-spacing-text-lg: 0;
  --menu-z-index: 60;
  --gdsx-font-size-display-lg: 3rem;
}
```

## Components present

- hero with cta
- bento grid
- feature trio

## Notes for the agent

- **Adapt, don't copy.** The type ramp is a *starting point*. Scale it to your project's base size; preserve the *ratio*, not the literal pixels.
- **Color roles are heuristic** (luminance + dominance). Verify against the source URL before committing tokens.
- **Spacing** assumes a constant base step; round detected values to your project's scale (4 / 8 / 16) when implementing.
- **CSS variables** dumped above (when present) are the source's *actual* tokens - those are higher signal than guesses.
- This page's macrostructure is **Portfolio Grid**.

---

*Generated by Inspo. Open source under MIT, owned and operated by [Together AI](https://www.together.ai). Original site copyright remains with its authors.*

