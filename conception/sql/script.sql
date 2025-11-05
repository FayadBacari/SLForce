CREATE TABLE message(
   Id_message COUNTER,
   id_streamChat VARCHAR(50) NOT NULL,
   id_sender VARCHAR(50),
   id_recipient VARCHAR(50),
   send_date DATE NOT NULL,
   PRIMARY KEY(Id_message),
   UNIQUE(id_streamChat)
);

CREATE TABLE admin(
   Id_admin COUNTER,
   email VARCHAR(20) NOT NULL,
   password VARCHAR(20) NOT NULL,
   PRIMARY KEY(Id_admin),
   UNIQUE(email)
);

CREATE TABLE user_(
   Id_user COUNTER,
   first_name VARCHAR(20) NOT NULL,
   last_name VARCHAR(20) NOT NULL,
   email VARCHAR(50) NOT NULL,
   password VARCHAR(20) NOT NULL,
   role LOGICAL NOT NULL,
   Id_admin INT,
   PRIMARY KEY(Id_user),
   UNIQUE(email),
   FOREIGN KEY(Id_admin) REFERENCES admin(Id_admin)
);

CREATE TABLE user_athlete(
   Id_user_athlete COUNTER,
   weight_category VARCHAR(20) NOT NULL,
   Id_user INT NOT NULL,
   PRIMARY KEY(Id_user_athlete),
   UNIQUE(Id_user),
   FOREIGN KEY(Id_user) REFERENCES user_(Id_user)
);

CREATE TABLE user_coach(
   Id_user_coach COUNTER,
   month_price DECIMAL(15,2) NOT NULL,
   Id_user INT NOT NULL,
   PRIMARY KEY(Id_user_coach),
   UNIQUE(Id_user),
   FOREIGN KEY(Id_user) REFERENCES user_(Id_user)
);

CREATE TABLE subscription_paypal(
   Id_subscription_paypal COUNTER,
   id_paypal VARCHAR(50) NOT NULL,
   start_subscription DATE NOT NULL,
   end_subscription DATE NOT NULL,
   status_subscription VARCHAR(20) NOT NULL,
   price DECIMAL(15,2) NOT NULL,
   Id_user_athlete INT NOT NULL,
   PRIMARY KEY(Id_subscription_paypal),
   UNIQUE(Id_user_athlete),
   UNIQUE(id_paypal),
   FOREIGN KEY(Id_user_athlete) REFERENCES user_athlete(Id_user_athlete)
);

CREATE TABLE coach_payment_account(
   Id_coach_payment_account COUNTER,
   payment_account_id VARCHAR(50) NOT NULL,
   account_email VARCHAR(30) NOT NULL,
   statues_account VARCHAR(15) NOT NULL,
   Id_subscription_paypal INT NOT NULL,
   Id_user_coach INT NOT NULL,
   PRIMARY KEY(Id_coach_payment_account),
   UNIQUE(payment_account_id),
   FOREIGN KEY(Id_subscription_paypal) REFERENCES subscription_paypal(Id_subscription_paypal),
   FOREIGN KEY(Id_user_coach) REFERENCES user_coach(Id_user_coach)
);

CREATE TABLE subscription_stripe(
   Id_subscription_stripe COUNTER,
   id_stripe VARCHAR(50) NOT NULL,
   start_subscription DATE NOT NULL,
   end_subscription DATE NOT NULL,
   status_subscription VARCHAR(20),
   price DECIMAL(15,2) NOT NULL,
   Id_user_coach INT NOT NULL,
   PRIMARY KEY(Id_subscription_stripe),
   UNIQUE(id_stripe),
   FOREIGN KEY(Id_user_coach) REFERENCES user_coach(Id_user_coach)
);

CREATE TABLE write(
   Id_message INT,
   Id_user_coach INT,
   PRIMARY KEY(Id_message, Id_user_coach),
   FOREIGN KEY(Id_message) REFERENCES message(Id_message),
   FOREIGN KEY(Id_user_coach) REFERENCES user_coach(Id_user_coach)
);

CREATE TABLE send(
   Id_message INT,
   Id_user_athlete INT,
   PRIMARY KEY(Id_message, Id_user_athlete),
   FOREIGN KEY(Id_message) REFERENCES message(Id_message),
   FOREIGN KEY(Id_user_athlete) REFERENCES user_athlete(Id_user_athlete)
);