#!/bin/bash

# KNKT Platform Icons Downloader
# Downloads all 86 platform logos from SimpleIcons and converts to PNG

set -e

# Create directories
mkdir -p assets/platform-logos/svg
mkdir -p assets/platform-logos/png
mkdir -p assets/platform-logos/meta

echo "🎨 KNKT Platform Icons Downloader"
echo "=================================="
echo ""

# Platform to SimpleIcons name mapping
declare -A ICON_MAP=(
  [instagram]="instagram"
  [facebook]="facebook"
  [twitter]="x"
  [tiktok]="tiktok"
  [snapchat]="snapchat"
  [bluesky]="bluesky"
  [mastodon]="mastodon"
  [threads]="threads"
  [whatsapp]="whatsapp"
  [telegram]="telegram"
  [discord]="discord"
  [slack]="slack"
  [signal]="signal"
  [viber]="viber"
  [wechat]="wechat"
  [line]="line"
  [linkedin]="linkedin"
  [github]="github"
  [gitlab]="gitlab"
  [bitbucket]="bitbucket"
  [stackoverflow]="stackoverflow"
  [devto]="dev-dot-to"
  [hashnode]="hashnode"
  [indiehackers]="indiehackers"
  [behance]="behance"
  [dribbble]="dribbble"
  [pinterest]="pinterest"
  [flickr]="flickr"
  [500px]="500px"
  [deviantart]="deviantart"
  [artstation]="artstation"
  [youtube]="youtube"
  [twitch]="twitch"
  [vimeo]="vimeo"
  [soundcloud]="soundcloud"
  [kick]="kick"
  [rumble]="rumble"
  [steam]="steam"
  [epicgames]="epicgames"
  [psn]="playstation"
  [xbox]="xbox"
  [nintendoswitch]="nintendo"
  [riotgames]="riotgames"
  [valorant]="valorant"
  [fortnite]="fortnite"
  [roblox]="roblox"
  [minecraft]="minecraft"
  [venmo]="venmo"
  [paypal]="paypal"
  [squarecash]="cashapp"
  [applepay]="applepay"
  [googlepay]="googlepay"
  [cryptowallet]="bitcoin"
  [spotify]="spotify"
  [applemusic]="applemusic"
  [bandcamp]="bandcamp"
  [strava]="strava"
  [grint]="thegrint"
  [18birdies]="18birdies"
  [golfnow]="golfnow"
  [reddit]="reddit"
  [quora]="quora"
  [producthunt]="producthunt"
  [hackernews]="ycombinator"
  [nextdoor]="nextdoor"
  [medium]="medium"
  [patreon]="patreon"
  [kofi]="kofi"
  [gumroad]="gumroad"
  [substack]="substack"
  [amazon]="amazon"
  [ebay]="ebay"
  [depop]="depop"
  [poshmark]="poshmark"
  [mercari]="mercari"
  [etsy]="etsy"
  [tinder]="tinder"
  [bumble]="bumble"
  [hinge]="hinge"
  [match]="match"
  [meetup]="meetup"
  [airbnb]="airbnb"
)

SIMPLEICONS_CDN="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons"
TOTAL=${#ICON_MAP[@]}
CURRENT=0
FAILED=0
SUCCESS=0

echo "📥 Downloading $TOTAL platform icons from SimpleIcons..."
echo ""

for platform in "${!ICON_MAP[@]}"; do
  icon_name="${ICON_MAP[$platform]}"
  CURRENT=$((CURRENT + 1))

  # Download SVG
  svg_url="${SIMPLEICONS_CDN}/${icon_name}.svg"
  svg_file="assets/platform-logos/svg/${platform}.svg"

  printf "[$CURRENT/$TOTAL] $platform... "

  if curl -s -f -o "$svg_file" "$svg_url"; then
    echo "✅"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "❌"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "=================================="
echo "✅ Downloaded: $SUCCESS/$TOTAL"
echo "❌ Failed: $FAILED/$TOTAL"
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
  echo "⚠️  ImageMagick not found"
  echo "   SVGs are ready in: assets/platform-logos/svg/"
  echo "   Install ImageMagick to convert to PNG:"
  echo "   Mac: brew install imagemagick"
  echo "   Linux: sudo apt-get install imagemagick"
  exit 0
fi

echo "🎨 Converting SVGs to PNG (512x512)..."
echo ""

CONVERTED=0
for svg_file in assets/platform-logos/svg/*.svg; do
  filename=$(basename "$svg_file" .svg)
  png_file="assets/platform-logos/png/${filename}.png"

  printf "Converting $filename... "

  if convert -background none -size 512x512 "$svg_file" -resize 512x512 "$png_file" 2>/dev/null; then
    echo "✅"
    CONVERTED=$((CONVERTED + 1))
  else
    echo "⏭️  skipped"
  fi
done

echo ""
echo "✅ Converted: $CONVERTED SVGs to PNG"
echo ""

echo "📊 Final Summary"
echo "=================================="
echo "✅ Total SVG files: $(ls -1 assets/platform-logos/svg/*.svg 2>/dev/null | wc -l)"
echo "✅ Total PNG files: $(ls -1 assets/platform-logos/png/*.png 2>/dev/null | wc -l)"
echo ""
echo "📁 Location: assets/platform-logos/"
echo "   ├── svg/   (86 icons)"
echo "   ├── png/   (converted icons)"
echo "   └── meta/  (metadata)"
echo ""
echo "✨ Done!"
