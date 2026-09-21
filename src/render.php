<?php
/**
 * Server-side rendering for the WBD Timeline Builder block.
 *
 * @package WBDTimelineBuilder
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content.
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$tlbb_items = isset( $attributes['items'] ) && is_array( $attributes['items'] ) ? $attributes['items'] : array();

if ( empty( $tlbb_items ) ) {
	return;
}

$tlbb_layout      = isset( $attributes['layout'] ) ? sanitize_html_class( $attributes['layout'] ) : 'vertical-alternate';
$tlbb_marker      = isset( $attributes['markerStyle'] ) ? sanitize_html_class( $attributes['markerStyle'] ) : 'dot';
$tlbb_animation   = isset( $attributes['animation'] ) ? sanitize_html_class( $attributes['animation'] ) : 'fade-up';
$tlbb_duration    = isset( $attributes['animationDuration'] ) ? absint( $attributes['animationDuration'] ) : 600;
$tlbb_img_pos     = isset( $attributes['imagePosition'] ) ? sanitize_html_class( $attributes['imagePosition'] ) : 'top';

$tlbb_style_map = array(
	'--tlbb-line'    => isset( $attributes['lineColor'] ) ? $attributes['lineColor'] : '#e2e8f0',
	'--tlbb-accent'  => isset( $attributes['accentColor'] ) ? $attributes['accentColor'] : '#4f46e5',
	'--tlbb-card-bg' => isset( $attributes['cardBackground'] ) ? $attributes['cardBackground'] : '#ffffff',
	'--tlbb-title'   => isset( $attributes['titleColor'] ) ? $attributes['titleColor'] : '#0f172a',
	'--tlbb-date'    => isset( $attributes['dateColor'] ) ? $attributes['dateColor'] : '#64748b',
	'--tlbb-text'    => isset( $attributes['textColor'] ) ? $attributes['textColor'] : '#475569',
	'--tlbb-duration' => $tlbb_duration . 'ms',
);

$responsive_attrs = array(
	'dateFontSize'     => 'date-fs',
	'titleFontSize'    => 'title-fs',
	'descFontSize'     => 'desc-fs',
	'imageWidth'       => 'img-w',
	'imageHeight'      => 'img-h',
	'linkFontSize'     => 'link-fs',
	'linkPadding'      => 'link-pad',
);

if ( ! function_exists( 'tlbb_box_to_string' ) ) {
	function tlbb_box_to_string( $box ) {
		if ( empty( $box ) ) {
			return '';
		}
		if ( is_string( $box ) ) {
			return $box;
		}
		if ( is_array( $box ) ) {
			$top    = isset( $box['top'] ) ? $box['top'] : '0';
			$right  = isset( $box['right'] ) ? $box['right'] : '0';
			$bottom = isset( $box['bottom'] ) ? $box['bottom'] : '0';
			$left   = isset( $box['left'] ) ? $box['left'] : '0';
			return sprintf( '%s %s %s %s', $top, $right, $bottom, $left );
		}
		return '';
	}
}

foreach ( $responsive_attrs as $attr_key => $css_prefix ) {
	if ( ! empty( $attributes[ $attr_key ] ) && is_array( $attributes[ $attr_key ] ) ) {
		foreach ( array( 'desktop', 'tablet', 'mobile' ) as $device ) {
			if ( ! empty( $attributes[ $attr_key ][ $device ] ) ) {
				$val = $attributes[ $attr_key ][ $device ];
				if ( 'linkPadding' === $attr_key ) {
					$val = tlbb_box_to_string( $val );
				}
				$tlbb_style_map[ '--tlbb-' . $css_prefix . '-' . $device ] = $val;
			}
		}
	}
}

if ( ! empty( $attributes['linkColor'] ) ) {
	$tlbb_style_map['--tlbb-link-color'] = $attributes['linkColor'];
}
if ( ! empty( $attributes['linkBgColor'] ) ) {
	$tlbb_style_map['--tlbb-link-bg'] = $attributes['linkBgColor'];
}
if ( ! empty( $attributes['linkBorderRadius'] ) ) {
	$tlbb_style_map['--tlbb-link-br'] = $attributes['linkBorderRadius'];
}
if ( ! empty( $attributes['dateFontFamily'] ) ) {
	$tlbb_style_map['--tlbb-date-ff'] = $attributes['dateFontFamily'];
}
if ( ! empty( $attributes['titleFontFamily'] ) ) {
	$tlbb_style_map['--tlbb-title-ff'] = $attributes['titleFontFamily'];
}
if ( ! empty( $attributes['descFontFamily'] ) ) {
	$tlbb_style_map['--tlbb-desc-ff'] = $attributes['descFontFamily'];
}
if ( ! empty( $attributes['linkFontFamily'] ) ) {
	$tlbb_style_map['--tlbb-link-ff'] = $attributes['linkFontFamily'];
}
if ( ! empty( $attributes['imageObjectFit'] ) ) {
	$tlbb_style_map['--tlbb-img-fit'] = $attributes['imageObjectFit'];
}
if ( ! empty( $attributes['columns'] ) && is_array( $attributes['columns'] ) ) {
	$tlbb_style_map['--tlbb-cols-desktop'] = isset( $attributes['columns']['desktop'] ) ? $attributes['columns']['desktop'] : 3;
	$tlbb_style_map['--tlbb-cols-tablet']  = isset( $attributes['columns']['tablet'] ) ? $attributes['columns']['tablet'] : 2;
	$tlbb_style_map['--tlbb-cols-mobile']  = isset( $attributes['columns']['mobile'] ) ? $attributes['columns']['mobile'] : 1;
}

$tlbb_inline_style = '';
foreach ( $tlbb_style_map as $tlbb_prop => $tlbb_val ) {
	$tlbb_inline_style .= $tlbb_prop . ':' . esc_attr( $tlbb_val ) . ';';
}

$tlbb_wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => sprintf(
			'tlbb-timeline tlbb-layout-%1$s tlbb-marker-%2$s tlbb-anim-%3$s',
			$tlbb_layout,
			$tlbb_marker,
			$tlbb_animation
		),
		'style' => $tlbb_inline_style,
		'data-animation' => $tlbb_animation,
	)
);

/**
 * Allowed inline HTML for RichText fields.
 */
$tlbb_allowed_inline = array(
	'strong' => array(),
	'b'      => array(),
	'em'     => array(),
	'i'      => array(),
	'br'     => array(),
	'a'      => array(
		'href'   => true,
		'rel'    => true,
		'target' => true,
	),
);
?>
<div <?php echo wp_kses_data( $tlbb_wrapper_attributes ); ?>>
	<?php if ( 'horizontal' === $tlbb_layout ) : ?>
		<div class="tlbb-nav-prev" aria-label="Previous"><span class="dashicons dashicons-arrow-left-alt2"></span></div>
		<div class="tlbb-nav-next" aria-label="Next"><span class="dashicons dashicons-arrow-right-alt2"></span></div>
	<?php endif; ?>
	<div class="tlbb-track" aria-hidden="true"></div>
	<div class="tlbb-items">
		<?php foreach ( $tlbb_items as $tlbb_index => $tlbb_item ) : ?>
			<?php
			$tlbb_title   = isset( $tlbb_item['title'] ) ? $tlbb_item['title'] : '';
			$tlbb_date    = isset( $tlbb_item['date'] ) ? $tlbb_item['date'] : '';
			$tlbb_desc    = isset( $tlbb_item['description'] ) ? $tlbb_item['description'] : '';
			$tlbb_icon    = isset( $tlbb_item['iconDashicon'] ) ? sanitize_html_class( $tlbb_item['iconDashicon'] ) : 'yes';
			$tlbb_img     = isset( $tlbb_item['imageUrl'] ) ? esc_url( $tlbb_item['imageUrl'] ) : '';
			$tlbb_img_alt = isset( $tlbb_item['imageAlt'] ) ? esc_attr( $tlbb_item['imageAlt'] ) : '';
			$tlbb_lurl    = isset( $tlbb_item['linkUrl'] ) ? esc_url( $tlbb_item['linkUrl'] ) : '';
			$tlbb_ltext   = isset( $tlbb_item['linkText'] ) ? $tlbb_item['linkText'] : '';
			$tlbb_delay   = (int) $tlbb_index * 90;
			?>
			<div class="tlbb-item" style="--tlbb-delay:<?php echo esc_attr( $tlbb_delay ); ?>ms;">
				<div class="tlbb-marker" aria-hidden="true">
					<?php if ( 'icon' === $tlbb_marker ) : ?>
						<span class="dashicons dashicons-<?php echo esc_attr( $tlbb_icon ); ?>"></span>
					<?php endif; ?>
				</div>
				<div class="tlbb-card">
					<?php if ( 'top' === $tlbb_img_pos && '' !== $tlbb_img ) : ?>
						<div class="tlbb-image">
							<img src="<?php echo esc_url( $tlbb_img ); ?>" alt="<?php echo esc_attr( $tlbb_img_alt ); ?>" loading="lazy" />
						</div>
					<?php endif; ?>

					<?php if ( '' !== trim( wp_strip_all_tags( $tlbb_date ) ) ) : ?>
						<span class="tlbb-date"><?php echo wp_kses( $tlbb_date, $tlbb_allowed_inline ); ?></span>
					<?php endif; ?>

					<?php if ( '' !== trim( wp_strip_all_tags( $tlbb_title ) ) ) : ?>
						<h3 class="tlbb-title"><?php echo wp_kses( $tlbb_title, $tlbb_allowed_inline ); ?></h3>
					<?php endif; ?>

					<?php if ( 'after-title' === $tlbb_img_pos && '' !== $tlbb_img ) : ?>
						<div class="tlbb-image">
							<img src="<?php echo esc_url( $tlbb_img ); ?>" alt="<?php echo esc_attr( $tlbb_img_alt ); ?>" loading="lazy" />
						</div>
					<?php endif; ?>

					<?php if ( '' !== trim( wp_strip_all_tags( $tlbb_desc ) ) ) : ?>
						<p class="tlbb-desc"><?php echo wp_kses( $tlbb_desc, $tlbb_allowed_inline ); ?></p>
					<?php endif; ?>

					<?php if ( '' !== $tlbb_lurl && '' !== trim( wp_strip_all_tags( $tlbb_ltext ) ) ) : ?>
						<a class="tlbb-link" href="<?php echo esc_url( $tlbb_lurl ); ?>">
							<?php echo esc_html( wp_strip_all_tags( $tlbb_ltext ) ); ?>
						</a>
					<?php endif; ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>
