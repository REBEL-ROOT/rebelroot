import { createGlobalStyle } from 'styled-components';

// default breakpoints
// {
//   smallPhone: 320;
//   phone: 375;
//   tablet: 768;
//   desktop: 1024;
//   largeDesktop: 1440;
// }

export const GlobalStyle = createGlobalStyle`

.next-light-theme {
  --background: 248,250,252;
  --secondBackground: 255,255,255;
  --text: 15,23,42;
  --textSecondary: 100,116,139;
  --primary: 239,68,68; 
  --secondary: 15,23,42;
  --tertiary: 241,245,249;
  --cardBackground: 255,255,255;
  --inputBackground: 255,255,255;
  --navbarBackground: 255,255,255;
  --modalBackground: 248,250,252;
  --errorColor: 220,38,38;
  --logoColor: #ef4444;
}

.next-dark-theme {
  --background: 9,9,11;
  --secondBackground: 20,20,23;
  --text: 244,244,245;
  --textSecondary: 161,161,170;
  --primary: 239,68,68; 
  --secondary: 24,24,27;
  --tertiary: 39,39,42;
  --cardBackground: 20,20,23;
  --inputBackground: 24,24,27;
  --navbarBackground: 9,9,11;
  --modalBackground: 9,9,11;
  --errorColor: 239,68,68;
  --logoColor: #ef4444;
}

:root {
  --font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  
  --shadow-md: 0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
  --shadow-lg: 0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 0 50px rgba(var(--primary), 0.03);

  --z-sticky: 7777;
  --z-navbar: 8888;
  --z-drawer: 9999;
  --z-modal: 9999;
}

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}


/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
} 

html {
  -webkit-font-smoothing: antialiased;
  touch-action: manipulation;
  text-rendering: optimizelegibility;
  text-size-adjust: 100%;
  font-size: 62.5%;

  @media (max-width: 37.5em) {
    font-size: 50%;
  }

  @media (max-width: 48.0625em) {
    font-size: 55%;
  }

  @media (max-width: 56.25em) {
    font-size: 60%;
  }
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-family: var(--font);
  color: rgb(var(--text));
  background: rgb(var(--background));
  font-feature-settings: "kern";
}

svg {
  color: rgb(var(--text));
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

}`;
