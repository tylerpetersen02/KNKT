# KNKT Future Enhancements

## UI/UX Improvements

- **Connection preview cards** - When viewing Connections list, show small preview of which accounts they have access to (public ones visible, private ones show lock icon)
- **Quick-add floating button** - On Connections/Accounts screens, add a floating action button to quickly add a new platform or start a new connection
- **Search across all screens** - Unified search that finds connections by name, username, or platform handles
- **Dark mode** - Simple toggle in side menu, would look cleaner
- **Onboarding flow** - First time users should see a tutorial: tap NFC button → shows connection popup → add note → accept. Currently no guidance
- **Connection activity timeline** - Show when you connected with someone, when you last interacted
- **Undo/delete connection** - Currently no way to remove a connection after accepting

---

## Feature Additions

- **Mutual connections** - Show "Sarah and Alex also know Jordan"
- **Connection requests from search** - Let people search for you and request to connect (currently only NFC/test button)
- **Bulk export contacts** - Export all connections with their platforms as CSV/vCard
- **Connection groups/circles** - Organize connections into groups (work, personal, friends, etc.) with different visibility rules per group
- **Richer notes on connections** - Add more than the personal note field (meeting context, how to follow up, etc.)
- **Reminders to connect with people** - "You met Alex at coffee shop, send them a message"
- **Platform verification** - Show which platforms you've verified/confirmed exist (checkmark)
- **Share profile link** - Generate shareable link/QR code with your public accounts
- **Privacy levels per platform** - Instead of just public/private, add tiers: Everyone, Mutual Connections Only, Manually Approved
- **Integration with native contacts** - Option to sync selected connections to phone contacts
- **Account statistics** - "You have 47 connections, 12 public platforms, 35 pending requests"

---

## Monetization

### Tiered Model
- **Free tier:** Basic NFC tapping, 5 platform accounts, connections list
- **Pro tier ($2.99/month or $19.99/year):**
  - Unlimited platform accounts
  - Advanced search & filters
  - Connection groups/organization
  - Bulk export to CSV
  - Profile link/QR code sharing
  - Connection activity timeline
  - No ads

### Alternatives
- One-time purchase ($4.99) instead of subscription
- Free forever with optional "tip jar" in-app purchase
- Ad-supported free tier

---

## Current Feature Refinements

- **Accept/Decline on Requests tab** - Let users accept/decline directly from the list without opening a modal
- **Better empty states** - Show helpful guidance not just "No connections yet"
- **Platform icons on connections** - Show small icons of platforms they have access to on the connection card
- **Search suggestions** - When searching platforms, show "You haven't added Instagram" vs "You added Instagram"
- **Batch actions** - Select multiple platforms to make public/private at once
- **Platform health check** - Periodically verify added accounts still exist (optional)
- **Connection notes visibility** - Option to add a "public note" visible to the connection

---

## Technical / Backend

- **Real NFC implementation** - Currently a test button; real NFC needs bi-directional handshake
- **Supabase backend** - Wire up real auth, data persistence, and sync
- **Sync across devices** - Access connections on web/desktop
- **Rate limiting on connection requests** - Prevent spam/abuse
- **Report/block users** - If someone is being inappropriate
- **Connection expiry** - Optionally expire old connections after X months of no interaction

---

## Brand / Growth

- **Referral system** - "Invite a friend, both get a bonus feature"
- **Social proof** - Show "47 people connected today"
- **In-app messaging** - Once connected, message within app instead of going to 5 different apps
- **Platform recommendations** - "Your connections love Instagram and Spotify, add them?"

---

## Top 5 Priorities (Recommended)

1. **Onboarding flow** - New users are confused without guidance
2. **Connection preview cards** - Show which platforms they have access to (critical UX win)
3. **Delete/undo connection** - Basic feature people will expect
4. **Quick-add button** - Make adding accounts/connections faster
5. **Free tier + Pro subscription** - Simple monetization, $2.99/month for unlimited platforms
