# **V1 (Minimal Viable Product)**
### **Project Overview**

The platform is a **curated directory of trusted modded apps** (e.g., TikTokMod, Instander, Revanced) that enhance user experience by removing ads, telemetry, or adding features.

- **Focus**: Apps only (no games).
- **Goal**: Provide a reliable, transparent, and secure resource for users.

---
### [API Routes](./API_ROUTES.md)

### [Database Schema](./DATABASE_SCHEMA.md)
---

### **Core Features (v1)**

1. **App Listing**
    - Display approved apps with:
        - **Name**, **Original App**, **Description**, **Features**, **Platform** (Android/iOS), **Official Link**.
        - **Sorting**:
            - "Recommended" apps first.
            - Then by the number of features (descending).
    - No filters or search functionality (added in v2).
2. **Admin Backend**
    - **Admin Authentication**: Team members log in via Supabase Auth.
    - **Admin Actions**:
        - Add/edit/delete apps.
        - Mark apps as "Recommended".
3. **Security**
    - **Cloudflare Turnstile**: Captcha validation on the first visit to prevent bots.
    - **No Rate Limits**: Only essential for future features (e.g., submissions).
4. **Hosting**
    - **Frontend**: Static site on Vercel/Netlify.
    - **Backend & DB**: Supabase (PostgreSQL + Auth).
5. **Legal Compliance**
    - **Impressum** (Legal Notice).
    - **Disclaimer**: "We do not host or distribute apps. Use at your own risk."

---

### **API Routes (v1)**

| **Endpoint** | **Method** | **Description** |
| --- | --- | --- |
| `/api/apps` | GET | Fetch all apps (sorted). |
| `/api/admin/apps` | POST | Add a new app. |
| `/api/admin/apps/:id` | PUT | Update an app. |
| `/api/admin/apps/:id` | DELETE | Delete an app. |
| `/api/admin/apps/:id/recommend` | POST | Mark an app as "Recommended". |

---

### **Response Structure**

All responses follow the format:

json

Copy

```json
{
  "status": "OK" | "ERR",
  "message": "Description of the result.",
  "data": [] // Array (empty on error, except sometimes)
}
```