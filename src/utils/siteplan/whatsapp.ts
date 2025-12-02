import type { Project, Unit } from '@/src/types/siteplan/models';
import { getProjectKind } from './visuals';

/**
 * Generate WhatsApp booking message based on project type.
 *
 * - Borneo: "Halo, saya mau booking kavling [Commodity] [Unit Number] di Pring Land Borneo"
 * - Jogja:  "Halo, saya mau booking unit [Livestock Type] [Unit Number] di Pring Land Jogja"
 * - Patuk:  "Halo, saya mau booking unit [Livestock Type] [Unit Number] di Pring Land Patuk"
 *
 * (Requirements 5.3, 5.4, 5.5, 29.6 / Property 45)
 */
export const generateWhatsAppMessage = (unit: Unit, project: Project): string => {
  const kind = getProjectKind(project);
  const unitNumber = unit.unitNumber || '';

  if (kind === 'borneo') {
    const commodity = unit.commodityType || 'Unit';
    return `Halo, saya mau booking kavling ${commodity} ${unitNumber} di Pring Land Borneo`;
  }

  if (kind === 'jogja') {
    const livestock = unit.livestockType || 'Unit';
    return `Halo, saya mau booking unit ${livestock} ${unitNumber} di Pring Land Jogja`;
  }

  if (kind === 'patuk') {
    const livestock = unit.livestockType || 'Unit';
    return `Halo, saya mau booking unit ${livestock} ${unitNumber} di Pring Land Patuk`;
  }

  // Generic fallback for future projects (keeps UX working even if not one of the three main ones)
  const projectName = project.name || 'Pring Land';
  return `Halo, saya mau booking unit ${unitNumber} di ${projectName}`;
};

/**
 * Open WhatsApp with a pre-filled booking message.
 *
 * - Uses whatsapp:// URL to attempt opening native app first
 * - Falls back to web.whatsapp.com if the app is not available
 *
 * (Requirements 5.2, 5.6, 19.4, 29.5)
 */
export const openWhatsAppBooking = (unit: Unit, project: Project): void => {
  const message = generateWhatsAppMessage(unit, project);

  const envNumber =
    (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ||
    (import.meta as any).env?.VITE_WHATSAPP_NUMBER;

  const phoneNumber = (envNumber || '').replace(/[^0-9]/g, '');

  if (!phoneNumber) {
    // eslint-disable-next-line no-console
    console.warn(
      '[WhatsApp] VITE_WHATSAPP_NUMBER is not set. Falling back to generic WhatsApp URL.',
    );
  }

  const targetNumber = phoneNumber || '';
  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = targetNumber
    ? `whatsapp://send?phone=${targetNumber}&text=${encodedMessage}`
    : `whatsapp://send?text=${encodedMessage}`;

  // Requirement 19.4: fallback to web.whatsapp.com
  const webWhatsappUrl = targetNumber
    ? `https://web.whatsapp.com/send?phone=${targetNumber}&text=${encodedMessage}`
    : `https://web.whatsapp.com/send?text=${encodedMessage}`;

  try {
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Fallback after 2 seconds if app did not open (best-effort approach)
    window.setTimeout(() => {
      window.open(webWhatsappUrl, '_blank', 'noopener,noreferrer');
    }, 2000);
  } catch {
    window.open(webWhatsappUrl, '_blank', 'noopener,noreferrer');
  }
};