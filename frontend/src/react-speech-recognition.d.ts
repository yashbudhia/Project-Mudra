// src/types/react-speech-recognition.d.ts

import 'react-speech-recognition';

declare module 'react-speech-recognition' {
    export interface Command {
        command: string | string[];
        callback: (...args: any[]) => void;
        matchInterim?: boolean;
        bestMatchOnly?: boolean;
    }

    export interface SpeechRecognitionOptions {
        autoStart?: boolean;
        continuous?: boolean;
        language?: string;
    }

    export interface SpeechRecognitionState {
        transcript: string;
        listening: boolean;
        browserSupportsSpeechRecognition: boolean;
    }

    export interface UseSpeechRecognitionProps {
        commands?: Command[];
    }

    export function useSpeechRecognition(props?: UseSpeechRecognitionProps): SpeechRecognitionState & {
        transcript: string;
        listening: boolean;
        resetTranscript: () => void;
    };

    interface SpeechRecognitionStatic {
        startListening: (options?: SpeechRecognitionOptions) => void;
        stopListening: () => void;
        browserSupportsSpeechRecognition: boolean;
        recognition: any;
        getRecognition: () => any;
    }

    const SpeechRecognition: SpeechRecognitionStatic;

    export default SpeechRecognition;
}
