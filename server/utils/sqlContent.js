export const schemaSql = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(6,2) NOT NULL,
  image TEXT,
  description TEXT,
  dietary JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  total DECIMAL(8,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INT REFERENCES menu_items(id) ON DELETE SET NULL,
  quantity INT NOT NULL,
  price DECIMAL(8,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  author_name VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  date DATE NOT NULL,
  image TEXT,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category VARCHAR(200),
  image TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  reservation_date DATE NOT NULL,
  reservation_time VARCHAR(50) NOT NULL,
  guests INT NOT NULL,
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_menu_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
`;

export const seedSql = `
INSERT INTO menu_items (name, category, price, image, description, dietary) VALUES
('Espresso', 'coffee', 3.50, 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400', 'Rich and bold single shot espresso', '["vegan","gluten-free"]'),
('Cappuccino', 'coffee', 4.50, 'https://images.unsplash.com/photo-1572442388799-116f5c6f3c41?w=400', 'Steamed milk with a thick layer of foam', '["vegetarian"]'),
('Caramel Latte', 'coffee', 5.00, 'https://images.unsplash.com/photo-1598908313730-7681000259f1?w=400', 'Smooth latte with house-made caramel', '["vegetarian"]'),
('Cold Brew', 'coffee', 4.00, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400', 'Steeped 18 hours for a smooth taste', '["vegan","gluten-free"]'),
('Croissant', 'pastry', 3.50, 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400', 'Buttery, flaky French-style croissant', '["vegetarian"]'),
('Blueberry Muffin', 'pastry', 3.00, 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400', 'Fresh baked with wild blueberries', '["vegetarian"]'),
('Avocado Toast', 'food', 7.50, 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400', 'Sourdough, avocado, radish, and seeds', '["vegan"]'),
('Chicken Sandwich', 'food', 8.50, 'https://images.unsplash.com/photo-1567234669013-216e9aff63df?w=400', 'Grilled chicken with garlic aioli', '["gluten-free"]'),
('Matcha Latte', 'specialty', 5.50, 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400', 'Premium Japanese matcha with oat milk', '["vegan"]'),
('Chocolate Croissant', 'pastry', 4.00, 'https://images.unsplash.com/photo-1623334044303-241021148842?w=400', 'Filled with dark Belgian chocolate', '["vegetarian"]'),
('Caesar Salad', 'food', 7.00, 'https://images.unsplash.com/photo-1550304917-7c8c3b5e5e4a?w=400', 'With house-made dressing and croutons', '["gluten-free"]'),
('Affogato', 'specialty', 6.00, 'https://images.unsplash.com/photo-1594911774802-8822a707cbb0?w=400', 'Vanilla gelato drowned in espresso', '["vegetarian"]');

INSERT INTO blog_posts (title, slug, excerpt, content, category, image, date) VALUES
('The Art of Pour-Over Coffee', 'the-art-of-pour-over-coffee', 'Discover the meticulous process behind our signature pour-over coffee...', 'Full content article about pour-over techniques...', 'Coffee Culture', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600', '2024-12-05'),
('Our New Winter Menu Is Here', 'our-new-winter-menu-is-here', 'Warm up with our seasonal offerings, from spiced lattes to hearty pastries...', 'Full content about winter menu...', 'Menu Updates', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600', '2024-11-20'),
('Sustainable Sourcing: Our Commitment', 'sustainable-sourcing-our-commitment', 'Learn how we partner with farmers to bring you ethically sourced beans...', 'Full content about sustainability...', 'Sustainability', 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600', '2024-11-05');

INSERT INTO reviews (author_name, rating, text, date, image) VALUES
('Sarah M.', 5, 'The best coffee experience I have ever had. The baristas really know their craft.', '2024-12-01', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'),
('James K.', 5, 'Perfect spot for remote work. Great Wi-Fi, excellent coffee, and a welcoming atmosphere.', '2024-11-28', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'),
('Emily R.', 4, 'Great coffee and cozy atmosphere. The cold brew is exceptional.', '2024-11-15', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'),
('Michael T.', 5, 'The avocado toast is to die for. Fresh ingredients and perfect preparation.', '2024-11-10', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100');
`;
