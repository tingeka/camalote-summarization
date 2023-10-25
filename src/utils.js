import { parse, serialize } from '@wordpress/blocks';
import { useSelect } from "@wordpress/data";

/**
 * Define a template for the paragraph block.
 * 
 * @param {Array} result - The array of paragraph block content.
 * @returns {Array} - An array of paragraph blocks.
 */
export function paragraphTemplate( result ) {
	return result.map( item => ['core/paragraph', { content: item } ]);
};

/**
 * Format the post content by parsing, filtering, and serializing.
 * 
 * @param {string} postContent - The post content to format.
 * @param {string} name - The block name to filter out.
 * @returns {string} - The formatted post content.
 */
export function formatPostContent ( postContent, name ) {
	const parsedPostContent = parse( postContent );
	const filteredPostContent = parsedPostContent.filter( (item) => { return item.name !== name} );
	const serializedPostContent = serialize(filteredPostContent)
	return serializedPostContent.replace( /(<([^>]+)>)/gi, '' );
};

/**
 * Get the content of inner blocks for the given clientId.
 * 
 * @param {string} clientId - The clientId for the block.
 * @returns {Array} - An array of inner block content.
 */
export function getInnerBlocksContent(clientId) {
	return useSelect(select => {
        const block = select('core/block-editor').getBlock(clientId)
        const blockInnerBlock = block.innerBlocks
        const blockInnerBlockContent = blockInnerBlock.map(block => block.attributes.content);
        return filterEmptyBlocks(blockInnerBlockContent);
	});
};

/**
 * Filter out empty blocks from the provided array.
 * 
 * @param {Array} block - The array of blocks to filter.
 * @returns {Array} - The filtered array with empty blocks removed.
 */
export function filterEmptyBlocks ( block ) {
    return block.filter((content) => content !== '');
};

/**
 * The function `makeApiCall` is an asynchronous function that makes a POST request to an API endpoint
 * with a JSON body and returns the response.
 * @param apiEndpoint - The `apiEndpoint` parameter is the URL of the API endpoint that you want to
 * make a request to. It specifies the location where the API is hosted and the specific endpoint you
 * want to interact with.
 * @param body - The `body` parameter is an object that contains the data you want to send to the API
 * endpoint. It will be converted to a JSON string using `JSON.stringify()` before being sent in the
 * request body.
 * @returns the response object from the API call.
 */
export async function makeApiCall(apiEndpoint, body) {
	const response = await fetch(apiEndpoint, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(body),
	});
  
	return response;
}  