const fs = require('fs');
const path = require('path');
const markdown = require('markdown-to-html').Markdown;

const inputDir = './'; // Change this to your input directory if needed
const outputDir = './'; // Change this to your output directory if needed

// Function to convert a single Markdown file to HTML
const convertMarkdownToHtml = (inputFile, outputFile) => {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${inputFile}: ${err}`);
            return;
        }

        // Convert Markdown to HTML
        markdown({ gfm: true })(data, (err, html) => {
            if (err) {
                console.error(`Error converting ${inputFile} to HTML: ${err}`);
                return;
            }

            // Write the HTML to a file
            fs.writeFile(outputFile, html, (err) => {
                if (err) {
                    console.error(`Error writing HTML file ${outputFile}: ${err}`);
                    return;
                }
                console.log(`Successfully converted ${inputFile} to ${outputFile}`);
            });
        });
    });
};

// Read all .md files in the input directory
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error(`Error reading directory ${inputDir}: ${err}`);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.md') {
            const inputFile = path.join(inputDir, file);
            const outputFile = path.join(outputDir, file.replace(/\.md$/, '.html'));
            convertMarkdownToHtml(inputFile, outputFile);
        }
    });
});