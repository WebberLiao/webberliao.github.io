# Basic

# Install
``` Shell
# Install 
sudo apt-get install postgresql

# Login with postgres(Administrator)
sudo -u postgres psql
```

# Uninstall
``` Shell
# Stop the service
sudo systemctl stop postgresql

# Uninstall
sudo apt-get --purge remove postgresql\*

# Remove all configurations
sudo rm -rf /etc/postgresql /var/lib/postgresql /var/log/postgresql

# Remove user and group
sudo deluser postgres
sudo delgroup postgres
```

# PostgreSQL CLI
``` Shell
# Exit
\q

# List all users
\du

# List all databases
\l

# Connect to database
\c {DATABASE_NAME}

# List all tables in current database
\dt

# List all columns and types of the table
\d {TABLE_NAME}

# List all available extensions
\dx

# List all functions
\df
```

# System Commands
## USER
``` Shell
# Login to default database (the database would be named {USER_NAME}, even it dose not exist.)
psql -U {USER_NAME}
## So here's a good way to create a default database for the user
CREATE DATABASE {USER_NAME};
GRANT CONNECT ON DATABASE {USER_NAME} TO {USER_NAME};

# Login to specific database
psql -U {USER_NAME} -d {DATABASE}

# Create a new user
CREATE USER {USER_NAME} WITH PASSWORD '{PASSWORD}';

# Update the password of user
ALTER USER {USER_NAME} PASSWORD '{PASSWORD}';

# Grant connection privileges
GRANT CONNECT ON DATABASE {DATABASE_NAME} TO {USER_NAME};

# Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE {DATABASE_NAME} TO {USER_NAME};

# Grant specific privileges
ALTER USER {USER_NAME} CREATEDB;

# Revoke privileges from a user
REVOKE ALL PRIVILEGES ON DATABASE {DATABASE_NAME} FROM {USER_NAME};

# Show current user
SELECT current_user;

# Create a 
GRANT CONNECT ON DATABASE username TO username;
```

## DATABASE
``` Shell
# Create a new database
# CREATE DATABASE {DATABASE_NAME};

# Drop a database
DROP DATABASE {DATABASE_NAME};

# Rename the database
ALTER DATABASE {OLD_DATABASE_NAME} RENAME TO {NEW_DATABASE_NAME};

# Show current database
SELECT current_database();

# Show all of the column description of the table
SELECT
    a.attname AS column_name,
    d.description
FROM pg_catalog.pg_attribute a
JOIN pg_catalog.pg_description d ON 
	d.objoid = a.attrelid AND d.objsubid = a.attnum
WHERE
    a.attrelid = '{TABLE_NAME}'::regclass AND a.attnum > 0 AND NOT a.attisdropped;
```

## TABLE
``` Shell
# Create a new table
CREATE TABLE {TABLE_NAME} {
    {COLUMN_NAME_1} {DATA_TYPE_1},
    {COLUMN_NAME_2} {DATA_TYPE_2},
    ...
};

# Drop a database
DROP TABLE {TABLE_NAME};

# Add a column
ALTER TABLE {TABLE_NAME} ADD COLUMN {COLUMN_NAME} {DATA_TYPE};

# Remove a column
ALTER TABLE {TABLE_NAME} DROP COLUMN {COLUMN_NAME};

# Insert a data
INSERT INTO {TABLE_NAME} (COLUMN_NAME_1, COLUMN_NAME_2) VALUES (VALUE_1, VALUE_2);

# Select data
SELECT * FROM {TABLE_NAME};

# Update data
UPDATE {TABLE_NAME} SET {COLUMN_NAME_1} = {VALUE_1} WHERE {CONDITION};

# Delete data
DELETE FROM {TABLE_NAME} WHERE {CONDITION};

# Add the description
COMMENT ON COLUMN {TABLE_NAME}.{TCOLUMNE_NAME} IS '{DESCRIPTION}';
```

## Transaction
``` Shell
# Begin the transaction
BEGIN;

# Commit the transaction
COMMIT;

# Rollback the transaction
ROLLBACK;
```

# Function
``` SQL
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_date = NOW();  -- Set the updated_at column to the current timestamp
    RETURN NEW;              -- Return the modified row
END;
$$ LANGUAGE plpgsql;
```