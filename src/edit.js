/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * useBlockProps:
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 * 
 *  @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 * 
 * InnerBlocks:
 * React component to render inner blocks in custom block. 
 *
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Stylesheets
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Hook used to set/get the custom fields from the current post.
 */
import { useEntityProp } from "@wordpress/core-data";

/**
 * Hooks used for getting the current post content and replacing inner blocks on API call.
 * 
 * useSelect:
 * Custom react hook for retrieving props from registered selectors.
 * 
 * useDispatch:
 * A custom react hook returning the current registry dispatch actions creators.
 * Note: The component using this hook must be within the context of a
 * RegistryProvider.
 * 
 */
import { useSelect, useDispatch } from "@wordpress/data";

/**
 * 
 * React hooks
 * 
 * useState:
 * Used for setting button states (text and status), and for setting a state for data being updated.
 * 
 * useEffect:
 * Used for updating meta value based on content updates.
 * 
 */
import { useState, useEffect } from "@wordpress/element";

/**
 * 
 * React hooks
 * 
 * useState:
 * Used for setting button states (text and status), and for setting a state for data being updated.
 * 
 * useEffect:
 * Used for updating meta value based on content updates.
 * 
 */
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { paragraphTemplate, formatPostContent, getInnerBlocksContent } from './utils.js';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

/**
 * Edit function for the Summarization block.
 *
 * Retrieves post content and inner block content.
 * Makes API call to generate summary.
 * Updates meta field and inner blocks with summary.
 * Handles button states and re-summarization.
 */
export default function Edit(
	{
		clientId,
		name,
		context: { postType },
	}
) {

	/* These lines of code are using the `useSelect` and `useDispatch` hooks from the `@wordpress/data`
	package to retrieve and update data from the WordPress editor. */
	const { getEditedPostContent } = useSelect((select) => select("core/editor"));
	const { replaceInnerBlocks } = useDispatch('core/block-editor');


	/* The `getInnerBlocksContent(clientId)` function is retrieving the content of the inner blocks within
	the current block. It takes the `clientId` as a parameter, which is a unique identifier for the
	current block, and returns the content of the inner blocks as a string. This content is then stored
	in the `innerBlocksContent` variable. */
	const innerBlocksContent = getInnerBlocksContent(clientId);

	/* The line `const postContent = getEditedPostContent();` is retrieving the content of the currently
	edited post in the WordPress editor. It uses the `getEditedPostContent` function from the
	`@wordpress/data` package to get the content. The `postContent` variable will store the retrieved
	content. */
	const postContent = getEditedPostContent();

	/* The code is using the `useEntityProp` hook from the `@wordpress/core-data` package to get and update
	the meta value of a post. */
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );
	const metaValue = meta[ 'myguten_meta_block_field'];
	
	/**
	 * The function `updateMetaValue` updates the value of a meta field called `myguten_meta_block_field`
	 * with a new value.
	 * @param newValue - The `newValue` parameter is the new value that you want to update for the
	 * `myguten_meta_block_field` property in the `meta` object.
	 */
	const updateMetaValue = ( newValue ) => {
		setMeta( { ...meta, myguten_meta_block_field: newValue } );
	};

	/* The code is using the `useState` hook to create three state variables: `buttonText`,
	`buttonDisabled`, and `updatingData`. */
	const [buttonText, setButtonText] = useState( () => metaValue.length > 0 ? 'Regenerar resumen' : 'Generar resumen' );
    const [buttonDisabled, setButtonDisabled] = useState(false);
	const [updatingData, setUpdatingData] = useState(false);

	/* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
	`useEffect` hook is being used to update the meta value of a post when the `updatingData` or
	`innerBlocksContent` variables change. */
	useEffect(() => {
	  if (!updatingData) {
		updateMetaValue( innerBlocksContent );
	  }
	}, [updatingData, innerBlocksContent])
	

	/**
	 * The function `makeApiCall` makes an API call to a specified endpoint, updates the button text and
	 * disables the button while the API call is being made, and handles the response by updating meta
	 * values and replacing inner blocks with new blocks created from a template. Finally, it resets the
	 * button text, enables the button, and sets the updating data flag to false.
	 */
	const makeApiCall = async () => {
		const apiEndpoint = '';
		setButtonText('Generando resumen');
		setButtonDisabled(true);
		setUpdatingData(true); 
		try {
			const response = await fetch(apiEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( formatPostContent( postContent, name ) ),
			});

			if (response.ok) {
				const result = await response.json();
				updateMetaValue( result );
				replaceInnerBlocks(
					clientId,
				 	createBlocksFromInnerBlocksTemplate( 
						paragraphTemplate( result )
					)
				);
			} else {
				console.error('API request failed:', response);
			}
		} catch (error) {
			console.error('Error making API request:', error);
		} finally {
			setButtonText('Regenerar resumen');
			setButtonDisabled(false);
			setUpdatingData(false);
		}
	};

	/* The `return` statement is returning the JSX code that will be rendered in the editor for this
	block. */
	return (
		<div {...useBlockProps()}>
			<button onClick={makeApiCall} disabled={buttonDisabled}>
                {buttonText}
            </button>
			{ metaValue
			&& <InnerBlocks
				template={ paragraphTemplate( metaValue ) }
				allowedBlocks={ [ 'core/paragraph' ] }
				templateLock = 'insert'
			/>
			}
		</div>
	);
}
