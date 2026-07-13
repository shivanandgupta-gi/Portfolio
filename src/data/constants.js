export const personal = {
  name: 'Shivanand Gupta',
  title: 'Software Engineer',
  tagline: 'Building digital experiences that make an impact.',
  email: 'shivanandgupta316@gmail.com',
  phone: '+91 12345 67890',
  location: 'India',
  resumeUrl: 'https://drive.google.com/uc?export=download&id=1GsVOCpL7-jFMVHE10QlB408H4nKIg0cL',
};

export const socials = [
  { platform: 'GitHub', url: 'https://github.com/shiva', icon: 'ph ph-github-logo' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/shiva', icon: 'ph ph-linkedin-logo' },
  { platform: 'Twitter', url: 'https://twitter.com/shiva', icon: 'ph ph-x-logo' },
];

export const navItems = [
  { id: 'about', label: 'About', num: '01' },
  { id: 'skills', label: 'Skills', num: '02' },
  { id: 'experience', label: 'Experience', num: '03' },
  { id: 'projects', label: 'Projects', num: '04' },
  { id: 'education', label: 'Education', num: '05' },
  { id: 'contact', label: 'Contact', num: '06' },
];

export const sectionIds = navItems.map((n) => n.id);
