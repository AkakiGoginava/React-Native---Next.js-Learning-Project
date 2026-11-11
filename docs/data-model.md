All columns without `?` are non-nullable

```mermaid
---
title: Pickup Data Model
---
erDiagram
    GAME_PARTICIPANTS }o--|| USERS : has
    GAME_PARTICIPANTS }o--|| GAMES : "participates in"
    GAMES }o--|| SPORTS : has
    GAMES }o--|| VENUES : has
    GAMES }o--|| USERS : organizes
    USERS {
        uuid id PK
        text username UK
        text display_name
        citext email UK
        text password_hash
        bool is_active
        timestamptz created_at
        timestamptz updated_at
    }
    GAME_PARTICIPANTS {
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
        uuid organizer_id FK
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
- Deleting account should keep user row but set its `is_active` column to false and `status` for respective `game_participant` that are not already set to `left` shoud be set to `left`.

### game_participants

- Using composite primary key might get in the way if table needs to track additional states in the future so surrogate id is preferable.
- `FOREIGN KEY user_id` -> `users.id`, `ON DELETE CASCADE`.
- `FOREIGN KEY game_id` -> `games.id`, `ON DELETE CASCADE`.
- `status`: allowed values are `Joined`,`Waitlisted`,`Left` stored as `Enum`.
- `UNIQUE (game_id, user_id)`: a user can't join the same game twice.
- User that leaves and rejoines game changes the old `game_participants` row status back to `Joined`.

### venues

- Location Stored as `longitude`/`latitude` columns, will later utilize PostGIS.
- `longitude`: stored as xxx.xxxxx, restricted to >= -180, <= 180.
- `latitude`: stored as xx.xxxxx, restricted to >= -90, <= 90.

### games

- `FOREIGN KEY organizer_id` -> `users.id`, `ON DELETE CASCADE`.
- Only the organizer may cancel the game.
- `FOREIGN KEY venue_id` -> `venues.id`, `ON DELETE RESTRICT`.
- `FOREIGN KEY sport_id` -> `sports.id`, `ON DELETE RESTRICT`.
- Restrict deleting `venues` and `sports` which are still used by a game.
- `starts_at`: must be after `created_at` enforced by API.
- `ends_at`: must be after `starts_at`.
- `capacity`: must be greater than 0.
- `is_cancelled`: managed by Postgres while other status states will be calculated by API based on `starts_at` and `ends_at`.

## Queries

- Upcoming games - `SELECT * FROM gmaes WHERE NOT is_cancelled AND starts_at > now() ORDER BY starts_at ASC, id ASC LIMIT 20` | `starts_at` should be partially indexed with regard to `is_cancelled` for faster sorting and filtering.
- My games - `SELECT * FROM games WHERE organizer_id = $1`.
- Participating games - `SELECT g.* FROM games g JOIN game_participants gp ON g.id = gp.game_id WHERE gp.user_id = $1 AND NOT gp.status = 'left' ORDER BY g.starts_at ASC, g.id ASC LIMIT 20` | Includes all games except for ones that the user has left. `game_participants.user_id` is indexed.
- Games players - `SELECT * FROM game_participants WHERE game_id = $1.` | `UNIQUE` already indexes `game_id`, whereas `user_id` should be indexed separately.

## Open questions

- Should `venues` be created separately and exist without a `games`?
- Should `games` exist without a `venues` before it is chosen and if so who should be creating `venues`?
- Undecided, How should waitlist queue participants so that they can join in correct order?
- How should capacity be enforced when two requests arrive at the same time?
- Should `user` be able to reactivate?
- Should `user` change queue position after rejoining a game and if yes, how should it be handled?
