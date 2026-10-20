function toggleMenu() {
  const menu = document.getElementById('mobileMenu')
  menu.classList.toggle('open')
}

/* ============================================================
   PROJECTS
   To add a project, copy one of the objects below and fill it in.

   title         Project name
   featured      true = big dark card at the top (use for your best one)
   status        'live' or 'in-progress'
   tags          Short tech labels, e.g. ['AWS', 'Terraform']
   description   One or two sentences about what it is
   architecture  The request flow, left to right, e.g.
                 ['Route 53', 'CloudFront', 'ALB', 'ECS Fargate', 'RDS']
                 Leave it as [] to hide the diagram.
   details       Up to three { label, text } blocks
   links         { live: 'https://...', github: 'https://github.com/...' }
                 Leave either one out to hide that button.
   ============================================================ */
const projects = [
  {
    title: 'Sabi Talk',
    featured: true,
    status: 'live',
    tags: ['AWS', 'Docker', 'Linux'],
    description: 'A Duolingo-style app for learning traditional Nigerian languages. Built to preserve culture through technology.',
    architecture: [],
    details: [
      { label: 'Role', text: 'Cloud Engineer' },
      { label: 'What I handled', text: 'I set up the infrastructure, got the app deployed and running, and worked with AWS to handle the cloud side of the project.' },
      { label: 'What I learned', text: 'I got more comfortable with cloud infrastructure and the challenges of deploying and maintaining applications at scale.' },
    ],
    links: { live: 'https://sabitalk.com' },
  },
  {
    title: 'The Good Dump',
    status: 'live',
    tags: ['Node.js', 'MongoDB', 'JavaScript', 'Render'],
    description: 'A simple journaling app I built because sometimes you just need somewhere to dump your thoughts.',
    architecture: [],
    details: [
      { label: 'Role', text: 'Full-Stack Developer' },
      { label: 'Why I built it', text: 'I just wanted somewhere to dump my thoughts. Nothing complicated.' },
      { label: 'What I learned', text: 'I’m getting more comfortable with building the backend side of an application, working with data, connecting the different parts of the app, and figuring things out when something inevitably refuses to work.' },
    ],
    links: { live: 'https://thegooddump.netlify.app' },
  },
  {
    title: 'FitPic',
    status: 'live',
    tags: ['Program Management'],
    description: 'A fashion discovery app that helps users find, save and organize outfit inspiration.',
    architecture: [],
    details: [
      { label: 'Role', text: 'COO & Program Manager' },
      { label: 'What I handle', text: 'Planning, coordinating the team, and keeping things moving.' },
      { label: "What I'm learning", text: "I'm learning that having a good idea is one thing. Figuring out how to actually build it is a whole other thing." },
    ],
    links: { live: 'https://postfitpic.com' },
  },
]

/* ============================================================
   CERTIFICATIONS
   status   'done' or 'in-progress'
   icon     Any Font Awesome icon class (fontawesome.com/icons)
   url      Optional link to the credential
   ============================================================ */
const certifications = [
  {
    name: 'Diploma in Cloud Engineering',
    issuer: 'AltSchool Africa',
    year: '2025',
    status: 'done',
    icon: 'fa-solid fa-cloud',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '',
    status: 'in-progress',
    icon: 'fa-brands fa-aws',
  },
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    year: '',
    status: 'in-progress',
    icon: 'fa-brands fa-aws',
  },
  {
    name: 'CCNA',
    issuer: 'Cisco',
    year: '',
    status: 'in-progress',
    icon: 'fa-solid fa-network-wired',
  },
]

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderProject(project) {
  const tags = project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')

  const badges = [
    project.featured ? '<span class="badge badge-featured">Featured</span>' : '',
    project.status === 'in-progress' ? '<span class="badge badge-progress">In progress</span>' : '',
  ].join('')

  const architecture = project.architecture && project.architecture.length
    ? `<div class="project-arch">
         <p class="detail-label">Architecture</p>
         <ol class="arch-flow">
           ${project.architecture.map(step => `<li><span class="arch-step">${escapeHtml(step)}</span></li>`).join('')}
         </ol>
       </div>`
    : ''

  const details = project.details.map(detail => `
    <div class="project-detail">
      <p class="detail-label">${escapeHtml(detail.label)}</p>
      <p>${escapeHtml(detail.text)}</p>
    </div>`).join('')

  const links = project.links || {}
  const buttons = [
    links.live ? `<a href="${escapeHtml(links.live)}" target="_blank" rel="noopener" class="project-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live site</a>` : '',
    links.github ? `<a href="${escapeHtml(links.github)}" target="_blank" rel="noopener" class="project-link"><i class="fa-brands fa-github"></i> GitHub</a>` : '',
  ].join('')

  return `
    <article class="project-card${project.featured ? ' project-featured' : ''}">
      ${badges ? `<div class="project-badges">${badges}</div>` : ''}
      <div class="project-header">
        <h3>${escapeHtml(project.title)}</h3>
        <div class="project-tags">${tags}</div>
      </div>
      <p class="project-description">${escapeHtml(project.description)}</p>
      ${architecture}
      <div class="project-details">${details}</div>
      ${buttons ? `<div class="project-links">${buttons}</div>` : ''}
    </article>`
}

function renderCertification(cert) {
  const meta = [cert.issuer, cert.year].filter(Boolean).map(escapeHtml).join(' · ')
  const status = cert.status === 'in-progress'
    ? '<span class="badge badge-progress">In progress</span>'
    : '<span class="badge badge-done">Completed</span>'
  const tag = cert.url ? 'a' : 'div'
  const href = cert.url ? ` href="${escapeHtml(cert.url)}" target="_blank" rel="noopener"` : ''

  return `
    <${tag} class="cert-card"${href}>
      <span class="cert-icon"><i class="${escapeHtml(cert.icon)}"></i></span>
      <div class="cert-text">
        <h4>${escapeHtml(cert.name)}</h4>
        <p>${meta}</p>
        ${status}
      </div>
    </${tag}>`
}

const projectList = document.getElementById('projectList')
if (projectList) {
  // Featured projects always go first
  const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
  projectList.innerHTML = ordered.map(renderProject).join('')
}

const certList = document.getElementById('certList')
if (certList) {
  certList.innerHTML = certifications.map(renderCertification).join('')
}

/* ============================================================
   SCROLL ANIMATIONS
   Elements fade and slide up as they come into view.
   ============================================================ */
const revealSelectors = [
  '.section-tag', '.section-headline', '.sub-headline',
  '.explore-card', '.project-card', '.thinking-card', '.thinking-item',
  '.collage-img', '.quote-text', '.book-cover', '.timeline-item',
  '.cert-card', '.contact-link',
]

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll(revealSelectors.join(',')).forEach(el => {
    // Stagger siblings slightly so grids ripple in instead of popping at once
    const index = Array.prototype.indexOf.call(el.parentElement.children, el)
    el.style.setProperty('--reveal-delay', `${Math.min(index, 6) * 70}ms`)
    el.classList.add('reveal')
    observer.observe(el)
  })
}
