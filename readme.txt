=== WBD Timeline Block For Gutenberg ===
Contributors: wpbranddigital25
Tags: timeline, gutenberg, block, roadmap, history
Requires at least: 6.5
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 1.0.2
License: GPLv2 or later 
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Build beautiful, responsive animated timelines with a native Gutenberg block.

== Description == 

WBD Timeline Block for Gutenberg is the most intuitive, lightweight, and customizable WordPress timeline plugin designed specifically for the modern block editor. Whether you need to showcase a company history, a project roadmap, event schedules, or personal milestones, this plugin allows you to build beautiful, responsive, and animated timelines without writing a single line of code or relying on heavy page builders.

Built entirely with native WordPress Gutenberg components, the WBD Timeline Block ensures zero bloat, lightning-fast performance, and a seamless editing experience inside the block editor. 

**Key Features for a Perfect Timeline:**

*   **3 Stunning Layouts:** Choose from Vertical Alternating (zigzag), Vertical One-sided, and a touch-friendly Horizontal slider layout with left/right navigation.
*   **Responsive Control:** Set custom columns for the horizontal slider (Desktop, Tablet, Mobile) and watch vertical timelines automatically adapt to smaller screens.
*   **Highly Customizable Content:** Each timeline card supports a Custom Date/Label, Title, Description, Image (with position and object-fit control), Call-to-Action Link, and a custom Marker Icon.
*   **Advanced Typography & Design:** Fully control font families, responsive font sizes, link padding, border radius, and accent colors for every single element.
*   **Scroll-Triggered Animations:** Bring your history or roadmap to life with smooth reveal animations (Fade Up, Fade In, Slide In, Zoom In) as users scroll down the page.
*   **Accessible & Performance-Optimized:** Respects `prefers-reduced-motion` settings for accessibility. Powered by vanilla JS and IntersectionObserver—no heavy jQuery libraries.
*   **Server-Side Rendered:** Ensures SEO-friendly HTML markup, dynamic CSS variable injection, and maximum security.

### Where can you use WBD Timeline Block?

* Showcase tutorial/process steps in timeline format.
* Create a program timeline.
* Represent history.
* Create events/appointments timeline.
* Job stories/achievements timeline.
* Personal story timeline.
* Product roadmap.


== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/wbd-timeline-builder` directory, or install through the WordPress plugins screen.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. In the block editor, add the "WBD Timeline Builder" block and start adding items.

== Development ==

Public source code repository:
https://github.com/wpbranddigital/timeline-builder-block

Build Instructions:

1. npm install
2. npm run build
3. npm run start (development)
WBD Timeline Builder is built using @wordpress/scripts.

== Frequently Asked Questions ==

= Does this work with the Site Editor (FSE)? =

Yes. It is a standard registered block and works anywhere blocks are supported.

= Are animations accessible? =

Yes. Animations are disabled automatically when the visitor has "reduce motion" enabled in their OS.

= Does it require any external libraries? =

No. It uses only native WordPress packages and vanilla JavaScript.


== Changelog ==

= 1.0.2 =
* Added responsive font sizes for typography.
* Added responsive spacing for links.
* Added responsive image sizing controls.
* Added 3rd marker type (icon).
* Updated plugin display name to WBD Timeline Builder and slug/textdomain to wbd-timeline-builder for WordPress.org compliance.

= 1.0.1 =
* Updated plugin display name to WBD Timeline Builder and slug/textdomain to wbd-timeline-builder for WordPress.org compliance.

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 1.0.1 =
Updated plugin display name and text domain for WordPress.org compliance.

= 1.0.0 =
Initial release.
