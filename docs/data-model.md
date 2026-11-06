```mermaid
---
title: Pickup Data Model
---
erDiagram
    GAME-PARTICIPANTS ||--|| USER : appears
    GAME-PARTICIPANTS }|--|| GAME : contains
    GAME ||--|| SPORTS : has
    GAME ||--|| VENUE : has
    USER {
        string Name
        string Email
        string Password
    }
    GAME-PARTICIPANTS {
        string Status
    }
    SPORTS {
        string Name
    }
    VENUE {
        string Name
        numeric(5) Longitude
        numeric(5) Latitude
    }
    GAME {
        timestamptz Start
        timestamptz End
        number Capacity
        string Status
    }
```
