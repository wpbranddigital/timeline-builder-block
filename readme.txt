=== Timeline Builder Block ===
Contributors: wpbranddigital25
Tags: timeline, gutenberg, block, roadmap, history
Requires at least: 6.5
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later 
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Build beautiful, responsive animated timelines with a native Gutenberg block.

== Description ==

Timeline Builder Block is a lightweight, fully native Gutenberg block for creating animated timelines. It is built with the WordPress block editor's own components — no page builders, no bloat.

**Features**

* Three layouts: vertical alternating, vertical one-sided, and horizontal (scroll-snap).
* Add, reorder, and remove timeline items directly in the editor.
* Each item supports a title, date/label, description, icon (Dashicon), image, and link.
* Scroll-triggered animations: fade up, fade in, slide in, zoom in — powered by IntersectionObserver.
* Respects `prefers-reduced-motion` for accessibility.
* Full color controls: accent/markers, line, card background, title, date, and text.
* Marker styles: dot, ring, or icon.
* Fully responsive — alternating layout collapses to a clean one-sided layout on mobile.
* Server-side rendered for clean, secure, escaped output.
* Supports wide and full alignment, spacing controls, and block anchors.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/timeline-builder-block` directory, or install through the WordPress plugins screen.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. In the block editor, add the "Timeline Builder" block and start adding items.

== Development ==

Public source code repository:
https://github.com/wpbranddigital/timeline-builder-block

Build Instructions:

1. npm install
2. npm run build
3. npm run start (development)
Timeline Builder Block is built using @wordpress/scripts.

== Frequently Asked Questions ==

= Does this work with the Site Editor (FSE)? =

Yes. It is a standard registered block and works anywhere blocks are supported.

= Are animations accessible? =

Yes. Animations are disabled automatically when the visitor has "reduce motion" enabled in their OS.

= Does it require any external libraries? =

No. It uses only native WordPress packages and vanilla JavaScript.


== Changelog ==

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 1.0.0 =
Initial release.
