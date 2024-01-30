
SELECT [paymentID]
      ,[eventID]
      ,[total]
      ,[paymentMethod]
      ,[paymentDate]
      ,[active]
  FROM [dbo].[Payments]
WHERE [paymentID]=@paymentID