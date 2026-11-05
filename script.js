/* =========================================================
   TourSheep 투어쉽 — script.js
   ※ CONFIG / DATA 영역은 고객사 확정 자료로 교체하세요.
   ========================================================= */

/* ---------- 0. CONFIG ---------- */
const CONFIG = {
  // 카카오톡 채널 상담 URL (예: https://pf.kakao.com/_xxxxxx/chat) — 확정 후 입력
  kakaoUrl: '',
  // 인트로 스크럽 부드러움 (0~1, 낮을수록 부드럽게 따라감)
  scrubEase: 0.18,
  // 인트로 스크럽 이미지 시퀀스 (src/cut/reomove/ezgif-frame-001.jpg ~ 201.jpg)
  frames: {
    path: (i) => `src/cut/reomove/ezgif-frame-${String(i).padStart(3, '0')}.jpg`,
    count: 201,
  },
};

/* ---------- 1. DATA ---------- */
// image: 사용권이 확보된 실제 여행지 사진 경로를 넣으면 그라데이션 대신 사진이 표시됩니다.
const DESTINATIONS = [
  {
    id: 'thailand', name: '태국', en: 'THAILAND', image: 'src/tk.jpeg',
    desc: '사원과 야시장, 에메랄드빛 바다가 공존하는 미소의 나라',
    cities: [
      { id: 'bangkok', name: '방콕', image: 'src/tk.jpeg', season: '11월 ~ 2월 (건기)', intro: '왕궁과 사원, 짜오프라야 강변, 활기찬 야시장이 어우러진 태국의 수도.', spots: ['왕궁 · 왓 프라깨우', '왓 아룬', '짜오프라야 강 크루즈', '야시장'], themes: ['커플', '자유여행'] },
      { id: 'chiangmai', name: '치앙마이', season: '11월 ~ 2월 (건기)', intro: '산으로 둘러싸인 북부의 고도(古都). 여유로운 카페와 올드시티 산책이 매력.', spots: ['올드시티', '도이수텝', '님만해민', '선데이 마켓'], themes: ['커플', '자유여행'] },
      { id: 'pattaya', name: '파타야', season: '11월 ~ 3월', intro: '방콕 근교의 해변 휴양지. 섬 투어와 리조트 휴양을 함께 즐기기 좋은 곳.', spots: ['산호섬(꼬란)', '파타야 비치', '진리의 성전'], themes: ['휴양', '가족'] },
    ],
  },
  {
    id: 'vietnam', name: '베트남', en: 'VIETNAM', image: 'src/vtn.jpeg',
    desc: '하롱베이의 절경부터 남부의 섬 휴양까지, 길고 다채로운 나라',
    cities: [
      { id: 'danang', name: '다낭', image: 'src/vtn.jpeg', season: '2월 ~ 8월', intro: '해변 리조트와 바나힐, 근교 호이안까지 묶어 즐기기 좋은 중부 휴양 도시.', spots: ['미케 비치', '바나힐', '호이안 올드타운', '오행산'], themes: ['휴양', '가족', '커플'] },
      { id: 'nhatrang', name: '나트랑', image: 'src/nha.jpeg', season: '1월 ~ 8월', intro: '맑은 바다와 섬 호핑, 머드 스파로 유명한 남중부 해변 도시.', spots: ['나트랑 비치', '섬 호핑 투어', '머드 스파', '포나가 참탑'], themes: ['휴양', '가족'] },
      { id: 'phuquoc', name: '푸꾸옥', image: 'src/phu.jpeg', season: '11월 ~ 4월', intro: '베트남 남단의 섬. 고요한 해변과 리조트 중심의 휴양에 어울리는 곳.', spots: ['사오 비치', '혼텀 케이블카', '선셋 타운', '야시장'], themes: ['휴양', '커플'] },
      { id: 'hanoi', name: '하노이', image: 'src/ha.jpeg', season: '10월 ~ 12월, 3월 ~ 4월', intro: '천년 고도의 구시가지와 하롱베이로 이어지는 북부 여행의 시작점.', spots: ['호안끼엠 호수', '구시가지', '하롱베이(근교)', '문묘'], themes: ['자유여행', '커플'] },
    ],
  },
  {
    id: 'cambodia', name: '캄보디아', en: 'CAMBODIA', image: 'src/kbda.jpeg',
    desc: '앙코르 유적이 들려주는 크메르 문명의 이야기',
    cities: [
      { id: 'phnompenh', name: '프놈펜', image: 'src/phnompenh.jpeg', season: '11월 ~ 3월', intro: '메콩강과 톤레삽강이 만나는 수도. 왕궁과 강변 산책로가 대표 명소.', spots: ['왕궁 · 실버 파고다', '국립박물관', '리버사이드'], themes: ['자유여행'] },
      { id: 'siemreap', name: '시엠립', image: 'src/siemreap.jpeg', season: '11월 ~ 3월', intro: '앙코르와트로 향하는 관문 도시. 일출 투어와 유적 탐방의 중심지.', spots: ['앙코르와트', '앙코르톰 · 바욘', '타프롬', '펍 스트리트'], themes: ['가족', '커플', '자유여행'] },
    ],
  },
];

// ※ 아래 코스는 레이아웃 확인용 예시입니다. 실제 상품·가격·일정으로 교체하세요.
//   price 가 null 이면 '상담 시 안내'로 표시됩니다.
const PACKAGES = [
  {
    slug: 'danang-hoian-family', country: 'vietnam', city: 'danang', badge: '가족 추천',
    title: '다낭 · 호이안 가족 휴양 코스', nights: '3박 5일', style: '리조트 휴양 + 근교 투어',
    themes: ['휴양', '가족'], price: null,
    itinerary: ['다낭 도착 · 리조트 체크인', '바나힐 일일 투어', '호이안 올드타운 · 야경', '리조트 자유 휴식', '출국'],
    include: ['항목 확정 후 안내'], exclude: ['항목 확정 후 안내'],
  },
  {
    slug: 'bangkok-pattaya-couple', country: 'thailand', city: 'bangkok', badge: '커플 추천',
    title: '방콕 · 파타야 커플 코스', nights: '3박 5일', style: '도심 관광 + 해변',
    themes: ['커플', '휴양'], price: null,
    itinerary: ['방콕 도착 · 짜오프라야 디너', '왕궁 · 왓 아룬 · 야시장', '파타야 이동 · 산호섬', '해변 자유 일정', '출국'],
    include: ['항목 확정 후 안내'], exclude: ['항목 확정 후 안내'],
  },
  {
    slug: 'siemreap-angkor', country: 'cambodia', city: 'siemreap', badge: '문화 여행',
    title: '시엠립 앙코르 유적 탐방', nights: '3박 5일', style: '가이드 유적 투어',
    themes: ['가족', '자유여행'], price: null,
    itinerary: ['시엠립 도착', '앙코르와트 일출 · 앙코르톰', '타프롬 · 톤레삽 호수', '자유 일정 · 펍 스트리트', '출국'],
    include: ['항목 확정 후 안내'], exclude: ['항목 확정 후 안내'],
  },
  {
    slug: 'chiangmai-slow', country: 'thailand', city: 'chiangmai', badge: '자유여행',
    title: '치앙마이 슬로우 트립', nights: '4박 6일', style: '자유여행 + 선택 투어',
    themes: ['자유여행', '커플'], price: null,
    itinerary: ['치앙마이 도착', '올드시티 사원 산책', '도이수텝 · 님만해민', '근교 선택 투어', '선데이 마켓', '출국'],
    include: ['항목 확정 후 안내'], exclude: ['항목 확정 후 안내'],
  },
  {
    slug: 'phuquoc-resort', country: 'vietnam', city: 'phuquoc', badge: '휴양',
    title: '푸꾸옥 리조트 힐링 코스', nights: '3박 5일', style: '리조트 휴양',
    themes: ['휴양', '커플'], price: null,
    itinerary: ['푸꾸옥 도착 · 체크인', '혼텀 케이블카 · 해변', '리조트 자유 휴식', '선셋 타운 · 야시장', '출국'],
    include: ['항목 확정 후 안내'], exclude: ['항목 확정 후 안내'],
  },
  {
    slug: 'hanoi-halong', country: 'vietnam', city: 'hanoi', badge: '절경',
    title: '하노이 · 하롱베이 코스', nights: '3박 5일', style: '도시 관광 + 크루즈',
    themes: ['자유여행', '가족'], price: null,
    itinerary: ['하노이 도착 · 구시가지', '하롱베이 크루즈', '호안끼엠 · 문묘', '자유 일정', '출국'],
    include: ['항목 확정 후 안내'], exclude: ['항목 확정 후 안내'],
  },
];

// 실제 공개 동의를 받은 후기만 등록하세요. 비어 있으면 '후기 준비 중' 안내가 표시됩니다.
// 예: { place: '다낭', type: '가족 여행', text: '...', name: '김○○ 님' }
const REVIEWS = [];

// 답변은 여행사 정책·상품 약관 검수 후 확정하세요.
const FAQS = [
  { q: '예약 절차는 어떻게 되나요?', a: '카카오톡으로 원하시는 여행지, 날짜, 인원을 알려주시면 상담을 통해 일정과 견적을 안내해 드립니다. 내용을 확인하신 뒤 예약이 진행됩니다.' },
  { q: '여행 일정은 변경할 수 있나요?', a: '상품과 예약 진행 단계에 따라 변경 가능 범위가 다릅니다. 변경을 원하시면 카카오톡 상담으로 문의해 주세요.' },
  { q: '취소 및 환불 규정은 어떻게 확인하나요?', a: '취소·환불 규정은 상품별 여행약관에 따릅니다. 예약 전 상담 시 해당 상품의 규정을 함께 안내해 드립니다.' },
  { q: '출발 전 무엇을 준비해야 하나요?', a: '유효기간이 충분한 여권, 국가별 입국 요건, 여행자 보험, 현지 날씨에 맞는 복장 등을 확인해 주세요. 상세 준비물은 출발 전 안내해 드립니다.' },
];

/* ---------- 2. HELPERS ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const escapeHTML = (str = '') => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const countryOf = (id) => DESTINATIONS.find((d) => d.id === id);
const cityOf = (cityId) => {
  for (const d of DESTINATIONS) {
    const c = d.cities.find((x) => x.id === cityId);
    if (c) return { country: d, city: c };
  }
  return null;
};
const bgStyle = (country) => country.image ? `style="background-image:url('${country.image}')"` : '';
const toneClass = (country) => country.image ? '' : `tone-${country.id}`;
// 도시 이미지가 있으면 도시 이미지, 없으면 국가 대표 이미지
const cityBg = (country, city) => city && city.image ? `style="background-image:url('${city.image}')"` : bgStyle(country);
const priceText = (p) => (p == null ? '<strong>상담 시 안내</strong>' : `<strong>${p.toLocaleString('ko-KR')}원</strong> ~`);

/* ---------- 3. KAKAO LINKS ---------- */
function initKakaoLinks() {
  $$('.js-kakao').forEach((a) => {
    if (CONFIG.kakaoUrl) {
      a.href = CONFIG.kakaoUrl;
    } else {
      // 채널 URL 확정 전: 상담 안내 섹션으로 이동
      a.href = '#contact';
      a.removeAttribute('target');
      a.addEventListener('click', () => console.info('[TourSheep] CONFIG.kakaoUrl 에 카카오톡 채널 URL을 입력하세요.'));
    }
  });
}

/* ---------- 4. INTRO SCROLL SCRUB ---------- */
function initIntro() {
  const intro = $('.intro');
  const canvas = $('#introCanvas');
  const copy = $('#introCopy');
  const bar = $('#introProgress');
  const hint = $('.intro__scroll-hint');
  if (!intro || !canvas) return;

  const ctx = canvas.getContext('2d');
  const { path, count } = CONFIG.frames;
  const images = new Array(count);
  let target = 0;
  let current = 0;
  let drawnIndex = -1;

  // 캔버스 크기를 화면(DPR 반영)에 맞춤
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    drawnIndex = -1;
  };

  // object-fit: cover 방식으로 그리기
  const draw = (img) => {
    const cw = canvas.width, ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale, h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  // 아직 로드되지 않은 프레임이면 가장 가까운 로드된 프레임 사용
  const nearestLoaded = (i) => {
    for (let d = 0; d < count; d++) {
      const a = images[i - d], b = images[i + d];
      if (a && a.complete && a.naturalWidth) return a;
      if (b && b.complete && b.naturalWidth) return b;
    }
    return null;
  };

  const render = (index) => {
    if (index === drawnIndex) return;
    const img = nearestLoaded(index);
    if (!img) return;
    draw(img);
    if (img === images[index]) drawnIndex = index;
  };

  const load = (i) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = path(i + 1);
    img.onload = () => { if (i === 0) render(0); };
    images[i] = img;
  };

  resize();
  window.addEventListener('resize', resize);

  if (prefersReducedMotion) {
    load(0); // 첫 프레임만 정지 화면으로 표시
  } else {
    // 첫 프레임 우선 → 나머지는 일정 간격(듬성듬성 먼저) 순서로 로드
    load(0);
    [8, 4, 2, 1].forEach((step) => {
      for (let i = 0; i < count; i += step) if (!images[i]) load(i);
    });
  }

  const progress = () => {
    const rect = intro.getBoundingClientRect();
    const total = intro.offsetHeight - window.innerHeight;
    return total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 1;
  };

  const tick = () => {
    const p = progress();
    target = p;
    current += (target - current) * CONFIG.scrubEase;
    if (Math.abs(target - current) < 0.0005) current = target;

    render(prefersReducedMotion ? 0 : Math.round(current * (count - 1)));

    // 카피: 0~35% 구간에서 서서히 사라짐
    const fade = Math.min(current / 0.35, 1);
    copy.style.opacity = String(1 - fade);
    copy.style.transform = `translateY(${-fade * 60}px) scale(${1 - fade * 0.06})`;
    hint.style.opacity = String(1 - Math.min(current / 0.08, 1));
    bar.style.width = `${current * 100}%`;

    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // SKIP INTRO
  $('#skipIntro').addEventListener('click', () => {
    const hero = $('#hero');
    window.scrollTo({ top: hero.offsetTop - 10, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    $('#main').focus({ preventScroll: true });
  });
}

/* ---------- 5. HEADER / NAV / QUICKBAR ---------- */
function initHeader() {
  const header = $('#header');
  const quickbar = $('.quickbar');
  const mobileBar = $('.mobile-bar');
  const hero = $('#hero');
  const toggle = $('#menuToggle');
  const gnb = $('#gnb');

  const onScroll = () => {
    const pastIntro = window.scrollY > hero.offsetTop - 120;
    header.classList.toggle('is-solid', pastIntro);
    quickbar.classList.toggle('is-visible', pastIntro);
    // 푸터 근처에서는 모바일 바 숨김 (푸터 정보 가림 방지)
    const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 160;
    mobileBar.classList.toggle('is-visible', pastIntro && !nearBottom);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
    gnb.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    gnb.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });
  $$('a', gnb).forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // 현재 섹션 메뉴 표시
  const links = $$('.gnb__link');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => {
        const on = l.getAttribute('href') === `#${en.target.id}`;
        l.classList.toggle('is-current', on);
        on ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['destinations', 'packages', 'reviews', 'faq', 'contact'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });

  $('#toTop').addEventListener('click', () => {
    window.scrollTo({ top: $('#hero').offsetTop - 10, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

/* ---------- 6. DESTINATIONS ---------- */
function renderDestinations() {
  $('#destGrid').innerHTML = DESTINATIONS.map((d) => `
    <article class="dest-card reveal" data-country="${d.id}">
      <div class="dest-card__bg ${toneClass(d)}" ${bgStyle(d)} role="img" aria-label="${escapeHTML(d.name)} 대표 이미지"></div>
      <p class="dest-card__en">${d.en}</p>
      <h3 class="dest-card__name">${escapeHTML(d.name)}</h3>
      <p class="dest-card__desc">${escapeHTML(d.desc)}</p>
      <div class="dest-card__cities">
        ${d.cities.map((c) => `<button type="button" class="city-tag" data-city="${c.id}">${escapeHTML(c.name)}</button>`).join('')}
      </div>
      <button type="button" class="dest-card__more" data-open-country="${d.id}">자세히 보기 <span aria-hidden="true">→</span></button>
    </article>
  `).join('');

  $('#destGrid').addEventListener('click', (e) => {
    const cityBtn = e.target.closest('[data-city]');
    const moreBtn = e.target.closest('[data-open-country]');
    if (cityBtn) openCity(cityBtn.dataset.city);
    else if (moreBtn) openCity(countryOf(moreBtn.dataset.openCountry).cities[0].id);
  });
}

/* ---------- 7. PACKAGES + FILTER ---------- */
const filterState = { country: 'all', themes: new Set(), keyword: '' };

function matchPackage(p) {
  const { country, themes, keyword } = filterState;
  if (country !== 'all' && p.country !== country) return false;
  if (themes.size && !p.themes.some((t) => themes.has(t))) return false;
  if (keyword) {
    const loc = cityOf(p.city);
    const hay = [p.title, p.style, loc.city.name, loc.country.name, ...p.themes].join(' ').toLowerCase();
    if (!hay.includes(keyword)) return false;
  }
  return true;
}

function renderPackages() {
  const list = PACKAGES.filter(matchPackage);
  $('#pkgGrid').innerHTML = list.map((p, i) => {
    const loc = cityOf(p.city);
    return `
      <article class="pkg-card" style="animation-delay:${i * 60}ms">
        <div class="pkg-card__thumb ${toneClass(loc.country)}" ${p.image ? `style="background-image:url('${p.image}')"` : cityBg(loc.country, loc.city)} role="img" aria-label="${escapeHTML(loc.city.name)} 여행 이미지">
          <span class="pkg-card__badge">${escapeHTML(p.badge)}</span>
        </div>
        <div class="pkg-card__body">
          <p class="pkg-card__loc">${escapeHTML(loc.country.name)} · ${escapeHTML(loc.city.name)}</p>
          <h3 class="pkg-card__title">${escapeHTML(p.title)}</h3>
          <ul class="pkg-card__meta">
            <li>${escapeHTML(p.nights)}</li>
            <li>${escapeHTML(p.style)}</li>
            ${p.themes.map((t) => `<li>#${escapeHTML(t)}</li>`).join('')}
          </ul>
          <div class="pkg-card__foot">
            <p class="pkg-card__price">${priceText(p.price)}</p>
            <button type="button" class="pkg-card__link" data-pkg="${p.slug}">상세 보기 →</button>
          </div>
        </div>
      </article>`;
  }).join('');
  $('#pkgEmpty').hidden = list.length > 0;
  return list.length;
}

function applyFilter({ announce = false } = {}) {
  const count = renderPackages();

  // 대표 여행지 카드: 선택 국가 강조, 검색어와 일치하는 도시 태그 표시
  $$('.dest-card').forEach((card) => {
    const dim = filterState.country !== 'all' && card.dataset.country !== filterState.country;
    card.classList.toggle('is-dim', dim);
  });
  $$('.city-tag').forEach((tag) => {
    const hit = !!filterState.keyword && tag.textContent.toLowerCase().includes(filterState.keyword);
    tag.classList.toggle('is-match', hit);
  });

  const hasFilter = filterState.country !== 'all' || filterState.themes.size || filterState.keyword;
  $('#finderStatus').textContent = hasFilter ? `조건에 맞는 여행 코스 ${count}개` : '';
  if (announce) $('#packages').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

function initFinder() {
  const tabs = $$('.tab');
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    tabs.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    filterState.country = tab.dataset.country;
    applyFilter();
  }));

  $$('.chip').forEach((chip) => chip.addEventListener('click', () => {
    const on = chip.getAttribute('aria-pressed') !== 'true';
    chip.setAttribute('aria-pressed', String(on));
    on ? filterState.themes.add(chip.dataset.theme) : filterState.themes.delete(chip.dataset.theme);
    applyFilter();
  }));

  const input = $('#searchInput');
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => { filterState.keyword = input.value.trim().toLowerCase(); applyFilter(); }, 200);
  });
  $('#finder').addEventListener('submit', (e) => {
    e.preventDefault();
    filterState.keyword = input.value.trim().toLowerCase();
    applyFilter({ announce: true });
  });

  $('#resetFilter').addEventListener('click', () => {
    filterState.country = 'all'; filterState.themes.clear(); filterState.keyword = '';
    input.value = '';
    tabs.forEach((t, i) => { t.classList.toggle('is-active', i === 0); t.setAttribute('aria-selected', String(i === 0)); });
    $$('.chip').forEach((c) => c.setAttribute('aria-pressed', 'false'));
    applyFilter();
  });

  $('#pkgGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-pkg]');
    if (btn) openPackage(btn.dataset.pkg);
  });
}

/* ---------- 8. DETAIL MODAL ---------- */
const modal = () => $('#detailModal');

function showModal(html) {
  $('#modalBody').innerHTML = html;
  const m = modal();
  if (typeof m.showModal === 'function') m.showModal();
  else m.setAttribute('open', '');
  m.scrollTop = 0;
  initKakaoLinks();
}

function openCity(cityId) {
  const { country, city } = cityOf(cityId);
  const related = PACKAGES.filter((p) => p.city === cityId);
  const siblings = country.cities.filter((c) => c.id !== cityId);
  showModal(`
    <div class="modal__hero ${toneClass(country)}" ${cityBg(country, city)}>
      <div><small>${country.en}</small><h3 id="modalTitle">${escapeHTML(city.name)}</h3></div>
    </div>
    <div class="modal__content">
      <p class="modal__lead">${escapeHTML(city.intro)}</p>
      <div class="modal__cols">
        <div class="modal__block"><h4>추천 시기</h4><p>${escapeHTML(city.season)}</p></div>
        <div class="modal__block"><h4>추천 테마</h4><p>${city.themes.map((t) => `#${escapeHTML(t)}`).join(' ')}</p></div>
      </div>
      <div class="modal__block">
        <h4>대표 관광지</h4>
        <ul class="modal__list">${city.spots.map((s) => `<li>${escapeHTML(s)}</li>`).join('')}</ul>
      </div>
      ${related.length ? `
      <div class="modal__block">
        <h4>연관 여행 코스</h4>
        <div class="related">${related.map((p) => `<button type="button" data-goto-pkg="${p.slug}">${escapeHTML(p.title)}</button>`).join('')}</div>
      </div>` : ''}
      ${siblings.length ? `
      <div class="modal__block">
        <h4>${escapeHTML(country.name)}의 다른 도시</h4>
        <div class="related">${siblings.map((c) => `<button type="button" data-goto-city="${c.id}">${escapeHTML(c.name)}</button>`).join('')}</div>
      </div>` : ''}
      <p class="modal__notice">추천 시기는 일반적인 기후 기준이며 해마다 달라질 수 있습니다. 출발 시기에 맞는 정보는 상담 시 안내해 드립니다.</p>
      <div class="modal__actions">
        <a href="#" class="btn btn--kakao js-kakao" target="_blank" rel="noopener">${escapeHTML(city.name)} 여행 상담하기</a>
      </div>
    </div>`);
}

function openPackage(slug) {
  const p = PACKAGES.find((x) => x.slug === slug);
  const loc = cityOf(p.city);
  showModal(`
    <div class="modal__hero ${toneClass(loc.country)}" ${p.image ? `style="background-image:url('${p.image}')"` : cityBg(loc.country, loc.city)}>
      <div><small>${loc.country.en} · ${escapeHTML(loc.city.name)}</small><h3 id="modalTitle">${escapeHTML(p.title)}</h3></div>
    </div>
    <div class="modal__content">
      <div class="modal__cols">
        <div class="modal__block"><h4>여행 기간</h4><p>${escapeHTML(p.nights)}</p></div>
        <div class="modal__block"><h4>여행 방식</h4><p>${escapeHTML(p.style)}</p></div>
        <div class="modal__block"><h4>가격</h4><p>${priceText(p.price)}</p></div>
        <div class="modal__block"><h4>출발 조건</h4><p>상담 시 안내</p></div>
      </div>
      <div class="modal__block">
        <h4>일정표</h4>
        <ol class="timeline">${p.itinerary.map((d, i) => `<li><b>DAY ${i + 1}</b><span>${escapeHTML(d)}</span></li>`).join('')}</ol>
      </div>
      <div class="modal__cols">
        <div class="modal__block"><h4>포함 사항</h4><ul class="modal__list">${p.include.map((x) => `<li>${escapeHTML(x)}</li>`).join('')}</ul></div>
        <div class="modal__block"><h4>불포함 사항</h4><ul class="modal__list">${p.exclude.map((x) => `<li>${escapeHTML(x)}</li>`).join('')}</ul></div>
      </div>
      <p class="modal__notice">본 일정은 예시 코스이며 현지 사정에 따라 변경될 수 있습니다. 선택 비용, 취소·환불 규정 등 유의사항은 상담 시 상품별 약관과 함께 안내해 드립니다.</p>
      <div class="modal__actions">
        <a href="#" class="btn btn--kakao js-kakao" target="_blank" rel="noopener">이 코스로 상담하기</a>
        <button type="button" class="btn btn--ghost" data-goto-city="${p.city}">${escapeHTML(loc.city.name)} 여행지 정보</button>
      </div>
    </div>`);
}

function initModal() {
  const m = modal();
  const close = () => (typeof m.close === 'function' ? m.close() : m.removeAttribute('open'));
  $('#modalClose').addEventListener('click', close);
  m.addEventListener('click', (e) => {
    if (e.target === m) close(); // 바깥(backdrop) 클릭
    const city = e.target.closest('[data-goto-city]');
    const pkg = e.target.closest('[data-goto-pkg]');
    if (city) openCity(city.dataset.gotoCity);
    if (pkg) openPackage(pkg.dataset.gotoPkg);
  });
}

/* ---------- 9. REVIEWS ---------- */
function renderReviews() {
  const track = $('#reviewTrack');
  if (!REVIEWS.length) {
    track.innerHTML = `
      <div class="review-empty">
        <div>
          <p class="review-empty__title">첫 여행 후기를 준비하고 있어요.</p>
          <p class="review-empty__desc">투어쉽과 함께한 고객님의 실제 후기가 이곳에 소개될 예정입니다.</p>
        </div>
        <a href="#" class="btn btn--primary js-kakao" target="_blank" rel="noopener">여행 상담 시작하기</a>
      </div>`;
    return;
  }
  track.innerHTML = REVIEWS.map((r) => `
    <article class="review-card">
      <p class="review-card__meta">${escapeHTML(r.place)} · ${escapeHTML(r.type)}</p>
      <p class="review-card__text">${escapeHTML(r.text)}</p>
      <p class="review-card__name">${escapeHTML(r.name)}</p>
    </article>`).join('');
}

/* ---------- 10. FAQ ACCORDION ---------- */
function renderFAQ() {
  const wrap = $('#faqList');
  wrap.innerHTML = FAQS.map((f, i) => `
    <div class="faq__item">
      <h3>
        <button type="button" class="faq__q" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-a-${i}">
          ${escapeHTML(f.q)}<span class="faq__icon" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="faq__a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
        <div><p>${escapeHTML(f.a)}</p></div>
      </div>
    </div>`).join('');

  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq__q');
    if (!btn) return;
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    document.getElementById(btn.getAttribute('aria-controls')).classList.toggle('is-open', open);
  });
}

/* ---------- 11. REVEAL ON SCROLL ---------- */
function initReveal() {
  const targets = $$('.section__head, .why-card, .reveal, .finder');
  targets.forEach((el) => el.classList.add('reveal'));
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  targets.forEach((el) => io.observe(el));
}

/* ---------- 12. INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderDestinations();
  renderPackages();
  renderReviews();
  renderFAQ();

  initIntro();
  initHeader();
  initFinder();
  initModal();
  initReveal();
  initKakaoLinks();

  $('#year').textContent = new Date().getFullYear();
});
