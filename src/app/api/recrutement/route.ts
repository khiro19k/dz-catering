import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getClientIp,
  checkRateLimit,
  escapeHtml,
  sanitizeHeader,
  isValidEmail,
  isValidPhone,
  sanitizeFileName,
} from "@/lib/security";

const JOB_ROLE_LABELS: Record<string, string> = {
  "maitre-hotel": "Maître d'Hôtel / Chef de Rang",
  "chef-cuisinier": "Chef Cuisinier / Second",
  "chef-patissier": "Chef Pâtissier",
  "serveur": "Serveur / Commis de salle",
  "logistique": "Chauffeur-Livreur Logistique",
};

const EXP_LABELS: Record<string, string> = {
  debutant: "Débutant motivé (formation hôtelière)",
  "1-3": "1 à 3 ans d'expérience",
  "3-5": "3 à 5 ans d'expérience",
  "5+": "Plus de 5 ans en établissement de prestige",
};

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    // 1. Rate Limiting Protection (Anti-Spam / Anti-Flooding)
    const rateCheck = checkRateLimit(ip, 6, 10 * 60 * 1000); // 6 requests per 10 minutes
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Trop de candidatures envoyées depuis votre réseau. Veuillez patienter quelques minutes." },
        { status: 429 }
      );
    }

    const formData = await req.formData();

    // 2. Honeypot Anti-Bot Shield
    const honeypot = formData.get("hp_field") || formData.get("website");
    if (honeypot) {
      console.warn(`[Security Alert] Recruitment bot trapped via honeypot from IP: ${ip}`);
      return NextResponse.json({ success: true });
    }

    const candidateName = (formData.get("candidateName") as string) || "";
    const candidatePhone = (formData.get("candidatePhone") as string) || "";
    const candidateEmail = (formData.get("candidateEmail") as string) || "";
    const jobRole = (formData.get("jobRole") as string) || "maitre-hotel";
    const experienceYears = (formData.get("experienceYears") as string) || "1-3";
    const rawMessage = (formData.get("message") as string) || "";
    const cvFile = formData.get("cvFile") as File | null;

    // 3. Strict Input Sanitization & Bounds Checking
    const safeName = sanitizeHeader(candidateName).slice(0, 120);
    const safePhone = sanitizeHeader(candidatePhone).slice(0, 30);
    const safeEmail = sanitizeHeader(candidateEmail).slice(0, 120);
    const safeMessage = rawMessage.slice(0, 2500);

    if (!safeName || safeName.length < 2) {
      return NextResponse.json(
        { error: "Veuillez renseigner un nom et prénom valides." },
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

    // 4. File Upload Security & Validation
    const attachments = [];
    if (cvFile && cvFile.size > 0 && typeof cvFile.arrayBuffer === "function") {
      if (cvFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Le fichier du CV est trop volumineux. La taille maximale autorisée est de 10 Mo." },
          { status: 400 }
        );
      }

      const lowerName = cvFile.name.toLowerCase();
      const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
      if (!hasValidExt) {
        return NextResponse.json(
          { error: "Format de fichier non autorisé. Veuillez joindre un document PDF ou Word (.pdf, .doc, .docx)." },
          { status: 400 }
        );
      }

      // Check MIME type if present
      if (cvFile.type && !ALLOWED_MIME_TYPES.has(cvFile.type) && cvFile.type !== "application/octet-stream") {
        return NextResponse.json(
          { error: "Type de document non valide. Veuillez joindre un PDF ou Word légitime." },
          { status: 400 }
        );
      }

      const safeFileNameClean = sanitizeFileName(cvFile.name);
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      attachments.push({
        filename: safeFileNameClean,
        content: buffer,
      });
    }

    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const user = process.env.SMTP_USER || "contact@dz-catering.com";
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_EMAIL || "contact@dz-catering.com";

    if (!host || !pass) {
      console.warn("SMTP configuration is incomplete. Simulating recruitment email send.");
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Simulation réussie.",
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const roleLabel = JOB_ROLE_LABELS[jobRole] || "Personnel de Réception";
    const expLabel = EXP_LABELS[experienceYears] || "Expérience confirmée";

    // 5. Strict HTML Escaping against Stored XSS / Injection
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>Nouvelle Candidature - DZ CATERING</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f5f2; margin: 0; padding: 20px; color: #222; }
        .card { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e8e2d8; }
        .header { background: linear-gradient(135deg, #63002e 0%, #3a001b 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .logo-title { font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #d4af37; margin: 0; font-family: serif; }
        .header-sub { font-size: 13px; color: #f2e6ce; margin-top: 6px; letter-spacing: 1px; text-transform: uppercase; }
        .content { padding: 30px 24px; }
        .badge-recruitment { display: inline-block; background-color: #d4af37; color: #3a001b; font-weight: bold; font-size: 11px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
        .section-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #63002e; font-weight: 700; border-bottom: 2px solid #f2e6ce; padding-bottom: 6px; margin-top: 24px; margin-bottom: 14px; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #f0eee9; }
        .info-table td.label { font-weight: 600; color: #666; width: 38%; }
        .info-table td.value { font-weight: 500; color: #111; }
        .highlight { color: #63002e; font-weight: bold; }
        .footer { background: #fdfbf7; padding: 20px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 class="logo-title">EURL DZ CATERING</h1>
          <div class="header-sub">Direction des Ressources Humaines</div>
        </div>
        <div class="content">
          <div style="text-align: right;">
            <span class="badge-recruitment">Candidature Vérifiée</span>
          </div>

          <div class="section-title">Informations sur le Candidat</div>
          <table class="info-table">
            <tr>
              <td class="label">Nom & Prénom :</td>
              <td class="value highlight">${escapeHtml(safeName)}</td>
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

          <div class="section-title">Profil & Compétences</div>
          <table class="info-table">
            <tr>
              <td class="label">Poste Visé :</td>
              <td class="value highlight">${escapeHtml(roleLabel)}</td>
            </tr>
            <tr>
              <td class="label">Niveau d'Expérience :</td>
              <td class="value">${escapeHtml(expLabel)}</td>
            </tr>
            <tr>
              <td class="label">Pièce Jointe (CV) :</td>
              <td class="value">${attachments.length > 0 ? `📎 <strong>${escapeHtml(attachments[0].filename)}</strong> (joint à cet e-mail)` : "Aucun fichier CV joint"}</td>
            </tr>
          </table>

          ${safeMessage ? `
            <div class="section-title">Références & Établissements Précédents</div>
            <div style="background: #faf8f5; border: 1px solid #ebd9c3; border-radius: 8px; padding: 12px; font-size: 13px; line-height: 1.5;">
              ${escapeHtml(safeMessage).replace(/\n/g, "<br>")}
            </div>
          ` : ""}
        </div>
        <div class="footer">
          Candidature reçue depuis l'Espace Recrutement de <a href="https://dz-catering.com" style="color: #63002e; text-decoration: none;">DZ CATERING</a>. (IP: ${escapeHtml(ip)})
        </div>
      </div>
    </body>
    </html>
    `;

    const replyTo = safeEmail && isValidEmail(safeEmail) ? safeEmail : user;

    await transporter.sendMail({
      from: `"DZ CATERING Recrutement" <${user}>`,
      to: toEmail,
      replyTo,
      subject: `💼 Candidature : ${safeName} - ${roleLabel}`,
      text: `Nouvelle candidature de ${safeName}\nTéléphone : ${safePhone}\nPoste : ${roleLabel}\nExpérience : ${expLabel}`,
      html: htmlContent,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error sending recruitment email via SMTP:", err);
    return NextResponse.json(
      { error: err.message || "Erreur interne lors de l'envoi de la candidature." },
      { status: 500 }
    );
  }
}
