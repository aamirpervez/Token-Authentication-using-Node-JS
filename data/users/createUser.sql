INSERT INTO [dbo].[Users]
           ([username]
           ,[email]
           ,[password])
     VALUES
    (
        @username,
        @email,
        @password
    )

SELECT SCOPE_IDENTITY() AS userID