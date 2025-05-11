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
        "heart-cherry-ruby": "The hopeless romantic who writes poetry in a leather-bound journal, but only in coffee shops where people can see you.",
        "dark-obsidian-matte": "The void gazes back. Your commitment to darkness extends beyond aesthetics into a lifestyle choice that would make Edgar Allan Poe suggest 'lightening up a bit.'",
        "white-azure-crystal": "Ah, minimalism as maximalism. You've transcended the mere appreciation of white space into fetishizing it.",
        "gold-purple-shimmer": "Your dedication to opulence would make Marie Antoinette whisper 'perhaps that's a bit much.'",
        "skull-ruby-crystal": "The gothic romantic meets the baroque. You probably write poetry about bleeding roses while sipping wine from a crystal skull.",
        "dragon-emerald-shimmer": "Fantasy meets luxury. You've named your houseplants after ancient deities and speak to them in constructed languages.",
        "gem-azure-platinum": "Geometry as destiny. You arrange your books by crystal resonance frequency rather than alphabetically.",
        "lotus-purple-shimmer": "The spiritual materialist emerges. Your meditation cushion costs more than most people's furniture.",
        "pyramid-gold-crystal": "Ancient wisdom meets modern excess. You've definitely claimed to have had a past life as an Egyptian royal.",
        "heart-ruby-platinum": "Romance as performance art. Your love letters are written in calligraphy on paper you've aged with tea stains.",
        "moon-obsidian-crystal": "Nocturnal sophistication incarnate. You only host dinner parties during lunar eclipses.",
        "lavender-crystal-gold": "Botanical elegance personified. You've developed strong opinions about the correct angle for holding a teacup.",
        "rose-shimmer-white": "Floral decadence embodied. Your garden grows only flowers that were popular in Victorian poetry.",
        "absinthe-platinum-dark": "The depths of refined debauchery. Your bar cart is arranged by 'emotional resonance' rather than spirit type.",
        "mead-crystal-gold": "Medieval luxury reborn. You've attempted to start a renaissance in your local coffee shop.",
        "jasmine-shimmer-white": "Eastern aesthetics through a Western lens. You correct people's pronunciation of 'gaiwan' unprompted.",
        "cardamom-crystal-gold": "Spice route sophistication. Your spice cabinet is organized by historical trade route significance.",
        "saffron-platinum-gold": "Precious indulgence personified. You've been known to lecture on the sociopolitical implications of spice trading.",
        "fig-crystal-dark": "Mediterranean mystique distilled. You've written a manifesto on the cultural significance of dried fruits.",
        "yuzu-shimmer-white": "Cross-cultural culinary pretension. You own three different types of matcha whisks and have named them all.",
        "cherry-crystal-dark": "Classical refinement reimagined. You pair your chocolates with specific movements from baroque symphonies.",
        "moon-lavender-crystal": "Ah yes, the nocturnal aesthete. You've definitely hosted a midnight tea ceremony during a full moon.",
        "skull-absinthe-platinum": "The tortured artist emerges. Your bonbon choice reveals a soul that yearns to be understood, yet paradoxically revels in being misunderstood.",
        "dragon-saffron-gold": "The maximalist emerges. You don't just want to make a statement, you want to write an entire manifesto in precious metals.",
        "lotus-jasmine-shimmer": "The wellness influencer has entered the chat. Your meditation app subscription is more expensive than your therapy.",
        "pyramid-cardamom-crystal": "The spice archaeologist reveals themselves. You've created a detailed timeline of historical spice trade routes and their impact on contemporary coffee culture.",
        "heart-rose-platinum": "The romantic philosopher appears. Your love letters are written in archaic French and sealed with wax made from rare Himalayan beeswax.",
        "gem-yuzu-crystal": "The fusion aesthete manifests. Your tea collection is arranged by geographical elevation of origin.",
        "sphere-fig-gold": "The geometric gourmand arrives. You've developed a theory about the golden ratio in dried fruit arrangements."
    },

    // Generate visual preview
    updatePreview(type, value) {
        const preview = document.querySelector('.bonbon-preview');
        
        // Reset animations
        preview.style.animation = 'none';
        
        // Update the visual representation based on selections
        switch(type) {
            case 'shell':
                preview.style.backgroundColor = this.getShellColor(value);
                break;
            case 'color':
                this.getColor(value);
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
            purple: {
                base: '#663399',
                gradient: 'linear-gradient(45deg, #663399, #9370DB, #663399)',
                animation: 'purpleShimmer 3s infinite'
            },
            emerald: {
                base: '#50C878',
                gradient: 'linear-gradient(45deg, #50C878, #3CB371, #50C878)',
                animation: 'emeraldGlow 3s infinite'
            },
            ruby: {
                base: '#E0115F',
                gradient: 'linear-gradient(45deg, #E0115F, #FF0000, #E0115F)',
                animation: 'rubyPulse 3s infinite'
            },
            azure: {
                base: '#007FFF',
                gradient: 'linear-gradient(45deg, #007FFF, #87CEEB, #007FFF)',
                animation: 'azureWave 3s infinite'
            },
            gold: {
                base: '#FFD700',
                gradient: 'linear-gradient(45deg, #FFD700, #DAA520, #FFD700)',
                animation: 'goldLuster 3s infinite'
            },
            obsidian: {
                base: '#1B1B1B',
                gradient: 'linear-gradient(45deg, #1B1B1B, #2F4F4F, #1B1B1B)',
                animation: 'obsidianRipple 3s infinite'
            }
        };
        
        const preview = document.querySelector('.bonbon-preview');
        const colorData = colors[value] || { base: '#2c1810', gradient: 'none', animation: 'none' };
        
        preview.style.background = colorData.gradient;
        preview.style.animation = `${colorData.animation}, ${preview.style.animation || 'none'}`.replace('none, ', '');
        
        return colorData.base;
    },

    getShape(value) {
        const shapes = {
            sphere: {
                borderRadius: '50%',
                clipPath: 'none'
            },
            skull: {
                borderRadius: '0',
                clipPath: 'path("M50 5C25 5 5 25 5 50C5 75 25 95 50 95C75 95 95 75 95 50C95 25 75 5 50 5ZM30 40C30 35 35 30 40 30C45 30 50 35 50 40C50 45 45 50 40 50C35 50 30 45 30 40ZM70 40C70 35 65 30 60 30C55 30 50 35 50 40C50 45 55 50 60 50C65 50 70 45 70 40ZM25 65C25 65 35 80 50 80C65 80 75 65 75 65C75 65 65 70 50 70C35 70 25 65 25 65Z")'
            },
            dragon: {
                borderRadius: '0',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            },
            gem: {
                borderRadius: '0',
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
            },
            lotus: {
                borderRadius: '0',
                clipPath: 'path("M50 0C60 40 90 50 90 70C90 85 75 95 50 95C25 95 10 85 10 70C10 50 40 40 50 0")'
            },
            pyramid: {
                borderRadius: '0',
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
            },
            heart: {
                borderRadius: '0',
                clipPath: 'path("M50 15C45 5 20 5 20 25C20 45 50 75 50 75C50 75 80 45 80 25C80 5 55 5 50 15")'
            },
            moon: {
                borderRadius: '0',
                clipPath: 'path("M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM50 90C27.9 90 10 72.1 10 50C10 27.9 27.9 10 50 10C72.1 10 90 27.9 90 50C90 72.1 72.1 90 50 90Z")'
            }
        };

        const preview = document.querySelector('.bonbon-preview');
        const shapeData = shapes[value] || shapes.sphere;

        preview.style.borderRadius = shapeData.borderRadius;
        preview.style.clipPath = shapeData.clipPath;

        // Add shape-specific animations
        switch(value) {
            case 'dragon':
                preview.style.animation = 'rotatePreview 6s infinite ease-in-out';
                break;
            case 'gem':
                preview.style.animation = 'rotatePreview 4s infinite ease-in-out';
                break;
            case 'lotus':
                preview.style.animation = 'pulseScale 3s infinite ease-in-out';
                break;
            case 'moon':
                preview.style.animation = 'moonGlow 4s infinite ease-in-out';
                break;
            default:
                preview.style.animation = 'none';
        }

        return shapeData.borderRadius;
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
        
        // Create a dramatic flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: white;
            opacity: 0;
            pointer-events: none;
            z-index: 100;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(flash);

        // Flash sequence
        setTimeout(() => {
            flash.style.opacity = '0.5';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => flash.remove(), 300);
            }, 100);
        }, 0);

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

        // Get the reading
        const reading = this.generateReading();

        // Dramatic reveal of the text
        personalityReveal.style.display = 'block';
        personalityReveal.innerHTML = '';
        
        // Split the reading into characters for dramatic typing effect
        const chars = reading.split('');
        chars.forEach((char, index) => {
            setTimeout(() => {
                personalityReveal.innerHTML += char;
                if (index === chars.length - 1) {
                    // Add final flourish
                    personalityReveal.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        personalityReveal.style.transform = 'scale(1)';
                    }, 200);
                }
            }, index * 20); // Adjust typing speed here
        });

        return reading;
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
