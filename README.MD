# Camalote - Summarization block
## Intro
This block is used to summarize the post content using an API endpoint. It can be used with any API endpoint that returns a summary of the content as an array.

The main idea is to use the API endpoint to summarize the content of the post, saving the response to post meta, and then display the summary as paragraph blocks based on such meta value.

These paragraph blocks are editable and the block listens for changes, automatically updating the meta value when saving the post. 

It also allows you to regenerate the summary by clicking the "Generar resumen" button.

## Files
- `camalote-summarization.php` - The plugin bootstrap file.
- `./src/index.js` - The plugin main JavaScript file. It registers the block.
- `./src/edit.js` - It handles the block edit functionality, including:
  - Loading all necessary dependencies.
  - Querying and prepping the post content to be used as POST data through external API endpoint defined in `./src/definitions.json`.
  - Handle the API call response and display the summary as paragraph blocks.
  - Listen for changes in the inner blocks and update the summary accordingly.
  - Saving the summary to the post meta defined in `./src/definitions.json`.
- `./src/utils.js` - This file contains utility functions used by the plugin, including:
  - `paragraphTemplate`: defines a template for the paragraph block.
  - `formatPostContent`: prep the post content to be sent to the API endpoint.
  - `getInnerBlocksContent`: get the inner blocks content.
  - `filterEmptyBlocks`: filter out empty blocks.
  - `makeApiCall`: make the API call to the external API endpoint.
- `./src/editor.scss` - This file contains the styles for the Editor.

## Prerequisites
- Install all dependencies by using `npm install` command.
- Set the endpoint and the custom post meta key in `./src/definitions.json`.
- Build from src by using `npm start` command.

## Caveats
This plugin doesn't handle custom field registration. It's up to the user to define the custom field and the field key in the WordPress installation.
### Custom Field Registration example
```php
function prefix_custom_field_registration() {
    register_meta( 'post', 'prefix_summarization_custom_field', array(
        'show_in_rest' 	=> array(
             'schema' => array(
                 'type'  => 'array',
                 'items' => array(
                    'type' => 'string'
				),
             ),
         ),
        'single' 		=> true,
        'type' 			=> 'array',
    ) );
}
add_action( 'init', 'prefix_custom_field_registration' );
``````