const fs = require('fs');
const path = require('path');

// Read the original file
const filePath = path.join('/Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove Premium, Featured, and Hot badges
content = content.replace(/{\s*\/\*\s*Premium badge positioning\s*\*\/\s*}[\s\S]*?<\/Badge>\s*<\/div>/g, '{/* Badge removed */}');
content = content.replace(/{\s*\/\*\s*Featured badge positioning\s*\*\/\s*}[\s\S]*?<\/Badge>\s*<\/div>/g, '{/* Badge removed */}');
content = content.replace(/{\s*\/\*\s*Hot badge positioning\s*\*\/\s*}[\s\S]*?<\/Badge>\s*<\/div>/g, '{/* Badge removed */}');

// Remove Category overlays
content = content.replace(/{\s*\/\*\s*Category overlay\s*\*\/\s*}[\s\S]*?<\/Badge>\s*<\/div>/g, '{/* Category overlay removed */}');

// Write the modified content back to the file
fs.writeFileSync(filePath, content);
console.log('Successfully removed badge capsules from Events.tsx');
