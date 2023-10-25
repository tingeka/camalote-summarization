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