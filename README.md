# Chat

> ⚠️ **WARNING:** This project is not production-ready. It is an unstable experimental proof-of-concept and may contain bugs and/or incomplete features. Use it at your own risk.

![App Logo](public/logo192.png)

![GitHub stars](https://img.shields.io/github/stars/positive-intentions/chat?style=social) 
![GitHub forks](https://img.shields.io/github/forks/positive-intentions/chat?style=social) 
![GitHub issues](https://img.shields.io/github/issues/positive-intentions/chat) 
![GitHub license](https://img.shields.io/github/license/positive-intentions/chat) 
![Staging](https://github.com/positive-intentions/chat/actions/workflows/main_workflow.yaml/badge.svg) 
![Code size](https://img.shields.io/github/languages/code-size/positive-intentions/chat) 
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Discover **Positive Intentions Chat**: A secure, browser-based chat application leveraging WebRTC for decentralized messaging, file sharing, and virtual reality experiences. Prioritizing privacy and user control, it's redefining the way we think about online communication. Join us in shaping the future of chat.

Live app: [chat.positive-intentions.com](https://chat.positive-intentions.com)

Learn more: [positive-intentions.com](https://positive-intentions.com)

Join the conversation: [r/positive_intentions](https://www.reddit.com/r/positive_intentions)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js installed on your system to run the app. If you don't have Node.js installed, you can download it from [here](https://nodejs.org/).

### Installing

First, clone the repository to your local machine. Then, navigate to the project directory and install the dependencies.

```bash
npm install --force
npm start
```

This will start the development server and open the app in your default browser. If it doesn't open automatically, you can navigate to [http://localhost:8080](http://localhost:8080) to view the app.

> See the [package.json](package.json) file for more scripts.

#

🚀 **Introducing a groundbreaking chat application that redefines online communication.** Built with a focus on privacy, security, and user control, this app offers a pioneering approach to chatting, file sharing, and exploring virtual spaces—all from within your browser.

🔒 **Privacy by Design**: Leveraging WebRTC for peer-to-peer connections, our app ensures your conversations and files stay between you and your contacts—no middlemen involved. With encryption technologies built into modern browsers, we enable users to manage their encryption keys, ensuring unmatched privacy and security.

🌍 **Decentralized and Empowering**: Say goodbye to the constraints of traditional server-based apps. Our technology allows for decentralized authentication, encrypted messaging, and even decentralized file transfers. Your data, your rules.

🔥 **Feature-Rich Experience**:
- **Secure Messaging**: End-to-end encryption for all messages.
- **File Sharing**: Seamlessly share files with peers using cutting-edge WebRTC technology.
- **Voice and Video Calls**: Connect more personally with high-quality calls.
- **Mixed-Reality Spaces**: Dive into shared virtual environments for a new way of interaction.
- **Image Board**: Share and discover images in a community-driven space.

👾 **Tech for the Future**: Beyond chat, we're exploring virtual reality, enabling users to share 3D positions and live video streams within VR environments. Imagine socializing in a virtual space that's as easy to access as opening your browser.

### Architecture

```mermaid
graph TD;
    S3[AWS S3 - Static Content Hosting] -->|Serves HTML, CSS, JS| UA[User's Browser - PWA]
    UA -->|Initiates Connection| PS[PeerJS Server - Connection Orchestration]
    UA -->|Logs Events| NA[nLevel Analytics - Logging & Monitoring]
    UA -->|Fetches Map Data| OSM[openstreetmap.org - Map Service]
    PS -->|Establishes WebRTC Connections| UA
    UA -->|Direct P2P Communication| UA
    style S3 fill:#f9f,stroke:#333,stroke-width:2px,color:black
    style PS fill:#ccf,stroke:#333,stroke-width:2px,color:black
    style NA fill:#cfc,stroke:#333,stroke-width:2px,color:black
    style OSM fill:#fcf,stroke:#333,stroke-width:2px,color:black
    style UA fill:#ff9,stroke:#333,stroke-width:2px,color:black

```

### Authentication sequence

```mermaid
sequenceDiagram
    participant U1 as User 1 (Peer1)
    participant PS as PeerJS Server
    participant U2 as User 2 (Peer2)
    U1->>PS: Connects & Generates random Peer ID
    PS->>U1: Acknowledges Connection
    U1->>U2: Connects using Peer ID of User 2
    U1->>U1: Generates Public-Private Key Pair
    U2->>U2: Generates Public-Private Key Pair
    U1->>U2: Sends Public Key to User 2
    U2->>U2: Generates Symmetric Key
    U2->>U1: Sends Symmetric Key & Public Key (encrypted with User 1's Public Key)
    U1->>U1: Decrypts received keys using Private Key
    U1->>U1: Stores Symmetric Key & Peer Public Key in Browser Storage
    U2->>U2: Stores Symmetric Key & Peer Public Key in Browser Storage
    U1->>U2: Sends Encrypted Message (using Symmetric Key)
    U2->>U2: Receives and Decrypts Message

```

### Join Us on This Journey

Pushing the boundaries of what's possible with current web technologies to create a chat app that prioritizes user empowerment and privacy. But this is just the beginning. With your support, we can explore new features, refine the user experience, and expand the app's capabilities.

### How You Can Help

- **Feedback**: Your insights are invaluable. Share your thoughts on current features, suggest new ones, or report any bugs you encounter.
- **Development**: Interested in contributing code? [Let's talk!](https://www.reddit.com/r/positive_intentions) While the app isn't fully open-source yet, parts of it are, and I'm keen on opening more in the future.
- **Spread the Word**: Help us grow by sharing the app with others who value privacy and control over their digital communication.
- **Github Stars**: If you like the project, consider starring the repository. It helps others discover it and boosts my motivation.
- **Financial Support**: Development is fueled by passion and coffee. Your sponsorship helps keep both flowing.
