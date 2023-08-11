
USE ThejituProjectManagementDatabase;
GO

DROP TABLE IF EXISTS usersTable;

CREATE TABLE usersTable(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    cohort_number INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(MAX) NOT NULL,
    
);

USE ThejituProjectManagementDatabase;
SELECT * FROM usersTable;

DELETE FROM usersTable WHERE id =  9;
