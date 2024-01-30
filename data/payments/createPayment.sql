INSERT INTO [dbo].[Payments]
           ([eventID]
           ,[total]
           ,[paymentMethod]
           ,[paymentDate]
           ,[active])
VALUES 
    (
        @eventID,
        @total,
        @paymentMethod,
        @paymentDate,
        @active
    )

SELECT SCOPE_IDENTITY() AS paymentID