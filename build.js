const fs = require('fs');
const markdown = require('markdown-to-html').Markdown;

const inputFile = 'index.md';
const outputFile = 'index.html';

// Read the Markdown file
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }

    // Convert Markdown to HTML
    markdown({ gfm: true })(data, (err, html) => {
        if (err) {
            console.error(`Error converting Markdown to HTML: ${err}`);
            return;
        }

        // Write the HTML to a file
        fs.writeFile(outputFile, html, (err) => {
            if (err) {
                console.error(`Error writing HTML file: ${err}`);
                return;
            }
            console.log(`Successfully converted ${inputFile} to ${outputFile}`);
        });
    });
});
