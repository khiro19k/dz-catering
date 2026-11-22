import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getClientIp,
  checkRateLimit,
  escapeHtml,
  sanitizeHeader,
  isValidEmail,
  isValidPhone,
  sendEmailWithFallback,
} from "@/lib/security";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    // 1. Rate Limiting Protection (Anti-Spam / Anti-DDoS)
    const rateCheck = checkRateLimit(ip, 6, 10 * 60 * 1000); // 6 requests per 10 minutes
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Trop de requêtes reçues. Veuillez patienter quelques minutes avant de renouveler votre demande." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot Anti-Bot Shield (Silent trap for spam scripts)
    if (body.hp_field || body.fax_number || body.website) {
      console.warn(`[Security Alert] Bot trapped via honeypot from IP: ${ip}`);
      // Return 200 so bot doesn't retry, but discard request without sending email
      return NextResponse.json({ success: true });
    }

    const {
      companyName,
      contactName,
      phone,
      email,
      eventDate,
      eventTimeSlot,
      eventLocation,
      guestCount,
      selectedFormats,
      selectedCoffeePackages,
      selectedOptions,
      wantTasting,
      clientNotes,
    } = body;

    // 3. Strict Input Validation & Length Bounds
    const safeCompanyName = sanitizeHeader(companyName || "").slice(0, 120);
    const safeContactName = sanitizeHeader(contactName || "").slice(0, 120);
    const safePhone = sanitizeHeader(phone || "").slice(0, 30);
    const safeEmail = sanitizeHeader(email || "").slice(0, 120);
    const safeDate = sanitizeHeader(eventDate || "").slice(0, 50);
    const safeTimeSlot = sanitizeHeader(eventTimeSlot || "").slice(0, 50);
    const safeLocation = sanitizeHeader(eventLocation || "").slice(0, 200);
    const safeNotes = String(clientNotes || "").slice(0, 2000);
    const safeGuestCount = Math.max(1, Math.min(10000, Number(guestCount) || 50));

    if (!safeCompanyName || safeCompanyName.length < 2) {
      return NextResponse.json(
        { error: "Veuillez renseigner un nom d'entreprise valide." },
        { status: 400 }
      );
    }

    if (!safePhone || !isValidPhone(safePhone)) {
      return NextResponse.json(
        { error: "Veuillez renseigner un numéro de téléphone valide." },
        { status: 400 }
      );
    }

    if (safeEmail && !isValidEmail(safeEmail)) {
      return NextResponse.json(
        { error: "L'adresse e-mail saisie n'est pas valide." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const user = process.env.SMTP_USER || "contact@dz-catering.com";
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_EMAIL || "contact@dz-catering.com";

    if (!host || !pass) {
      console.warn("SMTP configuration is incomplete. Simulating email send locally.");
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Simulation réussie.",
      });
    }

    // 4. Strict HTML Escaping against Stored XSS / HTML Injection in email clients
    const safeFormats = Array.isArray(selectedFormats)
      ? selectedFormats.map((f: unknown) => escapeHtml(String(f).slice(0, 100)))
      : [];

    const safeCoffee = Array.isArray(selectedCoffeePackages)
      ? selectedCoffeePackages.map((c: unknown) => escapeHtml(String(c).slice(0, 80)))
      : [];

    const safeOpts = Array.isArray(selectedOptions)
      ? selectedOptions.map((o: unknown) => escapeHtml(String(o).slice(0, 120)))
      : [];

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>Nouvelle Demande de Devis - DZ CATERING</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f5f2; margin: 0; padding: 20px; color: #222; }
        .card { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e8e2d8; }
        .header { background: linear-gradient(135deg, #63002e 0%, #3a001b 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .logo-title { font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #d4af37; margin: 0; font-family: serif; }
        .header-sub { font-size: 13px; color: #f2e6ce; margin-top: 6px; letter-spacing: 1px; text-transform: uppercase; }
        .content { padding: 30px 24px; }
        .badge-urgent { display: inline-block; background-color: #d4af37; color: #3a001b; font-weight: bold; font-size: 11px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
        .section-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #63002e; font-weight: 700; border-bottom: 2px solid #f2e6ce; padding-bottom: 6px; margin-top: 24px; margin-bottom: 14px; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #f0eee9; }
        .info-table td.label { font-weight: 600; color: #666; width: 38%; }
        .info-table td.value { font-weight: 500; color: #111; }
        .highlight { color: #63002e; font-weight: bold; }
        .pill { display: inline-block; background: #fbf5eb; border: 1px solid #e7d5b8; color: #5a3c10; font-size: 12px; padding: 4px 10px; border-radius: 6px; margin: 2px; }
        .footer { background: #fdfbf7; padding: 20px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 class="logo-title">EURL DZ CATERING</h1>
          <div class="header-sub">Nouvelle Demande de Devis Express</div>
        </div>
        <div class="content">
          <div style="text-align: right;">
            <span class="badge-urgent">À Traiter sous 2 à 4 heures</span>
          </div>

          <div class="section-title">Coordonnées du Client</div>
          <table class="info-table">
            <tr>
              <td class="label">Entreprise / Organisme :</td>
              <td class="value highlight">${escapeHtml(safeCompanyName)}</td>
            </tr>
            <tr>
              <td class="label">Responsable / Contact :</td>
              <td class="value">${escapeHtml(safeContactName || "Non renseigné")}</td>
            </tr>
            <tr>
              <td class="label">Numéro de Téléphone :</td>
              <td class="value"><a href="tel:${escapeHtml(safePhone)}" style="color: #63002e; font-weight: bold; text-decoration: none;">${escapeHtml(safePhone)}</a></td>
            </tr>
            <tr>
              <td class="label">Adresse E-mail :</td>
              <td class="value">${safeEmail ? `<a href="mailto:${escapeHtml(safeEmail)}" style="color: #63002e; text-decoration: none;">${escapeHtml(safeEmail)}</a>` : "Non renseignée"}</td>
            </tr>
          </table>

          <div class="section-title">Paramètres de l'Événement (Agenda)</div>
          <table class="info-table">
            <tr>
              <td class="label">Date de l'Événement :</td>
              <td class="value highlight">${escapeHtml(safeDate || "À convenir")}</td>
            </tr>
            <tr>
              <td class="label">Créneau Horaire :</td>
              <td class="value">${escapeHtml(safeTimeSlot || "Matinée")}</td>
            </tr>
            <tr>
              <td class="label">Lieu Prévu :</td>
              <td class="value">${escapeHtml(safeLocation || "Non précisé")}</td>
            </tr>
            <tr>
              <td class="label">Envergure Estimée :</td>
              <td class="value highlight">${safeGuestCount} convives</td>
            </tr>
            <tr>
              <td class="label">Séance de Dégustation :</td>
              <td class="value">${wantTasting ? "✅ Souhaitée par le client" : "❌ Non requise"}</td>
            </tr>
          </table>

          <div class="section-title">Formats de Réception Sélectionnés</div>
          <div style="margin-bottom: 12px;">
            ${safeFormats.map((f: string) => `<span class="pill">🍽️ ${f}</span>`).join(" ")}
          </div>

          ${safeCoffee.length > 0 ? `
            <div style="font-size: 12px; color: #666; margin-top: 6px;">
              <strong>Gamme(s) Pause Café choisie(s) :</strong> ${safeCoffee.join(", ")}
            </div>
          ` : ""}

          ${safeOpts.length > 0 ? `
            <div class="section-title">Prestations Complémentaires Retenues</div>
            <div style="margin-bottom: 12px;">
              ${safeOpts.map((opt: string) => `<span class="pill">✨ ${opt}</span>`).join(" ")}
            </div>
          ` : ""}

          ${safeNotes ? `
            <div class="section-title">Notes & Précisions Particulières</div>
            <div style="background: #faf8f5; border: 1px solid #ebd9c3; border-radius: 8px; padding: 12px; font-size: 13px; line-height: 1.5;">
              ${escapeHtml(safeNotes).replace(/\n/g, "<br>")}
            </div>
          ` : ""}
        </div>
        <div class="footer">
          Demande générée depuis le site sécurisé de <a href="https://dz-catering.com" style="color: #63002e; text-decoration: none;">DZ CATERING</a>. (IP: ${escapeHtml(ip)})
        </div>
      </div>
    </body>
    </html>
    `;

    // 5. Header Injection Protection
    const replyTo = safeEmail && isValidEmail(safeEmail) ? safeEmail : user;

    await sendEmailWithFallback(host, user, pass, port, {
      from: `"DZ CATERING Web" <${user}>`,
      to: toEmail,
      replyTo,
      subject: `🔔 Devis : ${safeCompanyName} (${safeGuestCount} convives - ${safeDate || "Date à convenir"})`,
      text: `Nouvelle demande de devis de ${safeCompanyName}\nTéléphone : ${safePhone}\nDate : ${safeDate} (${safeTimeSlot})\nConvives : ${safeGuestCount}\nLieu : ${safeLocation}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error sending email via SMTP:", err);
    return NextResponse.json(
      { error: err.message || "Erreur interne lors de l'envoi de l'e-mail." },
      { status: 500 }
    );
  }
}
