CREATE TABLE "password_reset" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"used" boolean NOT NULL,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "password_reset_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "password_reset" ADD CONSTRAINT "password_reset_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;