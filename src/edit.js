/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Imports the useBlockProps and InnerBlocks components from the
 * @wordpress/block-editor package.
 *
 * useBlockProps is a React hook that provides props for the block wrapper element.
 *
 * InnerBlocks renders the inner block content of a custom block.
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/**
 * Imports the editor stylesheet.
 *
 * This allows us to style the editor UI for this block.
 */
import './editor.scss';

/**
 * Imports the useEntityProp hook from the @wordpress/core-data package.
 *
 * This hook allows you to get and set entity properties in the core data store.
 */
import { useEntityProp } from "@wordpress/core-data";

/**
 * Imports the useSelect and useDispatch hooks from the @wordpress/data package.
 *
 * useSelect allows you to select data from the store state.
 *
 * useDispatch returns the store dispatch method to dispatch actions.
 */
import { useSelect, useDispatch } from "@wordpress/data";

/**
 * Imports the useState and useEffect React hooks from the @wordpress/element package.
 *
 * useState allows you to add state to a functional component.
 * useEffect allows you to perform side effects from a function component.
 */
import { useState, useEffect } from "@wordpress/element";

/**
 * Imports the createBlocksFromInnerBlocksTemplate utility from
 * @wordpress/blocks to generate blocks from a template array.
 */
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";

/**
 * Imports utility functions from the utils.js file:
 *
 * paragraphTemplate - Template for paragraph inner blocks.
 * formatPostContent - Formats post content for API request.
 * getInnerBlocksContent - Gets inner block HTML content.
 * makeApiCall - Makes API call to summarization endpoint.
 */
import {
	paragraphTemplate,
	formatPostContent,
	getInnerBlocksContent,
	makeApiCall,
} from "./utils.js";

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
	 * The function `handleApiCall` is used to make an API call, update the meta value, and replace inner
	 * blocks with new content.
	 * @returns The function `handleApiCall` does not have a return statement, so it does not explicitly
	 * return anything.
	 */
	const handleApiCall = async () => {

		setButtonText('Generando resumen');
		setButtonDisabled(true);
		setUpdatingData(true);

		let body = formatPostContent(postContent, name);
		let apiEndpoint = '';

		const response = await makeApiCall(apiEndpoint, body);
		if (!response.ok) {
			setButtonText('Intente nuevamente');
			setButtonDisabled(false);
			return console.error('API request failed', response)
		}
		let result = await response.json();
		updateMetaValue( result );
		replaceInnerBlocks(
			clientId,
			createBlocksFromInnerBlocksTemplate(paragraphTemplate( result ) )
		);
	  
		setButtonText( 'Regenerar resumen' );
		setButtonDisabled( false );
		setUpdatingData( false );
	}

	/* The `return` statement is returning the JSX code that will be rendered in the editor for this
	block. */
	return (
		<div {...useBlockProps()}>
			<button onClick={handleApiCall} disabled={buttonDisabled}>
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
