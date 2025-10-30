import type { Character } from './types';

type Module = { default: Character };

// Eagerly import all character modules in this folder except this index file and types
const modules = import.meta.glob<Module>('./*.ts', { eager: true });

function isCharacter(candidate: any): candidate is Character {
    return candidate && typeof candidate.id === 'string' && typeof candidate.name === 'string' && typeof candidate.instructions === 'string';
}

export function getCharacters(): Character[] {
    const characters: Character[] = [];
    for (const [path, mod] of Object.entries(modules)) {
        if (path.endsWith('/index.ts') || path.endsWith('/types.ts')) continue;
        const c = (mod as Module).default;
        if (isCharacter(c)) {
            characters.push(c);
        }
    }
    // Ensure stable order by name
    characters.sort((a, b) => a.name.localeCompare(b.name));
    return characters;
}


