#!/bin/bash
# Script to precisely remove badge capsules from Events.tsx while keeping date indicators

# Make a backup of the original file
cp /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx.backup2

# Remove the Premium badge section
sed -i '' '/{\/\* Premium badge positioning \*\/}/,/{\/\* Enhanced image container \*\/}/c\\                {\/\* Enhanced image container \*\/}' /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx

# Remove the Featured badge section
sed -i '' '/{\/\* Featured badge positioning \*\/}/,/{\/\* Enhanced image container \*\/}/c\\                {\/\* Enhanced image container \*\/}' /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx

# Remove the Hot badge section
sed -i '' '/{\/\* Hot badge positioning \*\/}/,/{\/\* Enhanced image container \*\/}/c\\                {\/\* Enhanced image container \*\/}' /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx

# Remove all Category overlay sections
sed -i '' '/{\/\* Category overlay \*\/}/,/<\/Badge>/d' /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx
