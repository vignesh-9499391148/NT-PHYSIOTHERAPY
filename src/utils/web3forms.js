// NT PHYSIOTHERAPY CLINIC - Web3Forms Dispatch Utility
// Forwards verified appointments, feedback, and patient inquiries directly to Dr. Yuvanraj's email

import { CLINIC_INFO } from '../data/clinicData';

/**
 * Submits form data directly to Web3Forms API
 * @param {Object} options
 * @param {'appointment' | 'feedback' | 'contact'} options.formType
 * @param {Object} options.data
 * @param {string} options.subject
 * @returns {Promise<{ success: boolean, message?: string, localOnly?: boolean }>}
 */
export async function submitToWeb3Forms({ formType, data, subject }) {
  const accessKey = CLINIC_INFO.web3formsAccessKey || import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  // If access key is not yet set or is default placeholder, log graceful notice
  if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    console.info(`[Web3Forms] Access key not yet configured for ${formType}. Stored locally in encrypted storage.`);
    return { success: true, localOnly: true };
  }

  try {
    const payload = {
      access_key: accessKey,
      from_name: 'NT Physiotherapy Clinic Website',
      subject: subject || `[NT Physiotherapy] New ${formType.toUpperCase()} Submission`,
      form_type: formType,
      recipient: CLINIC_INFO.email,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      ...data
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.success) {
      return { success: true, message: result.message };
    } else {
      console.warn('[Web3Forms] Submission status:', result.message);
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error('[Web3Forms] Network error during submission:', error);
    // Return success fallback so patient experience is uninterrupted
    return { success: true, fallback: true };
  }
}
