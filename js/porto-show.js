document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementById('project-detail-root');
    const projects = Array.isArray(window.portfolioProjects) ? window.portfolioProjects : [];
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('project');
    const project = projects.find((item) => item.slug === slug);

    if (!root) {
        return;
    }

    if (!project) {
        root.innerHTML = `
            <div class="container detail-shell">
                <div class="detail-card detail-empty">
                    <h1 class="font-montserrat">Project not found</h1>
                    <p>The requested portfolio entry is missing or the URL slug is invalid.</p>
                    <a href="index.html#projects" class="detail-action detail-action-primary">Back to projects</a>
                </div>
            </div>
        `;
        return;
    }

    const category = project.category || 'Portfolio Project';
    const title = project.title || 'Untitled project';
    const summary = project.summary || 'A detailed case study will be added here.';
    const role = project.role || 'Contributor';
    const period = project.period || 'Undated';
    const status = project.status || 'Active';
    const domain = project.domain || category;
    const repoVisibility = project.repoVisibility || (project.repoUrl ? 'Public' : 'Private');
    const liveAccessLabel = project.liveUrl ? getHostnameLabel(project.liveUrl) : 'Private / unpublished';
    const overview = Array.isArray(project.overview) && project.overview.length > 0
        ? project.overview
        : [
            summary,
            `This project sits in the ${String(category).toLowerCase()} category and is presented here as part of the broader portfolio catalog.`
        ];
    const highlights = Array.isArray(project.highlights) && project.highlights.length > 0
        ? project.highlights
        : [
            `Delivered as a ${String(status).toLowerCase()} project.`,
            `Main stack represented by ${(project.tags || []).slice(0, 4).join(', ')}.`,
            `Repository visibility: ${repoVisibility}.`
        ];
    const stack = project.stack && Object.keys(project.stack).length > 0
        ? project.stack
        : {
            'Primary Stack': (project.tags || []).join(', ') || 'Not specified',
            Domain: domain,
            'Repository Type': repoVisibility,
            'Delivery Status': status
        };

    document.title = `${title} - Hafidz Mulia`;

    const screenshots = Array.isArray(project.screenshots) && project.screenshots.length > 0
        ? project.screenshots
        : [
            { title: 'Screenshot Placeholder 1', description: `Add a main interface capture for ${title} later.` },
            { title: 'Screenshot Placeholder 2', description: 'Add an internal workflow, dashboard, or form flow screenshot later.' },
            { title: 'Screenshot Placeholder 3', description: 'Add a mobile view, analytics view, or another supporting screen later.' }
        ];
    const screenshotCountLabel = `${screenshots.length} ${screenshots.length === 1 ? 'screen' : 'screens'}`;
    const firstCaption = getScreenshotCaption(screenshots[0], 0);

    root.innerHTML = `
        <div class="container detail-shell">
            <section class="detail-hero detail-card">
                <div class="detail-hero-main">
                    <p class="detail-eyebrow">${escapeDetailText(category)}</p>
                    <h1 class="detail-title font-montserrat">${escapeDetailText(title)}</h1>
                    <p class="detail-summary">${escapeDetailText(summary)}</p>
                    <div class="detail-chip-row">
                        <span class="detail-chip">${escapeDetailText(period)}</span>
                        <span class="detail-chip">${escapeDetailText(role)}</span>
                        <span class="detail-chip">${escapeDetailText(domain)}</span>
                        <span class="detail-chip">${escapeDetailText(status)}</span>
                    </div>
                    <div class="detail-action-row">
                        <a class="detail-action detail-action-primary" href="index.html#projects">Back to Portfolio</a>
                        ${project.liveUrl ? `<a class="detail-action detail-action-secondary" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Open Live Project</a>` : ''}
                        ${project.repoUrl ? `<a class="detail-action detail-action-secondary" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">Open Repository</a>` : `<span class="detail-action detail-action-secondary detail-action-muted">Repository: ${escapeDetailText(repoVisibility)}</span>`}
                    </div>
                </div>

                <div class="detail-hero-side">
                    <p class="detail-side-label">Project snapshot</p>
                    <div class="detail-stat-grid">
                        ${buildStatItem('Role', role)}
                        ${buildStatItem('Timeline', period)}
                        ${buildStatItem('Repository', repoVisibility)}
                        ${buildStatItem('Live access', liveAccessLabel)}
                    </div>
                </div>
            </section>

            <div class="detail-grid">
                <div class="detail-body">
                    <section class="detail-card">
                        <div class="detail-section-heading">
                            <p class="detail-section-kicker">Narrative</p>
                            <h2 class="font-montserrat">Project overview</h2>
                        </div>
                        <div class="detail-text-block">
                            ${overview.map((paragraph) => `<p>${escapeDetailText(paragraph)}</p>`).join('')}
                        </div>
                    </section>

                    <section class="detail-card">
                        <div class="detail-section-heading detail-section-heading-inline">
                            <div>
                                <p class="detail-section-kicker">Delivery notes</p>
                                <h2 class="font-montserrat">What stands out</h2>
                            </div>
                            <span class="detail-section-count">${escapeDetailText(`${highlights.length} focus points`)}</span>
                        </div>
                        <div class="detail-highlights-grid">
                            ${highlights.map((item, index) => `
                                <article class="detail-note-item">
                                    <span class="detail-note-index">0${index + 1}</span>
                                    <p>${escapeDetailText(item)}</p>
                                </article>
                            `).join('')}
                        </div>
                    </section>

                    <section class="detail-card">
                        <div class="detail-section-heading detail-section-heading-inline">
                            <div>
                                <p class="detail-section-kicker">Visual walkthrough</p>
                                <h2 class="font-montserrat">Screens and product surfaces</h2>
                            </div>
                            <span class="detail-section-count">${escapeDetailText(screenshotCountLabel)}</span>
                        </div>
                        <div class="carousel-shell">
                            <div class="carousel-stage">
                                <div class="carousel-track">
                                    ${screenshots.map((item, index) => {
                                        const caption = getScreenshotCaption(item, index);
                                        return item.image
                                            ? `<div class="carousel-slide${index === 0 ? ' is-active' : ''}" data-caption-title="${escapeDetailText(caption.title)}" data-caption-description="${escapeDetailText(caption.description)}"><img class="carousel-media" src="${item.image}" alt="${escapeDetailText(caption.title)}"></div>`
                                            : `<div class="carousel-slide${index === 0 ? ' is-active' : ''}" data-caption-title="${escapeDetailText(caption.title)}" data-caption-description="${escapeDetailText(caption.description)}"><div class="carousel-placeholder"><div><strong>${escapeDetailText(caption.title)}</strong><p>${escapeDetailText(caption.description)}</p></div></div></div>`;
                                    }).join('')}
                                </div>
                            </div>
                            <div class="carousel-caption-panel">
                                <p class="carousel-caption-kicker">Current screen</p>
                                <h3 class="carousel-caption-title font-montserrat">${escapeDetailText(firstCaption.title)}</h3>
                                <p class="carousel-caption-description">${escapeDetailText(firstCaption.description)}</p>
                            </div>
                            <div class="carousel-controls">
                                <div class="carousel-buttons">
                                    <button class="carousel-btn" type="button" data-carousel-prev>&larr;</button>
                                    <button class="carousel-btn" type="button" data-carousel-next>&rarr;</button>
                                </div>
                                <div class="carousel-dots">
                                    ${screenshots.map((_, index) => `<button class="carousel-dot ${index === 0 ? 'active' : ''}" type="button" data-carousel-dot="${index}" aria-label="Go to slide ${index + 1}"></button>`).join('')}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <aside class="detail-aside">
                    <section class="detail-card">
                        <div class="detail-section-heading">
                            <p class="detail-section-kicker">Essentials</p>
                            <h3 class="font-montserrat">Metadata</h3>
                        </div>
                        <div class="detail-meta-grid">
                            <div class="detail-meta-item">
                                <span class="detail-meta-label">Role</span>
                                <strong>${escapeDetailText(role)}</strong>
                            </div>
                            <div class="detail-meta-item">
                                <span class="detail-meta-label">Period</span>
                                <strong>${escapeDetailText(period)}</strong>
                            </div>
                            <div class="detail-meta-item">
                                <span class="detail-meta-label">Domain</span>
                                <strong>${escapeDetailText(domain)}</strong>
                            </div>
                            <div class="detail-meta-item">
                                <span class="detail-meta-label">Repository</span>
                                <strong>${escapeDetailText(repoVisibility)}</strong>
                            </div>
                            <div class="detail-meta-item">
                                <span class="detail-meta-label">Live Access</span>
                                <strong>${escapeDetailText(liveAccessLabel)}</strong>
                            </div>
                        </div>
                    </section>

                    <section class="detail-card">
                        <div class="detail-section-heading">
                            <p class="detail-section-kicker">Build system</p>
                            <h3 class="font-montserrat">Tech stack</h3>
                        </div>
                        <div class="detail-tech-grid">
                            ${Object.entries(stack).map(([label, value]) => `
                                <div class="detail-tech-item">
                                    <span class="detail-meta-label">${escapeDetailText(label)}</span>
                                    <strong>${escapeDetailText(value)}</strong>
                                </div>
                            `).join('')}
                        </div>
                        <div class="detail-stack-tags">
                            ${(project.tags || []).map((tag) => `<span class="project-tag">${escapeDetailText(tag)}</span>`).join('')}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    `;

    initializeCarousel(root);
});

function initializeCarousel(root) {
    const track = root.querySelector('.carousel-track');
    const slides = Array.from(root.querySelectorAll('.carousel-slide'));
    const dots = Array.from(root.querySelectorAll('[data-carousel-dot]'));
    const prevButton = root.querySelector('[data-carousel-prev]');
    const nextButton = root.querySelector('[data-carousel-next]');
    const captionTitle = root.querySelector('.carousel-caption-title');
    const captionDescription = root.querySelector('.carousel-caption-description');
    const shell = root.querySelector('.carousel-shell');

    if (!track || dots.length === 0) {
        return;
    }

    if (dots.length === 1 && shell) {
        shell.classList.add('is-single');
    }

    let currentIndex = 0;

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
        slides.forEach((slide, index) => slide.classList.toggle('is-active', index === currentIndex));

        const activeSlide = slides[currentIndex];
        if (captionTitle && activeSlide?.dataset.captionTitle) {
            captionTitle.textContent = activeSlide.dataset.captionTitle;
        }

        if (captionDescription && activeSlide?.dataset.captionDescription) {
            captionDescription.textContent = activeSlide.dataset.captionDescription;
        }
    };

    prevButton?.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? dots.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextButton?.addEventListener('click', () => {
        currentIndex = currentIndex === dots.length - 1 ? 0 : currentIndex + 1;
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    updateCarousel();
}

function escapeDetailText(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function buildStatItem(label, value) {
    return `
        <article class="detail-stat-item">
            <span class="detail-stat-label">${escapeDetailText(label)}</span>
            <strong class="detail-stat-value">${escapeDetailText(value)}</strong>
        </article>
    `;
}

function getScreenshotCaption(item, index) {
    return {
        title: item?.title || `Screen ${index + 1}`,
        description: item?.description || 'Project screen preview.'
    };
}

function getHostnameLabel(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch (error) {
        return 'Published privately';
    }
}
