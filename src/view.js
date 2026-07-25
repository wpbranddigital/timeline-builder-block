/**
 * Frontend behavior: reveal timeline items on scroll using IntersectionObserver.
 * Respects prefers-reduced-motion.
 */
( function () {
	function init() {
		const timelines = document.querySelectorAll( '.tlbb-timeline' );
		if ( ! timelines.length ) {
			return;
		}

		const prefersReduced =
			window.matchMedia &&
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

		timelines.forEach( ( timeline ) => {
			const animation = timeline.getAttribute( 'data-animation' ) || 'none';
			const items = timeline.querySelectorAll( '.tlbb-item' );

			if ( animation === 'none' || prefersReduced || ! ( 'IntersectionObserver' in window ) ) {
				items.forEach( ( item ) => item.classList.add( 'tlbb-in-view' ) );
				return;
			}

			const observer = new IntersectionObserver(
				( entries, obs ) => {
					entries.forEach( ( entry ) => {
						if ( entry.isIntersecting ) {
							entry.target.classList.add( 'tlbb-in-view' );
							obs.unobserve( entry.target );
						}
					} );
				},
				{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
			);

			items.forEach( ( item ) => observer.observe( item ) );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
