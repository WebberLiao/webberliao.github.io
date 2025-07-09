<link rel="stylesheet" type="text/css" href="../../styles.css">

# Features
- Issue Tracing, using to trace the issues.
- Pull Request, using code review and merge other branch back to master branch.
  - Determine Reviewers that they can review and comment the code you pushed.
- GitHub Action, Automation and CI/CD.
- GitHub Page, Deploy a static website.
- GitHub Discussions, Discussions.
- GitHub Wiki, The tool for writing shared documents.
- GitHub Template, Provides various templates to support item mangements.
- GitHub Security, Security analysis and protection.
- GitHub Codespace, Allow executing develop environment on the browser.
- Git Flow, Model of source code management
  - main branches:
    - master
    - develop
  - feature branches: 
    - For new features, based on develop branch then merge back to develop branch.
  - release branches: 
    - For release version: final testing, version update and other operators and merge back to master and develop.
  - hotfix branches:
    - For issues that need to be fixed immediately.

# GitHub Action
## Core
- Actions/commands: 在 Github Actions 中的最小單位，可以用來組合成各種的 steps 來建立你要自動化的 jobs 
- Step: 由多個 action/command 組成 step，用來定義每一個自動化流程的步驟
- Job: 多個 step 組成 job，透過 job 定義不同 scope 的任務，比如可以分為測試的 job 與 build code 的 job，執行順序會根據 yaml 中的順序來執行
- Workflow: 是整個自動化的流程，一個自動化流程可能包含多個 job

## build.js
``` JavaScript
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
```

## deploy.yml
```YAML
# The name of this workflow.
name: CI/CD

# Trigger conditions of this workflow.
on:
  push: # Push
    branches: [ master ] # Change this to your default branch if different
  pull_request: # PR
    branches: [ master ]

# The jobs that needs to be executed of this workflow.
jobs:
  build:
    # The platform that be executed.
    runs-on: ubuntu-latest

    # Execute in order.
    steps:
      # You can define a name for each step.
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'  # Specify the Node.js version

      - name: Install dependencies
        run: |
          npm install

      - name: Convert Markdown to HTML
        run: |
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
          publish_branch: gh-pages  # Specify the branch for deployment
```

