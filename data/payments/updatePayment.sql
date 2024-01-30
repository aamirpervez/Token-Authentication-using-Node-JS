UPDATE [dbo].[Payments]
SET [eventID]=@eventID,
    [total]=@total,
    [paymentMethod]=@paymentMethod,
    [paymentDate]=@paymentDate,
    [active]=@active
WHERE [paymentID]=@paymentID

SELECT [paymentID]
      ,[eventID]
      ,[total]
      ,[paymentMethod]
      ,[paymentDate]
      ,[active]
FROM [dbo].[Payments]
WHERE [paymentID]=@paymentID