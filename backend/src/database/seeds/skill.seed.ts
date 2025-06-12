import { QueryRunner } from 'typeorm';
import { Skill } from '@/api/skill/entities/skill.entity';

export const seedSkills = async (queryRunner: QueryRunner) => {
  const skillRepository = queryRunner.manager.getRepository(Skill);
  const skills = [
    'JavaScript',
    'TypeScript',
    'HTML',
    'CSS',
    'Node.js',
    'React',
    'Angular',
    'Vue.js',
    'Figma',
    'Next.js',
    'NestJS',
    'Express.js',
    'Java',
    'Spring Boot',
    'Python',
    'Django',
    'Flask',
    'C#',
    '.NET',
    'PHP',
    'Laravel',
    'SQL',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'GCP',
    'Git',
    'CI/CD',
    'Jenkins',
    'Linux',
    'REST API',
    'GraphQL',
    'Redis',
    'Firebase',
    'Agile',
    'Scrum',
    'Machine Learning',
    'Deep Learning',
    'Data Science',
    'Data Analysis',
    'Big Data',
    'Hadoop',
    'Spark',
    'TensorFlow',
    'PyTorch',
    'Computer Vision',
    'Natural Language Processing',
    'Cybersecurity',
    'Penetration Testing',
    'DevOps',
    'Terraform',
    'Ansible',
    'Microservices',
    'System Design',
    'Design Patterns',
    'UML',
    'Software Architecture',
    'Clean Code',
    'Test-Driven Development',
    'Unit Testing',
    'Integration Testing',
    'End-to-End Testing',
    'Selenium',
    'Cypress',
    'Playwright',
    'React Native',
    'Flutter',
    'iOS Development',
    'Android Development',
    'Blockchain',
    'Smart Contract',
    'Solidity',
    'Web3.js',
    'Ethical Hacking',
    'Networking',
    'Shell Scripting',
    'Pandas',
    'NumPy',
    'Matplotlib',
    'Jupyter Notebook',
  ];

  const batch: Skill[] = [];

  for (const name of skills) {
    const existing = await queryRunner.manager.findOneBy(Skill, { name });
    if (!existing && !batch.some((skill) => skill.name === name)) {
      batch.push(skillRepository.create({ name }));
    }
  }

  await skillRepository.save(batch);

  console.log('✅ Seeded skills');
};
