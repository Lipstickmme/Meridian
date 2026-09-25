'use strict';

/**
 * A real page for every project and every discipline.
 *
 * These used to be one shell page each, filled in by the browser from the API.
 * That works, but it means a crawler, a link preview or a visitor with a slow
 * connection sees "Loading project…" and nothing else, and the page has no
 * title of its own until JavaScript has run. So each project and each service
 * is rendered to its own static file at build time — `/projects/pier-j-berth`
 * is a document, not a route — while `project.html` and `service.html` stay
 * behind as the fallback for an id that was added to the data after the last
 * build.
 */

const projects = require('../data/projects.json');
const services = require('../data/services.json');

const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

/** One line of plain text for <meta name="description">. */
const summarise = (s, max = 180) => {
  const flat = String(s || '').replace(/\s+/g, ' ').trim();
  return esc(flat.length > max ? `${flat.slice(0, max - 1).trimEnd()}…` : flat);
};

/* The gallery under the fold: the two or three frames that show the job being
   done rather than the finished elevation. */
function gallery(items, label) {
  if (!items || !items.length) return '';
  return `
  <section class="section-pad gallery-band">
    <div class="wrap">
      <div class="section-head" data-reveal>
        <span class="eyebrow">On site</span>
        <h2>${esc(label)}</h2>
      </div>
      <div class="gallery-grid">
        ${items.map((g, i) => `
        <figure class="gallery-item${i === 0 && items.length > 2 ? ' is-wide' : ''}" data-reveal>
          <img src="${esc(g.src)}" alt="${esc(g.caption || '')}" loading="lazy" decoding="async" />
          ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ''}
        </figure>`).join('')}
      </div>
    </div>
  </section>`;
}

function ctaBand(heading, line) {
  return `
  <section class="cta-band">
    <div class="wrap cta-inner" data-reveal>
      <h2>${esc(heading)}</h2>
      <p>${esc(line)}</p>
      <a href="/contact" class="btn">Talk to an engineer <span class="arw">&rsaquo;</span></a>
    </div>
  </section>`;
}

/* ---------------------------------------------------------------- project --- */

function projectContent(project, next) {
  const facts = (project.facts || [])
    .map((f) => `<div class="fact"><span class="k">${esc(f.k)}</span><span class="v">${esc(f.v)}</span></div>`)
    .join('');
  const used = (project.services || [])
    .map((s) => {
      const svc = services.find((x) => x.title === s);
      return svc
        ? `<a href="/services/${esc(svc.id)}">${esc(s)}</a>`
        : `<span>${esc(s)}</span>`;
    })
    .join('');

  return `
  <article id="project-detail" class="project-detail">
    <header class="page-header project-hero">
      <div class="wrap page-header-grid">
        <div class="page-header-copy">
          <span class="eyebrow">${esc(project.sector)} project</span>
          <h1 data-reveal>${esc(project.name)}</h1>
          <p class="project-lede" data-reveal>${esc(project.blurb)}</p>
          <div class="meta-row">
            <span class="sector" data-sector="${esc(project.sector)}">${esc(project.location)}</span>
            <span>${esc(project.status || project.year)}</span>
            ${project.client ? `<span>Client: ${esc(project.client)}</span>` : ''}
            ${project.duration ? `<span>${esc(project.duration)}</span>` : ''}
          </div>
        </div>
        <figure class="figure page-header-figure" data-reveal>
          <img src="${esc(project.image)}" alt="${esc(project.name)}" decoding="async" />
          <figcaption class="figure-metric"><b>${esc(project.metric)}</b><span>${esc(project.metricLabel)}</span></figcaption>
        </figure>
      </div>
    </header>

    <section class="project-body">
      <div class="wrap project-cols">
        <div class="overview" data-reveal>
          <p>${esc(project.overview || project.blurb)}</p>
          ${used ? `<div class="project-services">${used}</div>` : ''}
        </div>
        <aside data-reveal>
          <div class="project-facts">${facts}</div>
        </aside>
      </div>
    </section>
${gallery(project.gallery, 'How it went together.')}
    <nav class="project-next">
      <div class="wrap">
        <a href="/projects/${esc(next.id)}">
          <span><span class="lbl">Next project</span><br><span class="nm">${esc(next.name)}</span></span>
          <span class="arw">&rsaquo;</span>
        </a>
      </div>
    </nav>
${ctaBand('Have a project like this?', 'Tell us what you are building and the part of it that worries you.')}
  </article>`;
}

/* ---------------------------------------------------------------- service --- */

function serviceCard(p) {
  return `
      <a class="card" href="/projects/${esc(p.id)}" data-reveal>
        <div class="thumb"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" /></div>
        <div class="card-body">
          <div class="meta"><span class="sector" data-sector="${esc(p.sector)}">${esc(p.sector)}</span><span>${esc(p.year)}</span></div>
          <h3>${esc(p.name)}</h3>
          <div class="loc">${esc(p.location)}</div>
          <p>${esc(p.blurb)}</p>
          <div class="metric"><b>${esc(p.metric)}</b><span>${esc(p.metricLabel)}</span></div>
        </div>
      </a>`;
}

function serviceContent(service) {
  const related = projects.filter((p) => (p.services || []).includes(service.title)).slice(0, 3);

  return `
  <article id="service-detail" class="service-detail">
    <header class="page-header">
      <div class="wrap page-header-grid">
        <div class="page-header-copy">
          <span class="eyebrow">${esc(service.code)} / Services</span>
          <h1 data-reveal>${esc(service.title)}</h1>
          <p data-reveal>${esc(service.lede || service.summary)}</p>
        </div>
        <figure class="figure page-header-figure" data-reveal>
          <img src="${esc(service.image)}" alt="${esc(service.title)}" decoding="async" />
        </figure>
      </div>
    </header>

    <section class="section-pad">
      <div class="wrap project-cols">
        <div class="overview" data-reveal>
          ${(service.body || [service.summary]).map((para) => `<p>${esc(para)}</p>`).join('\n          ')}
        </div>
        <aside data-reveal>
          <div class="project-facts">
            ${(service.deliverables || []).map((d) => `<div class="fact"><span class="k">Deliverable</span><span class="v">${esc(d)}</span></div>`).join('\n            ')}
          </div>
          <div class="project-services">
            ${(service.capabilities || []).map((c) => `<span>${esc(c)}</span>`).join('')}
          </div>
        </aside>
      </div>
    </section>
${gallery(service.gallery, 'What it looks like in the field.')}
    ${related.length ? `
    <section class="section-pad alt">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Where it shows</span>
          <h2>Projects carrying this discipline.</h2>
        </div>
        <div class="cards-grid">${related.map(serviceCard).join('')}</div>
      </div>
    </section>` : ''}
${ctaBand('Need this on a project?', 'Send the drawing set or a paragraph about the site and a principal engineer will come back to you.')}
  </article>`;
}

/* ------------------------------------------------------------------ pages --- */

/** Page definitions for every project, in the order they are listed. */
function projectPages() {
  return projects.map((project, i) => {
    const next = projects[(i + 1) % projects.length];
    return {
      file: `projects/${project.id}.html`,
      active: 'projects',
      bodyClass: 'page-project',
      title: `${project.name} | Meridian Constructions`,
      description: summarise(`${project.blurb} ${project.location}, ${project.status || project.year}.`),
      content: projectContent(project, next),
    };
  });
}

/** Page definitions for every discipline. */
function servicePages() {
  return services.map((service) => ({
    file: `services/${service.id}.html`,
    active: 'services',
    bodyClass: 'page-service',
    title: `${service.title} | Meridian Constructions`,
    description: summarise(service.summary),
    content: serviceContent(service),
  }));
}

module.exports = { projectPages, servicePages };
