-- Insert sample data for Category table
INSERT INTO "category" (id, name, description, created_at, updated_at)
VALUES
  (1, 'Nature', 'Beautiful scenes from nature', NOW(), NOW()),
  (2, 'Travel', 'Explore the world through images', NOW(), NOW()),
  (3, 'Art', 'Creative and inspiring artwork', NOW(), NOW()),
  (4, 'Animals', 'Adorable and majestic creatures', NOW(), NOW()),
  (5, 'Technology', 'The latest in tech visuals', NOW(), NOW());

-- Insert sample data for Board table
INSERT INTO "board" (id, title, description, category_id, created_at, updated_at)
VALUES
  (1, 'Landscapes', 'Scenic views of landscapes', 1, NOW(), NOW()),
  (2, 'Adventure', 'Images from exciting adventures', 1, NOW(), NOW()),
  (3, 'Paintings', 'Various forms of visual art', 3, NOW(), NOW()),
  (4, 'Cute Animals', 'Pictures of adorable animals', 4, NOW(), NOW()),
  (5, 'Innovation', 'Cutting-edge technology visuals', 5, NOW(), NOW()),
  (6, 'Beaches', 'Relaxing images of beaches', 1, NOW(), NOW()),
  (7, 'Cityscapes', 'Urban landscapes and skylines', 2, NOW(), NOW()),
  (8, 'Digital Art', 'Art created using digital tools', 3, NOW(), NOW()),
  (9, 'Wildlife', 'Photographs of wildlife in their habitat', 4, NOW(), NOW());

-- Update sequences for Category and Board tables
SELECT setval('"category_id_seq"', (SELECT MAX(id) FROM "category"));
SELECT setval('"board_id_seq"', (SELECT MAX(id) FROM "board"));
