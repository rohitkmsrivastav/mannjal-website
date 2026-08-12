(function () {
  'use strict';

  const PROJECT_ID = 'su0a7ci0';
  const DATASET = 'production';
  const API_VERSION = '2026-07-30';
  // Use the live API for this static site so a newly published article is
  // visible immediately in the Resources page and article template.
  const API_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`;

  const resourceFields = `{
    _id,
    title,
    "slug": slug.current,
    contentType,
    excerpt,
    publishedAt,
    readingTime,
    legacyPath,
    seoTitle,
    seoDescription,
    body[]{
      ...,
      _type == "articleImage" => {
        ...,
        asset->{url, metadata{dimensions}}
      }
    },
    coverImage{
      alt,
      caption,
      asset->{url, metadata{dimensions}}
    },
    author->{name, role, bio, linkedin, photo{alt, asset->{url}}},
    tags[]->{title, "slug": slug.current}
  }`;

  async function querySanity(query, params = {}) {
    const search = new URLSearchParams({
      query,
      perspective: 'published',
      returnQuery: 'false',
    });

    Object.entries(params).forEach(([key, value]) => {
      search.set(`$${key}`, JSON.stringify(value));
    });

    const response = await fetch(`${API_URL}?${search.toString()}`, {
      headers: {Accept: 'application/json'},
    });

    if (!response.ok) {
      throw new Error(`Sanity request failed with ${response.status}`);
    }

    const payload = await response.json();
    return payload.result;
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function articleHref(resource) {
    if (resource.legacyPath) return resource.legacyPath;
    return `resource.html?slug=${encodeURIComponent(resource.slug)}`;
  }

  function formatDate(value) {
    if (!value) return '';
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(value));
  }

  function formatType(value) {
    return value === 'caseStudy' ? 'Case study' : 'Blog';
  }

  function resourceVisualLabel(resource) {
    const title = (resource?.title || '').toLowerCase();
    if (title.includes('msme') || title.includes('cash cycle')) return 'MSME cash cycles';
    if (title.includes('microfinance')) return 'Microfinance progression';
    if (title.includes('partnership') || title.includes('lending at scale')) return 'Partnership systems';
    return formatType(resource?.contentType);
  }

  function coverImage(resource, className) {
    const asset = resource?.coverImage?.asset;
    if (!asset?.url) return null;
    const image = element('img', className);
    image.src = asset.url;
    image.alt = resource.coverImage.alt || '';
    image.loading = 'lazy';
    image.decoding = 'async';
    const dimensions = asset.metadata?.dimensions;
    if (dimensions?.width) image.width = dimensions.width;
    if (dimensions?.height) image.height = dimensions.height;
    return image;
  }

  function renderFeatured(resource) {
    const link = element('a', 'resource-feature');
    link.href = articleHref(resource);

    const art = element('div', 'resource-feature-art');
    const image = coverImage(resource, 'resource-feature-image');
    if (image) {
      art.classList.add('has-image');
      image.loading = 'eager';
      art.append(image);
    } else {
      art.classList.add('resource-feature-art--fallback');
      art.setAttribute('aria-hidden', 'true');
      art.append(
        element('span', 'art-label', resourceVisualLabel(resource)),
        element('span', 'resource-feature-fallback-title', resource.title),
      );
    }

    const copy = element('div', 'resource-feature-copy');
    const kicker = element('div', 'resource-kicker');
    const primaryTag = resource.tags?.[0]?.title || formatType(resource.contentType);
    kicker.append(
      element('span', 'resource-type', `Featured ${primaryTag.toLowerCase()}`),
      element('span', '', `${resource.readingTime || 1} min read`),
    );
    copy.append(
      kicker,
      element('h2', '', resource.title),
      element('p', '', resource.excerpt),
    );

    const read = element('span', 'link-arrow', 'Read the article ');
    const icon = element('span');
    icon.dataset.ic = 'arrow';
    icon.dataset.s = '16';
    read.append(icon);
    copy.append(read);
    link.append(art, copy);
    return link;
  }

  function renderCard(resource) {
    const card = element('article', 'resource-card');
    card.dataset.tags = (resource.tags || []).map((tag) => tag.slug).join(' ');

    const link = element('a');
    link.href = articleHref(resource);

    const art = element('div', 'resource-card-art');
    const image = coverImage(resource, 'resource-card-image');
    if (image) {
      art.classList.add('has-image');
      art.append(image);
    } else {
      art.classList.add('resource-card-art--fallback');
      art.setAttribute('aria-hidden', 'true');
      art.append(
        element('span', 'art-label', resourceVisualLabel(resource)),
        element('span', 'resource-card-art-title', resource.title),
      );
    }

    const body = element('div', 'resource-card-body');
    const kicker = element('div', 'resource-kicker');
    kicker.append(
      element('span', 'resource-type', formatType(resource.contentType)),
      element('span', '', `${resource.readingTime || 1} min read`),
    );
    body.append(kicker, element('h3', '', resource.title), element('p', '', resource.excerpt));

    const tags = element('div', 'resource-tags');
    (resource.tags || []).forEach((tag) => tags.append(element('span', '', tag.title)));
    body.append(tags);
    link.append(art, body);
    card.append(link);
    return card;
  }

  function setupFilters(resources) {
    const buttonWrap = document.querySelector('.resource-filter-buttons');
    const grid = document.getElementById('resourceGrid');
    const status = document.getElementById('filterStatus');
    const empty = document.getElementById('resourceEmpty');
    const clear = document.getElementById('clearFilters');
    if (!buttonWrap || !grid || !status || !empty || !clear) return;

    const tagMap = new Map();
    resources.forEach((resource) => {
      (resource.tags || []).forEach((tag) => tagMap.set(tag.slug, tag.title));
    });

    buttonWrap.replaceChildren();
    const allButton = element('button', 'resource-filter-btn is-active', 'All');
    allButton.type = 'button';
    allButton.dataset.filter = 'all';
    allButton.setAttribute('aria-pressed', 'true');
    buttonWrap.append(allButton);

    [...tagMap.entries()]
      .sort((a, b) => a[1].localeCompare(b[1]))
      .forEach(([slug, title]) => {
        const button = element('button', 'resource-filter-btn', title);
        button.type = 'button';
        button.dataset.filter = slug;
        button.setAttribute('aria-pressed', 'false');
        buttonWrap.append(button);
      });

    const selectedTags = new Set();
    const initialTags = new URLSearchParams(window.location.search).get('tags');
    if (initialTags) {
      initialTags.split(',').forEach((tag) => {
        if (tagMap.has(tag)) selectedTags.add(tag);
      });
    }

    function update() {
      const cards = Array.from(grid.querySelectorAll('.resource-card'));
      let visible = 0;
      cards.forEach((card) => {
        const tags = new Set((card.dataset.tags || '').split(' ').filter(Boolean));
        const matches = [...selectedTags].every((tag) => tags.has(tag));
        card.hidden = !matches;
        if (matches) visible += 1;
      });

      buttonWrap.querySelectorAll('.resource-filter-btn').forEach((button) => {
        const tag = button.dataset.filter;
        const active = tag === 'all' ? selectedTags.size === 0 : selectedTags.has(tag);
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });

      status.textContent =
        selectedTags.size === 0
          ? `Showing all ${visible} resource${visible === 1 ? '' : 's'}`
          : `Showing ${visible} resource${visible === 1 ? '' : 's'} across ${selectedTags.size} selected tag${selectedTags.size === 1 ? '' : 's'}`;
      empty.hidden = visible !== 0;

      const params = new URLSearchParams(window.location.search);
      if (selectedTags.size) params.set('tags', [...selectedTags].join(','));
      else params.delete('tags');
      const search = params.toString();
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`,
      );
    }

    buttonWrap.addEventListener('click', (event) => {
      const button = event.target.closest('.resource-filter-btn');
      if (!button) return;
      const tag = button.dataset.filter;
      if (tag === 'all') {
        selectedTags.clear();
      } else if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
      } else {
        selectedTags.add(tag);
      }
      update();
    });

    clear.addEventListener('click', () => {
      selectedTags.clear();
      update();
      allButton.focus();
    });

    update();
  }

  async function hydrateResourcesPage() {
    const grid = document.getElementById('resourceGrid');
    if (!grid) return;

    const query = `{
      "page": *[_type == "resourcesPage"][0]{
        eyebrow,
        headingLine,
        headingAccent,
        introduction,
        closingHeading,
        featuredResource->${resourceFields}
      },
      "resources": *[
        _type == "resource" &&
        defined(slug.current) &&
        defined(publishedAt) &&
        publishedAt <= now()
      ] | order(publishedAt desc) ${resourceFields}
    }`;

    try {
      const data = await querySanity(query);
      if (!data?.resources?.length) return;

      if (data.page) {
        const eyebrow = document.getElementById('resourcesEyebrow');
        const headingLine = document.getElementById('resourcesHeadingLine');
        const headingAccent = document.getElementById('resourcesHeadingAccent');
        const introduction = document.getElementById('resourcesIntroduction');
        const closingHeading = document.getElementById('resourcesClosingHeading');
        if (eyebrow && data.page.eyebrow) eyebrow.textContent = data.page.eyebrow;
        if (headingLine && data.page.headingLine) headingLine.textContent = data.page.headingLine;
        if (headingAccent && data.page.headingAccent) headingAccent.textContent = data.page.headingAccent;
        if (introduction && data.page.introduction) introduction.textContent = data.page.introduction;
        if (closingHeading && data.page.closingHeading) closingHeading.textContent = data.page.closingHeading;
      }

      const featured = data.page?.featuredResource || data.resources[0];
      const featureSlot = document.getElementById('resourceFeatureSlot');
      if (featureSlot && featured) featureSlot.replaceChildren(renderFeatured(featured));

      grid.replaceChildren(...data.resources.map(renderCard));
      setupFilters(data.resources);
      if (typeof window.hydrateIcons === 'function') window.hydrateIcons();
      document.documentElement.dataset.cmsReady = 'true';
    } catch (error) {
      console.warn('Published resources could not be loaded; showing the local fallback.', error);
    }
  }

  function portableText(blocks) {
    const fragment = document.createDocumentFragment();
    let activeList = null;
    let activeListType = null;
    let paragraphCount = 0;
    const normalBlocks = (blocks || []).filter(
      (block) => block._type === 'block' && (!block.style || block.style === 'normal') && !block.listItem,
    );

    function spanContent(block) {
      const container = document.createDocumentFragment();
      const definitions = new Map((block.markDefs || []).map((definition) => [definition._key, definition]));
      (block.children || []).forEach((child) => {
        let node = document.createTextNode(child.text || '');
        (child.marks || []).forEach((mark) => {
          let wrapper;
          if (mark === 'strong') wrapper = element('strong');
          else if (mark === 'em') wrapper = element('em');
          else if (mark === 'code') wrapper = element('code');
          else {
            const definition = definitions.get(mark);
            if (definition?._type === 'link' && definition.href) {
              wrapper = element('a');
              wrapper.href = definition.href;
              if (definition.blank) {
                wrapper.target = '_blank';
                wrapper.rel = 'noopener';
              }
            }
          }
          if (wrapper) {
            wrapper.append(node);
            node = wrapper;
          }
        });
        container.append(node);
      });
      return container;
    }

    function flushList() {
      if (activeList) fragment.append(activeList);
      activeList = null;
      activeListType = null;
    }

    (blocks || []).forEach((block) => {
      if (block._type === 'block' && block.listItem) {
        const listType = block.listItem === 'number' ? 'ol' : 'ul';
        if (!activeList || activeListType !== listType) {
          flushList();
          activeList = element(listType);
          activeListType = listType;
        }
        const item = element('li');
        item.append(spanContent(block));
        activeList.append(item);
        return;
      }

      flushList();

      if (block._type === 'block') {
        const style = block.style || 'normal';
        const tag = style === 'h2' ? 'h2' : style === 'h3' ? 'h3' : style === 'blockquote' ? 'blockquote' : 'p';
        const node = element(tag);
        node.append(spanContent(block));
        if (tag === 'p') {
          paragraphCount += 1;
          if (paragraphCount === 1) node.classList.add('article-lead');
          if (paragraphCount === normalBlocks.length) node.classList.add('article-closing');
        }
        if (tag === 'h2' || tag === 'h3') node.id = slugify(node.textContent);
        fragment.append(node);
      } else if (block._type === 'callout') {
        const callout = element('aside', 'article-callout');
        if (block.heading) callout.append(element('span', 'eyebrow', block.heading));
        callout.append(element('p', '', block.text));
        fragment.append(callout);
      } else if (block._type === 'articleImage' && block.asset?.url) {
        const figure = element('figure', 'article-inline-image');
        const image = element('img');
        image.src = block.asset.url;
        image.alt = block.alt || '';
        image.loading = 'lazy';
        figure.append(image);
        if (block.caption) figure.append(element('figcaption', '', block.caption));
        fragment.append(figure);
      }
    });

    flushList();
    return fragment;
  }

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function updateMeta(selector, value, attribute = 'content') {
    const node = document.querySelector(selector);
    if (node && value) node.setAttribute(attribute, value);
  }

  function renderArticle(resource) {
    const labels = document.getElementById('articleLabels');
    const title = document.getElementById('articleTitle');
    const dek = document.getElementById('articleDek');
    const meta = document.getElementById('articleMeta');
    const cover = document.getElementById('articleCoverImage');
    const content = document.getElementById('articleContent');
    const rail = document.getElementById('articleContents');
    if (!labels || !title || !dek || !meta || !content || !rail) return;

    labels.replaceChildren(
      ...(resource.tags || []).map((tag) => element('span', '', tag.title)),
    );
    const titleParts = resource.title.split(/:\s+/, 2);
    if (titleParts.length === 2) {
      const accent = element('span', '', titleParts[1]);
      title.replaceChildren(document.createTextNode(`${titleParts[0]}: `), accent);
    } else {
      title.textContent = resource.title;
    }
    dek.textContent = resource.excerpt || '';
    meta.replaceChildren(
      element('span', '', `By ${resource.author?.name || 'Mannjal'}`),
      element('span', '', formatDate(resource.publishedAt)),
      element('span', '', `${resource.readingTime || 1} min read`),
    );

    if (cover && resource.coverImage?.asset?.url) {
      cover.src = resource.coverImage.asset.url;
      cover.alt = resource.coverImage.alt || '';
      const dimensions = resource.coverImage.asset.metadata?.dimensions;
      if (dimensions?.width) cover.width = dimensions.width;
      if (dimensions?.height) cover.height = dimensions.height;
    }

    content.replaceChildren(portableText(resource.body || []));
    const headings = Array.from(content.querySelectorAll('h2'));
    rail.replaceChildren(element('span', 'article-rail-title', 'In this article'));
    headings.forEach((heading) => {
      const link = element('a', '', heading.textContent);
      link.href = `#${heading.id}`;
      rail.append(link);
    });

    const pageTitle = resource.seoTitle || resource.title;
    const description = resource.seoDescription || resource.excerpt;
    document.title = `${pageTitle} | Mannjal`;
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', pageTitle);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="article:published_time"]', resource.publishedAt);
    updateMeta('meta[property="og:image"]', resource.coverImage?.asset?.url);
    document.documentElement.dataset.cmsReady = 'true';
  }

  async function hydrateArticlePage() {
    const root = document.querySelector('[data-sanity-resource]');
    if (!root) return;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug') || root.dataset.sanityResource;
    if (!slug) return;

    const query = `*[
      _type == "resource" &&
      slug.current == $slug &&
      defined(publishedAt) &&
      publishedAt <= now()
    ][0] ${resourceFields}`;

    try {
      const resource = await querySanity(query, {slug});
      if (!resource) {
        const missing = document.getElementById('articleMissing');
        if (missing) missing.hidden = false;
        return;
      }
      renderArticle(resource);
    } catch (error) {
      console.warn('Published article could not be loaded; showing the local fallback.', error);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    hydrateResourcesPage();
    hydrateArticlePage();
  });
})();
