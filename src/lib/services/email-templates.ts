// Email templates for the Born to Create Project sequence
// Each template includes subject and HTML content with variables

export const emailTemplates = {
  0: {
    subject: "Welcome to Born to Create Project",
    html: (firstName: string, leadMagnetUrl: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
            .container { background: #ffffff; border-radius: 8px; padding: 32px; margin: 20px 0; }
            .header { text-align: center; margin-bottom: 32px; }
            .logo { color: #2d5016; font-size: 28px; font-weight: bold; margin-bottom: 8px; }
            .tagline { color: #6b7280; font-size: 16px; }
            .content { margin-bottom: 32px; }
            .button { display: inline-block; background: #2d5016; color: #ffffff !important; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; margin: 24px 0; }
            .download-link { display: inline-block; background: #f5f1e8; color: #2d5016 !important; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: 600; border: 2px solid #2d5016; margin: 16px 0; }
            .footer { text-align: center; font-size: 12px; color: #6b7280; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; }
            .unsubscribe { color: #6b7280; text-decoration: underline; }
            p { margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Born to Create Project</div>
              <div class="tagline">Costa Rica Filmmaking Retreat</div>
            </div>
            
            <div class="content">
              <p>Hello ${firstName || 'there'},</p>
              
              <p>You're in. You just joined a community of filmmakers and storytellers who believe creativity is a calling. Here is your free download:</p>
              
              <a href="${leadMagnetUrl}" class="download-link">📋 The Filmmaker's Essential Gear Checklist</a>
              
              <p>Inside you'll find a lightweight kit that travels well and covers camera, audio, and light so you can focus on the story.</p>
              
              <p>Over the next few weeks I will send short, practical lessons to level up your craft. If Costa Rica is on your heart, this training will get you ready before you arrive.</p>
              
              <p><strong>Ready to take the next step?</strong></p>
              
              <a href="{{register_url}}" class="button">Register for the Costa Rica Filmmaking Retreat</a>
            </div>
          </div>
          
          <div class="footer">
            <p>Parker at Born to Create Project<br>
            <a href="mailto:parker@thebtcp.com" style="color: #6b7280;">parker@thebtcp.com</a></p>
            <p><a href="{{unsubscribe_url}}" class="unsubscribe">Unsubscribe</a> | <a href="https://thebtcp.com" style="color: #6b7280;">thebtcp.com</a></p>
            <p>Second Watch Network, San José, Costa Rica</p>
          </div>
        </body>
      </html>
    `
  },

  1: {
    subject: "Why we built Born to Create Project",
    html: (firstName: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
            .container { background: #ffffff; border-radius: 8px; padding: 32px; margin: 20px 0; }
            .header { text-align: center; margin-bottom: 32px; }
            .logo { color: #2d5016; font-size: 28px; font-weight: bold; margin-bottom: 8px; }
            .tagline { color: #6b7280; font-size: 16px; }
            .content { margin-bottom: 32px; }
            .button { display: inline-block; background: #2d5016; color: #ffffff !important; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; margin: 24px 0; }
            .highlight { background: #f5f1e8; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #2d5016; }
            .footer { text-align: center; font-size: 12px; color: #6b7280; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; }
            .unsubscribe { color: #6b7280; text-decoration: underline; }
            p { margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Born to Create Project</div>
              <div class="tagline">Costa Rica Filmmaking Retreat</div>
            </div>
            
            <div class="content">
              <p>Hello ${firstName || 'there'},</p>
              
              <p>Born to Create Project exists to form artists who carry excellence and presence into their work. The retreat is designed to clear space, sharpen your craft, and help you leave with finished pieces and lifelong creative friends.</p>
              
              <div class="highlight">
                <p><strong>Question for you:</strong></p>
                <p>What story do you feel called to tell in this season? Write down one sentence. Keep it visible this week.</p>
              </div>
              
              <p><strong>When you are ready to commit to your growth:</strong></p>
              
              <a href="{{register_url}}" class="button">Register for the Costa Rica Filmmaking Retreat</a>
            </div>
          </div>
          
          <div class="footer">
            <p>Parker at Born to Create Project<br>
            <a href="mailto:parker@thebtcp.com" style="color: #6b7280;">parker@thebtcp.com</a></p>
            <p><a href="{{unsubscribe_url}}" class="unsubscribe">Unsubscribe</a> | <a href="https://thebtcp.com" style="color: #6b7280;">thebtcp.com</a></p>
            <p>Second Watch Network, San José, Costa Rica</p>
          </div>
        </body>
      </html>
    `
  },

  2: {
    subject: "Manual Mode made simple",
    html: (firstName: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
            .container { background: #ffffff; border-radius: 8px; padding: 32px; margin: 20px 0; }
            .header { text-align: center; margin-bottom: 32px; }
            .logo { color: #2d5016; font-size: 28px; font-weight: bold; margin-bottom: 8px; }
            .tagline { color: #6b7280; font-size: 16px; }
            .content { margin-bottom: 32px; }
            .button { display: inline-block; background: #2d5016; color: #ffffff !important; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; margin: 24px 0; }
            .settings { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
            .tip-box { background: #f5f1e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; font-size: 12px; color: #6b7280; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; }
            .unsubscribe { color: #6b7280; text-decoration: underline; }
            p { margin-bottom: 16px; }
            ul { margin-bottom: 16px; }
            li { margin-bottom: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Born to Create Project</div>
              <div class="tagline">Costa Rica Filmmaking Retreat</div>
            </div>
            
            <div class="content">
              <p>Hello ${firstName || 'there'},</p>
              
              <p><strong>Take control of the image with three settings:</strong></p>
              
              <div class="settings">
                <p><strong>Shutter speed:</strong> motion character. Faster is crisper. Slower adds blur.</p>
                <p><strong>Aperture:</strong> depth of field. Lower f numbers blur backgrounds. Higher keeps more in focus.</p>
                <p><strong>ISO:</strong> sensor gain. Lower is cleaner. Higher adds noise.</p>
              </div>
              
              <div class="tip-box">
                <p><strong>Workflow:</strong></p>
                <ul>
                  <li>Set shutter near double your frame rate. At 24fps start at 1/50.</li>
                  <li>Pick aperture for depth. Portraits often f2 to f2.8. Landscapes f5.6 to f8.</li>
                  <li>Raise ISO only as needed.</li>
                </ul>
              </div>
              
              <p><strong>Drill:</strong> Film a moving subject at three shutter speeds. Compare motion feel.</p>
              
              <p><strong>Commit to the craft in Costa Rica:</strong></p>
              
              <a href="{{register_url}}" class="button">Register for the retreat</a>
            </div>
          </div>
          
          <div class="footer">
            <p>Parker at Born to Create Project<br>
            <a href="mailto:parker@thebtcp.com" style="color: #6b7280;">parker@thebtcp.com</a></p>
            <p><a href="{{unsubscribe_url}}" class="unsubscribe">Unsubscribe</a> | <a href="https://thebtcp.com" style="color: #6b7280;">thebtcp.com</a></p>
            <p>Second Watch Network, San José, Costa Rica</p>
          </div>
        </body>
      </html>
    `
  }

  // Add remaining templates 3-9 following the same pattern...
};

export type EmailTemplateId = keyof typeof emailTemplates;