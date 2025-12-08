// === Dad Jokes ===
const dadJokes = [
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
    "I’d tell you a time-travel joke, but you didn’t like it."
];

// === Puns ===
const puns = [
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
    "I bought a boat because it was on sail."
];

// === One-Liners ===
const oneLiners = [
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
    "I was going to give you a bad joke about sodium, but Na."
];

// === Utility ===
function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// type: 'mixed' | 'dad' | 'pun' | 'one'
function showRandomJoke(type) {
    let joke;
    if (type === 'dad') {
        joke = getRandomFromArray(dadJokes);
    } else if (type === 'pun') {
        joke = getRandomFromArray(puns);
    } else if (type === 'one') {
        joke = getRandomFromArray(oneLiners);
    } else {
        const all = dadJokes.concat(puns, oneLiners);
        joke = getRandomFromArray(all);
    }

    const box = document.getElementById('joke-box');
    if (box) {
        box.textContent = joke;
    }
}
