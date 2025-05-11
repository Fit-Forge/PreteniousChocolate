// Personality analysis and bonbon builder logic
const bonbonAnalyzer = {
    selections: {
        shell: '',
        shape: '',
        filling: '',
        finish: ''
    },

    // Personality traits for each choice
    traits: {
        shell: {
            dark: "You consider yourself an intellectual, probably own at least three editions of Nietzsche",
            white: "Your aesthetic sensibilities lean towards the avant-garde, though you insist it's 'post-avant-garde'",
            milk: "You're trying to appear approachable while still maintaining an air of superiority",
            gold: "Subtlety isn't your strong suit, but you've made ostentation an art form"
        },
        shape: {
            sphere: "A perfectionist who appreciates classical geometry, you probably correct people's pronunciation of 'macarons'",
            skull: "Your Instagram aesthetic is carefully curated gothcore, and you only drink wine from black crystal glasses",
            dragon: "You've convinced yourself that your fantasy novel collection is actually a commentary on modern society",
            gem: "You describe yourself as 'multifaceted' without a hint of irony"
        },
        filling: {
            lavender: "You've definitely claimed to smell notes of 'fresh tennis balls' in wine",
            rose: "You speak in flowery metaphors and probably own multiple silk robes",
            absinthe: "You quote Baudelaire at parties, unprompted",
            mead: "You've attended at least one Renaissance Faire 'ironically'"
        },
        finish: {
            shimmer: "You're not satisfied unless your food is Instagram-ready",
            matte: "You believe texture is a personality trait",
            crystal: "You own healing crystals but only 'for their aesthetic value'",
            platinum: "You've described yourself as 'extra' but in French"
        }
    },

    // Special combinations that trigger unique readings
    combinations: {
        "skull-absinthe-platinum": "Ah, the tortured artist emerges. Your bonbon choice reveals a soul that yearns to be understood, yet paradoxically revels in being misunderstood. You probably have a collection of vintage absinthe spoons you've never used.",
        "dragon-mead-crystal": "A fantasy enthusiast with delusions of medieval grandeur. You've definitely named your sourdough starter something like 'Dragomyces the Elder'.",
        "gold-gem-shimmer": "Subtlety isn't merely dead in your world; it was never born. You don't just want to be seen, you want to be visible from space.",
        "dark-sphere-matte": "You're the type who insists on using the Latin names for chocolate varieties and has strong opinions about bean terroir."
    },

    // Generate visual preview
    updatePreview(type, value) {
        const preview = document.querySelector('.bonbon-preview');
        
        // Update the visual representation based on selections
        switch(type) {
            case 'shell':
                preview.style.backgroundColor = this.getShellColor(value);
                break;
            case 'shape':
                preview.style.borderRadius = this.getShape(value);
                break;
            case 'finish':
                preview.style.filter = this.getFinish(value);
                break;
        }
    },

    getShellColor(value) {
        const colors = {
            dark: '#2c1810',
            white: '#f5e6d3',
            milk: '#8b4513',
            gold: 'linear-gradient(45deg, #ffd700, #b8860b)'
        };
        return colors[value] || '#2c1810';
    },

    getShape(value) {
        const shapes = {
            sphere: '50%',
            skull: '30% 30% 50% 50% / 75% 75% 25% 25%',
            dragon: '63% 37% 37% 63% / 43% 37% 63% 57%',
            gem: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
        };
        return shapes[value] || '50%';
    },

    getFinish(value) {
        const finishes = {
            shimmer: 'brightness(1.2) contrast(1.1)',
            matte: 'brightness(0.9) contrast(0.9)',
            crystal: 'brightness(1.3) contrast(1.2) saturate(1.2)',
            platinum: 'brightness(1.4) sepia(0.3) hue-rotate(290deg)'
        };
        return finishes[value] || 'none';
    },

    // Generate personality reading
    generateReading() {
        let reading = "Dearest connoisseur of confectionery consciousness, your choices speak volumes...\n\n";
        
        // Check for special combinations
        const combo = `${this.selections.shape}-${this.selections.filling}-${this.selections.finish}`;
        if (this.combinations[combo]) {
            return this.combinations[combo];
        }

        // Generate individual trait readings
        for (let [type, value] of Object.entries(this.selections)) {
            if (value && this.traits[type][value]) {
                reading += this.traits[type][value] + ". ";
            }
        }

        return reading + "\n\nPerhaps it's time to embrace your inner pretentiousness. After all, if one must be pretentious, one should excel at it.";
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.option-button');
    const revealButton = document.querySelector('.reveal-button');
    const personalityReveal = document.querySelector('.personality-reveal');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Deselect other buttons in the same group
            const type = button.dataset.type;
            document.querySelectorAll(`[data-type="${type}"]`).forEach(b => b.classList.remove('selected'));
            
            // Select this button
            button.classList.add('selected');
            
            // Update selections
            bonbonAnalyzer.selections[type] = button.dataset.value;
            
            // Update preview
            bonbonAnalyzer.updatePreview(type, button.dataset.value);
        });
    });

    revealButton.addEventListener('click', () => {
        // Check if all selections are made
        const allSelected = Object.values(bonbonAnalyzer.selections).every(value => value);
        
        if (!allSelected) {
            personalityReveal.style.display = 'block';
            personalityReveal.innerHTML = "Darling, one must commit to all aspects of their creation. Much like life itself, a bonbon is incomplete without all its essential elements.";
            return;
        }

        // Generate and display reading
        personalityReveal.style.display = 'block';
        personalityReveal.innerHTML = bonbonAnalyzer.generateReading();
        
        // Add some animation
        personalityReveal.style.opacity = '0';
        personalityReveal.style.transform = 'translateY(20px)';
        setTimeout(() => {
            personalityReveal.style.transition = 'all 0.5s ease';
            personalityReveal.style.opacity = '1';
            personalityReveal.style.transform = 'translateY(0)';
        }, 100);
    });
}); 
