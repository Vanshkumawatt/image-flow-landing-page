#!/bin/bash
# Script to remove badge capsules from Events.tsx while keeping date indicators

# Make a backup of the original file
cp /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx.backup

# Remove the Premium badge
sed -i '' '/Premium badge positioning/,+5d' /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx

# Remove the Featured badge
sed -i '' '/Featured badge positioning/,+5d' /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx

# Remove the Hot badge
sed -i '' '/Hot badge positioning/,+5d' /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx

# Remove the category overlays
sed -i '' '/Category overlay/,+5d' /Users/vanshkumawat/Desktop/mian/main/image-flow-landing-page/src/pages/Events.tsx
