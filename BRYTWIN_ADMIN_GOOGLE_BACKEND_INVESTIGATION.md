# BRYTWIN HOMES — ADMIN DASHBOARD + GOOGLE SHEETS / DRIVE INVESTIGATION

> **Investigation Date:** 2026-09-13
> **Status:** Investigation only — no code modified

---

## 1. Current Architecture

### How Listings Work Today

Brytwin Homes is a Vite + React + TypeScript SPA with no backend. Property listings are stored in a Google Spreadsheet and fetched client-side via a third-party public proxy.

**Data flow:**

```
Google Spreadsheet (ID: 1UK0qYeCVkeoAc7WhQz2kDi9PUd1L2VKt9MGXN6wZQRM)
        │
        │  Sheet name: "Properties"
        ▼
opensheet.elk.sh (public JSON proxy — no auth required)
        │
        │  GET /1UK0q.../Properties → JSON array
        ▼
Browser fetch() in React components
        │
        ├── App.tsx (home page featured property)
        └── pages/Properties.tsx (full listing page)
                │
                ▼
        Property cards rendered with Google Drive image/video URLs
```

**Key architectural facts:**

- There is **no backend server**. The browser fetches property data directly from `opensheet.elk.sh`.
- There is **no authentication** on the spreadsheet read. Anyone with the URL can read all property data.
- The spreadsheet ID and sheet name are **hardcoded** in two source files.
- Google Drive media URLs are **embedded directly** in the spreadsheet cells.
- The frontend converts Google Drive URLs to direct embed/thumbnail URLs at render time.

---

## 2. Files Involved

### Source files with property/media logic

| File | Responsibility |
|------|---------------|
| `src/App.tsx` (lines 45-59) | `Property` interface definition |
| `src/App.tsx` (lines 102-170) | `isVideoUrl()`, `getVideoThumbnail()`, `convertGoogleDriveUrl()` helper functions |
| `src/App.tsx` (lines 172-177) | Fetch properties from opensheet.elk.sh |
| `src/App.tsx` (lines 1097-1216) | Featured Properties section (home page) — renders first property |
| `src/pages/Properties.tsx` (lines 28-42) | Duplicate `Property` interface |
| `src/pages/Properties.tsx` (lines 77-145) | Duplicate `isVideoUrl()`, `getVideoThumbnail()`, `convertGoogleDriveUrl()` |
| `src/pages/Properties.tsx` (lines 147-152) | Duplicate fetch properties from opensheet.elk.sh |
| `src/pages/Properties.tsx` (lines 596-706) | Property card grid rendering |
| `src/pages/Properties.tsx` (lines 729-806) | Image slideshow modal (handles both images and videos) |
| `src/components/Seo.tsx` | Dynamic `<head>` meta tag management |
| `src/contexts/CurrencyContext.tsx` | Currency conversion for property prices |

### Supporting files

| File | Responsibility |
|------|---------------|
| `src/main.tsx` | App entry point (wraps in ThemeProvider + CurrencyProvider) |
| `src/index.css` | Global styles, Google Fonts |
| `package.json` | Dependencies (includes unused `@supabase/supabase-js`) |
| `vite.config.ts` | Vite build config |
| `public/_headers` | Netlify deployment cache headers |
| `index.html` | SPA shell |

### Notable code issues found

1. **~70 lines of code duplication** between `App.tsx` and `Properties.tsx` (Property interface, helper functions, fetch call).
2. **`@supabase/supabase-js`** is listed in `package.json` but **never imported or used** anywhere.
3. **No `.env` files exist.** All API endpoints and IDs are hardcoded in source files.
4. **No TypeScript strict null checks** for spreadsheet data — all fields typed as `string` but may arrive as `undefined`.

---

## 3. Current Google Sheet Schema

### Spreadsheet details

- **Spreadsheet ID:** `1UK0qYeCVkeoAc7WhQz2kDi9PUd1L2VKt9MGXN6wZQRM`
- **Sheet name:** `Properties`
- **Access method:** `opensheet.elk.sh` public JSON proxy
- **Endpoint:** `https://opensheet.elk.sh/{spreadsheetId}/{sheetName}`
- **Returns:** JSON array of objects, one per row

### Columns (as defined by the Property interface)

| Column | Required? | Type | Current use | Parsed by code? | Safe to edit? |
|--------|-----------|------|-------------|-----------------|---------------|
| `ID` | Yes | string | Row identifier (1, 2, 3, 4) | Yes — used as React `key` | ⚠️ Critical — currently row numbers |
| `Title` | Yes | string | Property title | Yes — displayed in cards | Yes |
| `Location` | Yes | string | Property location | Yes — displayed in cards | Yes |
| `Price` | Yes | string | Numeric price (with commas) | Yes — parsed with `parseFloat` after stripping non-numeric chars | Yes |
| `Currency` | Yes | string | Currency code (USD, GHS, etc.) | Yes — displayed before price | Yes |
| `Bedrooms` | Yes | string | Number of bedrooms | Yes — displayed in cards | Yes |
| `Bathrooms` | Yes | string | Number of bathrooms | Yes — displayed in cards | Yes |
| `Description` | Yes | string | Property description text | Yes — displayed in cards | Yes |
| `Exterior Images` | No | string | Comma-separated Google Drive URLs | Yes — split by comma, filtered, converted | Yes |
| `Bedroom Images` | No | string | Comma-separated Google Drive URLs | Yes — parsed in slideshow modal | Yes |
| `Bathroom Images` | No | string | Comma-separated Google Drive URLs | Yes — parsed in slideshow modal | Yes |
| `Livingroom Images` | No | string | Comma-separated Google Drive URLs | Yes — parsed in slideshow modal | Yes |
| `Status` | No | string | Currently unused in rendering | Defined in interface but **not displayed or filtered** | ⚠️ Reserved — likely intended for active/archived |

### Parsing rules

- Multiple URLs in one cell are separated by **commas** (`,`)
- URLs may contain **newline characters** (`\n`) — the code strips these with `.replace(/\n/g, '')`
- URLs may contain **leading/trailing whitespace** — the code trims with `.trim()`
- Empty entries after splitting are filtered out with `.filter(url => url && url.length > 0)`
- Blank cells are handled safely (treated as empty string)
- **No validation** is performed on URL format

### ID behaviour

- Current IDs are **sequential numbers**: `1`, `2`, `3`, `4`
- They are used as React component `key` values
- **They are not stable identifiers** — if rows are reordered, inserted, or deleted, the meaning of each ID changes
- The code does **not** use row numbers for data access — it iterates the array
- However, **if a row is deleted, the ID numbering changes** and any external references break

**Recommendation:** IDs should become UUIDs or stable identifiers. See Section 9.

---

## 4. Existing Property Dataset

### Currently populated listings (live data as of investigation date)

| ID | Title | Location | Price | Currency | Bedrooms | Bathrooms | Has Description | Has Exterior Media | Has Bedroom Media | Has Livingroom Media | Has Bathroom Media |
|----|-------|----------|-------|----------|----------|-----------|-----------------|--------------------|--------------------|----------------------|---------------------|
| 1 | Two Bedrooms in Kotobabi | Kasoa | 60,000 | USD | 2 | 3 | Yes | Yes (3 URLs) | Yes (2 URLs) | Yes (3 URLs) | Yes (3 URLs) |
| 2 | Three Story Residential Villa | East Legon | 100,000 | USD | 4 | 5 | Yes | Yes (1 URL) | No | No | No |
| 3 | Brytwin Vista Residence | Dawhenya | 200,000 | USD | 5 | 6 | Yes | Yes (1 URL) | No | No | No |
| 4 | Executive three bed rooms | *(empty)* | 140,000 | USD | 3 | 5 | Yes | Yes (1 URL) | No | No | No |

### Key observations

- **Only 1 property (ID 1) has full media across all categories.** The other 3 only have exterior images.
- **All media URLs use Google Drive.** No external image hosting is used.
- **Property 4 has an empty Location field**, demonstrating that blank cells are possible.
- **Property 1's Description says "Modern 3-bedroom house"** but the listing title says "Two Bedrooms" — a data inconsistency in the sheet itself.
- **No Status values are set** in any row — the `Status` column exists in the interface but data appears blank.
- **Prices contain comma separators** (e.g., `"60,000"`) — the frontend strips these before parsing.

---

## 5. Image vs Video Findings

### Current detection logic

The application uses a function `isVideoUrl()` defined identically in both `App.tsx:102-107` and `Properties.tsx:77-82`:

```typescript
const isVideoUrl = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
  const lowerUrl = url.toLowerCase();
  return videoExtensions.some(ext => lowerUrl.includes(ext)) ||
    (url.includes('drive.google.com') && url.includes('/file/d/'));
};
```

### CRITICAL BUG IDENTIFIED

**The `isVideoUrl()` function incorrectly classifies ALL `/file/d/` Google Drive URLs as videos.**

This is because the function treats any URL containing both `drive.google.com` and `/file/d/` as a video, regardless of the actual file type. However, the current spreadsheet data shows:

| Property ID | URL | Format | Actual type | Detected as | Rendered as |
|-------------|-----|--------|-------------|-------------|-------------|
| 1 | `https://drive.google.com/uc?id=17cdodIea628Z3ezCfvZoDgbfkzvTPDkP` | `uc?id=` | **Image** | ✅ Image (no `/file/d/`) | `<img>` tag ✓ |
| 1 | `https://drive.google.com/uc?id=1FDnuMFNM5f6wIK-oGH7K8W_YxIWZ3lwS` | `uc?id=` | **Image** | ✅ Image | `<img>` tag ✓ |
| 1 | `https://drive.google.com/uc?id=1LICdJ3kHu6C2IabfYJPnQDV2H8TScP6z` | `uc?id=` | **Image** | ✅ Image | `<img>` tag ✓ |
| 1 | `https://drive.google.com/uc?id=1dwquW_KKcF4_brKmF-29hLgJW4VlTfzW` | `uc?id=` | **Image** | ✅ Image | `<img>` tag ✓ |
| 1 | `https://drive.google.com/uc?id=1Wg5BowvbojIK5LBHt3DBqAh6jGgF3_TG` | `uc?id=` | **Image** | ✅ Image | `<img>` tag ✓ |
| 1 | `https://drive.google.com/uc?id=1sR-FduIMVpuLFu2qIbHjQQIW5Rw8Txh5` | `uc?id=` | **Image** | ✅ Image | `<img>` tag ✓ |
| 1 | `https://drive.google.com/uc?id=1miOjAfv-SxsBXePFDfAiS1N6Vz9L1iP_` | `uc?id=` | **Image** | ✅ Image | `<img>` tag ✓ |
| 1 | `https://drive.google.com/uc?id=1Lu12Cv2n2B3WNLIRl2x5NstN3bHxTaTM` | `uc?id=` | **Image** | ✅ Image | `<img>` tag ✓ |
| 1 | `https://drive.google.com/uc?id=197EsOgkzZfarwlgst5sU9js3c6VOYuwB` | `uc?id=` | **Image** | ✅ Image | `<img>` tag ✓ |
| 1 | `https://drive.google.com/uc?id=1MEbh2Y2nVDvgfmEm5_5ybzSsP9_7U72Z` | `uc?id=` | **Image** | ✅ Image | `<img>` tag ✓ |
| **2** | `https://drive.google.com/file/d/1ehNCpF7eUQ-WerizlKv1_R7u_0aRhs9Y/view?usp=sharing` | `/file/d/` | **Image** (thumbnail) | ❌ **Misclassified as VIDEO** | `<iframe>` ✗ |
| **3** | `https://drive.google.com/file/d/16PH-3mHoasYsxCTg4vT6HDXnzm4OvYJv/view?usp=sharing` | `/file/d/` | **Image** (thumbnail) | ❌ **Misclassified as VIDEO** | `<iframe>` ✗ |
| **4** | `https://drive.google.com/file/d/1I5ysvgOPhaY2etMsbkeCVfFyezn4j4gn/view?usp=drivesdk` | `/file/d/` | **Image** (thumbnail) | ❌ **Misclassified as VIDEO** | `<iframe>` ✗ |

**Consequence:** Properties 2, 3, and 4 display as broken or unusable `<iframe>` embeds instead of proper `<img>` tags in the property cards.

### How each URL format is handled

| URL format | File ID extraction | Image conversion | Video conversion |
|------------|-------------------|------------------|------------------|
| `https://drive.google.com/uc?id=FILE_ID` | `url.split('uc?id=')[1].split('&')[0]` | `https://lh3.googleusercontent.com/d/{FILE_ID}=w2000-h2000` | `https://drive.google.com/file/d/{FILE_ID}/preview` |
| `https://drive.google.com/file/d/FILE_ID/view...` | `url.split('/file/d/')[1].split('/')[0]` | Same as above | Same as above |
| `https://drive.google.com/open?id=FILE_ID` | `url.split('open?id=')[1].split('&')[0]` | Same as above | Same as above |

### Rendering behaviour

- **Images:** Rendered as `<img src="https://lh3.googleusercontent.com/d/{FILE_ID}=w2000-h2000">`
- **Videos (detected):** Rendered as `<iframe src="https://drive.google.com/file/d/{FILE_ID}/preview">` with `allow="autoplay"` and `allowFullScreen`
- **Video thumbnails:** `https://drive.google.com/thumbnail?id={FILE_ID}&sz=w1000` — used for card placeholders when a video is detected

### Future architecture requirements

The future admin system must determine media type using **MIME type / Google Drive metadata** during upload, not URL format. Supported types:

```typescript
type MediaType = "image" | "video";

// MIME types to support:
// image/jpeg, image/png, image/webp, image/gif
// video/mp4, video/webm, video/quicktime
```

---

## 6. Google Drive URL Findings

### URL formats currently in the spreadsheet

**Format 1 — Direct access URL:**
```
https://drive.google.com/uc?id={FILE_ID}
```
- Used by: Property 1 (all media)
- Parsed by: `url.split('uc?id=')[1].split('&')[0]`
- This is the "old" Google Drive sharing format

**Format 2 — View URL:**
```
https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing
https://drive.google.com/file/d/{FILE_ID}/view?usp=drivesdk
```
- Used by: Properties 2, 3, 4
- Parsed by: `url.split('/file/d/')[1].split('/')[0]`
- This is the "modern" Google Drive sharing format

**Format 3 — Open URL (supported but not currently in data):**
```
https://drive.google.com/open?id={FILE_ID}
```
- Not currently used but handled by the parser
- Parsed by: `url.split('open?id=')[1].split('&')[0]`

### URL normalisation strategy

The application extracts the `FILE_ID` from any format and constructs:

- **For images:** `https://lh3.googleusercontent.com/d/{FILE_ID}=w2000-h2000`
- **For videos:** `https://drive.google.com/file/d/{FILE_ID}/preview`
- **For video thumbnails:** `https://drive.google.com/thumbnail?id={FILE_ID}&sz=w1000`

**Recommendation:** Store only the Drive `FILE_ID` in the spreadsheet. The frontend already extracts it. Storing just the ID is cleaner, more compact, and eliminates URL format inconsistencies. See Section 10.

### Backward compatibility

Existing full URLs must continue working. The parser already handles all three formats. A migration is not strictly required but is recommended for new entries.

---

## 7. Problems / Risks

### Critical

1. **`isVideoUrl()` incorrectly classifies ALL `/file/d/` URLs as videos** — Properties 2, 3, and 4 are displayed as broken `<iframe>` embeds instead of images. This is a live bug affecting 75% of current listings.
2. **No authentication on spreadsheet reads** — anyone with the opensheet URL can read all property data. This is acceptable for public listings but means admin data could leak if added to the same sheet.
3. **No backend** — there is currently no server-side layer to protect Google API credentials, validate uploads, or authorize mutations.

### High

4. **IDs are sequential numbers** — if rows are reordered, inserted, or deleted, the numbering changes and React keys break. IDs must become stable identifiers.
5. **No media type metadata** — the application guesses image vs video from URL format, which is incorrect for `/file/d/` URLs. MIME type or Drive file metadata is needed.
6. **Code duplication** — ~70 lines of property logic are duplicated between `App.tsx` and `Properties.tsx`. Any fix must be applied in two places.
7. **Spreadsheet is publicly writable via opensheet** — if any write endpoint is added without auth, arbitrary data could be injected.

### Medium

8. **No `Status` filtering** — the `Status` column exists in the interface but is never checked. Archived listings would still appear publicly.
9. **Comma-separated URLs in cells** — if a URL contained a comma, it would be split incorrectly. Current data does not have this issue but the parsing is fragile.
10. **No error handling for malformed data** — if a spreadsheet row has missing fields, the frontend will show `undefined` in the UI.
11. **`@supabase/supabase-js` installed but unused** — dead dependency adding bundle weight.

### Low

12. **No browser caching of spreadsheet data** — fetched on every page load.
13. **Hardcoded spreadsheet ID** — changing it requires modifying source code in two files.
14. **No loading state for property cards** — the home page shows nothing until data loads.
15. **Empty `BookingContext.tsx`** — unused file.

---

## 8. Recommended Architecture

### Current architecture (Vite SPA, no backend)

```
Browser
  │
  ├── fetch() → opensheet.elk.sh → Google Spreadsheet (READ ONLY)
  │
  └── <img> / <iframe> → Google Drive public URLs
```

### Proposed architecture

```
┌─────────────────────────────────────────────────────┐
│                   ADMIN SPA (Vite)                   │
│            /admin (authenticated routes)             │
└───────────────────────┬─────────────────────────────┘
                        │ HTTPS
                        ▼
┌─────────────────────────────────────────────────────┐
│              SERVERLESS API LAYER                    │
│     (Vercel/Netlify Functions or similar)            │
│                                                      │
│  • Admin authentication verification                 │
│  • Request validation & sanitization                 │
│  • Google API credential management                  │
│  • Media upload processing                           │
│  • Rate limiting                                     │
└──────────┬──────────────────────┬───────────────────┘
           │                      │
           ▼                      ▼
┌──────────────────┐  ┌──────────────────────────────┐
│  Google Drive API │  │  Google Sheets API            │
│                  │  │                               │
│  • Upload media  │  │  • Read listings (GET)        │
│  • Set perms     │  │  • Create listing (POST)      │
│  • Organize      │  │  • Update listing (PATCH)     │
│    by property   │  │  • Archive listing (PATCH)    │
│  • Get metadata  │  │  • Delete listing (DELETE)    │
└────────┬─────────┘  └──────────────┬────────────────┘
         │                           │
         ▼                           ▼
┌──────────────────┐  ┌──────────────────────────────┐
│  Google Drive     │  │  Google Spreadsheet           │
│  Property Media   │  │  Property Metadata            │
│  Folder           │  │  (listing rows)               │
└──────────────────┘  └──────────────────────────────┘
         ▲
         │
         │ Public read access
         ▼
┌─────────────────────────────────────────────────────┐
│               PUBLIC SPA (existing)                   │
│         fetch() → opensheet.elk.sh (read)            │
│         <img>/<iframe> → Google Drive URLs           │
└─────────────────────────────────────────────────────┘
```

### Key design decisions

1. **Public reads stay as-is** — the existing `opensheet.elk.sh` proxy continues serving public property data to the SPA. No change to the public-facing property page.
2. **Admin writes go through a serverless API** — all mutations (create, update, delete, media upload) are authenticated and go through a server-side layer.
3. **Google credentials live server-side only** — never exposed to the browser bundle.
4. **Media uploads go through the API** — the browser uploads to the serverless function, which then uploads to Google Drive. This avoids exposing Drive credentials and allows server-side validation.

---

## 9. Recommended Sheet Schema

### Current schema

```
| ID | Title | Location | Price | Currency | Bedrooms | Bathrooms | Description | Exterior Images | Bedroom Images | Bathroom Images | Livingroom Images | Status |
```

### Proposed schema

```
| ID (UUID) | Title | Location | Price | Currency | Bedrooms | Bathrooms | Description | Status | Created At | Updated At | Exterior Images | Exterior Videos | Bedroom Images | Bedroom Videos | Livingroom Images | Livingroom Videos | Bathroom Images | Bathroom Videos |
```

### Changes

| Change | Reason |
|--------|--------|
| `ID` → UUID format | Stable identity across row insert/delete/reorder |
| Add `Status` column | Support active/archived/draft states |
| Add `Created At` | Audit trail |
| Add `Updated At` | Audit trail |
| Split `Exterior Images` into `Exterior Images` + `Exterior Videos` | Explicit media type separation |
| Split `Bedroom Images` into `Bedroom Images` + `Bedroom Videos` | Same |
| Split `Livingroom Images` into `Livingroom Images` + `Livingroom Videos` | Same |
| Split `Bathroom Images` into `Bathroom Images` + `Bathroom Videos` | Same |

### Migration strategy

- Existing rows retain their current `ID` values (numeric strings).
- New rows use UUID format.
- The frontend parser handles both formats.
- Old rows continue working without modification.
- No backfill required.

---

## 10. Recommended Media Model

### Recommendation: Option A (Modified) — Preserve current schema with explicit video columns

For this low/medium-volume real-estate site, a separate `Media` sheet or database table would be overengineering. The recommended approach:

**Store media directly in the spreadsheet with explicit type columns per category:**

```
Exterior Images    → comma-separated Drive file IDs (images only)
Exterior Videos    → comma-separated Drive file IDs (videos only)
Bedroom Images     → comma-separated Drive file IDs (images only)
Bedroom Videos     → comma-separated Drive file IDs (videos only)
Livingroom Images  → comma-separated Drive file IDs (images only)
Livingroom Videos  → comma-separated Drive file IDs (videos only)
Bathroom Images    → comma-separated Drive file IDs (images only)
Bathroom Videos    → comma-separated Drive file IDs (videos only)
```

### Why this approach

- **Simplest to implement** — no new sheets or tables
- **Backward compatible** — existing `* Images` columns continue working
- **Google Sheets is the database** — no additional infrastructure
- **Low volume** — this site has <10 properties; complex media models add unnecessary complexity
- **Admin writes through API** — the server-side layer controls format and validation

### Media data model (TypeScript)

```typescript
type MediaType = "image" | "video";
type MediaCategory = "exterior" | "bedroom" | "livingroom" | "bathroom";

interface MediaItem {
  id: string;            // Google Drive file ID
  type: MediaType;       // Determined at upload via MIME type
  category: MediaCategory;
  mimeType: string;      // e.g., "image/jpeg", "video/mp4"
  url: string;           // Constructed delivery URL
  sortOrder: number;     // Within category
}
```

### Spreadsheet cell format (future entries)

Each cell contains comma-separated Drive file IDs:
```
FILE_ID_1, FILE_ID_2, FILE_ID_3
```

The frontend constructs display URLs from IDs:
- Images: `https://lh3.googleusercontent.com/d/{FILE_ID}=w2000-h2000`
- Videos: `https://drive.google.com/file/d/{FILE_ID}/preview`
- Thumbnails: `https://drive.google.com/thumbnail?id={FILE_ID}&sz=w1000`

### Why NOT Option C (separate Media sheet)

- Adds complexity for <10 properties
- Requires JOIN-like logic in the frontend
- Sheets API pagination/sorting adds overhead
- No benefit at this scale

---

## 11. Authentication Recommendation

### Recommended: Simple password-based admin authentication via serverless function

**Why not Supabase Auth / Firebase Auth / Auth0:**

- This project needs exactly **one admin user** (or very few).
- Adding an entire BaaS for a single admin login is overengineering.
- Supabase is already a dependency but unused — adding it would increase complexity for minimal benefit.
- OAuth (Google login) adds token refresh logic and deployment complexity.

### Proposed approach

1. **Admin password stored as a bcrypt hash** in an environment variable on the serverless function.
2. **Admin logs in** at `/admin/login` with email + password.
3. **Serverless function verifies** the password and returns a short-lived JWT (e.g., 1 hour).
4. **JWT is stored in an HTTP-only cookie** (not localStorage — mitigates XSS).
5. **All `/api/admin/*` endpoints** verify the JWT before processing.
6. **Admin routes in the SPA** (`/admin/*`) are protected client-side (redirect to login if no valid session).

### Tradeoffs

| Approach | Pros | Cons |
|----------|------|------|
| **Password + JWT (recommended)** | Simple, no external service, works offline | Must manage password securely, single factor |
| Supabase Auth | Ready-made, supports MFA | Adds BaaS dependency, overkill for 1 admin |
| Firebase Auth | Same as Supabase | Same as Supabase |
| Google OAuth | Uses client's Google account | Token refresh complexity, deployment config, overkill |
| HTTP Basic Auth | Simplest | No session management, poor UX |

**The password + JWT approach is sufficient** for a single-admin real-estate site. If MFA becomes needed later, Supabase Auth can be added without major refactoring.

---

## 12. API / Serverless Design

### Recommended endpoints

All admin endpoints require authentication (JWT in HTTP-only cookie).

```
Authentication
─────────────
POST   /api/admin/auth/login          → Verify credentials, return JWT cookie
POST   /api/admin/auth/logout         → Clear JWT cookie
GET    /api/admin/auth/me             → Verify current session

Properties
──────────
GET    /api/admin/properties          → List all properties (from Google Sheet)
GET    /api/admin/properties/:id      → Get single property with full media details
POST   /api/admin/properties          → Create new property (metadata only)
PATCH  /api/admin/properties/:id      → Update property metadata
POST   /api/admin/properties/:id/archive  → Set status = "archived"
POST   /api/admin/properties/:id/restore  → Set status = "active"
DELETE /api/admin/properties/:id      → Permanent delete (with confirmation)

Media
─────
POST   /api/admin/properties/:id/media       → Upload media (multipart form data)
DELETE /api/admin/properties/:id/media/:mediaId  → Remove media from listing

Public
──────
GET    /api/properties                → Public listing (proxied from opensheet.elk.sh)
```

### Media upload flow

```
1. Browser sends multipart/form-data to POST /api/admin/properties/:id/media
   - Fields: file, category (exterior|bedroom|livingroom|bathroom)
   
2. Serverless function:
   a. Validates JWT
   b. Validates file (MIME type, size)
   c. Determines MediaType from MIME type (not URL format)
   d. Uploads to Google Drive → gets FILE_ID
   e. Sets public-read permission on the file
   f. Constructs display URL from FILE_ID
   g. Appends FILE_ID to the appropriate spreadsheet column
   h. Returns success with media metadata
```

---

## 13. Environment Variables

### Serverless function (API) — NEVER exposed to browser

```
GOOGLE_SERVICE_ACCOUNT_EMAIL       — Service account email
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY — Service account private key (PEM format)
GOOGLE_DRIVE_PROPERTY_FOLDER_ID    — Root folder ID for property media
GOOGLE_SPREADSHEET_ID              — Spreadsheet ID (currently hardcoded)
ADMIN_PASSWORD_HASH                — bcrypt hash of admin password
JWT_SECRET                         — Secret for signing JWTs
```

### Vite frontend (public) — safe to expose

```
VITE_API_BASE_URL                  — Serverless function base URL (e.g., /api)
```

**Critical rule:** No Google API credentials, service account keys, OAuth secrets, or JWT signing keys may appear in any file bundled by Vite. They exist only in the serverless function environment.

---

## 14. Migration / Backwards Compatibility

### Existing listings — no changes required

The existing 4 properties will continue working because:

1. **URL format handling is unchanged** — the frontend parser already handles `uc?id=` and `/file/d/` formats.
2. **Spreadsheet data is untouched** — existing rows remain as-is.
3. **opensheet.elk.sh continues serving** — the public read path is not modified.
4. **ID format is preserved** — existing numeric IDs continue working alongside new UUIDs.

### Migration steps (when implementing)

1. **Add new columns** (`Status`, `Created At`, `Updated At`, video columns) to the spreadsheet — existing rows get empty values for new columns (safe).
2. **Existing `* Images` columns** retain their current URLs — no reformatting needed.
3. **New entries** use Drive file IDs instead of full URLs — the frontend parser handles both.
4. **Status column** defaults to `active` for existing rows (can be backfilled manually or via API).
5. **No database migration** — the spreadsheet IS the database, and new columns are additive.

### What MUST NOT change

- The `opensheet.elk.sh` endpoint URL format
- The sheet name `Properties`
- The existing column names (they map to the `Property` interface)
- The spreadsheet ID

---

## 15. Performance and Caching

### Current behaviour

- **No caching** — the spreadsheet is fetched on every page visit via `useEffect`.
- **No stale-while-revalidate** — the UI shows nothing until the fetch completes.
- **No data transformation caching** — URL conversion happens on every render.

### Recommended caching strategy

| Layer | Strategy | TTL |
|-------|----------|-----|
| **Browser fetch** | `Cache-Control` headers if proxied through the API, or SWR pattern in React | 5 minutes |
| **Google Drive URLs** | `lh3.googleusercontent.com` URLs are already CDN-cached | CDN default |
| **Admin mutations** | After create/update, invalidate browser cache and refetch | Immediate |
| **Serverless → Sheets API** | Cache spreadsheet data server-side | 60 seconds |

### How quickly should admin changes appear publicly?

- **Immediate (ideal):** Admin makes change → public page shows it on next load.
- **Practical:** After a 60-second cache TTL on the serverless proxy, or immediately if the public page is refreshed.
- **No WebSockets needed** — this is a low-traffic site; a simple refetch on navigation is sufficient.

---

## 16. Security Review

### Identified risks and mitigations

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Leaked Google API credentials** | Critical | Credentials exist only in serverless env vars, never in Vite bundle |
| **Unauthorised sheet mutations** | Critical | All write endpoints require JWT verification server-side |
| **Unauthorised Drive uploads** | Critical | Upload endpoint requires JWT; file validation server-side |
| **Arbitrary file uploads** | High | MIME type validation (both client and server); file size limits; only allow image/video MIME types |
| **XSS through spreadsheet content** | High | React escapes rendered text by default; sanitize any `dangerouslySetInnerHTML` usage (none currently) |
| **Malicious filenames** | Medium | Server generates filenames from UUIDs; original filenames are not used for storage |
| **MIME spoofing** | Medium | Server reads file magic bytes, not just Content-Type header; validates against allowlist |
| **Formula injection in Sheets** | Low | Admin is the only writer; Sheets API does not execute formulas from cell values |
| **Changed/deleted Drive permissions** | Medium | Use a shared folder with inherited permissions; verify permissions after upload |
| **Direct public admin routes** | High | SPA client-side route guard + server-side JWT on all API endpoints |
| **CSRF** | Low | JWT in HTTP-only cookie + SameSite=Strict; no state-changing GET requests |
| **Rate limiting** | Medium | Implement basic rate limiting on serverless functions (e.g., 100 req/min for reads, 10 req/min for writes) |
| **Excessive upload sizes** | Medium | Enforce max file size: 10MB for images, 100MB for videos; validate server-side |

### File upload validation requirements

**Images:**
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
- Max file size: 10 MB
- Optional: Resize to max 2000px on longest side before upload

**Videos:**
- Allowed MIME types: `video/mp4`, `video/webm`, `video/quicktime`
- Max file size: 100 MB
- Max duration: 5 minutes (if feasible to check server-side)

**Server-side validation must mirror client-side validation.** Never trust the browser.

---

## 17. Admin UX States

### Listings table states

| State | Display |
|-------|---------|
| Loading | Skeleton rows or spinner |
| Empty (no properties) | "No properties yet. Create your first listing." |
| Loaded | Data table with columns: Title, Location, Price, Bedrooms, Bathrooms, Status, Media Count, Actions |
| Error | "Unable to load properties. Please try again." |
| No search results | "No properties match your search." |

### Create/Edit form states

| State | Display |
|-------|---------|
| Idle | Empty form with validation hints |
| Uploading media | Progress bar per file; disabled submit button |
| Saving | Spinner on submit button |
| Success | Toast notification + redirect to listings or preview |
| Drive upload failure | Inline error per failed file; other files retained |
| Sheet write failure | "Property saved locally but could not publish. Retrying..." |
| Validation error | Inline field errors |

### Media upload states

Each uploaded item shows:
```
┌─────────────────────────────────────────────────┐
│ [Thumbnail/Preview]  filename.jpg               │
│ Category: Exterior  |  Type: Image              │
│ Status: ✅ Uploaded  |  [Remove]                │
└─────────────────────────────────────────────────┘
```

For videos, use a `<video>` element with controls for preview rather than rendering as an image.

---

## 18. Testing Requirements

### Unit tests

| Test | What it validates |
|------|-------------------|
| `convertGoogleDriveUrl()` | Extracts FILE_ID from all 3 URL formats; returns correct display URL |
| `isVideoUrl()` | Correctly identifies images vs videos (MIME-based, not URL-based) |
| `parseSpreadsheetRow()` | Handles missing fields, empty strings, extra whitespace |
| `serializeSpreadsheetRow()` | Produces correct cell values for write operations |
| `validateMediaType()` | Rejects disallowed MIME types; accepts allowed ones |
| `validateFileSize()` | Rejects files exceeding limits |
| `extractDriveFileId()` | Normalizes all URL formats to FILE_ID |

### Integration tests

| Test | What it validates |
|------|-------------------|
| Listing creation | Full flow: metadata → sheet append → returns new property |
| Listing update | Metadata change → sheet update → reflected in read |
| Image upload | File → Drive upload → permission set → URL returned |
| Video upload | Same flow for video files |
| Drive permission assignment | Uploaded file is publicly accessible |
| Spreadsheet append/update | Correct row/cell is modified |

### Failure tests

| Test | Scenario |
|------|----------|
| Drive unavailable | Upload fails gracefully; existing data unaffected |
| Sheets unavailable | Read returns cached data; write retries |
| Invalid media | Server rejects; no partial state |
| Upload succeeds, sheet write fails | Uploaded file is cleaned up (deleted from Drive) |
| Duplicate property ID | Server generates new UUID; no collision |
| Unauthorised admin | API returns 401; SPA redirects to login |

### UI/E2E tests

| Test | Flow |
|------|------|
| Login | Navigate to /admin → enter credentials → redirected to dashboard |
| Create listing | Fill form → upload media → submit → see in public listings |
| Edit listing | Change title/price → save → verify change persists |
| Archive listing | Click archive → status changes → hidden from public |
| Restore listing | Click restore → status = active → appears in public |
| Image preview | Upload image → see thumbnail in admin |
| Video preview | Upload video → see video player in admin |

---

## 19. Human Actions Required

> **These are listed for reference only. Do not perform them yet.**

### Google Cloud Console

1. Create a Google Cloud project (or use existing).
2. Enable the Google Sheets API.
3. Enable the Google Drive API.
4. Create a Service Account with Editor access to the spreadsheet.
5. Generate a JSON key for the service account (for Vercel/Netlify env vars).
6. Share the Google Spreadsheet with the service account email (Editor access).
7. Share the Google Drive media folder with the service account email (Writer access).

### Google Drive

8. Create a top-level folder: `Brytwin Homes Property Media`.
9. Set sharing to: Service account = Editor, General = No access (public access is per-file, not per-folder — see Section 9).
10. Optionally create subfolders per property (the API can handle this automatically).

### Google Sheets

11. Add new columns to the `Properties` sheet: `Status`, `Created At`, `Updated At`.
12. Add video columns: `Exterior Videos`, `Bedroom Videos`, `Livingroom Videos`, `Bathroom Videos`.
13. Set `Status` = `active` for all existing rows.
14. Do NOT change column order for existing columns — the interface depends on names, not positions.

### Deployment (Vercel or Netlify)

15. Create serverless function(s) for the API layer.
16. Set environment variables (see Section 13).
17. Configure CORS for the API domain.
18. Set up custom domain if needed.

### Admin password

19. Generate a strong password.
20. Create a bcrypt hash of it.
21. Store the hash as `ADMIN_PASSWORD_HASH` environment variable.

---

## 20. Implementation Plan

### Phase 1 — Backend/API Foundation

- Set up Vercel/Netlify serverless function structure.
- Create Google API client utility (Sheets + Drive).
- Implement service account authentication.
- Create basic property read endpoint (`GET /api/admin/properties`).
- Verify the existing spreadsheet data is readable through the API.
- **Deliverable:** API returns property data as JSON.

### Phase 2 — Admin Authentication

- Implement login endpoint (`POST /api/admin/auth/login`).
- Implement JWT creation and verification.
- Implement HTTP-only cookie handling.
- Create SPA-side auth context and route guards.
- Create login page at `/admin/login`.
- **Deliverable:** Admin can log in and access protected routes.

### Phase 3 — Read-only Admin Listing Table

- Build admin dashboard layout (sidebar, header).
- Build property listing table with: Title, Location, Price, Bedrooms, Bathrooms, Status, Media count.
- Implement search/filter.
- Implement preview modal (shows property details + media).
- **Deliverable:** Admin can view all properties in a table.

### Phase 4 — Add/Edit Property Metadata

- Build property creation form (Title, Location, Price, Currency, Bedrooms, Bathrooms, Description).
- Implement form validation (Zod + react-hook-form).
- Implement `POST /api/admin/properties` endpoint (appends to sheet).
- Implement edit form (pre-filled with existing data).
- Implement `PATCH /api/admin/properties/:id` endpoint (updates sheet row).
- **Deliverable:** Admin can create and edit property metadata.

### Phase 5 — Google Drive Image/Video Upload

- Build media upload component with drag-and-drop.
- Implement `POST /api/admin/properties/:id/media` endpoint.
- Implement MIME type detection (server-side, from file content).
- Implement Drive upload with public-read permission.
- Implement media preview (images + videos).
- Implement media deletion.
- **Deliverable:** Admin can upload, preview, and remove property media.

### Phase 6 — Archive/Restore

- Implement `POST /api/admin/properties/:id/archive` endpoint.
- Implement `POST /api/admin/properties/:id/restore` endpoint.
- Implement `DELETE /api/admin/properties/:id` endpoint (permanent delete).
- Add archive/restore/delete buttons to admin UI with confirmation dialogs.
- **Deliverable:** Admin can archive, restore, and permanently delete listings.

### Phase 7 — Public-site Integration Hardening

- Fix the `isVideoUrl()` bug (use MIME type, not URL format).
- Add `Status` filtering to public property display (only show `active` listings).
- Extract shared property logic into a utility module (eliminate duplication).
- Normalize Drive URL handling (store file IDs, construct URLs).
- Add error boundaries for media loading failures.
- **Deliverable:** Public site correctly displays all properties with proper image/video rendering.

### Phase 8 — QA/Security

- Run all unit tests.
- Run integration tests.
- Run failure scenario tests.
- Security audit: verify no credentials in bundle, all endpoints authenticated.
- Test with real Google Drive uploads.
- Test with real spreadsheet mutations.
- Performance testing: upload sizes, response times.
- **Deliverable:** Production-ready, tested, secure system.

---

## IMPLEMENTATION STATUS: NOT STARTED

**SAFE TO IMPLEMENT:** YES

**BLOCKERS:** None. All dependencies exist in the codebase. Google Cloud project setup and credential creation are required before Phase 1 can connect to real APIs, but the architecture can be built with mocked data first.

**RECOMMENDED FIRST IMPLEMENTATION PHASE:** Phase 1 — Backend/API Foundation

---

*Report generated during investigation of the Brytwin Homes codebase on 2026-09-13.*
*No application code was modified. No Google Sheets or Drive data was changed.*
