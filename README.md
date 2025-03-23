# Speech-to-Text and Translation

This web application allows users to convert speech into text and then translate it into a selected language. The application uses the Web Speech API for speech recognition and communicates with an external translation API to perform the translation. Additionally, it provides the functionality to speak the translated text using the Text-to-Speech API.

## Features

- **Speech Recognition**: Convert spoken language into text.
- **Language Translation**: Translate recognized text to a selected target language using an external translation API.
- **Text-to-Speech**: Speak the translated text aloud.
- **Dynamic Language Dropdowns**: The language options are dynamically fetched from the external translation API and displayed in dropdown menus.

## Technologies Used

- **HTML**: For the structure and layout of the page.
- **CSS**: Styled with Bootstrap 4 for responsive and modern UI.
- **JavaScript**: Handles the logic for speech recognition, API requests, and text-to-speech functionality.
- **Web Speech API**: For speech-to-text functionality.
- **Text-to-Speech API**: For speaking the translated text.
- **External Translation API**: For translating the recognized text into different languages.

## Installation

1. **Clone this repository** to your local machine:

   ```bash
   git clone https://github.com/your-username/speech-to-text-and-translation.git
2. Open the `index.html` **file** in your preferred browser. (Chrome and Edge are recommended)

## Folder Structure

```bash
/testtask
    /index.html           # The main HTML file
    /js
        /main.js          # The external JavaScript file containing all the logic
```

## How to Use

1. Select the **Speech Language** from the dropdown list. The available options will be fetched from the translation API dynamically.
   
2. Select the **Translate To** language from the dropdown list. The translation options are based on the selected speech language.

3. Click the **Submit and Start Listening** button.

4. Start speaking, and the speech will be converted into text.

5. The recognized text will appear in the **"Recognized Text"** section.

6. The application will automatically translate the recognized text into the selected target language and display the translated text.

7. If you wish, you can click the **Speak Translated Text** button to have the translated text spoken aloud.

## API Integration

**Speech Recognition**: Uses the browser’s built-in Web Speech API.

- **Translation**: The application uses the external translation API hosted at [https://translate.flossboxin.org.in/](https://translate.flossboxin.org.in/).

  - **Endpoint for translation**: `POST /translate`

  - **Endpoint for languages**: `GET /languages`

## Troubleshooting

- Ensure that your browser supports the **Web Speech API**. Most modern browsers, like Google Chrome, support it, but it may not work in all browsers.

- If the translation does not work, check if the translation API is available or if the internet connection is stable.

## Notes

- The available speech recognition languages and translation options depend on the external translation API used in the project. Some languages may not be supported, so always check the supported languages first.

- **Bootstrap 4** is used for the styling and layout to make the web page responsive.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Bootstrap 4**: For responsive design and easy-to-use components.
- **Web Speech API**: For converting speech into text and enabling Text-to-Speech functionality.
- **LibreTranslate API**: For the translation API that powers language translation functionality.
