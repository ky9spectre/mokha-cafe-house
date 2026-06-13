-- Seed data for menu_items

INSERT INTO menu_items (name, category, price, image, description, dietary) VALUES
('Espresso', 'coffee', 3.50, 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400', 'Rich and bold single shot espresso', '["vegan","gluten-free"]'),
('Cappuccino', 'coffee', 4.50, 'https://images.unsplash.com/photo-1572442388799-116f5c6f3c41?w=400', 'Steamed milk with a thick layer of foam', '["vegetarian"]'),
('Caramel Latte', 'coffee', 5.00, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', 'Smooth latte with house-made caramel', '["vegetarian"]'),
('Cold Brew', 'coffee', 4.00, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', 'Steeped 18 hours for a smooth taste', '["vegan","gluten-free"]'),
('Croissant', 'pastry', 3.50, 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400', 'Buttery, flaky French-style croissant', '["vegetarian"]'),
('Blueberry Muffin', 'pastry', 3.00, 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400', 'Fresh baked with wild blueberries', '["vegetarian"]'),
('Avocado Toast', 'food', 7.50, 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400', 'Sourdough, avocado, radish, and seeds', '["vegan"]'),
('Chicken Sandwich', 'food', 8.50, 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400', 'Grilled chicken with garlic aioli', '["gluten-free"]'),
('Matcha Latte', 'specialty', 5.50, 'https://images.unsplash.com/photo-1511920290038-4ae11dda560a?w=400', 'Premium Japanese matcha with oat milk', '["vegan"]'),
('Chocolate Croissant', 'pastry', 4.00, 'https://images.unsplash.com/photo-1623334044303-241021148842?w=400', 'Filled with dark Belgian chocolate', '["vegetarian"]'),
('Caesar Salad', 'food', 7.00, 'https://images.unsplash.com/photo-1550304917-7c8c3b5e5e4a?w=400', 'With house-made dressing and croutons', '["gluten-free"]'),
('Affogato', 'specialty', 6.00, 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400', 'Vanilla gelato drowned in espresso', '["vegetarian"]');

-- Seed blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category, image, date) VALUES
('The Art of Pour-Over Coffee', 'the-art-of-pour-over-coffee', 'Discover the meticulous process behind our signature pour-over coffee...', 'Full content article about pour-over techniques...', 'Coffee Culture', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600', '2024-12-05'),
('Our New Winter Menu Is Here', 'our-new-winter-menu-is-here', 'Warm up with our seasonal offerings, from spiced lattes to hearty pastries...', 'Full content about winter menu...', 'Menu Updates', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600', '2024-11-20'),
('Sustainable Sourcing: Our Commitment', 'sustainable-sourcing-our-commitment', 'Learn how we partner with farmers to bring you ethically sourced beans...', 'Full content about sustainability...', 'Sustainability', 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600', '2024-11-05');

-- Seed reviews
INSERT INTO reviews (author_name, rating, text, date, image) VALUES
('Sarah M.', 5, 'The best coffee experience I have ever had. The baristas really know their craft.', '2024-12-01', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100'),
('James K.', 5, 'Perfect spot for remote work. Great Wi-Fi, excellent coffee, and a welcoming atmosphere.', '2024-11-28', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100'),
('Emily R.', 4, 'Great coffee and cozy atmosphere. The cold brew is exceptional.', '2024-11-15', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=100'),
('Michael T.', 5, 'The avocado toast is to die for. Fresh ingredients and perfect preparation.', '2024-11-10', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100');
