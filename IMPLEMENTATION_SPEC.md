# KNKT MVP - Complete Claude Code Implementation Brief

## PROJECT OVERVIEW

**Project Name:** KNKT
**Description:** NFC-powered contact exchange app. Users tap phones to instantly create contact exchanges. Async search & connection requests for discovery.

**Core Value:** "Connect with a tap" — frictionless contact sharing via NFC, with optional manual discovery.

**MVP Scope:** Working prototype with NFC exchanges, connection management, search, and notifications. No animations, no offline sync, no polish.

**Target Timeline:** 6 days of focused development to working prototype.

---

## REQUIREMENTS & SPECS

### Feature Set (MVP Only)

**1. Authentication**
- Email/password signup
- Email/password login
- Session persistence
- Graceful logout
- Error handling for auth failures

**2. User Profile**
- Edit display name, username, bio, avatar
- Add/remove platforms (phone, email, Instagram, Snapchat, LinkedIn, Venmo, TikTok, Twitter, etc.)
- View own profile in settings menu

**3. NFC Exchange (Core Feature)**
- HOME tab: "Ready to Exchange" button
- On tap: initiator enters NFC write mode
- Receiver's app auto-reads NFC payload (userId, timestamp, signature)
- Receiver sees popup: "[Name] wants to connect"
- Receiver can accept or decline
- On accept: Creates exchange record with status='accepted'
- Both users get notification
- Both see connection in CONNECTIONS tab
- Both can now see each other's shared platforms via deep links

**4. Connections Management**
- CONNECTIONS tab: List all accepted exchanges
- Tap contact: See their profile, available platforms
- Deep links: Tap to open Instagram/Snapchat/Venmo/etc in their app
- Edit note about connection (where met, context)
- Option to block connection

**5. Search & Async Connection Requests**
- SEARCH tab: Search by username or display name
- See search results (user card with avatar, name, bio)
- Tap "[+ Connect]": Sends connection request
- Creates connection_request record with status='pending'
- Receiver gets notification: "Tyler wants to connect"
- Receiver can accept or decline in NOTIFICATIONS
- On accept: Creates connection (same as NFC exchange)

**6. Notifications**
- NOTIFICATIONS tab: List all pending actions
- Show exchange attempts (awaiting receiver response)
- Show connection requests (awaiting receiver response)
- Show acceptances (for info only)
- Tap to act (accept/decline)
- Mark as read
- Real-time updates (polling every 5 seconds is fine)

**7. Settings/Profile Side Menu**
- Access via icon/hamburger in top-right corner
- Edit profile (name, username, bio, avatar)
- Manage platforms (add/edit/remove)
- View blocked users
- Logout

---

## TECHNOLOGY STACK

### Core Versions (Locked - DO NOT DEVIATE)

```json
{
  "expo": "~54.0.33",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo-router": "~6.0.23",
  "typescript": "^5.3.0"
}
```

### Dependencies (Locked)

```json
{
  "@supabase/supabase-js": "^2.38.0",
  "zustand": "^4.4.0",
  "react-hook-form": "^7.51.0",
  "zod": "^3.22.0",
  "react-native-nfc-manager": "^3.15.0",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "expo-camera": "^15.0.7"
}
```

---

## FOLDER STRUCTURE

```
knkt-app/
├─ app/
│  ├─ _layout.tsx
│  ├─ +not-found.tsx
│  ├─ (auth)/
│  │  ├─ _layout.tsx
│  │  ├─ login.tsx
│  │  └─ signup.tsx
│  └─ (tabs)/
│     ├─ _layout.tsx
│     ├─ home.tsx
│     ├─ connections.tsx
│     ├─ search.tsx
│     ├─ notifications.tsx
│     └─ profile.tsx
├─ services/
│  ├─ supabase.ts
│  ├─ auth.ts
│  ├─ users.ts
│  ├─ exchanges.ts
│  ├─ requests.ts
│  ├─ notifications.ts
│  ├─ nfc.ts
│  └─ search.ts
├─ stores/
│  ├─ authStore.ts
│  ├─ userStore.ts
│  ├─ exchangeStore.ts
│  ├─ requestStore.ts
│  └─ notificationStore.ts
├─ components/
│  ├─ UserCard.tsx
│  ├─ Button.tsx
│  ├─ Input.tsx
│  ├─ NotificationItem.tsx
│  ├─ ExchangePopup.tsx
│  ├─ PlatformButton.tsx
│  └─ SideMenu.tsx
├─ types/
│  └─ index.ts
├─ utils/
│  ├─ colors.ts
│  ├─ spacing.ts
│  ├─ deepLinks.ts
│  ├─ formatting.ts
│  └─ validators.ts
└─ constants/
   └─ platforms.ts
```

---

## BUILD ORDER (Exactly This Sequence)

### Day 1: Foundation & Auth
- Create Expo project with dependencies
- Set up Supabase client with timeout protection
- Implement auth service and store
- Create root layout with auth routing
- Create login/signup screens
- **Test:** Signup, login, logout work

### Day 2: User Profile & Platforms
- Create user service and store
- Create UI components (Button, Input, UserCard)
- Create profile/settings screen
- Create side menu
- **Test:** Can view profile, edit name, add/remove platforms

### Day 3: Connections & Exchanges
- Create exchange service and store
- Create CONNECTIONS screen
- Implement accept/decline logic
- **Test:** Can view connections, see platforms

### Day 4: Search & Requests
- Create search and request services
- Create SEARCH screen
- Implement connection request flow
- **Test:** Can search, send requests, accept/decline

### Day 5: Notifications
- Create notification service and store
- Create NOTIFICATIONS screen
- Auto-create notifications on exchange/request
- **Test:** Notifications appear and work

### Day 6: NFC Implementation
- Configure NFC in app.json
- Create NFC service with read/write
- Update HOME screen with NFC
- Create exchange popup
- **Test:** Two phones can tap and exchange

---

## CRITICAL DETAILS

### 1. Timeout Protection
Every network call must timeout after 3 seconds to prevent 2-hour freezes.

### 2. NFC Payload
```json
{
  "userId": "uuid-here",
  "timestamp": 1710334800,
  "signature": "hmac-hash-here"
}
```

### 3. Database Tables
- users
- user_platforms
- exchange_attempts
- connection_requests
- connections
- notifications

### 4. Deep Links
Open Instagram, Snapchat, Venmo, etc. from deep links when platform handle tapped.

---

## ENVIRONMENT SETUP

Create `.env.local` (never commit):
```
EXPO_PUBLIC_SUPABASE_URL=https://whkbbkgnqwekaytyxpqp.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_public_key_here
HMAC_SECRET=your_secret_key_here
```

---

## SUCCESS CRITERIA

✅ User signup/login
✅ User can add platforms
✅ Two users can NFC tap and exchange
✅ Both see connection in CONNECTIONS tab
✅ Users can search and send async requests
✅ Notifications for exchanges/requests
✅ Accept/decline functionality
✅ Deep links work
✅ No hangs or crashes
✅ All data persists in Supabase

---

**Start with Day 1: Foundation & Auth**
