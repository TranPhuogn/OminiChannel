USE Omnichannel;
GO

IF NOT EXISTS (SELECT 1 FROM Users WHERE Username = 'admin')
BEGIN
    INSERT INTO Users (Username, Password, Role, FullName, Email)
    VALUES ('admin', '123', 'Admin', 'KP Administrator', 'admin@kpluxury.com');
END
GO
