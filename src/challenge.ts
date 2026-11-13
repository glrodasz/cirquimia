/**
 * A challenge link (/s/<id>) opens the game with the challenger's match in the URL (src/leaderboard/challengeLink.ts).
 *
 * Only players who already finished the tutorial take the challenge: the same meadow, rival count and level. A first-time
 * player gets the tutorial as on any first visit. Either way the parameter leaves the URL, so a reload or the next match
 * plays on as usual.
 */
import { CHALLENGE_PARAM, parseChallenge, type Challenge } from './leaderboard/challengeLink';

function read(): Challenge | null {
  try {
    const url = new URL(location.href);
    const value = url.searchParams.get(CHALLENGE_PARAM);
    if (value === null) return null;
    url.searchParams.delete(CHALLENGE_PARAM);
    history.replaceState(history.state, '', url);
    // The tutorial's own flag (src/tutorial.ts); ?tutorial replays it, and then the challenge waits too.
    const veteran = localStorage.getItem('cirquimia.tutorial') === 'done' && !url.searchParams.has('tutorial');
    return veteran ? parseChallenge(value) : null;
  } catch {
    return null; // sandboxed frame or blocked storage: play as usual
  }
}

/** The challenge this visit opened with, read once as the game loads. */
export const challenge = read();
