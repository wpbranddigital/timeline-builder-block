import { __ } from '@wordpress/i18n';
import { useEffect, useRef, useState } from '@wordpress/element';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	TextControl,
	Tooltip,
	ButtonGroup,
	TabPanel,
	__experimentalUnitControl as UnitControl,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { plus, trash, chevronUp, chevronDown, desktop, tablet, mobile } from '@wordpress/icons';

const ResponsiveControl = ( { label, value, onChange } ) => {
	const [ device, setDevice ] = useState( 'desktop' );
	const currentVal = value && value[ device ] !== undefined ? value[ device ] : '';

	return (
		<div className="tlbb-responsive-control" style={{ marginBottom: '24px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
				<span style={{ fontSize: '13px' }}>{ label }</span>
				<ButtonGroup>
					<Button icon={ desktop } isSmall variant={ device === 'desktop' ? 'primary' : 'tertiary' } onClick={ () => setDevice( 'desktop' ) } />
					<Button icon={ tablet } isSmall variant={ device === 'tablet' ? 'primary' : 'tertiary' } onClick={ () => setDevice( 'tablet' ) } />
					<Button icon={ mobile } isSmall variant={ device === 'mobile' ? 'primary' : 'tertiary' } onClick={ () => setDevice( 'mobile' ) } />
				</ButtonGroup>
			</div>
			<UnitControl
				value={ currentVal }
				onChange={ ( val ) => onChange( { ...value, [ device ]: val } ) }
			/>
		</div>
	);
};

const ResponsiveNumberControl = ( { label, value, onChange, min, max } ) => {
	const [ device, setDevice ] = useState( 'desktop' );
	const currentVal = value && value[ device ] !== undefined ? value[ device ] : 1;

	return (
		<div className="tlbb-responsive-control" style={{ marginBottom: '24px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
				<span style={{ fontSize: '13px' }}>{ label }</span>
				<ButtonGroup>
					<Button icon={ desktop } isSmall variant={ device === 'desktop' ? 'primary' : 'tertiary' } onClick={ () => setDevice( 'desktop' ) } />
					<Button icon={ tablet } isSmall variant={ device === 'tablet' ? 'primary' : 'tertiary' } onClick={ () => setDevice( 'tablet' ) } />
					<Button icon={ mobile } isSmall variant={ device === 'mobile' ? 'primary' : 'tertiary' } onClick={ () => setDevice( 'mobile' ) } />
				</ButtonGroup>
			</div>
			<RangeControl
				value={ currentVal }
				onChange={ ( val ) => onChange( { ...value, [ device ]: val } ) }
				min={ min }
				max={ max }
			/>
		</div>
	);
};

const ResponsiveBoxControl = ( { label, value, onChange } ) => {
	const [ device, setDevice ] = useState( 'desktop' );
	const currentVal = value && value[ device ] !== undefined ? value[ device ] : {};

	return (
		<div className="tlbb-responsive-box-control" style={{ marginBottom: '24px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
				<span style={{ fontSize: '13px' }}>{ label }</span>
				<ButtonGroup>
					<Button icon={ desktop } isSmall variant={ device === 'desktop' ? 'primary' : 'tertiary' } onClick={ () => setDevice( 'desktop' ) } />
					<Button icon={ tablet } isSmall variant={ device === 'tablet' ? 'primary' : 'tertiary' } onClick={ () => setDevice( 'tablet' ) } />
					<Button icon={ mobile } isSmall variant={ device === 'mobile' ? 'primary' : 'tertiary' } onClick={ () => setDevice( 'mobile' ) } />
				</ButtonGroup>
			</div>
			<BoxControl
				values={ typeof currentVal === 'object' ? currentVal : {} }
				onChange={ ( val ) => onChange( { ...value, [ device ]: val } ) }
			/>
		</div>
	);
};

const getBoxString = (box) => {
    if (!box) return undefined;
    if (typeof box === 'string') return box;
    const top = box.top !== undefined ? box.top : '0';
    const right = box.right !== undefined ? box.right : '0';
    const bottom = box.bottom !== undefined ? box.bottom : '0';
    const left = box.left !== undefined ? box.left : '0';
    return `${top} ${right} ${bottom} ${left}`.trim();
};

const FONT_FAMILIES = [
	{ label: __( 'Default', 'wbd-timeline-builder' ), value: '' },
	{ label: 'Arial', value: 'Arial, sans-serif' },
	{ label: 'Helvetica', value: 'Helvetica, sans-serif' },
	{ label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
	{ label: 'Georgia', value: 'Georgia, serif' },
	{ label: 'Verdana', value: 'Verdana, sans-serif' },
	{ label: 'Tahoma', value: 'Tahoma, sans-serif' },
	{ label: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
	{ label: 'Roboto', value: 'Roboto, sans-serif' },
	{ label: 'Open Sans', value: '"Open Sans", sans-serif' },
	{ label: 'Montserrat', value: 'Montserrat, sans-serif' },
	{ label: __( 'Custom...', 'wbd-timeline-builder' ), value: 'custom' },
];

const FontFamilyControl = ( { label, value, onChange } ) => {
	const isPreset = FONT_FAMILIES.some( f => f.value === value && value !== 'custom' );
	const isCustom = value && !isPreset;
	const selectValue = isCustom ? 'custom' : (value || '');

	return (
		<div style={{ marginBottom: '24px' }}>
			<SelectControl
				label={ label }
				value={ selectValue }
				options={ FONT_FAMILIES }
				onChange={ ( v ) => {
					if ( v !== 'custom' ) {
						onChange( v );
					} else {
						onChange( 'sans-serif' );
					}
				} }
				__nextHasNoMarginBottom
			/>
			{ selectValue === 'custom' && (
				<TextControl
					label={ __( 'Custom Font Family', 'wbd-timeline-builder' ) }
					value={ value }
					onChange={ onChange }
					help={ __( 'Example: "Open Sans", sans-serif', 'wbd-timeline-builder' ) }
					__nextHasNoMarginBottom
					style={{ marginTop: '8px' }}
				/>
			) }
		</div>
	);
};

const LAYOUTS = [
	{ label: __( 'Vertical (alternating)', 'wbd-timeline-builder' ), value: 'vertical-alternate' },
	{ label: __( 'Vertical (one-sided)', 'wbd-timeline-builder' ), value: 'vertical-one-sided' },
	{ label: __( 'Horizontal', 'wbd-timeline-builder' ), value: 'horizontal' },
];

const ANIMATIONS = [
	{ label: __( 'None', 'wbd-timeline-builder' ), value: 'none' },
	{ label: __( 'Fade up', 'wbd-timeline-builder' ), value: 'fade-up' },
	{ label: __( 'Fade in', 'wbd-timeline-builder' ), value: 'fade-in' },
	{ label: __( 'Slide in', 'wbd-timeline-builder' ), value: 'slide-in' },
	{ label: __( 'Zoom in', 'wbd-timeline-builder' ), value: 'zoom-in' },
];

const MARKERS = [
	{ label: __( 'Dot', 'wbd-timeline-builder' ), value: 'dot' },
	{ label: __( 'Ring', 'wbd-timeline-builder' ), value: 'ring' },
	{ label: __( 'Icon', 'wbd-timeline-builder' ), value: 'icon' },
];

const DASHICONS = [
	{ label: __( 'Check (Yes)', 'wbd-timeline-builder' ), value: 'yes' },
	{ label: __( 'Star', 'wbd-timeline-builder' ), value: 'star-filled' },
	{ label: __( 'Calendar', 'wbd-timeline-builder' ), value: 'calendar' },
	{ label: __( 'Awards', 'wbd-timeline-builder' ), value: 'awards' },
	{ label: __( 'Flag', 'wbd-timeline-builder' ), value: 'flag' },
	{ label: __( 'Chart Line', 'wbd-timeline-builder' ), value: 'chart-line' },
	{ label: __( 'Heart', 'wbd-timeline-builder' ), value: 'heart' },
	{ label: __( 'Location', 'wbd-timeline-builder' ), value: 'location' },
	{ label: __( 'Megaphone', 'wbd-timeline-builder' ), value: 'megaphone' },
	{ label: __( 'Lightbulb', 'wbd-timeline-builder' ), value: 'lightbulb' },
	{ label: __( 'Info', 'wbd-timeline-builder' ), value: 'info' },
	{ label: __( 'Thumbs Up', 'wbd-timeline-builder' ), value: 'thumbs-up' },
	{ label: __( 'Clock', 'wbd-timeline-builder' ), value: 'clock' },
	{ label: __( 'Camera', 'wbd-timeline-builder' ), value: 'camera' },
	{ label: __( 'Video', 'wbd-timeline-builder' ), value: 'video-alt3' },
	{ label: __( 'Book', 'wbd-timeline-builder' ), value: 'book' },
	{ label: __( 'Edit', 'wbd-timeline-builder' ), value: 'edit' },
	{ label: __( 'Email', 'wbd-timeline-builder' ), value: 'email' },
	{ label: __( 'Store', 'wbd-timeline-builder' ), value: 'store' },
	{ label: __( 'Cart', 'wbd-timeline-builder' ), value: 'cart' },
];

const emptyItem = () => ( {
	id: 'tl-' + Math.random().toString( 36 ).slice( 2, 10 ),
	title: '',
	date: '',
	description: '',
	iconDashicon: 'yes',
	imageUrl: '',
	imageId: 0,
	imageAlt: '',
	linkUrl: '',
	linkText: '',
} );

const defaultItems = () => [
	{
		...emptyItem(),
		date: __( '2021', 'wbd-timeline-builder' ),
		title: __( 'The Beginning', 'wbd-timeline-builder' ),
		description: __(
			'Every great story starts somewhere. Describe the first milestone of your journey here.',
			'wbd-timeline-builder'
		),
		iconDashicon: 'flag',
	},
	{
		...emptyItem(),
		date: __( '2023', 'wbd-timeline-builder' ),
		title: __( 'Growing Strong', 'wbd-timeline-builder' ),
		description: __(
			'Highlight a key moment of growth, a product launch, or an achievement worth remembering.',
			'wbd-timeline-builder'
		),
		iconDashicon: 'chart-line',
	},
	{
		...emptyItem(),
		date: __( 'Today', 'wbd-timeline-builder' ),
		title: __( 'Where We Are Now', 'wbd-timeline-builder' ),
		description: __(
			'Share your current status and what comes next. Edit or remove these sample items anytime.',
			'wbd-timeline-builder'
		),
		iconDashicon: 'awards',
	},
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		items,
		layout,
		lineColor,
		accentColor,
		cardBackground,
		titleColor,
		dateColor,
		textColor,
		animation,
		animationDuration,
		markerStyle,
		dateFontSize,
		titleFontSize,
		descFontSize,
		imageWidth,
		imageHeight,
		linkFontSize,
		linkPadding,
		linkColor,
		linkBgColor,
		linkBorderRadius,
		dateFontFamily,
		titleFontFamily,
		descFontFamily,
		linkFontFamily,
		imageObjectFit,
		imagePosition,
		columns,
	} = attributes;

	// Seed 3 sample items only on a fresh insert (empty block), once.
	const seeded = useRef( false );
	const itemsRef = useRef( null );
	useEffect( () => {
		if ( ! seeded.current && ( ! items || items.length === 0 ) ) {
			seeded.current = true;
			setAttributes( { items: defaultItems() } );
		}
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	const blockProps = useBlockProps( {
		className: `tlbb-timeline tlbb-layout-${ layout } tlbb-marker-${ markerStyle }`,
	} );

	const updateItem = ( index, patch ) => {
		const next = items.map( ( it, i ) => ( i === index ? { ...it, ...patch } : it ) );
		setAttributes( { items: next } );
	};

	const addItem = () => {
		setAttributes( { items: [ ...items, emptyItem() ] } );
	};

	const removeItem = ( index ) => {
		setAttributes( { items: items.filter( ( _, i ) => i !== index ) } );
	};

	const moveItem = ( index, dir ) => {
		const target = index + dir;
		if ( target < 0 || target >= items.length ) {
			return;
		}
		const next = [ ...items ];
		[ next[ index ], next[ target ] ] = [ next[ target ], next[ index ] ];
		setAttributes( { items: next } );
	};

	const styleVars = {
		'--tlbb-line': lineColor,
		'--tlbb-accent': accentColor,
		'--tlbb-card-bg': cardBackground,
		'--tlbb-title': titleColor,
		'--tlbb-date': dateColor,
		'--tlbb-text': textColor,
		...( dateFontSize?.desktop && { '--tlbb-date-fs-desktop': dateFontSize.desktop } ),
		...( dateFontSize?.tablet && { '--tlbb-date-fs-tablet': dateFontSize.tablet } ),
		...( dateFontSize?.mobile && { '--tlbb-date-fs-mobile': dateFontSize.mobile } ),
		...( titleFontSize?.desktop && { '--tlbb-title-fs-desktop': titleFontSize.desktop } ),
		...( titleFontSize?.tablet && { '--tlbb-title-fs-tablet': titleFontSize.tablet } ),
		...( titleFontSize?.mobile && { '--tlbb-title-fs-mobile': titleFontSize.mobile } ),
		...( descFontSize?.desktop && { '--tlbb-desc-fs-desktop': descFontSize.desktop } ),
		...( descFontSize?.tablet && { '--tlbb-desc-fs-tablet': descFontSize.tablet } ),
		...( descFontSize?.mobile && { '--tlbb-desc-fs-mobile': descFontSize.mobile } ),
		...( imageWidth?.desktop && { '--tlbb-img-w-desktop': imageWidth.desktop } ),
		...( imageWidth?.tablet && { '--tlbb-img-w-tablet': imageWidth.tablet } ),
		...( imageWidth?.mobile && { '--tlbb-img-w-mobile': imageWidth.mobile } ),
		...( imageHeight?.desktop && { '--tlbb-img-h-desktop': imageHeight.desktop } ),
		...( imageHeight?.tablet && { '--tlbb-img-h-tablet': imageHeight.tablet } ),
		...( imageHeight?.mobile && { '--tlbb-img-h-mobile': imageHeight.mobile } ),
		...( linkFontSize?.desktop && { '--tlbb-link-fs-desktop': linkFontSize.desktop } ),
		...( linkFontSize?.tablet && { '--tlbb-link-fs-tablet': linkFontSize.tablet } ),
		...( linkFontSize?.mobile && { '--tlbb-link-fs-mobile': linkFontSize.mobile } ),
		...( linkPadding?.desktop && { '--tlbb-link-pad-desktop': getBoxString(linkPadding.desktop) } ),
		...( linkPadding?.tablet && { '--tlbb-link-pad-tablet': getBoxString(linkPadding.tablet) } ),
		...( linkPadding?.mobile && { '--tlbb-link-pad-mobile': getBoxString(linkPadding.mobile) } ),
		...( linkColor && { '--tlbb-link-color': linkColor } ),
		...( linkBgColor && { '--tlbb-link-bg': linkBgColor } ),
		...( linkBorderRadius && { '--tlbb-link-br': linkBorderRadius } ),
		...( dateFontFamily && { '--tlbb-date-ff': dateFontFamily } ),
		...( titleFontFamily && { '--tlbb-title-ff': titleFontFamily } ),
		...( descFontFamily && { '--tlbb-desc-ff': descFontFamily } ),
		...( linkFontFamily && { '--tlbb-link-ff': linkFontFamily } ),
		...( imageObjectFit && { '--tlbb-img-fit': imageObjectFit } ),
		...( columns?.desktop && { '--tlbb-cols-desktop': columns.desktop } ),
		...( columns?.tablet && { '--tlbb-cols-tablet': columns.tablet } ),
		...( columns?.mobile && { '--tlbb-cols-mobile': columns.mobile } ),
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'wbd-timeline-builder' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Timeline layout', 'wbd-timeline-builder' ) }
						value={ layout }
						options={ LAYOUTS }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
						__nextHasNoMarginBottom
					/>
					<SelectControl
						label={ __( 'Marker style', 'wbd-timeline-builder' ) }
						value={ markerStyle }
						options={ MARKERS }
						onChange={ ( value ) => setAttributes( { markerStyle: value } ) }
						__nextHasNoMarginBottom
					/>
					{ layout === 'horizontal' && (
						<ResponsiveNumberControl
							label={ __( 'Columns per view', 'wbd-timeline-builder' ) }
							value={ columns }
							onChange={ ( v ) => setAttributes( { columns: v } ) }
							min={ 1 }
							max={ 10 }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Animation', 'wbd-timeline-builder' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Scroll animation', 'wbd-timeline-builder' ) }
						value={ animation }
						options={ ANIMATIONS }
						onChange={ ( value ) => setAttributes( { animation: value } ) }
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={ __( 'Duration (ms)', 'wbd-timeline-builder' ) }
						value={ animationDuration }
						onChange={ ( value ) => setAttributes( { animationDuration: value } ) }
						min={ 100 }
						max={ 2000 }
						step={ 50 }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelColorSettings
					title={ __( 'Colors', 'wbd-timeline-builder' ) }
					initialOpen={ true }
					colorSettings={ [
						{ value: accentColor, onChange: ( c ) => setAttributes( { accentColor: c } ), label: __( 'Accent / markers', 'wbd-timeline-builder' ) },
						{ value: lineColor, onChange: ( c ) => setAttributes( { lineColor: c } ), label: __( 'Line', 'wbd-timeline-builder' ) },
						{ value: cardBackground, onChange: ( c ) => setAttributes( { cardBackground: c } ), label: __( 'Card background', 'wbd-timeline-builder' ) },
						{ value: titleColor, onChange: ( c ) => setAttributes( { titleColor: c } ), label: __( 'Title', 'wbd-timeline-builder' ) },
						{ value: dateColor, onChange: ( c ) => setAttributes( { dateColor: c } ), label: __( 'Date', 'wbd-timeline-builder' ) },
						{ value: textColor, onChange: ( c ) => setAttributes( { textColor: c } ), label: __( 'Description text', 'wbd-timeline-builder' ) },
						{ value: linkColor, onChange: ( c ) => setAttributes( { linkColor: c } ), label: __( 'Link Text Color', 'wbd-timeline-builder' ) },
						{ value: linkBgColor, onChange: ( c ) => setAttributes( { linkBgColor: c } ), label: __( 'Link Background', 'wbd-timeline-builder' ) },
					] }
				/>

				<PanelBody title={ __( 'Typography', 'wbd-timeline-builder' ) } initialOpen={ false }>
					<ResponsiveControl label={ __( 'Date Font Size', 'wbd-timeline-builder' ) } value={ dateFontSize } onChange={ ( v ) => setAttributes( { dateFontSize: v } ) } />
					<FontFamilyControl label={ __( 'Date Font Family', 'wbd-timeline-builder' ) } value={ dateFontFamily } onChange={ ( v ) => setAttributes( { dateFontFamily: v } ) } />
					
					<ResponsiveControl label={ __( 'Title Font Size', 'wbd-timeline-builder' ) } value={ titleFontSize } onChange={ ( v ) => setAttributes( { titleFontSize: v } ) } />
					<FontFamilyControl label={ __( 'Title Font Family', 'wbd-timeline-builder' ) } value={ titleFontFamily } onChange={ ( v ) => setAttributes( { titleFontFamily: v } ) } />
					
					<ResponsiveControl label={ __( 'Description Font Size', 'wbd-timeline-builder' ) } value={ descFontSize } onChange={ ( v ) => setAttributes( { descFontSize: v } ) } />
					<FontFamilyControl label={ __( 'Description Font Family', 'wbd-timeline-builder' ) } value={ descFontFamily } onChange={ ( v ) => setAttributes( { descFontFamily: v } ) } />
				</PanelBody>

				<PanelBody title={ __( 'Image Options', 'wbd-timeline-builder' ) } initialOpen={ false }>
					<ResponsiveControl label={ __( 'Image Width', 'wbd-timeline-builder' ) } value={ imageWidth } onChange={ ( v ) => setAttributes( { imageWidth: v } ) } />
					<ResponsiveControl label={ __( 'Image Height', 'wbd-timeline-builder' ) } value={ imageHeight } onChange={ ( v ) => setAttributes( { imageHeight: v } ) } />
					<SelectControl
						label={ __( 'Image Position', 'wbd-timeline-builder' ) }
						value={ imagePosition }
						options={ [
							{ label: __( 'Top', 'wbd-timeline-builder' ), value: 'top' },
							{ label: __( 'After Title', 'wbd-timeline-builder' ), value: 'after-title' },
						] }
						onChange={ ( v ) => setAttributes( { imagePosition: v } ) }
						__nextHasNoMarginBottom
					/>
					<SelectControl
						label={ __( 'Image Object Fit', 'wbd-timeline-builder' ) }
						value={ imageObjectFit }
						options={ [
							{ label: 'Cover', value: 'cover' },
							{ label: 'Contain', value: 'contain' },
							{ label: 'Fill', value: 'fill' },
							{ label: 'Scale Down', value: 'scale-down' },
							{ label: 'None', value: 'none' },
						] }
						onChange={ ( v ) => setAttributes( { imageObjectFit: v } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				<PanelBody title={ __( 'Link Options', 'wbd-timeline-builder' ) } initialOpen={ false }>
					<ResponsiveControl label={ __( 'Link Font Size', 'wbd-timeline-builder' ) } value={ linkFontSize } onChange={ ( v ) => setAttributes( { linkFontSize: v } ) } />
					<FontFamilyControl label={ __( 'Link Font Family', 'wbd-timeline-builder' ) } value={ linkFontFamily } onChange={ ( v ) => setAttributes( { linkFontFamily: v } ) } />
					<ResponsiveBoxControl label={ __( 'Link Padding', 'wbd-timeline-builder' ) } value={ linkPadding } onChange={ ( v ) => setAttributes( { linkPadding: v } ) } />
					<div style={{ marginBottom: '24px' }}>
						<UnitControl label={ __( 'Border Radius', 'wbd-timeline-builder' ) } value={ linkBorderRadius } onChange={ ( v ) => setAttributes( { linkBorderRadius: v } ) } />
					</div>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } style={ { ...blockProps.style, ...styleVars } }>
				{ layout === 'horizontal' && (
					<>
						<div
							className="tlbb-nav-prev"
							aria-label="Previous"
							onClick={ () => {
								if ( itemsRef.current ) {
									const firstItem = itemsRef.current.querySelector('.tlbb-item');
									if ( firstItem ) {
										const itemWidth = firstItem.offsetWidth + 24;
										itemsRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
									}
								}
							} }
						>
							<span className="dashicons dashicons-arrow-left-alt2"></span>
						</div>
						<div
							className="tlbb-nav-next"
							aria-label="Next"
							onClick={ () => {
								if ( itemsRef.current ) {
									const firstItem = itemsRef.current.querySelector('.tlbb-item');
									if ( firstItem ) {
										const itemWidth = firstItem.offsetWidth + 24;
										itemsRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
									}
								}
							} }
						>
							<span className="dashicons dashicons-arrow-right-alt2"></span>
						</div>
					</>
				) }
				<div className="tlbb-track" aria-hidden="true"></div>
				<div className="tlbb-items" ref={ itemsRef }>
					{ items.length === 0 && (
						<div className="tlbb-empty">
							<p>{ __( 'No timeline items yet.', 'wbd-timeline-builder' ) }</p>
							<Button variant="primary" icon={ plus } onClick={ addItem }>
								{ __( 'Add first item', 'wbd-timeline-builder' ) }
							</Button>
						</div>
					) }

					{ items.map( ( item, index ) => (
						<div key={ item.id } className="tlbb-item">
							<div className="tlbb-marker" aria-hidden="true">
								{ markerStyle === 'icon' && (
									<span className={ `dashicons dashicons-${ item.iconDashicon || 'yes' }` }></span>
								) }
							</div>

							<div className="tlbb-card">
								<div className="tlbb-item-toolbar">
									<Tooltip text={ __( 'Move up', 'wbd-timeline-builder' ) }>
										<Button
											icon={ chevronUp }
											onClick={ () => moveItem( index, -1 ) }
											disabled={ index === 0 }
											label={ __( 'Move up', 'wbd-timeline-builder' ) }
										/>
									</Tooltip>
									<Tooltip text={ __( 'Move down', 'wbd-timeline-builder' ) }>
										<Button
											icon={ chevronDown }
											onClick={ () => moveItem( index, 1 ) }
											disabled={ index === items.length - 1 }
											label={ __( 'Move down', 'wbd-timeline-builder' ) }
										/>
									</Tooltip>
									<Tooltip text={ __( 'Remove item', 'wbd-timeline-builder' ) }>
										<Button
											icon={ trash }
											isDestructive
											onClick={ () => removeItem( index ) }
											label={ __( 'Remove item', 'wbd-timeline-builder' ) }
										/>
									</Tooltip>
								</div>

								{ imagePosition === 'top' && item.imageUrl && (
									<div className="tlbb-image">
										<img src={ item.imageUrl } alt={ item.imageAlt || '' } />
									</div>
								) }

								<RichText
									tagName="span"
									className="tlbb-date"
									value={ item.date }
									onChange={ ( value ) => updateItem( index, { date: value } ) }
									placeholder={ __( 'Date / label…', 'wbd-timeline-builder' ) }
									allowedFormats={ [] }
								/>

								<RichText
									tagName="h3"
									className="tlbb-title"
									value={ item.title }
									onChange={ ( value ) => updateItem( index, { title: value } ) }
									placeholder={ __( 'Title…', 'wbd-timeline-builder' ) }
									allowedFormats={ [ 'core/bold', 'core/italic' ] }
								/>

								{ imagePosition === 'after-title' && item.imageUrl && (
									<div className="tlbb-image">
										<img src={ item.imageUrl } alt={ item.imageAlt || '' } />
									</div>
								) }

								<RichText
									tagName="p"
									className="tlbb-desc"
									value={ item.description }
									onChange={ ( value ) => updateItem( index, { description: value } ) }
									placeholder={ __( 'Description…', 'wbd-timeline-builder' ) }
								/>

								<div className="tlbb-item-controls">
									{ markerStyle === 'icon' && (
										<SelectControl
											label={ __( 'Select Icon', 'wbd-timeline-builder' ) }
											value={ item.iconDashicon }
											options={ DASHICONS }
											onChange={ ( value ) => updateItem( index, { iconDashicon: value } ) }
											__nextHasNoMarginBottom
										/>
									) }

									<div className="tlbb-media-row">
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( media ) =>
													updateItem( index, {
														imageUrl: media.url,
														imageId: media.id,
														imageAlt: media.alt || '',
													} )
												}
												allowedTypes={ [ 'image' ] }
												value={ item.imageId }
												render={ ( { open } ) => (
													<Button variant="secondary" onClick={ open }>
														{ item.imageUrl
															? __( 'Replace image', 'wbd-timeline-builder' )
															: __( 'Add image', 'wbd-timeline-builder' ) }
													</Button>
												) }
											/>
										</MediaUploadCheck>
										{ item.imageUrl && (
											<Button
												variant="tertiary"
												isDestructive
												onClick={ () =>
													updateItem( index, { imageUrl: '', imageId: 0, imageAlt: '' } )
												}
											>
												{ __( 'Remove image', 'wbd-timeline-builder' ) }
											</Button>
										) }
									</div>

									<TextControl
										label={ __( 'Link text', 'wbd-timeline-builder' ) }
										value={ item.linkText }
										onChange={ ( value ) => updateItem( index, { linkText: value } ) }
										__nextHasNoMarginBottom
									/>
									<div className="tlbb-url-control">
										<span className="tlbb-url-label">{ __( 'Link URL', 'wbd-timeline-builder' ) }</span>
										<URLInput
											value={ item.linkUrl }
											onChange={ ( url ) => updateItem( index, { linkUrl: url } ) }
											disableSuggestions={ false }
										/>
									</div>
								</div>
							</div>
						</div>
					) ) }
				</div>

				{ items.length > 0 && (
					<div className="tlbb-add-row">
						<Button variant="primary" icon={ plus } onClick={ addItem }>
							{ __( 'Add timeline item', 'wbd-timeline-builder' ) }
						</Button>
					</div>
				) }
			</div>
		</>
	);
}
