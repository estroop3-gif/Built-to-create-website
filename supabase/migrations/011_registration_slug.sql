ALTER TABLE registrations ADD COLUMN IF NOT EXISTS retreat_slug text;
CREATE INDEX IF NOT EXISTS idx_registrations_retreat_slug ON registrations(retreat_slug);

UPDATE registrations SET retreat_slug = 'costa-rica' WHERE retreat ILIKE '%Costa Rica%';
UPDATE registrations SET retreat_slug = 'filmmaking-in-the-real-world' WHERE retreat ILIKE '%Filmmaking in the Real World%';
UPDATE registrations SET retreat_slug = 'texas' WHERE retreat ILIKE '%Texas%' OR retreat ILIKE '%Media Leaders%';
