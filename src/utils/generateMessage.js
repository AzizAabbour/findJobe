/**
 * Dynamic message generator for applications and follow-ups in French
 */

export const generateApplicationMessage = ({
  applicant = {},
  job = {},
  company = {}
}) => {
  const name = applicant.fullName || 'Abdelaziz Aabbour';
  const title = job.title || 'Développeur Full Stack Web';
  const companyName = company.name || job.companyName || 'votre entreprise';
  const diploma = applicant.diploma || 'Développement Digital (Option Web Full Stack)';
  const education = applicant.education || 'OFPPT / ISTA';
  const skillsList = (applicant.skills && applicant.skills.length > 0)
    ? applicant.skills.join(', ')
    : 'React.js, JavaScript, Laravel, PHP, MySQL, REST APIs, Git, Docker';

  const portfolio = applicant.portfolio ? `\n- Portfolio : ${applicant.portfolio}` : '';
  const github = applicant.github ? `\n- GitHub : ${applicant.github}` : '';
  const linkedin = applicant.linkedin ? `\n- LinkedIn : ${applicant.linkedin}` : '';

  return `Madame, Monsieur l'équipe recrutement de ${companyName},

C'est avec un grand enthousiasme que je vous adresse ma candidature pour le poste de "${title}" au sein de ${companyName}.

Titulaire d'un diplôme en ${diploma} à ${education}, j'ai développé de solides compétences dans la conception et l'implémentation d'applications web modernes et performantes.

Mon profil technique s'articule autour des technologies clés suivantes :
${skillsList}.

Passionné par l'écosystème web et les architectures modernes (React en frontend et Laravel / PHP / Node.js en backend), je suis particulièrement motivé par les projets innovants menés par ${companyName}. Mon parcours axé sur la pratique me permet d'être rapidement opérationnel et de m'intégrer efficacement à votre équipe technique.

Vous trouverez ci-joint mon Curriculum Vitae détaillant mes réalisations académiques et projets personnels :${portfolio}${github}${linkedin}

Je reste à votre entière disposition pour convenir d'un entretien afin d'échanger plus en détail sur ma motivation et mes compétences.

Dans cette attente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

Cordialement,

${name}
${applicant.phone ? `Tél : ${applicant.phone}` : ''}
${applicant.email ? `Email : ${applicant.email}` : ''}
${applicant.city ? `Ville : ${applicant.city}, Maroc` : ''}`.trim();
};

export const generateFollowUpMessage = ({
  applicant = {},
  application = {},
  job = {},
  company = {}
}) => {
  const name = applicant.fullName || 'Abdelaziz Aabbour';
  const jobTitle = job.title || application.jobTitle || 'Développeur Web Full Stack';
  const companyName = company.name || application.companyName || 'votre entreprise';
  const sentDate = application.sentDate ? `du ${application.sentDate}` : 'récente';

  return `Madame, Monsieur l'équipe recrutement de ${companyName},

Je me permets de revenir vers vous concernant ma candidature ${sentDate} pour le poste de "${jobTitle}" au sein de ${companyName}.

Toujours vivement intéressé par l'opportunité de rejoindre vos équipes et de contribuer au succès technique de vos plateformes avec mes compétences en React.js, Laravel et développement Full Stack, je souhaitais m'assurer de la bonne réception de mon dossier.

Je reste à votre entière disposition pour tout complément d'information ou pour planifier un premier échange.

Je vous remercie par avance pour l'attention portée à mon profil.

Bien cordialement,

${name}
${applicant.phone ? `Tél : ${applicant.phone}` : ''}
${applicant.email ? `Email : ${applicant.email}` : ''}`.trim();
};
