/**
 * TCM Japanimation — RGPD / Consentement cookies
 * Privacy by design: stockage localStorage minimal, pas de tracking tiers.
 */

'use strict';

const CONSENT_KEY = 'tcm_cookie_consent';
const CONSENT_VERSION = '1';

function getConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.version !== CONSENT_VERSION) return null;
    return data;
  } catch {
    return null;
  }
}

function saveConsent(accepted) {
  const data = {
    version:   CONSENT_VERSION,
    accepted,
    timestamp: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
  } catch {
    // Mode privé ou quota dépassé — on ignore silencieusement
  }
}

function showBanner() {
  const banner = document.getElementById('rgpd-banner');
  if (!banner) return;

  banner.hidden = false;

  document.getElementById('rgpd-accept')?.addEventListener('click', () => {
    saveConsent(true);
    banner.hidden = true;
  });

  document.getElementById('rgpd-refuse')?.addEventListener('click', () => {
    saveConsent(false);
    banner.hidden = true;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const consent = getConsent();
  if (!consent) showBanner();
});
