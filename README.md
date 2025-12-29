## Project Architecture

This project is structured as a simple full-stack application with a clear separation between frontend and backend responsibilities.

### Backend (Node.js + Express)

- Exposes a single API endpoint: `POST /api/tts`
- Receives text input from the client
- Converts text to speech using a public Text-to-Speech service
- Returns the generated audio data to the frontend
- Handles errors and invalid input gracefully

The backend follows a basic layered structure:

- **Controller**: Handles HTTP requests and responses
- **Service**: Contains the Text-to-Speech logic and external API interaction

This separation keeps the code readable and easy to maintain.

### Frontend (React)

- Built using React with Functional Components
- Uses hooks for state and side-effect management
- Provides a simple UI for text input and audio playback
- Displays a basic SVG-based avatar
- Synchronizes mouth movement with audio playback

---

## Technical Decisions & Trade-offs

### Lip Sync Implementation

Instead of using complex lip synchronization, the project uses mock data:

- estimate duration of voice based on text length
- estimate each char in text with 0.1 ms
- define a approprite stepTime for lipSync

**Trade-off:**

- This approach does not perfectly match individual phonemes
- However, it provides a good synchronization with the actual sound
- It is language-independent and works well for Persian text
- The implementation remains simple and easy to explain

### Simplicity Over Complexity

- UI and avatar design are intentionally minimal
- Focus is placed on functionality, structure, and integration
- Avoided heavy animation libraries or complex audio processing pipelines

This keeps the project aligned with the scope and time constraints of the exercise.

---

## Future Improvements

If more time were available, the following enhancements could be considered:

- Implement a complex lip sync for more accurate mouth movement
- Add unit tests for backend services
- Improve avatar visuals using Canvas or Lottie animations
- Add better error feedback and retry handling on the frontend

---
