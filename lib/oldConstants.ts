const brand = {
  // primary: '#30CEFF', // color in favicon - looks too bright when used a lot
  // primary: '#003b4d',
  // primary: '#0078CC',
  // primary: '#5348FF',
  primary: '#1ABC9C', // green that I like
  // primary: '#D42210', // red
  // primary: '#D96E0E', // orange
  // primary: '#9B59B6', //indigo
  // primary: '#6420E5', //purple
  secondary: '#EEF4F2', //whiteish
}

const figmaColors = {
  /* Gray 1 */
  gray1: '#131415',
  /* 60% Gray1 */
  gray1_60: 'rgba(19, 20, 21, 0.6)',
  /* Gray 2 */
  gray2: '#4F4F4F',
  /* Gray 3 */
  gray3: '#0D2629',
  /* Gray 4 */
  gray4: '#BDBDBD',
  /* Gray 5 */
  gray5: '#E0E0E0',
  /* Gray 6 */
  gray6: '#FAFAFA',
  /* White */
  white: '#FFFFFF',
  /* Red */
  red: '#EB5757',
  /* Orange */
  orange: '#F2994A',
  /* Yellow */
  yellow: '#F2C94C',
  /* Text Green */
  textGreen: '#175E1B',
  /* Green 1 */
  green1: '#219653',
  /* Green 2 */
  green2: '#27AE60',
  /* Green 3 */
  green3: '#1ABC9C',
  /* Green 4 */
  green4: '#1DD2AF',
  /* Blue 1 */
  blue1: '#45979A',
  /* Blue 2 */
  blue2: '#2D9CDB',
  /* Blue 3 */
  blue3: '#95E6FF',
  /* Purple 1 */
  purple1: '#9B51E0',
  /* Purple 2 */
  purple2: '#BB6BD9',
  /* Offwhite */
  offwhite: '#EEF4F2',
}

const colors = {
  ...figmaColors,
//   primary_light: `${lighten(0.55, figmaColors.green3)}`,
  primary: figmaColors.green3,
  secondary: figmaColors.offwhite,
  gray: figmaColors.gray6,
  black: figmaColors.gray1,
  white: figmaColors.white,
  bg_color: figmaColors.gray6,
  body_color: 'rgba(0,0,0,0.85)',
  link_color: figmaColors.textGreen,
//   link_color_hover: `${darken(0.07, figmaColors.textGreen)}`,
  green: figmaColors.green2,
  blue: figmaColors.blue2,
}

// const theme = {
//   colors,
//   fonts,
//   brand,
//   breakpoints: {
//     xs: '400px',
//     s: '600px',
//     m: '900px',
//     l: '1200px',
//   },
//   container: {
//     base: '100rem',
//     text: '55rem',
//   },
//   spacer: {
//     horizontal: '2rem',
//     vertical: '3rem',
//   },
//   transition: {
//     ease: 'all 200ms ease',
//   },
// }


export const constants = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/blog your pathPrefix should be "blog"
  siteTitle: 'Jordan Nielson', // Navigation and Site Title
  siteTitleAlt: 'The personal site of Jordan Nielson', // Alternative Site title for SEO
  siteTitleShort: 'Jordan Nielson - site', // short_name for manifest
  siteUrl: 'https://jnielson.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteLogo: 'images/logo.png', // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteDescription: 'The personal site of Jordan Nielson',
  author: 'Jordan Nielson', // Author for schemaORGJSONLD
  organization: 'The Church of Jesus Christ of Latter-day Saints',

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@jnielson94', // Twitter Username
  ogSiteName: 'Jordan Nielson - Site', // Facebook Site Name
  ogLanguage: 'en_US',
  ogImage:
    'https://jordans-images.netlify.app/opengraph?title=Jordan%20Nielson%27s%20Site',

  // Manifest and Progress color
  themeColor: '#1ABC9C',
  backgroundColor: '#fafafa',

  // Social component
  twitterUrl: 'https://twitter.com/jnielson94/',
  twitterHandle: '@jnielson94',
  github: 'https://github.com/jnielson94/',
  githubHandle: 'jnielson94',
}
