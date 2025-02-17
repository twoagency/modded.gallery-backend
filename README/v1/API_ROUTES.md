# **V1 (Minimal Viable Product)**
### **1. Fetch App List**

- **Route**: `GET /api/apps`
- **Success Response**:
    
    ```json
    {
      "status": "OK",
      "message": "Apps retrieved successfully.",
      "data": [
        {
          "id": 1,
          "name": "TikTokMod",
          "normal_app": "TikTok",
          "description": "Ad-free TikTok mod with no telemetry.",
          "features": ["ad-free", "no-telemetry"],
          "platform": ["Android"],
          "official_link": "<https://tiktokmod.com>",
          "recommended": true
        }
      ]
    }
    
    ```
    

---

### **2. Admin: Add New App**

- **Route**: `POST /api/admin/apps`
- **Success Response**:
    
    ```json
    {
      "status": "OK",
      "message": "App added successfully.",
      "data": [
        {
          "id": 2,
          "name": "NewAppMod",
          "recommended": false
        }
      ]
    }
    
    ```
    

---

### **3. Admin: Update App**

- **Route**: `PUT /api/admin/apps/:id`
- **Success Response**:
    
    ```json
    {
      "status": "OK",
      "message": "App updated successfully.",
      "data": [
        {
          "id": 2,
          "changes": ["description", "features"]
        }
      ]
    }
    
    ```
    

---

### **4. Admin: Delete App**

- **Route**: `DELETE /api/admin/apps/:id`
- **Success Response**:
    
    ```json
    {
      "status": "OK",
      "message": "App deleted successfully.",
      "data": []
    }
    
    ```
    

---

All responses follow the format:

```json
{
  "status": "OK",
  "message": "Description of success.",
  "data": []
}

```