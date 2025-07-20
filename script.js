
const data = [{'ID': '001', 'Keyword': 'a', 'Sentence': 'I read a book a week.', 'Audio File': '001_a.mp3', 'Image': '3.png'}, {'ID': '002', 'Keyword': 'able', 'Sentence': 'I was able to finish the task on time.', 'Audio File': '002_able.mp3', 'Image': '4.png'}, {'ID': '003', 'Keyword': 'about', 'Sentence': 'They always talk about the weather.', 'Audio File': '003_about.mp3', 'Image': '5.png'}, {'ID': '004', 'Keyword': 'absolutely', 'Sentence': "I'm absolutely sure about my answer.", 'Audio File': '004_absolutely.mp3', 'Image': '6.png'}, {'ID': '005', 'Keyword': 'accept', 'Sentence': 'We only accept cash.', 'Audio File': '005_accept.mp3', 'Image': '7.png'}, {'ID': '006', 'Keyword': 'account', 'Sentence': 'I opened a new bank account last week.', 'Audio File': '006_account.mp3', 'Image': '8.png'}, {'ID': '007', 'Keyword': 'across', 'Sentence': 'You need to walk across the street to get to the store.', 'Audio File': '007_across.mp3', 'Image': '9.png'}, {'ID': '008', 'Keyword': 'action', 'Sentence': "If you don't take action now, it might be too late.", 'Audio File': '008_action.mp3', 'Image': '10.png'}, {'ID': '009', 'Keyword': 'actually', 'Sentence': "I actually don't like coffee.", 'Audio File': '009_actually.mp3', 'Image': '11.png'}, {'ID': '010', 'Keyword': 'add', 'Sentence': "Something about his story doesn't add up.", 'Audio File': '010_add.mp3', 'Image': '12.png'}];

let remembered = JSON.parse(localStorage.getItem('rememberedWords') || '[]');
const container = document.getElementById('container');

function renderCards() {
    container.innerHTML = '';
    const playAllButton = document.createElement('button');
    playAllButton.textContent = '🔊 覚えていないカードを順番に再生';
    playAllButton.onclick = () => playAllUnlearned();
    container.appendChild(playAllButton);

    data.forEach(item => {
        if (remembered.includes(item.ID)) return;

        const card = document.createElement('div');
        card.className = 'card';

        const keyword = document.createElement('h2');
        keyword.textContent = item.Keyword;

        const image = document.createElement('img');
        image.src = 'images/' + item.Image;
        image.style.width = '100%';
        image.style.maxWidth = '300px';
        image.style.display = 'block';
        image.style.marginBottom = '10px';

        const sentence = document.createElement('p');
        sentence.textContent = item.Sentence;

        const audio = document.createElement('audio');
        audio.src = 'audio/' + item["Audio File"];
        audio.controls = true;

        const button = document.createElement('button');
        button.textContent = '✓ 覚えた';
        button.onclick = () => {
            remembered.push(item.ID);
            localStorage.setItem('rememberedWords', JSON.stringify(remembered));
            renderCards();
        };

        card.appendChild(keyword);
        card.appendChild(image);
        card.appendChild(sentence);
        card.appendChild(audio);
        card.appendChild(button);
        container.appendChild(card);
    });
}

function resetMemory() {
    localStorage.removeItem('rememberedWords');
    remembered = [];
    renderCards();
}

function playAllUnlearned() {
    const audios = Array.from(document.querySelectorAll('audio'));
    let index = 0;

    function playNext() {
        if (index >= audios.length) return;
        const current = audios[index];
        current.play();
        current.onended = () => {
            index++;
            playNext();
        };
    }

    playNext();
}

renderCards();
