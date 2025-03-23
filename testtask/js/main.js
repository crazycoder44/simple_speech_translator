// Fetch the list of supported languages when the page loads
window.onload = function() {
    fetchSupportedLanguages();
}

// Function to fetch supported languages from the API
function fetchSupportedLanguages() {
    fetch('https://translate.flossboxin.org.in/languages')
        .then(response => response.json())
        .then(data => {
            populateLanguageDropdowns(data);
        })
        .catch(error => {
            console.error('Error fetching supported languages:', error);
        });
}

// Function to populate the dropdowns with supported languages
function populateLanguageDropdowns(languages) {
    const speechLanguageSelect = document.getElementById('speechLanguage');
    const translateToSelect = document.getElementById('translateTo');

    // Clear existing options
    speechLanguageSelect.innerHTML = '';
    translateToSelect.innerHTML = '';

    // Add options to the Speech Language dropdown (only once for each language)
    languages.forEach(language => {
        const speechOption = document.createElement('option');
        speechOption.value = language.code;
        speechOption.textContent = language.name;
        speechLanguageSelect.appendChild(speechOption);
    });

    // Update the Translate To dropdown when a speech language is selected
    speechLanguageSelect.addEventListener('change', () => {
        const selectedLanguageCode = speechLanguageSelect.value;
        updateTranslateToDropdown(selectedLanguageCode, languages);
    });

    // Initial population of the translateTo dropdown based on the first selected language
    updateTranslateToDropdown(speechLanguageSelect.value, languages);
}

// Function to update the "Translate To" dropdown based on the selected speech language
function updateTranslateToDropdown(selectedLanguageCode, languages) {
    const translateToSelect = document.getElementById('translateTo');
    // Clear the current options
    translateToSelect.innerHTML = '';

    // Find the selected language object
    const selectedLanguage = languages.find(language => language.code === selectedLanguageCode);

    // If the language is found, add its translation targets to the translateTo dropdown
    if (selectedLanguage) {
        selectedLanguage.targets.forEach(targetCode => {
            const translateOption = document.createElement('option');
            translateOption.value = targetCode;
            translateOption.textContent = getLanguageNameByCode(targetCode, languages);
            translateToSelect.appendChild(translateOption);
        });
    }
}

// Helper function to get language name by its code
function getLanguageNameByCode(code, languages) {
    const language = languages.find(lang => lang.code === code);
    return language ? language.name : code;
}

// Speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    alert("Speech Recognition API not supported in this browser.");
}

const recognition = new SpeechRecognition();
recognition.interimResults = true; // Show results while speaking
recognition.maxAlternatives = 1; // Only the best result

// Get elements
const submitButton = document.getElementById('submitButton');
const recognizedTextElement = document.getElementById('recognizedText');
const translatedTextElement = document.getElementById('translatedText');
const speakButton = document.getElementById('speakButton');

let speechLanguage = '';
let translateToLanguage = '';

// Handle the submit button click to start speech recognition
submitButton.addEventListener('click', () => {
    speechLanguage = document.getElementById('speechLanguage').value;
    translateToLanguage = document.getElementById('translateTo').value;

    // Set the language of the speech recognition
    recognition.lang = speechLanguage;

    // Start listening for speech
    recognition.start();
});

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript; // Get the speech text
    recognizedTextElement.textContent = transcript;

    // Send the recognized text to the external translation API
    translateText(transcript, speechLanguage, translateToLanguage);
};

recognition.onerror = function(event) {
    console.error("Speech recognition error:", event.error);
};

// Function to send text to an external API for translation
function translateText(text, fromLang, toLang) {
    const apiUrl = 'https://translate.flossboxin.org.in/translate'; // Translation API endpoint

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            source: fromLang,
            target: toLang,
            format: 'text'
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Translation API response:', data);
        const translatedText = data.translatedText; // Assuming the API returns this field
        translatedTextElement.textContent = translatedText;

        // Display the speak button and add functionality
        speakButton.style.display = 'block';
        speakButton.onclick = () => speakText(translatedText);
    })
    .catch(error => {
        console.error('Error translating text:', error);
    });
}

// Function to speak the translated text using Text-to-Speech API
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = translateToLanguage; // Set the language for the translation
    window.speechSynthesis.speak(utterance);
}
