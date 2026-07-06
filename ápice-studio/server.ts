/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Crucial: parse JSON payloads first!
  app.use(express.json());

  // API route for sending email (proxy to Resend to keep API key secure)
  app.post("/api/send-email", async (req, res) => {
    try {
      const { answers, nombre, email } = req.body;
      
      // Validate inputs
      if (!answers || !nombre || !email) {
        return res.status(400).json({ error: "Faltan campos obligatorios para el envío." });
      }

      const resendKey = process.env.RESEND_API_KEY || "re_D3TPDAB1_8yMLr7AF1xteaSfniBURpCjN";
      const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

      const resendInstance = new Resend(resendKey);

      // Prepare date and time
      const now = new Date();
      const dateStr = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      // Build the email HTML (Update 07 requested format)
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; background-color: #faf9f6; color: #1e1e1e;">
          <div style="border-bottom: 2px solid #1c2e24; padding-bottom: 10px; margin-bottom: 20px;">
            <h2 style="font-family: serif; color: #1c2e24; margin: 0; font-size: 24px;">Ápice Studio</h2>
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #1c2e24; margin: 5px 0 0 0; font-weight: bold;">NEW CLARITY CALL REQUEST</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; margin: 5px 0;"><strong>Date:</strong> ${dateStr}</p>
            <p style="font-size: 12px; margin: 5px 0;"><strong>Time:</strong> ${timeStr}</p>
            <p style="font-size: 12px; margin: 5px 0;"><strong>Visitor Name:</strong> ${nombre}</p>
            <p style="font-size: 12px; margin: 5px 0;"><strong>Visitor Email:</strong> ${email}</p>
          </div>

          <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #eaeaea; padding-bottom: 5px; color: #1c2e24; margin-top: 25px;">Visitor Answers</h3>
          
          <div style="margin-top: 15px;">
            <div style="margin-bottom: 15px;">
              <p style="font-size: 12px; font-weight: bold; margin: 0; color: #666;">Pregunta 1: ¿Tu negocio genera ingresos recurrentes superiores a 1.500€ al mes?</p>
              <p style="font-size: 14px; margin: 5px 0 0 0; font-weight: 500;">${answers.q1 || 'N/A'}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <p style="font-size: 12px; font-weight: bold; margin: 0; color: #666;">Pregunta 2: ¿Eres la persona encargada de tomar decisiones de marca?</p>
              <p style="font-size: 14px; margin: 5px 0 0 0; font-weight: 500;">${answers.q2 || 'N/A'}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <p style="font-size: 12px; font-weight: bold; margin: 0; color: #666;">Pregunta 3: ¿Estás dispuesto a delegar la producción audiovisual y confiar en un sistema?</p>
              <p style="font-size: 14px; margin: 5px 0 0 0; font-weight: 500;">${answers.q3 || 'N/A'}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <p style="font-size: 12px; font-weight: bold; margin: 0; color: #666;">Pregunta 4: ¿Cuéntanos brevemente a qué se dedica tu negocio?</p>
              <p style="font-size: 14px; margin: 5px 0 0 0; background: #fff; padding: 10px; border-left: 3px solid #1c2e24; font-style: italic; font-weight: 500; border-top: 1px solid #eee; border-right: 1px solid #eee; border-bottom: 1px solid #eee;">${answers.q4 || 'N/A'}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <p style="font-size: 12px; font-weight: bold; margin: 0; color: #666;">Pregunta 5: ¿Cuál es el mayor reto que tienes actualmente con tu comunicación o crecimiento?</p>
              <p style="font-size: 14px; margin: 5px 0 0 0; background: #fff; padding: 10px; border-left: 3px solid #1c2e24; font-style: italic; font-weight: 500; border-top: 1px solid #eee; border-right: 1px solid #eee; border-bottom: 1px solid #eee;">${answers.q5 || 'N/A'}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <p style="font-size: 12px; font-weight: bold; margin: 0; color: #666;">Pregunta 6: ¿Qué esperas conseguir trabajando con ÁPICE Studio?</p>
              <p style="font-size: 14px; margin: 5px 0 0 0; background: #fff; padding: 10px; border-left: 3px solid #1c2e24; font-style: italic; font-weight: 500; border-top: 1px solid #eee; border-right: 1px solid #eee; border-bottom: 1px solid #eee;">${answers.q6 || 'N/A'}</p>
            </div>
          </div>
        </div>
      `;

      const result = await resendInstance.emails.send({
        from: fromEmail,
        to: ["apicestudio.co@gmail.com"],
        subject: `NUEVA LLAMADA DE CLARIDAD: ${nombre}`,
        html: emailHtml
      });

      if (result.error) {
        console.error("Resend SDK returned an error:", result.error);
        return res.status(400).json({ error: result.error.message || "Failed to send email" });
      }

      return res.json({ success: true, id: result.data?.id });
    } catch (error: any) {
      console.error("Send email endpoint crashed:", error);
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite middleware for development or serving build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
