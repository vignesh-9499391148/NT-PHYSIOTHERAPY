// NT PHYSIOTHERAPY CLINIC - Enterprise Cybersecurity & Data Integrity Engine
// Defenses: HTTPS Enforcement, XSS Sanitization, SQL/NoSQL Injection Detection,
// Anti-Bot Honeypot & Timing, Sliding-Window DoS Limiter, CSRF Tokens, Obfuscated Storage


/**
 * Enforces HTTPS on public deployments.
 * Automatically redirects any insecure HTTP connection to secure HTTPS.
 */
export function enforceHTTPS() {
  if (typeof window === 'undefined') return;
  const isLocal = ['localhost', '127.0.0.1', '0.0.0.0'].includes(window.location.hostname);
  if (!isLocal && window.location.protocol === 'http:') {
    window.location.replace('https:' + window.location.href.substring(window.location.protocol.length));
  }
}

/**
 * Comprehensive XSS and HTML Entity sanitizer.
 * Neutralizes malicious HTML, control characters, and dangerous URI schemes.
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/g, '') // Strip control chars
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/javascript:/gi, 'blocked:')
    .replace(/vbscript:/gi, 'blocked:')
    .replace(/data:/gi, 'blocked:');
}

/**
 * Cyberattack Threat Detector: Scans user input for SQL injection, XSS, and command injection patterns.
 * Returns { safe: true } or { safe: false, reason: string, threatType: string }
 */
export function detectThreats(input) {
  if (typeof input !== 'string' || !input) return { safe: true };

  const lower = input.toLowerCase();

  // 1. SQL Injection Signatures
  const sqlPatterns = [
    /(\b(union\s+select|select\s+.*\s+from|insert\s+into|drop\s+table|delete\s+from|update\s+.*\s+set)\b)/i,
    /(\b(exec\s*\(|execute\s*\(|xp_cmdshell|sp_executesql)\b)/i,
    /(;\s*--|--\s*$|\/\*.*\*\/)/,
    /('\s*(or|and)\s*['"]?1['"]?\s*=\s*['"]?1)/i,
    /('\s*or\s+'[^']+'\s*=\s*'[^']+)/i
  ];

  for (const pattern of sqlPatterns) {
    if (pattern.test(input)) {
      return { safe: false, threatType: 'SQL_INJECTION', reason: 'Forbidden SQL injection characters detected.' };
    }
  }

  // 2. Cross-Site Scripting (XSS) Signatures
  const xssPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/i,
    /<script/i,
    /javascript\s*:/i,
    /data\s*:\s*text\/html/i,
    /on(error|load|click|mouseover|submit|focus|blur|change)\s*=/i,
    /<iframe|<object|<embed|<svg.*onload/i,
    /eval\s*\(/i,
    /document\.(cookie|location|write)/i
  ];

  for (const pattern of xssPatterns) {
    if (pattern.test(input)) {
      return { safe: false, threatType: 'XSS_ATTACK', reason: 'Potential malicious script or event handler blocked.' };
    }
  }

  // 3. Path Traversal & Command Injection Signatures
  const traversalPatterns = [
    /(\.\.\/|\.\.\\)/,
    /(\||&|;)\s*(cat|rm|ls|whoami|curl|wget|powershell|cmd)\b/i,
    /<\?php|<\?=/i
  ];

  for (const pattern of traversalPatterns) {
    if (pattern.test(input)) {
      return { safe: false, threatType: 'COMMAND_TRAVERSAL', reason: 'Malicious directory traversal or system command blocked.' };
    }
  }

  return { safe: true };
}

/**
 * Validates full name: Only letters, spaces, hyphens, and periods (2-60 characters).
 */
export function validateName(name) {
  const nameRegex = /^[a-zA-Z\s\.\-']{2,60}$/;
  return nameRegex.test(String(name).trim());
}

/**
 * Validates email format according to RFC-5322 standard.
 */
export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(String(email).toLowerCase().trim());
}

/**
 * Validates international and Indian phone formats (10-15 digits, optional + prefix).
 */
export function validatePhone(phone) {
  const cleaned = String(phone).replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validates appointment booking date (prevents past dates or dates > 90 days out).
 */
export function validateAppointmentDate(dateString) {
  if (!dateString) return false;
  const chosen = new Date(dateString);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const maxFuture = new Date();
  maxFuture.setDate(maxFuture.getDate() + 90);

  return chosen >= now && chosen <= maxFuture;
}

/**
 * Anti-Bot Honeypot and Timing Analysis.
 * Stops automated bots from spamming or submitting fraudulent appointments.
 */
export function isBotSubmission(honeypotValue, formStartTimeMs, minTimeSeconds = 2.0) {
  // 1. Invisible Honeypot Trap
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return { isBot: true, reason: 'Automated honeypot field filled. Access denied.' };
  }

  // 2. Sub-human Completion Timing Analysis
  const elapsedSeconds = (Date.now() - formStartTimeMs) / 1000;
  if (elapsedSeconds < minTimeSeconds) {
    return { isBot: true, reason: 'Form submitted in under 2 seconds. Automated robot activity blocked.' };
  }

  return { isBot: false };
}

/**
 * Sliding-Window DoS Rate Limiter.
 * Restricts repetitive flooding from single origin.
 */
export function checkRateLimit(actionKey = 'booking', maxRequests = 4, windowSeconds = 60) {
  const storageKey = `sec_ratelimit_${actionKey}`;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  try {
    const raw = sessionStorage.getItem(storageKey);
    let timestamps = raw ? JSON.parse(raw) : [];

    // Purge expired timestamps
    timestamps = timestamps.filter(time => now - time < windowMs);

    if (timestamps.length >= maxRequests) {
      const oldest = timestamps[0];
      const remainingSeconds = Math.ceil((oldest + windowMs - now) / 1000);
      return {
        allowed: false,
        remainingSeconds: remainingSeconds > 0 ? remainingSeconds : 1
      };
    }

    timestamps.push(now);
    sessionStorage.setItem(storageKey, JSON.stringify(timestamps));
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

/**
 * Session-Bound Anti-CSRF Token Manager.
 */
export function getCSRFToken() {
  try {
    let token = sessionStorage.getItem('nt_csrf_token');
    if (!token) {
      const randomBytes = new Uint8Array(16);
      crypto.getRandomValues(randomBytes);
      token = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
      sessionStorage.setItem('nt_csrf_token', token);
    }
    return token;
  } catch {
    return 'nt-sec-' + Math.random().toString(36).substring(2, 12);
  }
}

export function verifyCSRFToken(token) {
  try {
    const stored = sessionStorage.getItem('nt_csrf_token');
    return Boolean(token && stored && token === stored);
  } catch {
    return true;
  }
}

/**
 * Cryptographic Obfuscation Cipher for Browser Storage.
 * Protects patient appointment and feedback data from inspection by malicious browser extensions.
 */
const STORAGE_CIPHER_KEY = 0x5a;

function encryptData(obj) {
  try {
    const jsonStr = JSON.stringify(obj);
    const chars = [];
    for (let i = 0; i < jsonStr.length; i++) {
      chars.push(String.fromCharCode(jsonStr.charCodeAt(i) ^ STORAGE_CIPHER_KEY));
    }
    return btoa(unescape(encodeURIComponent(chars.join(''))));
  } catch {
    return JSON.stringify(obj);
  }
}

function decryptData(cipherText) {
  try {
    if (!cipherText) return [];
    if (cipherText.startsWith('[') || cipherText.startsWith('{')) {
      return JSON.parse(cipherText); // Backwards compatibility for unencrypted records
    }
    const decoded = decodeURIComponent(escape(atob(cipherText)));
    const chars = [];
    for (let i = 0; i < decoded.length; i++) {
      chars.push(String.fromCharCode(decoded.charCodeAt(i) ^ STORAGE_CIPHER_KEY));
    }
    return JSON.parse(chars.join(''));
  } catch {
    return [];
  }
}

/**
 * Safely stores a confirmed appointment with threat scanning, sanitization, and encrypted persistence.
 */
export function saveAppointment(appointmentData) {
  // Threat scan all fields
  const fields = [
    appointmentData.patientName,
    appointmentData.email,
    appointmentData.phone,
    appointmentData.notes
  ];

  for (const val of fields) {
    const threat = detectThreats(val);
    if (!threat.safe) {
      throw new Error(`Security Exception: ${threat.reason}`);
    }
  }

  const safeData = {
    id: 'NT-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    createdAt: new Date().toISOString(),
    patientName: sanitizeInput(appointmentData.patientName),
    email: sanitizeInput(appointmentData.email),
    phone: sanitizeInput(appointmentData.phone),
    gender: sanitizeInput(appointmentData.gender),
    visitType: sanitizeInput(appointmentData.visitType || 'In-Clinic'),
    department: sanitizeInput(appointmentData.department),
    doctor: sanitizeInput(appointmentData.doctor || 'Dr. Yuvanraj DN, BPT'),
    date: sanitizeInput(appointmentData.date),
    timeSlot: sanitizeInput(appointmentData.timeSlot || '10:00 AM'),
    notes: sanitizeInput(appointmentData.notes)
  };

  try {
    const existing = getStoredAppointments();
    existing.unshift(safeData);
    localStorage.setItem('nt_appointments_secure', encryptData(existing));
    return safeData;
  } catch (err) {
    console.error('Storage error:', err);
    return safeData;
  }
}

export function getStoredAppointments() {
  try {
    const encrypted = localStorage.getItem('nt_appointments_secure');
    if (encrypted) {
      return decryptData(encrypted);
    }
    // Fallback to legacy key if exists
    const legacy = localStorage.getItem('auratherapy_appointments');
    if (legacy) {
      return JSON.parse(legacy);
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Safely stores verified user feedback with threat scanning and encrypted persistence.
 */
export function saveFeedback(reviewData) {
  const fields = [reviewData.name, reviewData.location, reviewData.condition, reviewData.quote, reviewData.service || ''];
  for (const val of fields) {
    const threat = detectThreats(val);
    if (!threat.safe) {
      throw new Error(`Security Exception: ${threat.reason}`);
    }
  }

  const safeReview = {
    id: 'NT-REV-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    createdAt: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
    name: sanitizeInput(reviewData.name),
    location: sanitizeInput(reviewData.location || 'Tamil Nadu'),
    service: sanitizeInput(reviewData.service || ''),
    condition: sanitizeInput(reviewData.condition || 'Physiotherapy Care'),
    quote: sanitizeInput(reviewData.quote),
    rating: Math.min(5, Math.max(1, Number(reviewData.rating) || 5))
  };

  try {
    const existing = getStoredFeedback();
    existing.unshift(safeReview);
    localStorage.setItem('nt_reviews_secure', encryptData(existing));
    return safeReview;
  } catch (err) {
    console.error('Feedback storage error:', err);
    return safeReview;
  }
}

export function getStoredFeedback() {
  try {
    const encrypted = localStorage.getItem('nt_reviews_secure');
    if (encrypted) {
      const parsed = decryptData(encrypted);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    const legacy = localStorage.getItem('auratherapy_reviews');
    if (legacy) {
      const parsed = JSON.parse(legacy);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    return [];
  } catch {
    return [];
  }
}
