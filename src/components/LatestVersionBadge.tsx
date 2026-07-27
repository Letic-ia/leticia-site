import React, {useEffect, useState} from 'react';

interface ReleaseInfo {
  version: string;
  publishedAt: string | null;
}

const RELEASES_URL = 'https://api.github.com/repos/Letic-ia/leticia-release/releases/latest';

/** Live "latest version" badge, fetched client-side from the public GitHub
 * releases API - the same source the app itself checks against. Silent on
 * failure (offline reader, rate limit...): never blocks the page on a flaky
 * network call. */
export default function LatestVersionBadge(): React.ReactElement | null {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(RELEASES_URL, {headers: {Accept: 'application/vnd.github+json'}})
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('bad response'))))
      .then((data: {tag_name?: string; published_at?: string}) => {
        if (cancelled) return;
        const version = String(data.tag_name ?? '').replace(/^v/i, '');
        if (version) {
          setRelease({version, publishedAt: data.published_at ?? null});
        } else {
          setFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed || !release) return null;

  const published = release.publishedAt
    ? new Date(release.publishedAt).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})
    : null;

  return (
    <div
      style={{
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        margin: '1rem 0',
        fontSize: '0.95rem',
      }}
    >
      <strong>Dernière version disponible : v{release.version}</strong>
      {published && <span style={{color: 'var(--ifm-color-emphasis-700)'}}> (publiée le {published})</span>}
      {' - '}
      <a
        href={`https://github.com/Letic-ia/leticia-release/releases/tag/v${release.version}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        notes de version
      </a>
    </div>
  );
}
