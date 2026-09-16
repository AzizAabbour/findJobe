/**
 * Email Service with EmailJS and simulated fallback
 */
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export const isEmailConfigured = () => {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY &&
    SERVICE_ID !== 'your_service_id_here' &&
    PUBLIC_KEY !== 'your_public_key_here');
};

export const emailService = {
  /**
   * Send application email
   */
  sendApplicationEmail: async ({
    applicantName,
    applicantEmail,
    companyName,
    jobTitle,
    applicationMessage,
    portfolioUrl,
    githubUrl,
    linkedinUrl,
    recipientEmail
  }) => {
    const templateParams = {
      applicant_name: applicantName,
      applicant_email: applicantEmail,
      company_name: companyName,
      job_title: jobTitle,
      application_message: applicationMessage,
      portfolio_url: portfolioUrl || 'Non spécifié',
      github_url: githubUrl || 'Non spécifié',
      linkedin_url: linkedinUrl || 'Non spécifié',
      to_email: recipientEmail
    };

    if (isEmailConfigured()) {
      try {
        const response = await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          templateParams,
          PUBLIC_KEY
        );
        return { success: true, mode: 'emailjs', response };
      } catch (error) {
        console.error('[EmailJS Error]', error);
        throw new Error(error.text || "Échec de l'envoi via EmailJS. Vérifiez votre configuration.");
      }
    } else {
      // Graceful simulated delivery when keys are not yet configured in .env
      console.log('[DevApply Simulator] Email prepared with payload:', templateParams);
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        mode: 'simulated',
        message: "Email simulé avec succès (EmailJS n'est pas encore configuré avec des clés réelles dans le fichier .env)."
      };
    }
  },

  /**
   * Send follow-up email
   */
  sendFollowUpEmail: async ({
    applicantName,
    applicantEmail,
    companyName,
    jobTitle,
    followUpMessage,
    recipientEmail
  }) => {
    return emailService.sendApplicationEmail({
      applicantName,
      applicantEmail,
      companyName,
      jobTitle: `Relance: ${jobTitle}`,
      applicationMessage: followUpMessage,
      portfolioUrl: '',
      githubUrl: '',
      linkedinUrl: '',
      recipientEmail
    });
  }
};
