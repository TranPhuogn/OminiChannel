USE [Omnichannel];
GO

UPDATE [dbo].[Perfumes]
SET [TopNotes] = 'Cam Bergamot, Tiêu hồng',
    [MiddleNotes] = 'Hoa hồng, Nhài sữa',
    [BaseNotes] = 'Gỗ đàn hương, Xạ hương',
    [Concentration] = 'Eau de Parfum',
    [Origin] = 'Pháp',
    [BrandStory] = 'Câu chuyện thương hiệu huyền thoại từ năm 1920...'
WHERE [Id] = 1;

UPDATE [dbo].[Perfumes]
SET [TopNotes] = 'Bưởi Corsica, Hạt tiêu đen',
    [MiddleNotes] = 'Trà đen, Gỗ tuyết tùng',
    [BaseNotes] = 'Gỗ đàn hương, Hoắc hương',
    [Concentration] = 'Extrait de Parfum',
    [Origin] = 'Ý',
    [BrandStory] = 'Dòng sản phẩm giới hạn dành cho O2O.'
WHERE [Id] > 1;
GO
