-- Email sequence templates for automated subscriber emails
-- These are inserted into the existing email_templates table from migration 002

-- Email 1: Welcome (sent immediately after subscribing)
INSERT INTO email_templates (template_key, subject, preview_text, html_content, plain_text_content, order_sequence, active, category, tags)
VALUES (
  'welcome_01',
  'Welcome to Born to Create Project',
  'Thanks for reaching out - here is what we are about.',
  '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto"><div style="background:#2d5a27;padding:24px 32px;border-radius:8px 8px 0 0"><h1 style="color:#fff;font-size:20px;margin:0">Born to Create Project</h1></div><div style="background:#fff;padding:32px"><p style="font-size:18px;color:#1a1a1a">Hey there,</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">Thanks for connecting with Born to Create Project. We are a community of filmmakers and storytellers who believe the best way to learn is by doing.</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">Here is what you can expect from us:</p><ul style="font-size:16px;line-height:1.8;color:#4a4a4a"><li>Notifications when new workshops and experiences are announced</li><li>Practical filmmaking tips and behind-the-scenes content</li><li>Early access to registration before spots fill up</li></ul><p style="font-size:16px;line-height:1.6;color:#4a4a4a">We keep things simple and we do not spam. When we reach out, it is because we have something worth sharing.</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">In the meantime, check out our current workshops if you have not already:</p><div style="text-align:center;margin:24px 0"><a href="https://www.thebtcp.com/experiences" style="background:#2d5a27;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">View Workshops</a></div><p style="font-size:15px;color:#4a4a4a;line-height:1.8">See you out there,<br/>Parker Stroop<br/>Born to Create Project</p></div><div style="background:#f5f3ef;padding:16px 32px;border-radius:0 0 8px 8px;text-align:center"><p style="font-size:12px;color:#999">You are receiving this because you signed up at thebtcp.com.</p></div></div>',
  'Hey there,

Thanks for connecting with Born to Create Project. We are a community of filmmakers and storytellers who believe the best way to learn is by doing.

Here is what you can expect from us:
- Notifications when new workshops and experiences are announced
- Practical filmmaking tips and behind-the-scenes content
- Early access to registration before spots fill up

We keep things simple and we do not spam. When we reach out, it is because we have something worth sharing.

Check out our current workshops: https://www.thebtcp.com/experiences

See you out there,
Parker Stroop
Born to Create Project',
  1, true, 'marketing', ARRAY['welcome', 'onboarding']
)
ON CONFLICT (template_key) DO NOTHING;

-- Email 2: What we do (sent 3 days after welcome)
INSERT INTO email_templates (template_key, subject, preview_text, html_content, plain_text_content, order_sequence, active, category, tags)
VALUES (
  'welcome_02',
  'What happens at a Born to Create workshop?',
  'Real cameras, real teaching, real skills you can use right away.',
  '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto"><div style="background:#2d5a27;padding:24px 32px;border-radius:8px 8px 0 0"><h1 style="color:#fff;font-size:20px;margin:0">Born to Create Project</h1></div><div style="background:#fff;padding:32px"><p style="font-size:18px;color:#1a1a1a">Hey again,</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">Wanted to give you a quick picture of what actually happens at one of our workshops.</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a"><strong>Filmmaking in the Real World</strong> is a 2-hour, in-person session where you will:</p><ul style="font-size:16px;line-height:1.8;color:#4a4a4a"><li>Learn how real productions work from someone who has done it for nearly a decade</li><li>Get hands-on time with professional cinema cameras</li><li>Understand camera basics the way working professionals think about them</li><li>Learn documentary interview and B-roll fundamentals</li><li>Walk away with a clear plan for your next steps</li></ul><p style="font-size:16px;line-height:1.6;color:#4a4a4a">You do not need any experience or gear. Everything is provided. The only thing you need to bring is curiosity.</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">Workshops are $50 and seats are limited so everyone gets real attention.</p><div style="text-align:center;margin:24px 0"><a href="https://www.thebtcp.com/experiences" style="background:#2d5a27;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">See Upcoming Dates</a></div><p style="font-size:15px;color:#4a4a4a;line-height:1.8">Parker</p></div><div style="background:#f5f3ef;padding:16px 32px;border-radius:0 0 8px 8px;text-align:center"><p style="font-size:12px;color:#999">You are receiving this because you signed up at thebtcp.com.</p></div></div>',
  'Hey again,

Wanted to give you a quick picture of what actually happens at one of our workshops.

Filmmaking in the Real World is a 2-hour, in-person session where you will:
- Learn how real productions work from someone who has done it for nearly a decade
- Get hands-on time with professional cinema cameras
- Understand camera basics the way working professionals think about them
- Learn documentary interview and B-roll fundamentals
- Walk away with a clear plan for your next steps

You do not need any experience or gear. Everything is provided.

Workshops are $50 and seats are limited so everyone gets real attention.

See upcoming dates: https://www.thebtcp.com/experiences

Parker',
  2, true, 'marketing', ARRAY['welcome', 'onboarding']
)
ON CONFLICT (template_key) DO NOTHING;

-- Email 3: Social proof / about Parker (sent 7 days after welcome)
INSERT INTO email_templates (template_key, subject, preview_text, html_content, plain_text_content, order_sequence, active, category, tags)
VALUES (
  'welcome_03',
  'Who is behind Born to Create Project?',
  'A quick intro to who is teaching and why this exists.',
  '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto"><div style="background:#2d5a27;padding:24px 32px;border-radius:8px 8px 0 0"><h1 style="color:#fff;font-size:20px;margin:0">Born to Create Project</h1></div><div style="background:#fff;padding:32px"><p style="font-size:18px;color:#1a1a1a">Hey,</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">Quick intro since you are here — Born to Create Project is run by Parker Stroop, a freelance Director of Photography and Camera Operator with nearly 10 years of experience.</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">Parker has worked on productions for National Geographic, History Channel, ABC, HGTV, Lifetime, Fox, and a wide range of commercial and independent projects. He started as a Production Assistant and worked his way up.</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">The workshops exist because Parker wishes someone had taught him this stuff when he was starting out. The industry is not always easy to break into, and most of what you need to know is not in a textbook. These workshops are the shortcut he never had.</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">If you want to see his work: <a href="https://www.imdb.com/name/nm10358218/" style="color:#2d5a27;font-weight:600">IMDb profile</a></p><div style="text-align:center;margin:24px 0"><a href="https://www.thebtcp.com/register" style="background:#2d5a27;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">Register for a Workshop</a></div><p style="font-size:15px;color:#4a4a4a;line-height:1.8">Parker</p></div><div style="background:#f5f3ef;padding:16px 32px;border-radius:0 0 8px 8px;text-align:center"><p style="font-size:12px;color:#999">You are receiving this because you signed up at thebtcp.com.</p></div></div>',
  'Hey,

Quick intro — Born to Create Project is run by Parker Stroop, a freelance Director of Photography and Camera Operator with nearly 10 years of experience.

Parker has worked on productions for National Geographic, History Channel, ABC, HGTV, Lifetime, Fox, and a wide range of commercial and independent projects.

The workshops exist because Parker wishes someone had taught him this stuff when he was starting out.

See his work: https://www.imdb.com/name/nm10358218/

Register for a workshop: https://www.thebtcp.com/register

Parker',
  3, true, 'marketing', ARRAY['welcome', 'onboarding']
)
ON CONFLICT (template_key) DO NOTHING;

-- Email 4: Reminder / urgency (sent 14 days after welcome)
INSERT INTO email_templates (template_key, subject, preview_text, html_content, plain_text_content, order_sequence, active, category, tags)
VALUES (
  'welcome_04',
  'Still thinking about it?',
  'No pressure - just wanted to make sure you saw this before seats fill up.',
  '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto"><div style="background:#2d5a27;padding:24px 32px;border-radius:8px 8px 0 0"><h1 style="color:#fff;font-size:20px;margin:0">Born to Create Project</h1></div><div style="background:#fff;padding:32px"><p style="font-size:18px;color:#1a1a1a">Hey,</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">Just a quick check-in. If you have been thinking about one of our workshops, I wanted to make sure you know that seats are limited — we keep them small so everyone gets real, hands-on attention.</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">Here is what is coming up:</p><ul style="font-size:16px;line-height:1.8;color:#4a4a4a"><li><strong>Jasper, GA</strong> — May 16, 2026 · 2:00 - 4:00 PM · $50</li><li><strong>Canton, GA</strong> — May 23, 2026 · 2:00 - 4:00 PM · $50</li></ul><p style="font-size:16px;line-height:1.6;color:#4a4a4a">No experience needed. No gear needed. Just show up ready to learn.</p><p style="font-size:16px;line-height:1.6;color:#4a4a4a">If you have any questions at all, just reply to this email. I read and respond to every one.</p><div style="text-align:center;margin:24px 0"><a href="https://www.thebtcp.com/register" style="background:#2d5a27;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">Reserve Your Seat</a></div><p style="font-size:15px;color:#4a4a4a;line-height:1.8">Parker</p></div><div style="background:#f5f3ef;padding:16px 32px;border-radius:0 0 8px 8px;text-align:center"><p style="font-size:12px;color:#999">You are receiving this because you signed up at thebtcp.com.</p></div></div>',
  'Hey,

Just a quick check-in. If you have been thinking about one of our workshops, seats are limited.

Here is what is coming up:
- Jasper, GA - May 16, 2026 - 2:00-4:00 PM - $50
- Canton, GA - May 23, 2026 - 2:00-4:00 PM - $50

No experience needed. No gear needed. Just show up ready to learn.

If you have questions, just reply to this email.

Reserve your seat: https://www.thebtcp.com/register

Parker',
  4, true, 'marketing', ARRAY['welcome', 'reminder']
)
ON CONFLICT (template_key) DO NOTHING;
