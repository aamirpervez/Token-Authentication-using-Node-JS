SELECT
    CASE WHEN EXISTS 
    (
        SELECT [userID]
       ,[username]
       ,[email]
       ,[password]
       FROM [dbo].[Users]
       WHERE [email]=@email
    )
  THEN cast(1 as bit) 
    ELSE cast(0 as bit)
END as IsUserExist