# Markdown

## Headings
<!-- Headings -->
# Heading1
## Heading2
### Heading3
#### Heading4
##### Heading5
###### Heading6

## Text
<!-- Text -->
This is text.

## Quote
<!-- Quote -->
> This  
> is  
> quote  

## Unordered List
<!-- Unordered List -->
- Unodered List
- Unodered List

## Ordered List
<!-- Ordered List --> 
1. Ordered List
2. Ordered List

## Task List
<!-- Task List -->
- [ ] Task List
- [x] Task List (Checked)

## Code Block
<!-- Code Block -->
``` C
/* Here are code content */
printf("C!");
``` 

## Table
<!-- Table -->
|table col1|table col2|table col3|  
|---|---|---|  
|row1-col1|row1-col2|row1-col3|  
|row2-col1|row2-col2|row2-col3|

## Font Style
<!-- Font Style -->
_Italic_

**Bold**

***Bold & Italic***

<!-- Divider -->
## Divider
--- 

<!-- Link -->
## Link
[DuckDuckGo](https://duckduckgo.com/)  
[DuckDuckGo](https://duckduckgo.com/ "It is DuckDuckGo")  
### It is internal-link, also can be the table of content.
[Link Text](./C.md)  
[Link Text](/OpenWrt/OpenWrt.md)  
[Link Text](#quote)  
[Link Text](./Python.md#linked-list)

<!-- Image -->
## Image
![Image Text](Image-Path)
![Image Text](Image-Path "Image Tip")

## Element Mapping 
| Markdown Element | HTML Element | Description | 
| :--- | :--- | :--- |  
| # Header1 | <h1>Header1</h1> | Level 1 heading |  
| ## Header2 | <h2>Header2</h2> | Level 2 heading |  
| ### Header3 | <h3>Header3</h3> | Level 3 heading |  
| #### Header4 | <h4>Header4</h4> | Level 4 heading |  
| ##### Header5 | <h5>Header5</h5> | Level 5 heading |  
| ###### Header6 | <h6>Header6</h6> | Level 6 heading |  
| **bold text** | <strong>bold text</strong> | Bold text |  
| *italic text* | <em>italic text</em> | Italic text |  
| ~~strikethrough~~ | <del>strikethrough</del> | Strikethrough text |  
| - Item 1 | <ul><li>Item 1</li></ul> | Unordered list item |  
| 1. Item 1 | <ol><li>Item 1</li></ol> | Ordered list item |  
| [link text](url) | <a href="url">link text</a> | Hyperlink |  
| ![alt text](url) | <img src="url" alt="alt text"> | Image |  
| `inline code` | <code>inline code</code> | Inline code |  
| ``` Code Block ``` | <pre><code>code block</code></pre> | Code block |  
| > Blockquote | <blockquote>Blockquote</blockquote> | Blockquote |  
| --- or *** | <hr> | Horizontal rule |  
| > Quote | <blockquote>Quote</blockquote> | Blockquote | 