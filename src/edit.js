import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
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
} from '@wordpress/components';
import { plus, trash, chevronUp, chevronDown } from '@wordpress/icons';

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
	} = attributes;

	// Seed 3 sample items only on a fresh insert (empty block), once.
	const seeded = useRef( false );
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

				<PanelColorSettings
					title={ __( 'Colors', 'wbd-timeline-builder' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: accentColor,
							onChange: ( c ) => setAttributes( { accentColor: c } ),
							label: __( 'Accent / markers', 'wbd-timeline-builder' ),
						},
						{
							value: lineColor,
							onChange: ( c ) => setAttributes( { lineColor: c } ),
							label: __( 'Line', 'wbd-timeline-builder' ),
						},
						{
							value: cardBackground,
							onChange: ( c ) => setAttributes( { cardBackground: c } ),
							label: __( 'Card background', 'wbd-timeline-builder' ),
						},
						{
							value: titleColor,
							onChange: ( c ) => setAttributes( { titleColor: c } ),
							label: __( 'Title', 'wbd-timeline-builder' ),
						},
						{
							value: dateColor,
							onChange: ( c ) => setAttributes( { dateColor: c } ),
							label: __( 'Date', 'wbd-timeline-builder' ),
						},
						{
							value: textColor,
							onChange: ( c ) => setAttributes( { textColor: c } ),
							label: __( 'Description text', 'wbd-timeline-builder' ),
						},
					] }
				/>
			</InspectorControls>

			<div { ...blockProps } style={ { ...blockProps.style, ...styleVars } }>
				<div className="tlbb-track" aria-hidden="true"></div>
				<div className="tlbb-items">
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

								{ item.imageUrl && (
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
										<TextControl
											label={ __( 'Dashicon name', 'wbd-timeline-builder' ) }
											help={ __( 'e.g. star-filled, calendar, awards', 'wbd-timeline-builder' ) }
											value={ item.iconDashicon }
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
