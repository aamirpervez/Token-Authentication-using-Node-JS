SELECT [userID]
       ,[username]
       ,[email]
       ,[password]
       FROM [dbo].[Users]
       WHERE [email]=@email
