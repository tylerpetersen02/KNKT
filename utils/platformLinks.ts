import { Linking, Platform, Alert } from 'react-native';
import type { PlatformType } from '../data/mockConnections';

type PlatformLinkConfig = {
  ios?: (handle: string, contactName?: string) => string;
  android?: (handle: string, contactName?: string) => string;
  web: (handle: string, contactName?: string) => string;
};

export const PLATFORM_LINKS: Record<PlatformType, PlatformLinkConfig> = {
  // SOCIAL MEDIA (8)
  instagram: {
    ios: (h) => `instagram://user?username=${h}`,
    android: (h) =>
      `intent://instagram.com/_u/${h}/#Intent;package=com.instagram.android;scheme=https;end`,
    web: (h) => `https://instagram.com/${h}`,
  },
  facebook: {
    ios: (h) => `fb://profile/${h}`,
    android: (h) => `fb://profile/${h}`,
    web: (h) => `https://facebook.com/${h}`,
  },
  twitter: {
    ios: (h) => `twitter://user?screen_name=${h}`,
    android: (h) => `twitter://user?screen_name=${h}`,
    web: (h) => `https://twitter.com/${h}`,
  },
  tiktok: {
    ios: (h) => `https://www.tiktok.com/@${h}`,
    android: (h) => `https://www.tiktok.com/@${h}`,
    web: (h) => `https://www.tiktok.com/@${h}`,
  },
  snapchat: {
    ios: (h) => `https://www.snapchat.com/@${h}`,
    android: (h) => `https://www.snapchat.com/@${h}`,
    web: (h) => `https://www.snapchat.com/@${h}`,
  },
  bluesky: {
    web: (h) => `https://bsky.app/profile/${h}`,
  },
  mastodon: {
    web: (h) => `https://mastodon.social/@${h}`,
  },
  threads: {
    web: (h) => `https://threads.net/@${h}`,
  },

  // MESSAGING & COMMUNICATION (8)
  whatsapp: {
    ios: (h) => `whatsapp://send?phone=${h}`,
    android: (h) => `whatsapp://send?phone=${h}`,
    web: (h) => `https://wa.me/${h}`,
  },
  telegram: {
    ios: (h) => `tg://resolve?domain=${h}`,
    android: (h) => `tg://resolve?domain=${h}`,
    web: (h) => `https://t.me/${h}`,
  },
  discord: {
    ios: (h) => `https://discord.com/users/${h}`,
    android: (h) => `https://discord.com/users/${h}`,
    web: (h) => `https://discord.com/users/${h}`,
  },
  slack: {
    web: (h) => `https://${h}.slack.com`,
  },
  signal: {
    ios: (h) => `sgnl://signal.me/#p/${h}`,
    android: (h) => `sgnl://signal.me/#p/${h}`,
    web: (h) => `https://signal.me/#p/${h}`,
  },
  viber: {
    ios: (h) => `viber://chat?number=${h}`,
    android: (h) => `viber://chat?number=${h}`,
    web: (h) => `https://viber.com/${h}`,
  },
  wechat: {
    web: (h) => `https://wechat.com`,
  },
  line: {
    ios: (h) => `line://ti/p/~${h}`,
    android: (h) => `line://ti/p/~${h}`,
    web: (h) => `https://line.me/ti/p/~${h}`,
  },

  // PROFESSIONAL & DEVELOPMENT (8)
  linkedin: {
    ios: (h) => `linkedin://in/${h}`,
    android: (h) => `linkedin://in/${h}`,
    web: (h) => `https://linkedin.com/in/${h}`,
  },
  github: {
    web: (h) => `https://github.com/${h}`,
  },
  gitlab: {
    web: (h) => `https://gitlab.com/${h}`,
  },
  bitbucket: {
    web: (h) => `https://bitbucket.org/${h}`,
  },
  stackoverflow: {
    web: (h) => `https://stackoverflow.com/users/${h}`,
  },
  devto: {
    web: (h) => `https://dev.to/${h}`,
  },
  hashnode: {
    web: (h) => `https://hashnode.com/@${h}`,
  },
  indiehackers: {
    web: (h) => `https://indiehackers.com/${h}`,
  },

  // CREATIVE & DESIGN (7)
  behance: {
    web: (h) => `https://behance.net/${h}`,
  },
  dribbble: {
    web: (h) => `https://dribbble.com/${h}`,
  },
  pinterest: {
    ios: (h) => `pinterest://user/${h}`,
    android: (h) => `pinterest://user/${h}`,
    web: (h) => `https://pinterest.com/${h}`,
  },
  flickr: {
    web: (h) => `https://flickr.com/photos/${h}`,
  },
  '500px': {
    web: (h) => `https://500px.com/${h}`,
  },
  deviantart: {
    web: (h) => `https://deviantart.com/${h}`,
  },
  artstation: {
    web: (h) => `https://artstation.com/${h}`,
  },

  // VIDEO & STREAMING (6)
  youtube: {
    ios: (h) => `https://www.youtube.com/@${h}`,
    android: (h) => `https://www.youtube.com/@${h}`,
    web: (h) => `https://www.youtube.com/@${h}`,
  },
  twitch: {
    ios: (h) => `https://www.twitch.tv/${h}`,
    android: (h) => `https://www.twitch.tv/${h}`,
    web: (h) => `https://www.twitch.tv/${h}`,
  },
  vimeo: {
    web: (h) => `https://vimeo.com/${h}`,
  },
  soundcloud: {
    web: (h) => `https://soundcloud.com/${h}`,
  },
  kick: {
    web: (h) => `https://kick.com/${h}`,
  },
  rumble: {
    web: (h) => `https://rumble.com/user/${h}`,
  },

  // GAMING (10)
  steam: {
    ios: (h) => `steam://profiles/${h}`,
    android: (h) => `steam://profiles/${h}`,
    web: (h) => `https://steamcommunity.com/search/?text=${h}`,
  },
  epicgames: {
    web: (h) => `https://www.epicgames.com/site/en-US/community/profile/${h}`,
  },
  psn: {
    ios: (h) => `psn://user/${h}`,
    android: (h) => `psn://user/${h}`,
    web: (h) => `https://www.psn.com/en-us/profile/${h}`,
  },
  xbox: {
    ios: (h) => `xbox://user/${h}`,
    android: (h) => `xbox://user/${h}`,
    web: (h) => `https://www.xbox.com/en-US/xbox-live/search?gamertag=${h}`,
  },
  nintendoswitch: {
    web: (h) => `https://www.nintendo.com`,
  },
  riotgames: {
    web: (h) => `https://www.leagueoflegends.com/en-us/`,
  },
  valorant: {
    web: (h) => `https://playvalorant.com`,
  },
  fortnite: {
    web: (h) => `https://www.epicgames.com/fortnite/en-US/`,
  },
  roblox: {
    ios: (h) => `roblox://user/${h}`,
    android: (h) => `roblox://user/${h}`,
    web: (h) => `https://roblox.com/user.aspx?username=${h}`,
  },
  minecraft: {
    web: (h) => `https://namemc.com/profile/${h}`,
  },

  // FINANCE & PAYMENT (6)
  venmo: {
    ios: (h) => `https://venmo.com/u/${h}`,
    android: (h) => `https://venmo.com/u/${h}`,
    web: (h) => `https://venmo.com/u/${h}`,
  },
  paypal: {
    ios: (h) => `paypal://user/${h}`,
    web: (h) => `https://paypal.me/${h}`,
  },
  squarecash: {
    web: (h) => `https://square.cash/$${h}`,
  },
  applepay: {
    web: (h) => `https://www.apple.com/apple-pay/`,
  },
  googlepay: {
    web: (h) => `https://pay.google.com`,
  },
  cryptowallet: {
    web: (h) => `https://www.blockchain.com/search?search=${h}`,
  },

  // MUSIC (3)
  spotify: {
    ios: (h) => `spotify://user/${h}`,
    android: (h) => `spotify://user/${h}`,
    web: (h) => `https://open.spotify.com/user/${h}`,
  },
  applemusic: {
    ios: (h) => `music://`,
    web: (h) => `https://music.apple.com/profile/${h}`,
  },
  bandcamp: {
    web: (h) => `https://${h}.bandcamp.com`,
  },

  // SPORTS & FITNESS (4)
  strava: {
    ios: (h) => `strava://athletes/${h}`,
    android: (h) => `strava://athletes/${h}`,
    web: (h) => `https://www.strava.com/athletes/${h}`,
  },
  grint: {
    web: (h) => `https://grint.com/profile/${h}`,
  },
  '18birdies': {
    web: (h) => `https://18birdies.com`,
  },
  golfnow: {
    web: (h) => `https://www.golfnow.com`,
  },

  // COMMUNITY & DISCUSSION (6)
  reddit: {
    ios: (h) => `reddit://user/${h}`,
    android: (h) => `reddit://user/${h}`,
    web: (h) => `https://reddit.com/user/${h}`,
  },
  quora: {
    web: (h) => `https://quora.com/profile/${h}`,
  },
  producthunt: {
    web: (h) => `https://producthunt.com/@${h}`,
  },
  hackernews: {
    web: (h) => `https://news.ycombinator.com/user?id=${h}`,
  },
  nextdoor: {
    web: (h) => `https://nextdoor.com`,
  },
  medium: {
    ios: (h) => `medium://user/${h}`,
    android: (h) => `medium://user/${h}`,
    web: (h) => `https://medium.com/@${h}`,
  },

  // CONTENT & MONETIZATION (4)
  patreon: {
    web: (h) => `https://patreon.com/${h}`,
  },
  kofi: {
    web: (h) => `https://ko-fi.com/${h}`,
  },
  gumroad: {
    web: (h) => `https://gumroad.com/${h}`,
  },
  substack: {
    web: (h) => `https://${h}.substack.com`,
  },

  // SHOPPING & MARKETPLACE (6)
  amazon: {
    ios: (h) => `amazon://`,
    android: (h) => `amazon://`,
    web: (h) => `https://amazon.com/s?k=${h}`,
  },
  ebay: {
    ios: (h) => `ebay://user/${h}`,
    android: (h) => `ebay://user/${h}`,
    web: (h) => `https://ebay.com/usr/${h}`,
  },
  depop: {
    ios: (h) => `depop://user/${h}`,
    web: (h) => `https://depop.com/${h}`,
  },
  poshmark: {
    ios: (h) => `poshmark://user/${h}`,
    android: (h) => `poshmark://user/${h}`,
    web: (h) => `https://poshmark.com/closet/${h}`,
  },
  mercari: {
    web: (h) => `https://mercari.com/user/${h}`,
  },
  etsy: {
    ios: (h) => `etsy://shop/${h}`,
    android: (h) => `etsy://shop/${h}`,
    web: (h) => `https://etsy.com/shop/${h}`,
  },

  // DATING & SOCIAL (4)
  tinder: {
    web: (h) => `https://tinder.com`,
  },
  bumble: {
    web: (h) => `https://bumble.com`,
  },
  hinge: {
    web: (h) => `https://hinge.co`,
  },
  match: {
    web: (h) => `https://match.com`,
  },

  // TRAVEL & MEETUP (2)
  meetup: {
    ios: (h) => `meetup://`,
    android: (h) => `meetup://`,
    web: (h) => `https://meetup.com/${h}`,
  },
  airbnb: {
    ios: (h) => `airbnb://`,
    android: (h) => `airbnb://`,
    web: (h) => `https://airbnb.com/users/show/${h}`,
  },

  // BASIC CONTACT (4)
  phone: {
    ios: (h) => `tel:${h}`,
    android: (h, name = 'Contact') =>
      `intent://contact/new#Intent;action=android.intent.action.INSERT;category=android.intent.category.DEFAULT;S.com.android.contacts.extra.NAME=${encodeURIComponent(name)};S.android.phone.extra.PHONE=${encodeURIComponent(h)};end`,
    web: (h) => `tel:${h}`,
  },
  email: {
    web: (h) => `mailto:${h}`,
  },
  website: {
    web: (h) => `https://${h}`,
  },
  businesscard: {
    web: (h) => `https://`,
  },
};

/**
 * Opens a platform profile using native deep links with web fallback.
 * Tries native app first (if config exists), then falls back to web.
 * Special handling for phone: tries Contacts app first, falls back to dialer.
 * @param platform - Platform type (e.g., 'instagram', 'phone')
 * @param handle - User handle/identifier (e.g., username, phone number)
 * @param contactName - Optional: Contact name (used for phone contacts)
 */
export async function openPlatformProfile(
  platform: string,
  handle: string,
  contactName?: string
): Promise<void> {
  const config = PLATFORM_LINKS[platform as PlatformType];
  if (!config) {
    Alert.alert('Platform not supported');
    return;
  }

  // Special handling for phone: try Contacts app, fall back to dialer
  if (platform === 'phone') {
    const nativeUrl =
      Platform.OS === 'ios'
        ? config.ios?.(handle, contactName)
        : Platform.OS === 'android'
          ? config.android?.(handle, contactName)
          : undefined;

    if (nativeUrl) {
      try {
        await Linking.openURL(nativeUrl);
        return;
      } catch (error) {
        // Fallback to tel: dialer
      }
    }

    // Fallback to phone dialer
    try {
      const dialUrl = `tel:${handle}`;
      await Linking.openURL(dialUrl);
    } catch (error) {
      Alert.alert('Error', 'Could not open phone or contacts app');
    }
    return;
  }

  // Standard flow for non-phone platforms
  const nativeUrl =
    Platform.OS === 'ios'
      ? config.ios?.(handle, contactName)
      : Platform.OS === 'android'
        ? config.android?.(handle, contactName)
        : undefined;

  if (nativeUrl) {
    try {
      const canOpen = await Linking.canOpenURL(nativeUrl);
      if (canOpen) {
        await Linking.openURL(nativeUrl);
        return;
      }
    } catch (error) {
      // Fallback to web if native fails
    }
  }

  // Fallback to web
  try {
    const webUrl = config.web(handle, contactName);
    await Linking.openURL(webUrl);
  } catch (error) {
    Alert.alert('Error', 'Could not open link for this platform');
  }
}
