# Data Dictionary


## Table: `admin`
| Attribute Name   | Type        | Constraint       |
|------------------|-------------|------------------|
| Id_admin         | COUNTER     | PRIMARY KEY      |
| email            | VARCHAR(20) | UNIQUE, NOT NULL |
| password         | VARCHAR(20) | NOT NULL         |


## Table: `message`
| Attribute Name   | Type        | Constraint       |
|------------------|-------------|------------------|
| Id_message       | COUNTER     | PRIMARY KEY      |
| id_streamChat    | VARCHAR(50) | UNIQUE, NOT NULL |
| id_sender        | VARCHAR(50) | NULL             |
| id_recipient     | VARCHAR(50) | NULL             |
| send_date        | DATE        | NOT NULL         |


## Table: `subscription_paypal`
| Attribute Name          | Type        | Constraint       |
|-------------------------|-------------|------------------|
| Id_subscription_paypal  | COUNTER     | PRIMARY KEY      |
| id_paypal               | VARCHAR(50) | UNIQUE, NOT NULL |
| start_subscription      | DATE        | NOT NULL         |
| end_subscription        | DATE        | NOT NULL         |
| status_subscription     | VARCHAR(20) | NOT NULL         |
| price                   | DECIMAL     | NOT NULL         |


## Table: `subscription_stripe`
| Attribute Name          | Type          | Constraint       |
|-------------------------|---------------|------------      |
| Id_subscription_stripe  | COUNTER       | PRIMARY KEY      |
| id_stripe               | VARCHAR(50)   | UNIQUE, NOT NULL |
| start_subscription      | DATE          | NOT NULL         |
| end_subscription        | DATE          | NOT NULL         |
| status_subscription     | VARCHAR(20)   | NULL             |
| price                   | DECIMAL       | NOT NULL         |


## Table: `user`
| Attribute Name    | Type        | Constraint                             |
|-------------------|-------------|----------------------------------------|
| Id_user           | COUNTER     | PRIMARY KEY                            |
| first_name        | VARCHAR(20) | NOT NULL                               |
| last_name         | VARCHAR(20) | NOT NULL                               |
| email             | VARCHAR(50) | UNIQUE, NOT NULL                       |
| password          | VARCHAR(20) | NOT NULL                               |
| role              | LOGICAL     | NOT NULL                               | 
| Id_admin          | INT         | FOREIGN KEY REFERENCES admin(Id_admin) |


## Table: `write`
| Attribute Name   | Type | Constraint                                                    |
|------------------|------|---------------------------------------------------------------|
| Id_message       | INT  | PRIMARY KEY, FOREIGN KEY REFERENCES message(Id_message)       |
| Id_user_coach    | INT  | PRIMARY KEY, FOREIGN KEY REFERENCES user_coach(Id_user_coach) |


## Table: `send`
| Attribute Name   | Type | Constraint                                                        |
|------------------|------|-------------------------------------------------------------------|
| Id_message       | INT  | PRIMARY KEY, FOREIGN KEY REFERENCES message(Id_message)           |
| Id_user_athlete  | INT  | PRIMARY KEY, FOREIGN KEY REFERENCES user_athlete(Id_user_athlete) |


## Table: `user_athlete`
| Attribute Name         | Type        | Constraint                                                         |
|------------------------|-------------|--------------------------------------------------------------------|
| Id_user_athlete        | COUNTER     | PRIMARY KEY                                                        |
| weight_category        | VARCHAR(20) | NOT NULL                                                           |
| Id_subscription_paypal | INT         | FOREIGN KEY REFERENCES subscription_paypal(Id_subscription_paypal) |
| Id_user                | INT         | UNIQUE, FOREIGN KEY REFERENCES user_(Id_user)                      |


## Table: `user_coach`
| Attribute Name         | Type        | Constraint                                                         |
|------------------------|-------------|--------------------------------------------------------------------|
| Id_user_coach          | COUNTER     | PRIMARY KEY                                                        |
| month_price            | DECIMAL     | NOT NULL                                                           |
| Id_subscription_stripe | INT         | FOREIGN KEY REFERENCES subscription_stripe(Id_subscription_stripe) |
| Id_user                | INT         | UNIQUE, FOREIGN KEY REFERENCES user_(Id_user)                      |


## Table: `coach_payment_account`
| Attribute Name           | Type        | Constraint                                                         |
|--------------------------|-------------|--------------------------------------------------------------------|
| Id_coach_payment_account | COUNTER     | PRIMARY KEY                                                        |
| payment_account_id       | COUNTER     | UNIQUE, NOT NULL                                                   |
| account_email            | VARCHAR(20) | NOT NULL                                                           |
| statues_account          | VARCHAR(20) | NOT NULL                                                           |
| Id_subscription_paypal   | INT         | FOREIGN KEY REFERENCES subscription_paypal(Id_subscription_paypal) |
| Id_user_coach            | INT         | PRIMARY KEY, FOREIGN KEY REFERENCES user_coach(Id_user_coach)      |