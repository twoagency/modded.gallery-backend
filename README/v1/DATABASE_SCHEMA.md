### Table: `apps`

| **Column**       | **Type**      | **Nullable** | **Default**       | **Description**                                                                 |
|------------------|---------------|--------------|-------------------|---------------------------------------------------------------------------------|
| id               | SERIAL        | ❌           | Auto-increment    | Primary key (unique identifier).                                                |
| name             | VARCHAR(255)  | ❌           |                   | Name of the modded app (e.g., "TikTokMod").                                     |
| normal_app       | VARCHAR(255)  | ❌           |                   | Name of the original app (e.g., "TikTok").                                      |
| description      | TEXT          | ❌           |                   | Description of the modded app and its features.                                 |
| features         | TEXT          | ❌           |                   | Features provided by the mod (stored as [””, “”, …]).                           |
| platform         | TEXT          | ❌           |                   | Platforms supported by the mod (stored as [””, “”, …]).                         |
| official_links   | JSONB         | ❌           |                   | Links to official sources (e.g., GitHub, website).                              |
| recommended      | BOOLEAN       | ❌           | false             | Whether the app is marked as recommended.                                       |