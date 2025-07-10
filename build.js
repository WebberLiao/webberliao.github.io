const fs = require('fs');
const path = require('path');
// const markdown = require('markdown-to-html').Markdown;
const marked = require('marked');
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
        // markdown({ gfm: true })(data, (err, fullHtml) => {
        //     if (err) {
        //         console.error(`Error converting ${inputFile} to HTML: ${err}`);
        //         return;
        //     }
            const htmlContent = marked(data);
            const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${inputFile.replace('.md', '')}</title>
    
    <!-- Prism.js CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css">
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YP0V04PV0E"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YP0V04PV0E');
    </script>
    <!-- End Google Analytics -->
</head>
<body>
    <div id="content">${htmlContent}</div>
    
</body>
</html>
                `;
            // Highlight the code blocks
            Prism.highlightAll();
            // Write the HTML to a file
            fs.writeFile(outputFile, fullHtml, (err) => {
                if (err) {
                    console.error(`Error writing HTML file ${outputFile}: ${err}`);
                    return;
                }
                console.log(`Successfully converted ${inputFile} to ${outputFile}`);
            });
        // });
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