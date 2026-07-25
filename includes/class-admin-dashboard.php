<?php
/**
 * Admin dashboard for Timeline Builder Block.
 *
 * @package TimelineBuilderBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers and renders the plugin admin dashboard page.
 */
class Timeline_Builder_Block_Admin_Dashboard {

	/**
	 * Menu / page slug.
	 *
	 * @var string
	 */
	const SLUG = 'timeline-builder-block';

	/**
	 * Hook everything up.
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'register_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Register the top-level admin menu page.
	 *
	 * @return void
	 */
	public function register_menu() {
		add_menu_page(
			__( 'Timeline Builder', 'timeline-builder-block' ),
			__( 'Timeline Builder', 'timeline-builder-block' ),
			'manage_options',
			self::SLUG,
			array( $this, 'render_page' ),
			'dashicons-clock',
			58
		);
	}

	/**
	 * Enqueue dashboard styles only on our page.
	 *
	 * @param string $hook Current admin page hook.
	 * @return void
	 */
	public function enqueue_assets( $hook ) {
		if ( 'toplevel_page_' . self::SLUG !== $hook ) {
			return;
		}

		wp_enqueue_style(
			'timeline-builder-block-admin',
			TIMELINE_BUILDER_BLOCK_URL . 'includes/admin-dashboard.css',
			array(),
			TIMELINE_BUILDER_BLOCK_VERSION
		);
	}

	/**
	 * Get the active tab from the query string, validated.
	 *
	 * @return string
	 */
	private function get_active_tab() {
		$allowed = array( 'welcome', 'how-to-use', 'changelog' );
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only tab switch, no state change.
		$tab = isset( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : 'welcome';

		return in_array( $tab, $allowed, true ) ? $tab : 'welcome';
	}

	/**
	 * Build a tab URL.
	 *
	 * @param string $tab Tab slug.
	 * @return string
	 */
	private function tab_url( $tab ) {
		return esc_url(
			add_query_arg(
				array(
					'page' => self::SLUG,
					'tab'  => $tab,
				),
				admin_url( 'admin.php' )
			)
		);
	}

	/**
	 * Render the dashboard page.
	 *
	 * @return void
	 */
	public function render_page() {
		$active = $this->get_active_tab();

		$tabs = array(
			'welcome'    => __( 'Welcome', 'timeline-builder-block' ),
			'how-to-use' => __( 'How to Use', 'timeline-builder-block' ),
			'changelog'  => __( 'Changelog', 'timeline-builder-block' ),
		);
		?>
		<div class="tlbb-admin">
			<header class="tlbb-admin__hero">
				<div class="tlbb-admin__brand">
					<span class="tlbb-admin__logo dashicons dashicons-clock"></span>
					<div>
						<h1><?php esc_html_e( 'Timeline Builder Block', 'timeline-builder-block' ); ?></h1>
						<p><?php esc_html_e( 'Build beautiful, responsive animated timelines — natively in Gutenberg.', 'timeline-builder-block' ); ?></p>
					</div>
				</div>
				<span class="tlbb-admin__version">
					<?php
					printf(
						/* translators: %s: version number */
						esc_html__( 'v%s', 'timeline-builder-block' ),
						esc_html( TIMELINE_BUILDER_BLOCK_VERSION )
					);
					?>
				</span>
			</header>

			<nav class="tlbb-admin__tabs" aria-label="<?php esc_attr_e( 'Dashboard sections', 'timeline-builder-block' ); ?>">
				<?php foreach ( $tabs as $slug => $label ) : ?>
					<a
						class="tlbb-admin__tab <?php echo $active === $slug ? 'is-active' : ''; ?>"
						href="<?php echo $this->tab_url( $slug ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in tab_url(). ?>"
						<?php echo $active === $slug ? 'aria-current="page"' : ''; ?>
					>
						<?php echo esc_html( $label ); ?>
					</a>
				<?php endforeach; ?>
			</nav>

			<main class="tlbb-admin__panel">
				<?php
				switch ( $active ) {
					case 'how-to-use':
						$this->render_how_to_use();
						break;
					case 'changelog':
						$this->render_changelog();
						break;
					default:
						$this->render_welcome();
						break;
				}
				?>
			</main>

			<footer class="tlbb-admin__footer">
				<p><?php esc_html_e( 'Timeline Builder Block — made for the block editor.', 'timeline-builder-block' ); ?></p>
			</footer>
		</div>
		<?php
	}

	/**
	 * Welcome tab content.
	 *
	 * @return void
	 */
	private function render_welcome() {
		$editor_url = esc_url( admin_url( 'post-new.php?post_type=page' ) );

		$features = array(
			array(
				'icon'  => 'layout',
				'title' => __( 'Three layouts', 'timeline-builder-block' ),
				'text'  => __( 'Vertical alternating, vertical one-sided, and horizontal scroll-snap.', 'timeline-builder-block' ),
			),
			array(
				'icon'  => 'images-alt2',
				'title' => __( 'Rich items', 'timeline-builder-block' ),
				'text'  => __( 'Title, date, description, icon, image, and link for every entry.', 'timeline-builder-block' ),
			),
			array(
				'icon'  => 'controls-play',
				'title' => __( 'Scroll animations', 'timeline-builder-block' ),
				'text'  => __( 'Fade, slide, and zoom reveals — with reduced-motion respected.', 'timeline-builder-block' ),
			),
			array(
				'icon'  => 'admin-appearance',
				'title' => __( 'Full color control', 'timeline-builder-block' ),
				'text'  => __( 'Style markers, lines, cards, and text to match your brand.', 'timeline-builder-block' ),
			),
			array(
				'icon'  => 'smartphone',
				'title' => __( 'Responsive', 'timeline-builder-block' ),
				'text'  => __( 'Alternating layouts collapse cleanly to one column on mobile.', 'timeline-builder-block' ),
			),
			array(
				'icon'  => 'shield',
				'title' => __( 'Secure & native', 'timeline-builder-block' ),
				'text'  => __( 'Server-side rendered with fully escaped output. No bloat.', 'timeline-builder-block' ),
			),
		);
		?>
		<section class="tlbb-admin__welcome">
			<div class="tlbb-admin__welcome-intro">
				<h2><?php esc_html_e( 'Welcome aboard 👋', 'timeline-builder-block' ); ?></h2>
				<p><?php esc_html_e( 'Thanks for installing Timeline Builder Block. Add the “Timeline Builder” block to any page or post and you are ready to go — three sample items are included so you can see it in action instantly.', 'timeline-builder-block' ); ?></p>
				<a class="tlbb-admin__btn" href="<?php echo $editor_url; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above. ?>">
					<span class="dashicons dashicons-plus-alt2"></span>
					<?php esc_html_e( 'Create a new page', 'timeline-builder-block' ); ?>
				</a>
			</div>

			<div class="tlbb-admin__grid">
				<?php foreach ( $features as $feature ) : ?>
					<div class="tlbb-admin__card">
						<span class="tlbb-admin__card-icon dashicons dashicons-<?php echo esc_attr( $feature['icon'] ); ?>"></span>
						<h3><?php echo esc_html( $feature['title'] ); ?></h3>
						<p><?php echo esc_html( $feature['text'] ); ?></p>
					</div>
				<?php endforeach; ?>
			</div>
		</section>
		<?php
	}

	/**
	 * How to Use tab content.
	 *
	 * @return void
	 */
	private function render_how_to_use() {
		$steps = array(
			array(
				'title' => __( 'Add the block', 'timeline-builder-block' ),
				'text'  => __( 'Edit any page or post, click the + inserter, search for “Timeline Builder”, and insert it. Three sample items load automatically.', 'timeline-builder-block' ),
			),
			array(
				'title' => __( 'Edit your items', 'timeline-builder-block' ),
				'text'  => __( 'Click any title, date, or description to type directly. Use the toolbar on each card to move items up/down or remove them, and “Add timeline item” to add more.', 'timeline-builder-block' ),
			),
			array(
				'title' => __( 'Add media & links', 'timeline-builder-block' ),
				'text'  => __( 'Inside each item you can add an image from the media library, set a Dashicon name for icon markers, and add a link with custom text.', 'timeline-builder-block' ),
			),
			array(
				'title' => __( 'Pick a layout', 'timeline-builder-block' ),
				'text'  => __( 'Open the block sidebar (Settings). Under “Layout”, choose vertical alternating, vertical one-sided, or horizontal, and select a marker style: dot, ring, or icon.', 'timeline-builder-block' ),
			),
			array(
				'title' => __( 'Set animation', 'timeline-builder-block' ),
				'text'  => __( 'In the “Animation” panel, choose a scroll reveal (fade up, fade in, slide in, zoom in) and tune its duration. Motion is disabled automatically for visitors who prefer reduced motion.', 'timeline-builder-block' ),
			),
			array(
				'title' => __( 'Style the colors', 'timeline-builder-block' ),
				'text'  => __( 'Use the “Colors” panel to set the accent/marker, line, card background, title, date, and description colors so the timeline matches your theme.', 'timeline-builder-block' ),
			),
		);
		?>
		<section class="tlbb-admin__howto">
			<h2><?php esc_html_e( 'How to use Timeline Builder', 'timeline-builder-block' ); ?></h2>
			<p class="tlbb-admin__lede"><?php esc_html_e( 'From zero to a polished timeline in six short steps.', 'timeline-builder-block' ); ?></p>

			<ol class="tlbb-admin__steps">
				<?php foreach ( $steps as $i => $step ) : ?>
					<li class="tlbb-admin__step">
						<span class="tlbb-admin__step-num"><?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
						<div class="tlbb-admin__step-body">
							<h3><?php echo esc_html( $step['title'] ); ?></h3>
							<p><?php echo esc_html( $step['text'] ); ?></p>
						</div>
					</li>
				<?php endforeach; ?>
			</ol>

			<div class="tlbb-admin__tip">
				<span class="dashicons dashicons-lightbulb"></span>
				<p><?php esc_html_e( 'Tip: The horizontal layout is swipeable on touch devices and snaps to each card. The alternating layout automatically becomes a single clean column on small screens.', 'timeline-builder-block' ); ?></p>
			</div>
		</section>
		<?php
	}

	/**
	 * Changelog tab content.
	 *
	 * @return void
	 */
	private function render_changelog() {
		$releases = array(
			array(
				'version' => '1.0.0',
				'date'    => __( 'Initial release', 'timeline-builder-block' ),
				'tag'     => 'new',
				'changes' => array(
					__( 'Native Gutenberg timeline block with a single-block repeater editor.', 'timeline-builder-block' ),
					__( 'Three layouts: vertical alternating, vertical one-sided, and horizontal.', 'timeline-builder-block' ),
					__( 'Per-item title, date, description, Dashicon, image, and link.', 'timeline-builder-block' ),
					__( 'Scroll-triggered animations (fade up, fade in, slide in, zoom in) with reduced-motion support.', 'timeline-builder-block' ),
					__( 'Full color controls and dot / ring / icon marker styles.', 'timeline-builder-block' ),
					__( 'Responsive layouts and secure server-side rendering.', 'timeline-builder-block' ),
					__( 'Three sample items pre-loaded on insert, plus an admin dashboard.', 'timeline-builder-block' ),
				),
			),
		);

		$tag_labels = array(
			'new'      => __( 'New', 'timeline-builder-block' ),
			'improved' => __( 'Improved', 'timeline-builder-block' ),
			'fixed'    => __( 'Fixed', 'timeline-builder-block' ),
		);
		?>
		<section class="tlbb-admin__changelog">
			<h2><?php esc_html_e( 'Changelog', 'timeline-builder-block' ); ?></h2>
			<p class="tlbb-admin__lede"><?php esc_html_e( 'Every notable change, newest first.', 'timeline-builder-block' ); ?></p>

			<div class="tlbb-admin__releases">
				<?php foreach ( $releases as $release ) : ?>
					<article class="tlbb-admin__release">
						<div class="tlbb-admin__release-head">
							<h3><?php echo esc_html( $release['version'] ); ?></h3>
							<?php if ( ! empty( $release['tag'] ) && isset( $tag_labels[ $release['tag'] ] ) ) : ?>
								<span class="tlbb-admin__badge tlbb-admin__badge--<?php echo esc_attr( $release['tag'] ); ?>">
									<?php echo esc_html( $tag_labels[ $release['tag'] ] ); ?>
								</span>
							<?php endif; ?>
							<span class="tlbb-admin__release-date"><?php echo esc_html( $release['date'] ); ?></span>
						</div>
						<ul>
							<?php foreach ( $release['changes'] as $change ) : ?>
								<li><?php echo esc_html( $change ); ?></li>
							<?php endforeach; ?>
						</ul>
					</article>
				<?php endforeach; ?>
			</div>
		</section>
		<?php
	}
}
