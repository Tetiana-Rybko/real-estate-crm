erDiagram
  USER ||--o{ CLIENT : "assigned_to"
  USER ||--o{ DEAL : "realtor"
  USER ||--o{ TASK : "assigned_to"
  USER ||--o{ ACTIVITY : "actor"

  CLIENT ||--o{ DEAL : "client"
  CLIENT ||--o{ PROPERTY : "owner"

  DEAL ||--o{ DEAL_PROPERTY : "links"
  PROPERTY ||--o{ DEAL_PROPERTY : "links"

  CLIENT ||--o{ TASK : "tasks_about_client"
  DEAL ||--o{ TASK : "tasks_about_deal"
  PROPERTY ||--o{ TASK : "tasks_about_property"

  CLIENT ||--o{ ACTIVITY : "events_about_client"
  DEAL ||--o{ ACTIVITY : "events_about_deal"
  PROPERTY ||--o{ ACTIVITY : "events_about_property"

  USER {
    uuid id PK
    string name
    string phone
    string email
    enum role
    bool is_active
    datetime created_at
  }

  CLIENT {
    uuid id PK
    string name
    string phone
    string source
    enum status
    uuid assigned_realtor_id FK
    datetime created_at
  }

  PROPERTY {
    uuid id PK
    enum type
    string address
    string district
    int rooms
    numeric price
    enum status
    uuid owner_client_id FK
    datetime created_at
  }

  DEAL {
    uuid id PK
    uuid client_id FK
    uuid realtor_id FK
    enum stage
    numeric commission
    datetime created_at
  }

  DEAL_PROPERTY {
    uuid deal_id FK
    uuid property_id FK
    datetime created_at
  }

  TASK {
    uuid id PK
    string title
    text description
    datetime due_at
    enum status
    uuid assigned_to_id FK
    uuid client_id FK
    uuid deal_id FK
    uuid property_id FK
    datetime created_at
  }

  ACTIVITY {
    uuid id PK
    uuid actor_id FK
    string action
    text details
    uuid client_id FK
    uuid deal_id FK
    uuid property_id FK
    datetime created_at
  }
