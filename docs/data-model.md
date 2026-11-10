All columns without `?` are non-nullable

```mermaid
---
title: Pickup Data Model
---
erDiagram
    GAME-PARTICIPANTS }o--|| USERS : has
    GAME-PARTICIPANTS }o--|| GAMES : "participates in"
    GAMES }|--|| SPORTS : has
    GAMES }o--|| VENUES : has
    GAMES }o--|| USERS : organizes
    USERS {
        uuid id PK
        text username UK
        text display_name
        citext email UK
        text password_hash
        timestamptz created_at
        timestamptz updated_at
    }
    GAME-PARTICIPANTS {
        uuid id PK
        uuid user_id FK
        uuid game_id FK
        enum status
        timestamptz created_at
        timestamptz updated_at
    }
    SPORTS {
        uuid id PK
        text name UK
        timestamptz created_at
        timestamptz updated_at
    }
    VENUES {
        uuid id PK
        text name
        numeric(8,5) longitude
        numeric(7,5) latitude
        timestamptz created_at
        timestamptz updated_at
    }
    GAMES {
        uuid id PK
        uuid orginizer_id FK
        uuid sport_id FK
        uuid venue_id FK
        timestamptz starts_at
        timestamptz ends_at
        integer capacity
        bool is_cancelled
        timestamptz created_at
        timestamptz updated_at
    }
```

## Constraints

Unique, primary and foreign key notations are in the diagram.

### users

- `username` and `display_name` must be shorter than 20 chars (placeholder value).
- `UNIQUE(email)`: case insensitive.
- `password` saved as a hash.

### game_participants

- Using composite primary key might get in the way if table needs to track additional states in the future so surrogate id is preferable.
- `FOREIGN KEY user_id` -> `users.id`, `ON DELETE CASCADE`.
- `FOREIGN KEY game_id` -> `games.id`, `ON DELETE CASCADE`.
- `status`: allowed values are `Joined`,`Waitlisted`,`Left` stored as `Enum`.
- `UNIQUE (game_id, user_id)`: a user can't join the same game twice.
- User that leaves and rejoines game changes the old `game_participants` row status back to `Joined`.

### venues

- Location Stored as `longitude`/`latitude` columns, will later utilize PostGIS.
- `longitude`: stored as xx.xxxxx
- `latitude`: stored as xxx.xxxxx

### games

- `FOREIGN KEY organizer_id` -> `users.id`, `ON DELETE CASCADE`.
- Only the organizer may cancel the game.
- `FOREIGN KEY venue_id` -> `venues.id`, `ON DELETE RESTRICT`.
- `FOREIGN KEY sport_id` -> `sports.id`, `ON DELETE RESTRICT`.
- Restrict deleting `venues` and `sports` which are still used by a game.
- `starts_at`: must be after `created_at` enforced by API.
- `ends_at`: must be after `starts_at`.
- `capacity`: must be greater than 0.
- `is_canceled`: managed by Postgres while other status states will be calculated by API based on `starts_at` and `ends_at`.

## Queries

- Upcoming games - `SELECT * FROM GAMES WHERE is_cancelled = false ORDER BY starts_at ASC, id ASC` | Status calculated and filtered by API. `is_cancelled`, `starts_at`, `sport_id`, `venue_id`, `organizer_id` should be indexed for faster sorting and filtering.
- My games - `SELECT * FROM GAMES WHERE organizer_id = $1`.
- Games players - `SELECT * FROM GAME-PARTICIPANTS WHERE game_id = $1.` | `UNIQUE` already indexes `game_id`, whereas `user_id` should be indexed separately.

## Open questions

- Should `venues` be created separately and exist without a `games`?
- Should `games` exist without a `venues` before it is chosen and if so who should be creating `venues`?
- Undecided, How should waitlist queue participants so that they can join in correct order?
- How should capacity be enforced when two requests arrive at the same time?
