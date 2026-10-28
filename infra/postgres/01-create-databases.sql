\set ON_ERROR_STOP on

-- Read credentials from the container environment.
\getenv identity_password IDENTITY_DB_PASSWORD
\getenv customer_password CUSTOMER_DB_PASSWORD
\getenv driver_password DRIVER_DB_PASSWORD
\getenv booking_password BOOKING_DB_PASSWORD
\getenv trip_password TRIP_DB_PASSWORD
\getenv payment_password PAYMENT_DB_PASSWORD
\getenv operations_password OPERATIONS_DB_PASSWORD

-- Application logins are not database administrators.
CREATE ROLE identity_user LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'identity_password';
CREATE ROLE customer_user LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'customer_password';
CREATE ROLE driver_user LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'driver_password';
CREATE ROLE booking_user LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'booking_password';
CREATE ROLE trip_user LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'trip_password';
CREATE ROLE payment_user LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'payment_password';
CREATE ROLE operations_user LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD :'operations_password';

-- Each service owns its own database.
CREATE DATABASE identity_db OWNER identity_user;
CREATE DATABASE customer_db OWNER customer_user;
CREATE DATABASE driver_db OWNER driver_user;
CREATE DATABASE booking_db OWNER booking_user;
CREATE DATABASE trip_db OWNER trip_user;
CREATE DATABASE payment_db OWNER payment_user;
CREATE DATABASE operations_db OWNER operations_user;

-- Remove default cross-service access. Database owners retain their rights.
REVOKE ALL ON DATABASE identity_db FROM PUBLIC;
REVOKE ALL ON DATABASE customer_db FROM PUBLIC;
REVOKE ALL ON DATABASE driver_db FROM PUBLIC;
REVOKE ALL ON DATABASE booking_db FROM PUBLIC;
REVOKE ALL ON DATABASE trip_db FROM PUBLIC;
REVOKE ALL ON DATABASE payment_db FROM PUBLIC;
REVOKE ALL ON DATABASE operations_db FROM PUBLIC;
