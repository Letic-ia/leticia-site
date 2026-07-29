import {useEffect, useRef, type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ContactForm from '../components/ContactForm';

import '../css/landing.css';

const REPLY = "J'étais à la bibliothèque, seul. Mais je crains que personne ne puisse le confirmer…";

function markup(): string {
  return `
  <section class="lt-hero">
    <div class="lt-wrap lt-hero-grid">
      <div>
        <span class="lt-eyebrow">Dossier · Interrogatoire assisté par IA</span>
        <h1>Vos suspects <span class="lt-em">prennent la parole.</span></h1>
        <p class="lt-sub">La plateforme d'interrogatoires narratifs par IA pour escape games. Les joueurs parlent, les personnages répondent dans leur rôle - et tout tourne sur <b>votre propre serveur</b>.</p>
        <div class="lt-cta">
          <a class="lt-btn" href="#contact">Demander une démo
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a class="lt-btn lt-btn--ghost" href="#how">Voir comment ça marche</a>
        </div>
        <div class="lt-meta">
          <div><strong>On-premise</strong>données chez vous</div>
          <div><strong>Cloud ou local</strong>IA au choix</div>
          <div><strong>Voix</strong>STT → rôle → TTS</div>
        </div>
      </div>

      <div class="lt-terminal">
        <div class="lt-terminal-bar">
          <span class="lt-code">Salle 3 · Le Manoir des Ombres</span>
          <span class="lt-chip"><span class="lt-pulse"></span>En rôle</span>
        </div>
        <div class="lt-terminal-body">
          <div>
            <div class="lt-line-label">Joueur</div>
            <div class="lt-wave-row">
              <span class="lt-mic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </span>
              <canvas class="lt-wave" width="520" height="44" aria-label="Signal vocal du joueur"></canvas>
            </div>
            <p class="lt-q">« Où étiez-vous la nuit du meurtre, Docteur ? »</p>
          </div>
          <hr class="lt-rule" />
          <div>
            <div class="lt-line-label lt-suspect">Suspect · IA</div>
            <p class="lt-reply"><span data-typed>${REPLY}</span><span class="lt-caret" aria-hidden="true"></span></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hr class="lt-rule" />

  <section id="how" class="lt-section">
    <div class="lt-wrap">
      <div class="lt-section-head lt-reveal">
        <span class="lt-eyebrow">Le déroulé</span>
        <h2>Une conversation, pas un menu.</h2>
        <p>Trois rôles, un même fil : le joueur mène l'interrogatoire, l'IA tient le personnage, le maître du jeu garde la main.</p>
      </div>
      <div class="lt-steps">
        <div class="lt-step lt-reveal"><span class="lt-num"></span><h3>Le joueur parle</h3><p>Il pose sa question à voix haute. Leticia la transcrit en direct (STT), sans clavier ni interface entre lui et le suspect.</p></div>
        <div class="lt-step lt-reveal"><span class="lt-num"></span><h3>L'IA répond en rôle</h3><p>Le personnage répond selon sa psychologie et ses secrets, puis sa réponse est lue à voix haute (TTS). Il improvise sans jamais sortir du scénario.</p></div>
        <div class="lt-step lt-reveal"><span class="lt-num"></span><h3>Le MJ pilote</h3><p>Depuis la console, l'opérateur suit les sessions en direct, déclenche les rebondissements et garde le contrôle du jeu.</p></div>
      </div>
    </div>
  </section>

  <section id="features" class="lt-section">
    <div class="lt-wrap">
      <div class="lt-section-head lt-reveal">
        <span class="lt-eyebrow">Ce qu'il y a dans la boîte</span>
        <h2>De l'enquête à la borne joueur.</h2>
      </div>
      <div class="lt-features">
        <div class="lt-feat lt-reveal">
          <svg class="lt-ic" viewBox="0 0 24 24" fill="none"><rect x="9" y="2.5" width="6" height="11" rx="3" fill="currentColor"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4.5M8 21.5h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          <h3>Interrogatoire vocal</h3><p>Parole → transcription → réponse IA en rôle → synthèse vocale. Une boucle complète, immersive, sans écran entre le joueur et le personnage.</p>
        </div>
        <div class="lt-feat lt-reveal">
          <svg class="lt-ic" viewBox="0 0 24 24" fill="none"><path d="M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.8"/><path d="M8 9h7M8 13h7M8 17h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          <h3>Scénarios &amp; personnages</h3><p>Chaque enquête définit ses personnages, leur psychologie, leurs secrets et des déclencheurs narratifs.</p>
        </div>
        <div class="lt-feat lt-reveal">
          <svg class="lt-ic" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="13" rx="1.5" stroke="currentColor" stroke-width="1.8"/><path d="M3 13l4-3 3 2 4-4 3 2.5M8 21h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <h3>Console opérateur</h3><p>Sessions en direct, déclencheurs, journal des événements et tableau de bord - le MJ voit tout.</p>
        </div>
        <div class="lt-feat lt-reveal">
          <svg class="lt-ic" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="14" rx="1.5" stroke="currentColor" stroke-width="1.8"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
          <h3>Mode Jeu borne</h3><p>Un écran plein écran dédié aux joueurs : choix du personnage par badge RFID ou tactile, push-to-talk, affichage thématisé.</p>
        </div>
        <div class="lt-feat lt-reveal">
          <svg class="lt-ic" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M4 7l8-4 8 4M4 7v10l8 4 8-4V7" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
          <h3>IA au choix</h3><p>OpenAI, Google Gemini, de nombreux fournisseurs cloud, ou un serveur <b>local</b> compatible OpenAI - Ollama, LM Studio, vLLM.</p>
        </div>
        <div class="lt-feat lt-reveal">
          <svg class="lt-ic" viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 1 1-8.5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M3 4v5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8v4l3 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          <h3>Increvable en live</h3><p>Bascule automatique sur un fournisseur de secours, message d'attente en personnage, repli en rôle - jamais d'écran cassé devant les joueurs.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="sovereign" class="lt-section lt-band">
    <div class="lt-wrap lt-band-grid">
      <div class="lt-reveal">
        <span class="lt-eyebrow">Chez vous, pas dans le cloud</span>
        <h2>Vos données restent dans la salle.</h2>
        <ul>
          <li><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span><b>On-premise.</b> Une seule application, base locale - aucune donnée ne quitte votre réseau, hormis les appels à l'IA que vous choisissez.</span></li>
          <li><svg viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/></svg><span><b>RGPD-friendly.</b> Souveraineté des données, rétention et consentement sous votre contrôle.</span></li>
          <li><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M4 7l8-4 8 4M4 7v10l8 4 8-4V7" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg><span><b>Modèle local possible.</b> Faites tourner l'IA sur votre matériel : coûts maîtrisés, hors-ligne envisageable.</span></li>
        </ul>
      </div>
      <div class="lt-stamp lt-reveal" aria-hidden="true">
        <span class="lt-big">On-premise</span>
        <span class="lt-sm">Données · Serveur · Réseau local</span>
      </div>
    </div>
  </section>

  <section id="reliability" class="lt-section">
    <div class="lt-wrap">
      <div class="lt-section-head lt-reveal">
        <span class="lt-eyebrow">Conçu pour le live</span>
        <h2>Ça tourne, salle après salle.</h2>
        <p>Une expérience joueur qui ne casse pas, et une exploitation qui ne dépend pas de l'éditeur.</p>
      </div>
      <div class="lt-assure">
        <div class="lt-card lt-reveal"><span class="lt-k">Résilience</span><h3>Jamais d'écran bloqué</h3><p>Timeout, nouvelles tentatives et bascule sur un fournisseur de secours ; côté joueur, un message d'attente en personnage puis un repli en rôle.</p></div>
        <div class="lt-card lt-reveal"><span class="lt-k">Sauvegardes</span><h3>Un filet permanent</h3><p>Sauvegardes automatiques quotidiennes et manuelles de la base, restauration en un geste, et sauvegarde avant chaque mise à jour.</p></div>
        <div class="lt-card lt-reveal"><span class="lt-k">Mises à jour</span><h3>En un clic</h3><p>Notification dans l'application et installation un-clic sous Windows ; la base migre son schéma toute seule au démarrage.</p></div>
      </div>
    </div>
  </section>

  <section id="deploy" class="lt-section lt-band">
    <div class="lt-wrap">
      <div class="lt-section-head lt-reveal">
        <span class="lt-eyebrow">Déploiement</span>
        <h2>Déployez comme ça vous arrange.</h2>
      </div>
      <div class="lt-deploy">
        <div class="lt-fmt lt-reveal"><span class="lt-name">Docker</span><span class="lt-who">Serveur Linux ou NAS</span><span class="lt-req">Prérequis : <b>Docker</b></span></div>
        <div class="lt-fmt lt-reveal"><span class="lt-name">Installeur Windows</span><span class="lt-who">Poste Windows, clé en main</span><span class="lt-req">Prérequis : <b>aucun</b></span></div>
        <div class="lt-fmt lt-reveal"><span class="lt-name">Installeur Linux</span><span class="lt-who">Serveur Linux, sans Docker</span><span class="lt-req">Prérequis : <b>systemd</b></span></div>
        <div class="lt-fmt lt-reveal"><span class="lt-name">Application macOS</span><span class="lt-who">Mac, barre de menus</span><span class="lt-req">Prérequis : <b>Apple Silicon</b></span></div>
      </div>
    </div>
  </section>

  <section id="pricing" class="lt-section">
    <div class="lt-wrap">
      <div class="lt-section-head lt-reveal">
        <span class="lt-eyebrow">Tarifs</span>
        <h2>Un prix par salle, dégressif.</h2>
        <p>Vous payez par salle active, et le tarif baisse dès que vous en avez plusieurs. Au-delà de cinq salles, on construit l'offre ensemble.</p>
      </div>
      <div class="lt-pricing">
        <div class="lt-tier lt-reveal">
          <span class="lt-tier-name">Essentiel</span>
          <span class="lt-tier-rooms">1 à 2 salles</span>
          <div class="lt-price"><span class="lt-amount">150€</span><span class="lt-unit">/ salle / mois</span></div>
          <p class="lt-tier-note">Pour se lancer avec une ou deux salles.</p>
          <a class="lt-btn lt-btn--ghost" href="#contact">Demander une démo</a>
        </div>
        <div class="lt-tier lt-tier--feature lt-reveal">
          <span class="lt-tier-badge">Le plus courant</span>
          <span class="lt-tier-name">Studio</span>
          <span class="lt-tier-rooms">3 à 4 salles</span>
          <div class="lt-price"><span class="lt-amount">140€</span><span class="lt-unit">/ salle / mois</span></div>
          <p class="lt-tier-note">Le tarif dégressif dès la troisième salle.</p>
          <a class="lt-btn" href="#contact">Demander une démo</a>
        </div>
        <div class="lt-tier lt-reveal">
          <span class="lt-tier-name">Enseigne</span>
          <span class="lt-tier-rooms">5 salles et +</span>
          <div class="lt-price"><span class="lt-amount">Sur devis</span></div>
          <p class="lt-tier-note">Multi-salles ou multi-sites : on construit l'offre ensemble.</p>
          <a class="lt-btn lt-btn--ghost" href="#contact">Demander un devis</a>
        </div>
      </div>
      <div class="lt-pricing-foot lt-reveal">
        <p class="lt-included"><b>Tout compris.</b> Chaque abonnement inclut la plateforme et la console maître du jeu, les mises à jour, les sauvegardes automatiques et le support. L'IA reste au choix, avec vos propres accès, cloud ou local.</p>
      </div>
    </div>
  </section>

  <section id="faq" class="lt-section">
    <div class="lt-wrap">
      <div class="lt-section-head lt-reveal">
        <span class="lt-eyebrow">Les questions qu'on nous pose</span>
        <h2>Avant la démo, l'essentiel.</h2>
      </div>
      <div class="lt-faq">
        <details class="lt-qa lt-reveal">
          <summary>Quelle IA faut-il ? Un abonnement est-il obligatoire ?<span class="lt-plus" aria-hidden="true"></span></summary>
          <p>Vous branchez la vôtre. Un fournisseur cloud (OpenAI, Google Gemini et bien d'autres) avec vos propres clés, ou un modèle <b>local</b> compatible OpenAI - Ollama, LM Studio, vLLM. Aucun abonnement à Leticia : vous ne payez que l'IA que vous choisissez, ou rien du tout en local.</p>
        </details>
        <details class="lt-qa lt-reveal">
          <summary>Mes données partent-elles dans le cloud ?<span class="lt-plus" aria-hidden="true"></span></summary>
          <p>Non. L'application et sa base tournent sur <b>votre serveur</b> ; rien ne quitte votre réseau, à l'exception des appels vers le fournisseur d'IA que vous décidez d'utiliser. Avec un modèle local, même ces appels restent chez vous : tout est hors-ligne.</p>
        </details>
        <details class="lt-qa lt-reveal">
          <summary>Que faut-il pour la borne joueur ?<span class="lt-plus" aria-hidden="true"></span></summary>
          <p>Rien à installer côté salle : un écran tactile avec micro, un navigateur ouvert en plein écran pointé sur le serveur. Le lecteur de badge RFID est en option pour choisir un personnage d'un simple tap. Appairée une fois, la borne ne se reconfigure plus.</p>
        </details>
        <details class="lt-qa lt-reveal">
          <summary>Combien de salles en même temps ?<span class="lt-plus" aria-hidden="true"></span></summary>
          <p>Plusieurs parties tournent en parallèle sur le même serveur, une borne par salle. Le maître du jeu associe chaque partie à sa borne au lancement, depuis la console.</p>
        </details>
        <details class="lt-qa lt-reveal">
          <summary>Et si l'IA tombe en panne pendant une partie ?<span class="lt-plus" aria-hidden="true"></span></summary>
          <p>La boucle est conçue pour le live : timeout, nouvelles tentatives et bascule automatique sur un fournisseur de secours. Côté joueur, un message d'attente resté en personnage, puis un repli en rôle. Jamais d'écran cassé devant les joueurs.</p>
        </details>
        <details class="lt-qa lt-reveal">
          <summary>Comment on l'installe ?<span class="lt-plus" aria-hidden="true"></span></summary>
          <p>Quatre formats : une image <b>Docker</b> pour un serveur Linux ou un NAS, un <b>installeur Windows</b> clé en main sans prérequis, un <b>installeur Linux</b> (binaire + service systemd, sans Docker), ou une <b>application macOS</b> (Apple Silicon, barre de menus). La base met son schéma à jour toute seule au démarrage.</p>
        </details>
      </div>
    </div>
  </section>

  `;
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];

    // Typed suspect reply.
    const typed = root.querySelector<HTMLElement>('[data-typed]');
    if (typed && !reduce) {
      let i = 0;
      let timer = 0;
      typed.textContent = '';
      const tick = () => {
        if (i <= REPLY.length) {
          typed.textContent = REPLY.slice(0, i);
          i += 1;
          timer = window.setTimeout(tick, 34);
        }
      };
      timer = window.setTimeout(tick, 700);
      cleanups.push(() => window.clearTimeout(timer));
    }

    // Voice waveform.
    const canvas = root.querySelector<HTMLCanvasElement>('canvas.lt-wave');
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bars = 46;
      const seeds = Array.from({length: bars}, () => Math.random() * Math.PI * 2);
      const sizeCanvas = () => {
        const r = canvas.getBoundingClientRect();
        canvas.width = r.width * dpr;
        canvas.height = r.height * dpr;
      };
      sizeCanvas();
      const accent = () => getComputedStyle(root).getPropertyValue('--lt-wave').trim() || '#b53929';
      const draw = (t: number) => {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = accent();
        const gap = w / bars;
        const bw = Math.max(dpr * 2, gap * 0.42);
        for (let k = 0; k < bars; k += 1) {
          const env = Math.sin((k / bars) * Math.PI);
          const amp = reduce
            ? 0.35 + 0.5 * env
            : 0.2 + 0.8 * Math.abs(Math.sin(t / 520 + seeds[k])) * (0.35 + 0.65 * env);
          const bh = Math.max(dpr * 2, amp * h * 0.9);
          const x = k * gap + (gap - bw) / 2;
          const y = (h - bh) / 2;
          ctx.globalAlpha = 0.35 + 0.65 * env;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(x, y, bw, bh, bw / 2);
          else ctx.rect(x, y, bw, bh);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      };
      let raf = 0;
      if (reduce) {
        draw(0);
      } else {
        const loop = (t: number) => {
          draw(t);
          raf = window.requestAnimationFrame(loop);
        };
        raf = window.requestAnimationFrame(loop);
      }
      const onResize = () => {
        sizeCanvas();
        if (reduce) draw(0);
      };
      window.addEventListener('resize', onResize);
      cleanups.push(() => {
        if (raf) window.cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
      });
    }

    // Scroll-reveal safety net: the CSS `.lt-reveal` entry animation (see
    // landing.css) never progresses for an element already intersecting the
    // viewport at first paint - there's no scroll to "enter" from, so it gets
    // stuck at the animation's `from` keyframe (opacity: 0), permanently
    // invisible on any viewport short enough to show the first section or two
    // without scrolling. The hero itself is excluded in CSS, but everything
    // below it is viewport-height-dependent, so it can't be guarded statically.
    // One-time check at mount: anything already on screen skips the animation
    // outright and simply renders visible, same as its post-reveal end state.
    if (!reduce) {
      for (const el of root.querySelectorAll<HTMLElement>('.lt-reveal')) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.animation = 'none';
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <Layout title="Interrogatoires narratifs par IA" description={siteConfig.tagline as string}>
      <div className="lt-root" ref={rootRef}>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{__html: markup()}}
        />
        <section id="contact" className="lt-section lt-final">
          <div className="lt-wrap">
            <div className="lt-inner lt-reveal">
              <h2>Faites parler vos personnages.</h2>
              <p>Une démo, un échange sur votre salle, et on regarde ensemble comment Leticia s'installe chez vous.</p>
              <ContactForm />
              <p className="lt-form-alt">
                Vous préférez l'email ?{' '}
                <a href="mailto:leticia@leticia-app.com?subject=D%C3%A9mo%20Leticia">leticia@leticia-app.com</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
