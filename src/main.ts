import './style.css'
import { RealtimeAgent, RealtimeSession } from '@openai/agents-realtime';
import { getCharacters } from './characters/index.ts';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div>
    <h1>Realtime Audio Demo</h1>
    <div id="character-buttons" class="card"></div>
    <p id="status" class="read-the-docs">Pick a character to start.</p>
  </div>
`;

const statusEl = document.getElementById('status') as HTMLParagraphElement;
const buttonsEl = document.getElementById('character-buttons') as HTMLDivElement;

let currentSession: RealtimeSession | null = null;

async function startSessionForCharacter(id: string, name: string, instructions: string, voice?: string) {
    if (currentSession) {
        try { currentSession.close(); } catch {}
        currentSession = null;
    }

    const agent = new RealtimeAgent({
        name,
        instructions,
        voice,
    });

    const session = new RealtimeSession(agent, {
        model: 'gpt-realtime',
        config: {
            turnDetection: {
                type: 'semantic_vad',
                eagerness: 'medium',
            },
        },
    });

    statusEl.textContent = `Connecting as ${name}...`;
    try {
        await session.connect({
            apiKey: 'ek_6903a703b67c8191a9282580b0c896a8',
        });
        currentSession = session;
        statusEl.textContent = `Connected: ${name}. Start talking.`;
    } catch (e) {
        console.error(e);
        statusEl.textContent = `Failed to connect for ${name}. Check console.`;
    }
}

function renderCharacterButtons() {
    const characters = getCharacters();
    buttonsEl.innerHTML = '';
    characters.forEach((c) => {
        const btn = document.createElement('button');
        btn.textContent = c.name;
        btn.addEventListener('click', () => startSessionForCharacter(c.id, c.name, c.instructions, c.voice));
        buttonsEl.appendChild(btn);
    });

    if (characters.length > 0) {
        // Auto-start first character for convenience
        const first = characters[0];
        startSessionForCharacter(first.id, first.name, first.instructions, first.voice);
    }
}

renderCharacterButtons();
