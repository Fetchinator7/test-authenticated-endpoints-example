-- Run these commands to populate the test database after creating one.

CREATE TABLE "account"
(
	"id" serial NOT NULL,
	"name" varchar(60) NOT NULL,
	"username" varchar(60) NOT NULL UNIQUE,
	"email" varchar(320) NOT NULL UNIQUE,
	"password" varchar(320) NOT NULL,
	CONSTRAINT "account_pk" PRIMARY KEY ("id")
);


INSERT INTO "account"
	("name", "username", "email", "password", "access_level")
VALUES
	('ExampleName', 'ExampleUsername', 'email@email.com', '$2a$10$wcZlG1q2euNijgnvf8YiEOsKH/W6fv6yS4MT.UEr0qYeM63TD9i/e', 1);
INSERT INTO "account"
	("name", "username", "email", "password", "access_level")
VALUES
	('testUser', 'TestUsername', 'test@email.com', '$2a$10$wcZlG1q2euNijgnvf8YiEOsKH/W6fv6yS4MT.UEr0qYeM63TD9i/e', 0);
