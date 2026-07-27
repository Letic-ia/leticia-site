import React, {useId, useState, type FormEvent} from 'react';

// Static site (GitHub Pages), no backend of its own: submissions go straight
// to Web3Forms (https://web3forms.com), which relays them by email without
// exposing any server-side code here. Get a free access key by entering an
// email on their site, then paste it below before the form goes live.
const WEB3FORMS_ACCESS_KEY = 'REMPLACER_PAR_VOTRE_CLE_WEB3FORMS';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm(): React.ReactElement {
  const [status, setStatus] = useState<Status>('idle');
  const nameId = useId();
  const emailId = useId();
  const roomsId = useId();
  const messageId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append('access_key', WEB3FORMS_ACCESS_KEY);
    data.append('subject', 'Demande de démo Leticia');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {Accept: 'application/json'},
        body: data,
      });
      const result: {success?: boolean} = await response.json();
      if (result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="lt-form-done" role="status">
        <h3>Message envoyé.</h3>
        <p>On vous répond rapidement, à l'adresse indiquée.</p>
      </div>
    );
  }

  return (
    <form className="lt-form" onSubmit={handleSubmit}>
      {/* Honeypot: left empty and hidden from sighted users; Web3Forms
          rejects submissions where a bot has filled it in. */}
      <input
        type="checkbox"
        name="botcheck"
        className="lt-form-hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="lt-form-row">
        <div className="lt-field">
          <label htmlFor={nameId}>Nom</label>
          <input id={nameId} name="name" type="text" required autoComplete="name" />
        </div>
        <div className="lt-field">
          <label htmlFor={emailId}>Email</label>
          <input id={emailId} name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="lt-field">
        <label htmlFor={roomsId}>Nombre de salles (optionnel)</label>
        <input id={roomsId} name="rooms" type="text" placeholder="ex. 3" />
      </div>
      <div className="lt-field">
        <label htmlFor={messageId}>Message</label>
        <textarea id={messageId} name="message" rows={4} required placeholder="Votre projet, votre salle, vos questions…" />
      </div>
      <button type="submit" className="lt-btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Envoi…' : 'Envoyer'}
      </button>
      {status === 'error' && (
        <p className="lt-form-error" role="alert">
          Échec de l'envoi. Réessayez, ou écrivez directement à{' '}
          <a href="mailto:leticia@ggestin.com">leticia@ggestin.com</a>.
        </p>
      )}
    </form>
  );
}
