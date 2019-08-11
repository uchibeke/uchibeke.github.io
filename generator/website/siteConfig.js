/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [];

const siteConfig = {
  title:
    "Uchi Uchibeke | Founder, Developer, Speaker and Mentor" /* title for your website */,
  tagline: "Working hard rach day to become a better person",
  url: "https://uchi.uchibeke.com/" /* your website url */,
  baseUrl: "/" /* base url for your project */,
  customDocsPath: "about",
  // Used for publishing and more
  projectName: "uchi.uchibeke.com",
  organizationName: "uchibeke",
  headerLinks: [
    { href: "/", label: "Home" },
    { href: "/now", label: "Now" },
    { blog: true, label: "Blog" },
    { href: "https://www.linkedin.com/in/nickku/", label: "Bio" }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: "img/logo_transparent.png",
  footerIcon: "img/logo_transparent.png",
  favicon: "img/logo_transparent.png",

  /* colors for website */
  colors: {
    primaryColor: "#D84D17",
    secondaryColor: "#F18E4F"
  },

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: "Copyright © " + new Date().getFullYear() + " Uchi Uchibeke",

  // Add custom scripts here that would be placed in <script> tags
  scripts: [],
  ogImage: "img/logo_transparent.png",
  twitterImage: "img/logo_transparent.png",
  scrollToTop: true,
  twitterUsername: "uchiuchibeke",
  facebookAppId: "161774041190961",
  facebookPixelId: "1458496841044262",
  facebookComments: true,
  cleanUrl: true,
  gaTrackingId: "UA-93424215-1",
  twitter: true,
  blogSidebarCount: "ALL",
  disableHeaderTitle: true,
  stylesheets: [
    "https://code.getmdl.io/1.3.0/material.deep_purple-orange.min.css"
  ],
  wrapPagesHTML: "true",
  highlight: {
    theme: "xcode"
  }
};

module.exports = siteConfig;
