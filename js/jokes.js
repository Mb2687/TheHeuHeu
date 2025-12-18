(() => {
    const monthLabels = {
        '2025-12': 'Dec 2025'
    };

    const jokeCollections = {
        dad: {
            '2025-12': [
                "I used to play piano by ear, but now I use my hands.",
                "I’m reading a book on anti-gravity. It’s impossible to put down.",
                "I only know 25 letters of the alphabet. I don’t know y.",
                "I don’t trust stairs. They’re always up to something.",
                "I would avoid the sushi if I were you. It’s a little fishy.",
                "I used to be addicted to the hokey pokey, but I turned myself around.",
                "What do you call fake spaghetti? An impasta.",
                "Why did the scarecrow win an award? He was outstanding in his field.",
                "Why don’t eggs tell jokes? They’d crack each other up.",
                "How does a penguin build its house? Igloos it together.",
                "Why can’t a nose be 12 inches long? Because then it would be a foot.",
                "Why did the math book look sad? It had too many problems.",
                "I only get sick on weekdays. I must have a weekend immune system.",
                "I’m on a seafood diet. I see food and I eat it.",
                "Want to hear a construction joke? I’m still working on it.",
                "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
                "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
                "I used to be a banker, but I lost interest.",
                "Why don’t skeletons fight each other? They don’t have the guts.",
                "I’d tell you a time-travel joke, but you didn’t like it.",
                "Why did the laptop visit the doctor? It had a virus it couldn't ctrl-alt-delete.",
                "I told my kids the vacuum was hungry, so now they feed it every crumb.",
                "The belt went to jail because it held up a pair of pants.",
                "My calendar is fully booked—it has so many dates.",
                "I tried to come up with a carpentry joke, but it never nailed the landing.",
                "Why do bees have sticky hair? They use honeycombs.",
                "I bought a broken clock just for the time off.",
                "I told the dishwasher a joke; it left everything spotless.",
                "Why did the stadium get hot? All the fans left.",
                "I ordered a chicken and an egg online. I'll let you know which comes first.",
                "The broom got promoted because it swept the competition.",
                "I don't trust gardeners—they're always plotting something.",
                "Why did the pillow get arrested? It was caught smothering.",
                "My fridge started acting cool, so I gave it the cold shoulder.",
                "I told the blender to chill, but it just kept spinning out.",
                "Why did the math teacher plant seeds? She wanted square roots.",
                "I told my phone to leave me alone, so it went on airplane mode.",
                "Why do seagulls fly over the sea? If they flew over the bay they'd be bagels.",
                "I wrote a book on reverse psychology—don't read it.",
                "My toaster is so smart it pops up with unsolicited advice.",
                "Why did the couch break up with the remote? It felt used.",
                "My printer tells jokes—it has toner of them.",
                "Why did the cookie visit the therapist? It felt crumby.",
                "I asked the librarian if the library had books on paranoia. She whispered, 'They're right behind you.'",
                "I told the electrician a shocking story; he was grounded.",
                "Why did the tomato turn red? It saw the salad dressing.",
                "My bike can't stand on its own; it's two tired.",
                "I wear a chef hat when making cereal for the dramatic pour.",
                "I tried to sue the airport, but my case never took off.",
                "My GPS and I broke up; we kept going in different directions.",
                "Why did the scarecrow become a motivational speaker? He had a lot of field experience.",
                "I told my son to follow his dreams, so he went back to bed.",
                "Why did the coffee file a police report? It got mugged.",
                "I told the dog to stop chasing bikes. He said he can't—he's big on cycles.",
                "Our Wi-Fi is so slow even the snail unsubscribed.",
                "Why did the cloud stay home? It felt under the weather.",
                "I took my time machine to the bakery; the rolls were ahead of their time.",
                "Why did the keyboard sleep so well? It had two nice shifts.",
                "My flashlight and I had a bright idea; then it burned out.",
                "I tried to organize a hide-and-seek tournament, but good players are hard to find.",
                "Why did the picture frame leave the gallery? It felt trapped.",
                "I gave up on elevator jokes—they're uplifting only sometimes.",
                "My sneakers quit—they said they were tired of my steps.",
                "Why did the gardener win an award? He weeded out the competition.",
                "I told my car it was overheating; now it gives me the cold shoulder.",
                "Why don't skeletons use phones? They can't find the right tone.",
                "My new pen already broke; it has no point.",
                "I tried to make a belt out of watches—it was a waist of time.",
                "Why did the baker work overtime? He kneaded the dough.",
                "I told the microwave to chill—it said it doesn't have the defrost-hood."
            ]
        },
        pun: {
            '2025-12': [
                "I got fired from the orange juice factory. I couldn’t concentrate.",
                "I’m reading a book about glue. I just can’t put it down.",
                "I stayed up all night wondering where the sun went… then it dawned on me.",
                "I used to be a baker, but I couldn’t make enough dough.",
                "I don’t trust those trees. They seem kind of shady.",
                "The man who survived pepper spray and mustard gas is now a seasoned veteran.",
                "I was going to look for my missing watch, but I could never find the time.",
                "I once heard a joke about amnesia, but I forgot how it goes.",
                "I tried to catch some fog yesterday. Mist.",
                "The shovel was a ground-breaking invention.",
                "I used to hate facial hair, but then it grew on me.",
                "The rotation of the earth really makes my day.",
                "I’d tell you a chemistry joke, but I know I wouldn’t get a reaction.",
                "I once ate a clock. It was very time consuming.",
                "Becoming a vegetarian is a big missed steak.",
                "The future, the present, and the past walked into a bar. Things got a little tense.",
                "I used to be a shoe salesman until they gave me the boot.",
                "I gave all my dead batteries away. Free of charge.",
                "The scarecrow kept getting promoted because he was outstanding in his field.",
                "I bought a boat because it was on sail.",
                "I opened a bakery called Bread Pitt; it's full of loaf-ly people.",
                "I wrote a song about tortillas—actually, it's more of a wrap.",
                "My broom swept me off my feet; it was a clean getaway.",
                "I tried to start a hot sauce company, but it couldn't ketchup.",
                "I opened a candle shop—it makes scents.",
                "I bought a ceiling fan; he kept cheering for the roof.",
                "I told my suitcase we're not going anywhere; now it's case closed.",
                "I tried to hide in the candy store, but I couldn't Skittle away.",
                "I started a citrus band; we really know how to jam.",
                "I tried to learn origami, but it's a fold-finding mission.",
                "I run a bakery for ghosts—it's full of boo-berry muffins.",
                "I bought camouflage pants, but I couldn't find them.",
                "I told my watch we needed to talk; it said it's about time.",
                "I opened a coffee shop for cows—it's called Deja Moo.",
                "I wanted to be a gardener, but my plans kept getting rooted.",
                "I invest in stairs because they always bring me up.",
                "I started a podcast about clocks; it's about time.",
                "I almost opened a cat spa, but it felt too purr-sonal.",
                "I began selling corduroy pillows—they're making headlines.",
                "I told the baker his jokes were stale; he said they kneaded work.",
                "I joined a toothpaste club; they said I'd get a brush with fame.",
                "I opened a store for broken pencils—no point, but still.",
                "I wanted to be a shoe designer, but it wasn't my fit.",
                "I built a house of playing cards; talk about a decked-out home.",
                "I tried to start a blanket business, but it was under covers.",
                "I opened a music school for fish; it's all about good tuna.",
                "I made a belt out of yarn; it was a waist of knit.",
                "I started a garden on the moon; it's out of this world.",
                "I launched a gossip bakery—it's full of hot rolls.",
                "I dated a tennis ball; it had too many strings attached.",
                "I run a recycling plant for jokes—they're pun-secondhand.",
                "I opened a pizza place for wizards called Little Caesars Sorcery.",
                "I tried to write a book on wind; it just blew me away.",
                "I began a service delivering calendars; people date me now.",
                "I gave my dog a smartphone; he's in the barking lot.",
                "I bought a pair of skis; they really went downhill fast.",
                "I started a bakery for clocks—fresh second rolls every minute.",
                "I invented a singing shovel—it's a groundbreaking hit.",
                "I opened a bakery for breakdancers—lots of pop-n-locks.",
                "I made a necklace out of scissors; it was cutting edge.",
                "I created a dating app for trees—Timber is swiping right.",
                "I bought a belt buckle shaped like a battery; it keeps my pants charged.",
                "I run a dog photography business—every picture is paw-sitive.",
                "I invested in a bakery that only sells crumbs; micro-dough is big.",
                "I started a lettuce delivery service called Head Start.",
                "I opened a deodorant shop; business stinks but I'm rolling with it.",
                "I invented a new broom; it's sweeping the nation.",
                "I launched a bakery for secret agents—everything is on a knead-to-know basis.",
                "I sold a story to a tortilla magazine; it was a wrap feature.",
                "I started a pasta gym called Fettuccine Strong."
            ]
        },
        one: {
            '2025-12': [
                "I put my phone in airplane mode, but it’s still on the couch.",
                "I asked my dog what’s two minus two. He said nothing.",
                "I’m not lazy, I’m on energy-saving mode.",
                "Some days I amaze myself. Other days I look for my keys while they’re in my hand.",
                "My bed and I are perfect for each other, but my alarm clock keeps trying to break us up.",
                "I’m not arguing, I’m just explaining why I’m right.",
                "I don’t need a hairstylist, my pillow gives me a new style every morning.",
                "If at first you don’t succeed, then skydiving definitely isn’t for you.",
                "Common sense is like deodorant. The people who need it most never use it.",
                "I thought I was indecisive, but now I’m not so sure.",
                "I’d agree with you, but then we’d both be wrong.",
                "My wallet is like an onion. Opening it makes me cry.",
                "I told my computer I needed a break, and now it won’t stop sending me KitKat ads.",
                "I don’t trip over things, I do random gravity checks.",
                "The early bird can have the worm. I’ll take coffee.",
                "I’m on a see-food diet. I see food, I eat food, I regret food.",
                "I don’t have a dirty mind, I have a creative imagination.",
                "Running late counts as cardio, right?",
                "I used to think I was indecisive. Now I’m not sure.",
                "I was going to give you a bad joke about sodium, but Na.",
                "My smartwatch keeps telling me to stand, but my couch has custody.",
                "I drink coffee for your protection.",
                "My plants whisper 'water us' like it's a horror movie.",
                "I keep all my dad bod calories in the cloud.",
                "If stress burned calories, I'd be transparent.",
                "I asked my mirror for advice; it reflected poorly.",
                "Adulthood is mostly Googling how to do stuff your parents did for free.",
                "My wallet is on strike until inflation chills.",
                "I put the 'pro' in procrastinate.",
                "I talk to my dog so much he has office hours.",
                "My bed and I are exclusive; the alarm is our third wheel.",
                "My brain has too many tabs open and none of them are saving.",
                "I have a playlist for folding laundry; it's mostly tears.",
                "I like long walks to the fridge during commercial breaks.",
                "My love language is snacks delivered without asking.",
                "I joined a gym, but it's more of a donation.",
                "I'm not indecisive; I'm diversifying my options.",
                "Sarcasm is my cardio.",
                "I read labels for fun; it's the suspense.",
                "I told my anxiety to take a number; it's currently 87.",
                "I can't keep secrets; my face is a spoiler alert.",
                "I tried to be normal once; it was the worst two minutes ever.",
                "I'm so awkward I wave at strangers on mute calls.",
                "My hobby is adding stuff to carts and abandoning them.",
                "I treat deadlines like pirates—more guidelines than rules.",
                "Eye contacts? No thanks, I barely trust text messages.",
                "I measure time in coffee refills.",
                "I multitask by worrying about three things at once.",
                "I gave my phone a break; now we both have trust issues.",
                "I don’t need therapy, I have group chats.",
                "I collect socks the dryer swears don't exist.",
                "I plan to stop overthinking once I perfect it.",
                "I put my hair up like I'm about to accomplish something.",
                "My talent is remembering embarrassing moments in HD.",
                "I consider salads just crunchy excuses.",
                "My password hints are motivational quotes.",
                "I keep my expectations low so gravity has company.",
                "I'm fluent in sighing.",
                "I schedule naps like meetings.",
                "My fashion sense is 'did laundry yesterday.'",
                "I go the extra mile because the GPS recalculated.",
                "I'm not lazy, I'm energy efficient.",
                "I whisper 'plot twist' whenever things go wrong.",
                "My dreams are cinematic; the budget is zero.",
                "I answer the phone like it owes me money.",
                "My to-do list and I are in a passive-aggressive relationship.",
                "I chase happiness like it's the last slice of pizza.",
                "I'm not clumsy; the floor just hates me.",
                "I show up late because my future self asked me to.",
                "My attention span is buffering."
            ]
        }
    };

    const typeLabels = {
        dad: 'Dad Jokes',
        pun: 'Puns',
        one: 'One-Liners'
    };

    const archiveState = {
        type: 'mixed',
        month: 'all',
        query: ''
    };

    const parseMonthKey = (key) => {
        const [year, month] = key.split('-').map(Number);
        return new Date(year, month - 1, 1).getTime();
    };

    const getMonthLabel = (key) => {
        if (monthLabels[key]) {
            return monthLabels[key];
        }

        const [year, month] = key.split('-').map(Number);
        return new Date(year, month - 1, 1).toLocaleString('en-US', {
            month: 'short',
            year: 'numeric'
        });
    };

    const buildMonthlyGroups = (typeKey) => {
        const typeData = jokeCollections[typeKey];
        if (!typeData) {
            return [];
        }

        return Object.keys(typeData)
            .sort((a, b) => parseMonthKey(b) - parseMonthKey(a))
            .map((monthKey) => ({
                monthKey,
                label: getMonthLabel(monthKey),
                jokes: typeData[monthKey].slice()
            }));
    };

    const compiledTypeJokes = Object.keys(jokeCollections).reduce((acc, typeKey) => {
        acc[typeKey] = buildMonthlyGroups(typeKey).flatMap((group) => group.jokes);
        return acc;
    }, {});

    const allJokes = Object.values(compiledTypeJokes).flat();

    const getJokesByType = (type = 'mixed') => {
        if (!type || type === 'mixed' || !compiledTypeJokes[type]) {
            return allJokes;
        }

        return compiledTypeJokes[type];
    };

    const getReadableLabel = (type = 'mixed') => typeLabels[type] || 'All Jokes';

    const createJokeListElement = (label) => {
        const list = document.createElement('div');
        list.className = 'joke-scroll';
        list.setAttribute('role', 'list');
        if (label) {
            list.setAttribute('aria-label', label);
        }
        return list;
    };

    const createJokeCardElement = (monthLabel, text) => {
        const card = document.createElement('div');
        card.className = 'joke-card';
        card.setAttribute('role', 'listitem');

        const tag = document.createElement('span');
        tag.textContent = monthLabel;
        card.appendChild(tag);

        card.appendChild(document.createTextNode(text));
        return card;
    };

    const getAvailableMonthKeys = (type = 'mixed') => {
        if (type && type !== 'mixed' && jokeCollections[type]) {
            return Object.keys(jokeCollections[type]).sort((a, b) => parseMonthKey(b) - parseMonthKey(a));
        }

        const monthSet = new Set();
        Object.values(jokeCollections).forEach((typeData) => {
            Object.keys(typeData).forEach((month) => monthSet.add(month));
        });

        return Array.from(monthSet).sort((a, b) => parseMonthKey(b) - parseMonthKey(a));
    };

    const getArchiveGroups = (type = 'mixed') => {
        if (type && type !== 'mixed' && jokeCollections[type]) {
            return [{
                type,
                label: getReadableLabel(type),
                months: buildMonthlyGroups(type)
            }];
        }

        return Object.keys(jokeCollections).map((typeKey) => ({
            type: typeKey,
            label: getReadableLabel(typeKey),
            months: buildMonthlyGroups(typeKey)
        }));
    };

    const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const renderJokeArchive = () => {
        const container = document.getElementById('archive-output');
        if (!container) {
            return;
        }

        const query = archiveState.query.trim().toLowerCase();
        const groups = getArchiveGroups(archiveState.type)
            .map((group) => {
                const months = group.months
                    .filter((month) => archiveState.month === 'all' || month.monthKey === archiveState.month)
                    .map((month) => {
                        const jokes = query
                            ? month.jokes.filter((joke) => joke.toLowerCase().includes(query))
                            : month.jokes;
                        return {
                            ...month,
                            jokes
                        };
                    })
                    .filter((month) => month.jokes.length);

                return {
                    ...group,
                    months
                };
            })
            .filter((group) => group.months.length);

        container.innerHTML = '';

        if (!groups.length) {
            const empty = document.createElement('p');
            empty.textContent = 'No jokes match your filters yet. Try another keyword or month.';
            container.appendChild(empty);
            return;
        }

        groups.forEach((group) => {
            const typeHeading = document.createElement('h3');
            typeHeading.textContent = group.label;
            container.appendChild(typeHeading);

            group.months.forEach((month) => {
                const monthSection = document.createElement('div');
                monthSection.className = 'archive-month';

                const monthHeading = document.createElement('h4');
                monthHeading.textContent = month.label;
                monthSection.appendChild(monthHeading);

                const list = createJokeListElement(`${month.label} ${group.label}`);
                month.jokes.forEach((joke) => {
                    list.appendChild(createJokeCardElement(month.label, joke));
                });

                monthSection.appendChild(list);
                container.appendChild(monthSection);
            });
        });
    };

    const initRandomJokeButtons = () => {
        const jokeBox = document.getElementById('joke-box');
        if (!jokeBox) {
            return;
        }

        const buttons = document.querySelectorAll('[data-joke-button]');
        if (!buttons.length) {
            return;
        }

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const type = button.dataset.jokeButton || 'mixed';
                const jokes = getJokesByType(type);
                if (jokes.length) {
                    jokeBox.textContent = getRandomFromArray(jokes);
                }
            });
        });
    };

    const renderStandaloneJokePages = () => {
        document.querySelectorAll('[data-joke-page]').forEach((section) => {
            const typeKey = section.getAttribute('data-joke-page');
            const list = section.querySelector('[data-joke-list]');

            if (!typeKey || !list || !jokeCollections[typeKey]) {
                return;
            }

            const label = getReadableLabel(typeKey);
            list.innerHTML = '';
            list.classList.add('joke-scroll');
            list.setAttribute('role', 'list');
            list.setAttribute('aria-label', `${label} collection`);

            buildMonthlyGroups(typeKey).forEach((month) => {
                month.jokes.forEach((joke) => {
                    list.appendChild(createJokeCardElement(month.label, joke));
                });
            });
        });
    };

    const initStandaloneJokeSearch = () => {
        document.querySelectorAll('[data-joke-collection]').forEach((collection) => {
            const input = collection.querySelector('[data-joke-search-input]');
            const list = collection.querySelector('.joke-scroll');
            const searchForm = collection.querySelector('[data-joke-search]');

            if (!input || !list) {
                return;
            }

            if (searchForm) {
                searchForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                });
            }

            const cards = Array.from(list.querySelectorAll('.joke-card')).map((card) => ({
                node: card,
                text: card.textContent.toLowerCase()
            }));

            const filterCards = (query) => {
                cards.forEach(({ node, text }) => {
                    const shouldHide = query.length > 0 && !text.includes(query);
                    node.hidden = shouldHide;
                });
            };

            input.addEventListener('input', () => {
                filterCards(input.value.trim().toLowerCase());
            });

            filterCards('');
        });
    };

    const populateMonthOptions = (type = 'mixed') => {
        const monthSelect = document.getElementById('archive-month');
        if (!monthSelect) {
            return;
        }

        const months = getAvailableMonthKeys(type);
        const previousValue = archiveState.month;
        monthSelect.innerHTML = '';

        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'All Months';
        monthSelect.appendChild(allOption);

        months.forEach((monthKey) => {
            const option = document.createElement('option');
            option.value = monthKey;
            option.textContent = getMonthLabel(monthKey);
            monthSelect.appendChild(option);
        });

        if (months.includes(previousValue)) {
            monthSelect.value = previousValue;
        } else {
            archiveState.month = 'all';
            monthSelect.value = 'all';
        }

        monthSelect.disabled = !months.length;
    };

    const initArchiveControls = () => {
        const archiveFilter = document.getElementById('archive-filter');
        const archiveMonth = document.getElementById('archive-month');
        const searchInput = document.getElementById('archive-search-input');
        const searchForm = document.getElementById('archive-search-form');

        if (!archiveFilter) {
            return;
        }

        archiveFilter.addEventListener('change', () => {
            archiveState.type = archiveFilter.value;
            populateMonthOptions(archiveState.type);
            renderJokeArchive();
        });

        if (archiveMonth) {
            archiveMonth.addEventListener('change', () => {
                archiveState.month = archiveMonth.value;
                renderJokeArchive();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                archiveState.query = searchInput.value;
                renderJokeArchive();
            });
        }

        if (searchForm) {
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
            });
        }

        populateMonthOptions(archiveState.type);
        renderJokeArchive();
    };

    const setCurrentYear = () => {
        const year = new Date().getFullYear();
        document.querySelectorAll('[data-year]').forEach((node) => {
            node.textContent = year;
        });
    };

    const highlightActiveNav = () => {
        const rawPath = window.location.pathname.split('/').pop() || 'index.html';
        const currentPath = rawPath.replace('./', '') || 'index.html';

        document.querySelectorAll('nav a').forEach((link) => {
            const linkPath = (link.getAttribute('href') || '').replace('./', '');
            if (linkPath === currentPath) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        setCurrentYear();
        highlightActiveNav();
        initRandomJokeButtons();
        renderStandaloneJokePages();
        initStandaloneJokeSearch();
        initArchiveControls();
    });
})();
