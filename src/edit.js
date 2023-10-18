/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { useSelect, useDispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(
	// {
	// 	attributes,
	// 	setAttributes,
	// 	context: { postType, postId },
	// }
	props
) {
	
	const [buttonText, setButtonText] = useState('Make API Call');
    const [buttonDisabled, setButtonDisabled] = useState(false);
	
	console.log(props);

	const postContent = useSelect((select) =>
		select('core/editor').getEditedPostContent()
	);

	const makeApiCall = async () => {
		const apiEndpoint = '';
		setButtonText('Generando resumen');
		setButtonDisabled(true);

		try {
			const response = await fetch(apiEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postContent),
			});

			if (response.ok) {
				const result = await response.json();
				setData(result); // Set data in the data store
			} else {
				console.error('API request failed:', response);
			}
		} catch (error) {
			console.error('Error making API request:', error);
		} finally {
			setButtonText('Make API Call');
			setButtonDisabled(false);
		}
	};

	return (
		<div>
			<button onClick={makeApiCall} disabled={buttonDisabled}>
                {buttonText}
            </button>
		</div>
	);
}
