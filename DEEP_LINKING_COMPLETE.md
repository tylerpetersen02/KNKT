# Platform Deep Linking Implementation

Complete deep linking support for all 86 platforms in the KNKT app.

## Overview

When a user taps "Open"/"Call"/"Email" on a shared platform in a connection's detail view:

1. **Native App Attempt**: App tries to open the platform's native app using platform-specific deep links
2. **Web Fallback**: If native app isn't installed, falls back to web URL
3. **Error Handling**: Shows alert if neither works

## Implementation Files

- **`utils/platformLinks.ts`**: Core deep linking logic (398 lines)
  - `PLATFORM_LINKS` record: All 86 platforms with native/web URL schemes
  - `openPlatformProfile()`: Helper function that handles try native → fallback to web

- **`screens/ConnectionsScreen.tsx`**: Wired action buttons to deep linking
- **`components/ConnectionCard.tsx`**: Added custom icons for Snapchat & Discord

## Platform Coverage

### Social Media (8)
- Instagram: `instagram://user?username=H` → `https://instagram.com/H`
- Facebook: `fb://profile/H` → `https://facebook.com/H`
- Twitter: `twitter://user?screen_name=H` → `https://twitter.com/H`
- TikTok: `tiktok://user/@H` → `https://tiktok.com/@H`
- Snapchat: Web only → `https://snapchat.com/add/H`
- Bluesky: Web only → `https://bsky.app/profile/H`
- Mastodon: Web only → `https://mastodon.social/@H`
- Threads: Web only → `https://threads.net/@H`

### Messaging & Communication (8)
- WhatsApp: `whatsapp://send?phone=H` → `https://wa.me/H`
- Telegram: `tg://resolve?domain=H` → `https://t.me/H`
- Discord: Web only → `https://discord.com/users/H`
- Slack: Web only → `https://H.slack.com`
- Signal: `sgnl://signal.me/#p/H` → `https://signal.me/#p/H`
- Viber: `viber://chat?number=H` → `https://viber.com/H`
- WeChat: Web fallback (app integration limited)
- LINE: `line://ti/p/~H` → `https://line.me/ti/p/~H`

### Professional & Development (8)
- LinkedIn: `linkedin://in/H` → `https://linkedin.com/in/H`
- GitHub: Web only → `https://github.com/H`
- GitLab: Web only → `https://gitlab.com/H`
- Bitbucket: Web only → `https://bitbucket.org/H`
- Stack Overflow: Web only → `https://stackoverflow.com/users/H`
- Dev.to: Web only → `https://dev.to/H`
- HashNode: Web only → `https://hashnode.com/@H`
- Indie Hackers: Web only → `https://indiehackers.com/H`

### Creative & Design (7)
- Behance, Dribbble, Pinterest, Flickr, 500px, DeviantArt, ArtStation: Web URLs

### Video & Streaming (6)
- YouTube: `youtube://user/H` → `https://youtube.com/@H`
- Twitch: `twitch://open/user/H` → `https://twitch.tv/H`
- Vimeo, SoundCloud, Kick, Rumble: Web URLs

### Gaming (10)
- Steam: `steam://profiles/H` → Steam community search
- Epic Games, PlayStation Network, Xbox, Nintendo Switch, Riot Games, Valorant, Fortnite, Roblox, Minecraft: Web/app specific URLs

### Finance & Payment (6)
- **Venmo**: `https://venmo.com/u/H`
  - Opens Venmo user profile page
  - Shows both Pay and Request buttons for flexibility
  - If Venmo app installed on device → opens in app
  - If app not installed → falls back to web
  - User can choose to pay or request money from the profile
- PayPal, Square Cash, Apple Pay, Google Pay, Crypto Wallet: Web URLs

### Music (3)
- Spotify: `spotify://user/H` → `https://open.spotify.com/user/H`
- Apple Music: Web only
- Bandcamp: Web only

### Sports & Fitness (4)
- Strava: `strava://athletes/H` → `https://www.strava.com/athletes/H`
- GRINT, 18Birdies, GolfNow: Web URLs

### Community & Discussion (6)
- Reddit: `reddit://user/H` → `https://reddit.com/user/H`
- Quora, Product Hunt, Hacker News, Nextdoor, Medium: Web URLs

### Content & Monetization (4)
- Patreon, Ko-fi, Gumroad, Substack: Web URLs

### Shopping & Marketplace (6)
- Amazon, eBay, Depop, Poshmark, Mercari, Etsy: Web URLs

### Dating & Social (4)
- Tinder, Bumble, Hinge, Match: Web URLs

### Travel & Meetup (2)
- Meetup, Airbnb: Web URLs

### Basic Contact (4)
- **Phone**: Platform-specific contact handling
  - **Android**: Intent opens Contacts app with name and phone prefilled
  - **iOS**: `tel:H` opens phone dialer (user can manually add contact)
  - **Web**: `tel:H` opens phone dialer
- Email: `mailto:H` → Opens mail client with address
- Website: `https://H` → Opens in browser
- Business Card: Web fallback

## Special Cases

### Phone Number Contact Integration (expo-contacts)
When tapping a phone number in a connection profile:

Uses `expo-contacts` library with native contact creation form:

**iOS & Android**:
- Opens native contact creation dialog
- Prefills contact name (from connection profile)
- Prefills phone number with "mobile" label
- User can edit additional fields if desired
- User confirms and contact is saved to device
- Requests CONTACTS permission on first use

**Implementation**:
```typescript
import * as Contacts from 'expo-contacts';

await Contacts.presentFormAsync(
  undefined,
  Contacts.ContactFormType.CreateContact,
  {
    givenName: 'Michael Lubin',
    phoneNumbers: [{ number: '555-123-4567', label: 'mobile' }],
  }
);
```

**Benefits**:
- ✅ Native experience on both platforms
- ✅ Consistent UI/UX
- ✅ Full contact editing capability
- ✅ Clean permission handling
- ✅ No fallback needed - works universally

### Snapchat & Discord Custom Icons
Both platforms use custom image-based icons (not MaterialCommunityIcons) for better branding:
- Located in `components/SnapchatIcon.tsx` and `components/DiscordIcon.tsx`
- Rendered as circular crops of brand logos
- Size adjustable with `size` prop

### Venmo Deep Linking
**Important**: Venmo's app only supports payment initiation, not profile viewing. The deep link:
```typescript
venmo://payid?txn=pay&recipients=${handle}
```
- Opens the Venmo app
- Automatically fills the user as payment recipient
- User can immediately send money
- Falls back to web profile view if app not installed
- This is more useful than viewing a profile in the app

## Testing

### Test Cases
1. **Native App Installed**: Tap platform → Opens native app (e.g., Instagram → Instagram app with user profile)
2. **Native App Not Installed**: Tap platform → Opens browser with web URL
3. **Phone/Email**: "Call" and "Email" buttons trigger phone dialer/mail client
4. **Web-Only Platforms**: Directly opens browser (e.g., GitHub, Medium)
5. **Payment Platforms**: Venmo opens payment screen, PayPal opens payment flow

### Example: Michael Lubin Connection
- Venmo: Opens Venmo payment screen with Lub1n as recipient
- Instagram: Opens Instagram app to Lub1n profile (if installed) or instagram.com/Lub1n
- Snapchat: Opens web to snapchat.com/add/Lub1n (no native deep link available)
- Discord: Opens web to discord.com/users/Lub1n (no native deep link available)

## Known Limitations

1. **WeChat**: Limited native deep linking support
2. **Venmo**: Cannot deep link to user profiles (payment initiation only)
3. **Discord**: No official deep link to user profiles
4. **Some Gaming Platforms**: Limited deep linking (depends on game's integration level)

## Future Enhancements

- Add custom icons for more platforms (currently only Snapchat & Discord)
- Implement deep linking for gaming social features (Steam friends, PSN profiles, etc.)
- Add platform-specific error messages for failed deep links
- Track which platforms users have installed (cache for faster fallbacks)
