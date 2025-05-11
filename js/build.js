// Personality analysis and bonbon builder logic
const bonbonAnalyzer = {
    selections: {
        shell: '',
        shape: '',
        color: '',
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
            gem: "You describe yourself as 'multifaceted' without a hint of irony",
            lotus: "You've mastered the art of appearing spiritually enlightened while wearing designer yoga pants",
            pyramid: "Your fascination with ancient civilizations is limited to their aesthetic potential",
            heart: "Your romantic sensibilities are carefully curated to appear tragically poetic",
            moon: "You probably have a tattoo in a language you don't speak"
        },
        color: {
            purple: "You consider yourself royalty in all but title, and have strong opinions about wine glasses",
            emerald: "Your connection to nature extends primarily to expensive botanical prints and designer succulents",
            ruby: "Your passion for the dramatic is matched only by your collection of vintage opera recordings",
            azure: "You've convinced yourself that your spirit animal is a peacock, despite never having seen one in person",
            gold: "You're not just trying to keep up with the Joneses, you're trying to make them feel inadequate",
            obsidian: "Your wardrobe is exclusively black, and you judge people who wear beige"
        },
        filling: {
            lavender: "You've definitely claimed to smell notes of 'fresh tennis balls' in wine",
            rose: "You speak in flowery metaphors and probably own multiple silk robes",
            absinthe: "You quote Baudelaire at parties, unprompted",
            mead: "You've attended at least one Renaissance Faire 'ironically'",
            jasmine: "You've memorized the steeping times for seventeen varieties of tea, purely to correct others",
            cardamom: "Your spice cabinet is alphabetized and you won't apologize for it",
            saffron: "You casually mention the price of saffron in conversation, unprompted",
            fig: "You've definitely described yourself as 'Mediterranean at heart' despite being from Nebraska",
            yuzu: "You correct people's pronunciation of 'yuzu' while pretending to be embarrassed about it",
            cherry: "Your appreciation for classics extends mainly to things you can name-drop at dinner parties"
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
        "dark-sphere-matte": "You're the type who insists on using the Latin names for chocolate varieties and has strong opinions about bean terroir.",
        "dragon-saffron-gold": "Ah, the maximalist emerges. You don't just want to make a statement, you want to write an entire manifesto in precious metals.",
        "skull-cherry-obsidian": "The gothic romantic who secretly listens to baroque chamber music while reading Edgar Allan Poe by candlelight.",
        "gem-yuzu-crystal": "Your fascination with Japanese culture is matched only by your ability to make everything about your semester abroad.",
        "sphere-cardamom-azure": "You've turned your morning coffee ritual into performance art, and your friends are too tired to complain.",
        "lotus-jasmine-shimmer": "The wellness influencer has entered the chat. Your meditation app subscription is more expensive than your therapy.",
        "moon-lavender-crystal": "Ah yes, the nocturnal aesthete. You've definitely hosted a midnight tea ceremony during a full moon.",
        "pyramid-saffron-gold": "Your apartment is filled with 'authentic' artifacts from countries you've never visited.",
        "heart-cherry-ruby": "The hopeless romantic who writes poetry in a leather-bound journal, but only in coffee shops where people can see you."
    },

    // Generate visual preview
    updatePreview(type, value) {
        const preview = document.querySelector('.bonbon-preview');
        
        // Update the visual representation based on selections
        switch(type) {
            case 'shell':
                preview.style.backgroundColor = this.getShellColor(value);
                break;
            case 'color':
                preview.style.backgroundColor = this.getColor(value);
                break;
            case 'shape':
                preview.style.borderRadius = this.getShape(value);
                break;
            case 'finish':
                preview.style.filter = this.getFinish(value);
                break;
        }

        // Check for special combinations
        const combo = `${this.selections.shape}-${this.selections.filling}-${this.selections.finish}`;
        if (this.combinations[combo]) {
            preview.classList.add('special-combo');
            this.createParticles();
        } else {
            preview.classList.remove('special-combo');
        }

        // Add shimmer effect for certain finishes
        if (value === 'shimmer' || value === 'crystal') {
            preview.classList.add('shimmer-effect');
        } else {
            preview.classList.remove('shimmer-effect');
        }

        // Add rotation for certain shapes
        if (value === 'gem' || value === 'dragon') {
            preview.style.animation = 'rotatePreview 3s infinite ease-in-out';
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

    getColor(value) {
        const colors = {
            purple: '#663399',
            emerald: '#50C878',
            ruby: '#E0115F',
            azure: '#007FFF',
            gold: '#FFD700',
            obsidian: '#1B1B1B'
        };
        return colors[value] || '#2c1810';
    },

    getShape(value) {
        const shapes = {
            sphere: '50%',
            skull: '30% 30% 50% 50% / 75% 75% 25% 25%',
            dragon: '63% 37% 37% 63% / 43% 37% 63% 57%',
            gem: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            lotus: '50% 50% 50% 50% / 60% 60% 40% 40%',
            pyramid: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            heart: 'path("M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 6-5.191 2.389 0 4.928 1.311 6 4.311 1.072-3 3.611-4.311 6-4.311 2.932 0 6 1.4 6 5.191 0 4.105-5.37 8.863-11 14.402z")',
            moon: '70% 70% 30% 30% / 50% 50% 50% 50%'
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
    },

    createParticles() {
        const container = document.querySelector('.particle-container');
        const colors = [
            '#d4af37', '#b8860b', '#daa520', '#ffd700',
            'rgba(212, 175, 55, 0.7)', 'rgba(255, 215, 0, 0.8)'
        ];
        
        // Clear existing particles
        container.innerHTML = '';
        
        // Create multiple layers of particles
        for (let layer = 0; layer < 3; layer++) {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.animationDelay = (Math.random() * 2 + layer) + 's';
                particle.style.scale = 1 - (layer * 0.2);
                container.appendChild(particle);
            }
        }
    },

    revealPersonality() {
        const personalityReveal = document.querySelector('.personality-reveal');
        const preview = document.querySelector('.bonbon-preview');
        
        // Enhanced reveal animation sequence
        preview.style.transform = 'scale(1.2) rotate(180deg)';
        preview.style.filter = 'brightness(1.5)';
        
        setTimeout(() => {
            preview.style.transform = 'scale(1) rotate(360deg)';
            preview.style.filter = 'brightness(1)';
        }, 500);

        // Create multiple bursts of particles
        for (let burst = 0; burst < 3; burst++) {
            setTimeout(() => {
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        this.createParticles();
                    }, i * 50);
                }
            }, burst * 1000);
        }

        return this.generateReading();
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

        personalityReveal.style.display = 'block';
        personalityReveal.innerHTML = bonbonAnalyzer.revealPersonality();
        
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
