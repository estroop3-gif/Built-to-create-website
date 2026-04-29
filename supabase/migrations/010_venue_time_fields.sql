ALTER TABLE experiences ADD COLUMN IF NOT EXISTS start_time text;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS end_time text;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS venue text;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS venue_address text;

UPDATE experiences SET start_time = '2:00 PM', end_time = '4:00 PM', venue = 'Pickens County Recreation Center', venue_address = '1329 Camp Rd, Jasper, GA 30143' WHERE slug = 'filmmaking-in-the-real-world';
